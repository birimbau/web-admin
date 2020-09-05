import { v4 } from 'uuid';

import { Http404 } from '~/src/errors/http/Http404';
import { client } from '~/src/state/service';


/**
 * Props for the Model
 */
export interface ModelProps {
  uuid?: string;
}

export enum FileStorage {
  PREVIEW = 'PREVIEW',
  FULL_QUALITY = 'FULL_QUALITY',
  RAW = 'RAW',
}

/**
 * File metadata
 */
export interface FileMetadata {
  filename: string;
  mime: string;
  size: number;
  storage: FileStorage;
}

/**
 * Generates a model base class
 * @param namespace
 * @param fields
 */
export const modelize = <T extends ModelProps>(namespace: string, fields: Array<keyof Required<T>>) => {
  class Model {
    public static namespace = 'models';
    public static fields = fields;
    public created: boolean;
    public uuid: string;

    constructor(props: T) {
      this.created = Boolean(props.uuid);
      this.uuid = props.uuid ?? v4();
    }

    static get client() {
      return client.value;
    }

    get client() {
      return (this.constructor as typeof Model).client;
    }

    get $values(): Required<T> {
      const entries = fields.map(key => [key, this[key as keyof ThisType<T>]]);

      return Object.fromEntries(entries);
    }

    static async retrieve<Y>(this: new (props: T) => Y, uuid: string): Promise<Y> {
      const values = await client.value.retrieve<T>(namespace, uuid);

      if (!values) {
        const errorCode = `${namespace}__not_found`;
        const message = `Could not find any ${namespace} with UUID: '${uuid}'`;

        throw new Http404(errorCode, message);
      }

      return new this(values);
    }

    static async list<Y>(this: new (props: T) => Y): Promise<Y[]> {
      const list = await client.value.list<T>(namespace);
      const instances = list.map(values => new this(values));

      return instances;
    }

    async save() {
      if (this.created) {
        return this.client.update<T>(namespace, this.uuid, this.$values);
      }

      const response = await this.client.create<T>(namespace, this.$values);
      this.created = true;

      return response;
    }

    async remove() {
      const response = await this.client.remove<T>(namespace, this.uuid);
      this.created = false;

      return response;
    }
  }

  return Model;
};
