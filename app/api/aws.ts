
import { Client } from '@/app/api/api';


export class AWS extends Client {
  static provider = 'aws';
}


export const aws = new AWS();
