import { v4 } from 'uuid';


export interface IModelProps {
  uuid?: string;
}
export interface IModel extends Required<IModelProps> {}

export interface Model<T extends IModelProps> extends IModel {}

export class Model<T extends IModelProps> {
  constructor(props: T) {
    this.uuid = props.uuid || v4();
  }
}
