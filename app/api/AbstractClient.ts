

export abstract class AbstractClient {
  abstract async retrieve<T>(namespace: string, uuid: string): Promise<Required<T>>;
  abstract async list<T>(namespace: string): Promise<Required<T>[]>;
  abstract async create<T>(namespace: string, values: Required<T>): Promise<Required<T>>;
  abstract async update<T>(namespace: string, uuid: string, values: Required<T>): Promise<Required<T>>;
  abstract async remove<T>(namespace: string, uuid: string): Promise<void>;
  abstract async upload<T>(namespace: string, uuid: string, metadata: any, file: any): Promise<void>
}
