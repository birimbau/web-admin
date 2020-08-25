import aws from 'aws-sdk';

import { HttpClient } from '@/app/api/HttpClient';
import { FileMetadata, FileStorage } from '@/app/models/Model';
import { secrets } from '@/hooks/secrets';


export class AwsClient extends HttpClient {
  get prefix() {
    const bucket = this.getBucket();
    const region = secrets.values.AWS_REGION.value;

    return `https://${bucket}.s3-${region}.amazonaws.com/`;
  }

  getTable(namespace: string): string {
    const stage = 'dev';
    const table = `photion--${namespace}--${stage}`;

    return table;
  }

  getKey(uuid: string) {
    return {
      uuid: {
        S: uuid,
      },
    };
  }

  getBucket() {
    const stage = 'dev';
    const bucket = `photion--concepts--${stage}`;

    return bucket;
  }

  getStorageClass(meta: FileMetadata) {
    switch (meta.storage) {
    case FileStorage.PREVIEW:
      return 'STANDARD';
    case FileStorage.FULL_QUALITY:
      return 'STANDARD_IA';
    case FileStorage.RAW:
      return 'DEEP_ARCHIVE';
    default:
      throw new Error(`Unknown storage class for: '${meta.storage}'`);
    }
  }

  getAcl(meta: FileMetadata) {
    switch (meta.storage) {
    case FileStorage.PREVIEW:
      return 'public-read';
    case FileStorage.FULL_QUALITY:
    case FileStorage.RAW:
      return 'private';
    default:
      throw new Error(`Unknown acl for: '${meta.storage}'`);
    }
  }

  get s3(): aws.S3 {
    const params = {
      region: secrets.values.AWS_REGION.value,
      accessKeyId: secrets.values.AWS_ACCESS_KEY_ID.value,
      secretAccessKey: secrets.values.AWS_SECRET_ACCESS_KEY.value,
    };

    return new aws.S3(params);
  }

  get dynamo(): aws.DynamoDB {
    const params = {
      apiVersion: '2012-08-10',
      region: secrets.values.AWS_REGION.value,
      accessKeyId: secrets.values.AWS_ACCESS_KEY_ID.value,
      secretAccessKey: secrets.values.AWS_SECRET_ACCESS_KEY.value,
    };

    return new aws.DynamoDB(params);
  }

  toField(value: any): { [key: string]: any } {
    if ((value ?? null) === null) {
      return { NULL: true };
    }

    switch (value.constructor.name) {
    case 'Boolean':
      return { BOOL: value };
    case 'String':
      return { S: value };
    case 'Number':
      return { N: String(value) };
    case 'Array':
      return { L: value.map((el: any) => this.toField(el)) };
    case 'Object':
      return { M: this.toQuery(value) };
    default:
      throw new Error(`Unrecognised type: ${value}`);
    }
  }

  fromField(field: { [key: string]: any }): any {
    const [[key, value]] = Object.entries(field);

    switch (key) {
    case 'N':
      return Number(value);
    case 'M':
      return this.fromQuery(value);
    case 'L':
      return value.map((sub: { [key: string]: any }) => this.fromField(sub));
    default:
      return value;
    }
  }

  toQuery<T>(values: T) {
    const entries = Object.entries(values).map(([key, value]) => [key, this.toField(value)]);

    return Object.fromEntries(entries);
  }

  fromQuery<T>(values: T) {
    const entries = Object.entries(values).map(([key, value]) => [key, this.fromField(value)]);

    return Object.fromEntries(entries);
  }

  async list<T>(namespace: string): Promise<Required<T>[]> {
    const params = {
      TableName: this.getTable(namespace),
    };

    const response = await this.dynamo.scan(params).promise();

    if (response.Items) {
      return response.Items.map((item: any) => this.fromQuery(item)) as Required<T>[];
    }

    return [];
  }

  async retrieve<T>(namespace: string, uuid: string): Promise<Required<T> | null> {
    const params = {
      TableName: this.getTable(namespace),
      Key: this.getKey(uuid),
    };

    const response = await this.dynamo.getItem(params).promise();

    if (response.Item) {
      return this.fromQuery(response.Item) as Required<T>;
    }

    return null;
  }

  async create<T>(namespace: string, values: Required<T>): Promise<Required<T>> {
    const params = {
      TableName: this.getTable(namespace),
      Item: this.toQuery(values),
    };

    await this.dynamo.putItem(params).promise();

    return values;
  }

  async update<T>(namespace: string, _uuid: string, values: Required<T>): Promise<Required<T>> {
    const params = {
      TableName: this.getTable(namespace),
      Item: this.toQuery(values),
    };

    await this.dynamo.putItem(params).promise();

    return values;
  }

  async remove<T>(namespace: string, uuid: string): Promise<void> {
    const params = {
      TableName: this.getTable(namespace),
      Key: this.getKey(uuid),
    };

    await this.dynamo.deleteItem(params).promise();
  }

  async uploadFile<T>(namespace: string, uuid: string, meta: Required<FileMetadata>, file: any): Promise<void> {
    const params = {
      Bucket: this.getBucket(),
      Key: this.getFileKey(namespace, uuid, meta),
      Body: file,
      ACL: this.getAcl(meta),
      StorageClass: this.getStorageClass(meta),
      ContentType: meta.mime,
    };

    await this.s3.putObject(params).promise();
  }

  async deleteFile<T>(namespace: string, uuid: string, meta: Required<FileMetadata>): Promise<void> {
    const params = {
      Bucket: this.getBucket(),
      Key: this.getFileKey(namespace, uuid, meta),
    };

    await this.s3.deleteObject(params).promise();
  }

  headFile<T>(namespace: string, uuid: string, meta: Required<FileMetadata>) {
    const params = {
      Bucket: this.getBucket(),
      Key: this.getFileKey(namespace, uuid, meta),
    };

    return this.s3.headObject(params).promise();
  }
}
