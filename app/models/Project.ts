
import { Model, IModelProps } from '@/app/models/Model';

export interface IProjectProps extends IModelProps {
  name?: string;
  description?: string;
}

export interface IProject extends Required<IProjectProps> {}
export interface Project extends IProject {}


export class Project extends Model<IProjectProps> {
  constructor(props: IProjectProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
  }
}
