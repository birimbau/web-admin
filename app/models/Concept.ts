
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
  type: ConceptType,
  date?: string;
}

export interface Concept extends Required<ConceptProps> {}

export class Concept extends modelize<ConceptProps>('concepts', ['uuid', 'name', 'description', 'type', 'date']) {
  static Type = ConceptType;

  constructor(props: ConceptProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
    this.type = props.type;
    this.date = props.date ?? moment().format('YYYY-MM-DD');
  }
}
