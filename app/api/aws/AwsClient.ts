import aws from 'aws-sdk';


import { HttpClient } from '@/app/api/HttpClient';


export class AwsClient extends HttpClient {
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

  getAcl() {
    return 'public-read';
  }

  get s3(): aws.S3 {
    const params = {
      region: 'eu-west-1',
    };

    return new aws.S3(params);
  }

  get dynamo(): aws.DynamoDB {
    const params = {
      apiVersion: '2012-08-10',
      region: 'eu-west-1',
      // secretAccessKey: secrets.values.AWS_ACCESS_KEY.value,
      // accessKeyId: secrets.values.AWS_SECRET_KEY.value,
    };

    return new aws.DynamoDB(params);
  }

  toField(value: any): { [key: string]: any } {
    if ((value ?? null) === null) {
      return { NULL: true };
    }

    switch (value.constructor.name) {
    case 'Boolean':
      return { B: value };
    case 'String':
      return { S: value };
    case 'Number':
      return { N: value };
    case 'Array':
      return { L: value.map((el: any) => this.toField(el)) };
    case 'Object':
      return { M: this.toQuery(value) };
    default:
      throw new Error(`Unrecognised type: ${value}`);
    }
  }

  fromField(value: { [key: string]: any }): any {
    return Object.values(value)[0];
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

  async uploadFile<T>(namespace: string, uuid: string, metadata: any, file: any): Promise<void> {
    const params = {
      Bucket: 'photion--Fragments--dev',
      Key: `Fragment/${namespace}/${uuid}.${metadata.ext}`,
      Body: file,
      ACL: this.getAcl(),
    };

    await this.s3.putObject(params).promise();
  }

  async deleteFile<T>(namespace: string, uuid: string, metadata: any): Promise<void> {
    const params = {
      Bucket: 'photion--Fragments--dev',
      Key: `Fragment/${namespace}/${uuid}.${metadata.ext}`,
    };

    await this.s3.deleteObject(params).promise();
  }

  headFile<T>(namespace: string, uuid: string, metadata: any) {
    const params = {
      Bucket: 'photion--Fragments--dev',
      Key: `Fragment/${namespace}/${uuid}.${metadata.ext}`,
    };

    return this.s3.headObject(params).promise();
  }
}
