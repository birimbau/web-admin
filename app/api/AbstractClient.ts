

export abstract class AbstractClient {
  abstract async retrieve<T>(namespace: string, uuid: string): Promise<Required<T> | null>;
  abstract async list<T>(namespace: string): Promise<Required<T>[]>;
  abstract async create<T>(namespace: string, values: Required<T>): Promise<Required<T>>;
  abstract async update<T>(namespace: string, uuid: string, values: Required<T>): Promise<Required<T>>;
  abstract async remove<T>(namespace: string, uuid: string): Promise<void>;
  abstract async uploadFile<T>(namespace: string, uuid: string, metadata: any, file: any): Promise<void>
  abstract async deleteFile<T>(namespace: string, uuid: string, metadata: any): Promise<void>
}
