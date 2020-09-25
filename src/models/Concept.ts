
import dayjs from 'dayjs';

import { modelize, ModelProps } from '~/src/models/Model';
import { FileCategory } from '~/src/files/metadata';


export interface ConceptProps extends ModelProps {
  name?: string;
  description?: string;
  type: FileCategory;
  projects?: string[];
  tags?: string[];
  date?: string;
  public?: boolean;
  featured?: boolean;
}

export interface Concept extends Required<ConceptProps> {}

const namespace = 'concepts';
const fields: Array<keyof ConceptProps> = ['uuid', 'name', 'description', 'type', 'projects', 'tags', 'date', 'public', 'featured'];

export class Concept extends modelize<ConceptProps>(namespace, fields) {
  static Type = FileCategory;

  constructor(props: ConceptProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
    this.type = props.type;
    this.projects = props.projects ?? [];
    this.tags = props.tags ?? [];
    this.date = props.date ?? dayjs().format('YYYY-MM-DD');
    this.public = props.public ?? false;
    this.featured = props.featured ?? false;
  }
}
