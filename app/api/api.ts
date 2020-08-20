import axios from 'axios';

import { Model, IModelProps } from '@/app/models/Model';


export class Client {
  static provider = 'api'

  async create(model: Model<IModelProps>) {
    model.created = true;

    const provider = (this.constructor as typeof Client).provider;
    await axios.post(`/${provider}/create`);
  }

  async update(_model: Model<IModelProps>) {
    const provider = (this.constructor as typeof Client).provider;
    await axios.put(`/${provider}/update`);
  }

  async remove(model: Model<IModelProps>) {
    model.created = false;
    const provider = (this.constructor as typeof Client).provider;
    await axios.delete(`/${provider}/remove`);
  }
}
