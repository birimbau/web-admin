import { AbstractModel, Model } from '@/app/models/Model';


export abstract class AbstractClient {
  abstract async retrieve<T, Y extends Model>(Kls: Y, uuid: string): Promise<Model>;

  async list(_namespace: string) {}

  async create(model: AbstractModel) {
    await Promise.resolve();
    model.created = true;
  }

  async update(_model: AbstractModel) {}

  async remove(model: AbstractModel) {
    await Promise.resolve();
    model.created = false;
  }
}
