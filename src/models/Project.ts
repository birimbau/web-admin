
import { modelize, ModelProps } from '~/src/models/Model';

export interface ProjectProps extends ModelProps {
  name?: string;
  description?: string;
}

export interface Project extends Required<ProjectProps> {}


export class Project extends modelize<ProjectProps>('projects', ['uuid', 'name', 'description']) {
  constructor(props: ProjectProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
  }
}
