import axios from 'axios';

import { AbstractClient } from '@/app/api/AbstractClient';


export class HttpClient extends AbstractClient {
  async retrieve<T>(namespace: string, uuid: string): Promise<Required<T>> {
    const response: { data: Required<T> } = await axios.get(`/api/${namespace}/${uuid}`);

    return response.data;
  }

  async list<T>(namespace: string): Promise<Required<T>[]> {
    const response: { data: Required<T>[] } = await axios.get(`/api/${namespace}`);

    return response.data;
  }

  async create<T>(namespace: string, values: Required<T>): Promise<Required<T>> {
    const response: { data: Required<T> } = await axios.post(`/api/${namespace}`, values);

    return response.data;
  }

  async update<T>(namespace: string, uuid: string, values: Required<T>): Promise<Required<T>> {
    const response: { data: Required<T> } = await axios.put(`/api/${namespace}/${uuid}`, values);

    return response.data;
  }

  async remove<T>(namespace: string, uuid: string): Promise<void> {
    await axios.delete(`/api/${namespace}/${uuid}`);
  }
}
