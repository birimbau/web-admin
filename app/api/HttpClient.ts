import axios from 'axios';

import { Model } from '@/app/models/Model';
import { AbstractClient } from '@/app/api/AbstractClient';


interface Constructor<T> {
  [K in keysof T];
  new (props: any): T
}

export class HttpClient extends AbstractClient {

  getPath(namespace: string, operation: string) {
    return `/${this.provider}/${namespace}/${operation}`;
  }

  async retrieve<T extends Model>(Kls: Constructor<T>, uuid: string): Promise<T> {
    const kls = Kls as typeof T;
    const response: { data: T } = await axios.get(`/${this.provider}/${Kls.namespace}/${uuid}`);

    const instance = new Kls(response.data);

    return instance;
  }

  // async list<T, Y extends Model<T>>(Kls: Y): Promise< {
  //   await super.list(namespace);

  //   await axios.get(`/${this.provider}/${namespace}`);
  // }

  async create(namepace: string, values: any): Promise<any> {
    const url = `/api/${namespace}`

    await axios.post(url, values);
  }

  async update(model: Model) {
    await super.update(model);

    const path = this.getPath(model.namespace, 'update');

    await axios.put(path);
  }

  async remove(model: Model) {
    await super.remove(model);

    const path = this.getPath(model.namespace, 'delete');

    await axios.delete(path);
  }
}
