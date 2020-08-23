
import moment from 'moment';

import { modelize, ModelProps } from '@/app/models/Model';

export enum ConceptType {
  IMAGE = 'IMAGE',
  SOUND = 'SOUND',
  VIDEO = 'VIDEO',
}

export interface ConceptProps extends ModelProps {
  name?: string;
  description?: string;
  type: ConceptType;
  projects?: string[];
  tags?: string[];
  date?: string;
}

export interface Concept extends Required<ConceptProps> {}

const namespace = 'concepts';
const fields: Array<keyof ConceptProps> = ['uuid', 'name', 'description', 'type', 'projects', 'tags', 'date'];

export class Concept extends modelize<ConceptProps>(namespace, fields) {
  static Type = ConceptType;

  constructor(props: ConceptProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
    this.type = props.type;
    this.projects = props.projects ?? [];
    this.tags = props.tags ?? [];
    this.date = props.date ?? moment().format('YYYY-MM-DD');
  }
}
