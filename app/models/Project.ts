
import { Model, ModelProps, FieldCollection, field } from '@/app/models/Model';

export interface ProjectProps extends ModelProps {
  name?: string;
  description?: string;
}

export interface Project extends Required<ProjectProps> {}


export class Project extends Model<ProjectProps> {
  static namespace = 'projects'

  static fields: FieldCollection<Required<ProjectProps>> = {
    ...Model.fields,
    name: field('name', () => ''),
    description: field('description', () => ''),
  };
}
