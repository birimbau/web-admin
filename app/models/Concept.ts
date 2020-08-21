
import moment from 'moment';

import { Model, ModelProps, FieldCollection, field } from '@/app/models/Model';

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

export class Concept extends Model<ConceptProps> {
  static namespace = 'concepts'
  static Type = ConceptType;

  static fields: FieldCollection<Required<ConceptProps>> = {
    ...Model.fields,
    name: field('name', () => ''),
    description: field('description', () => ''),
    type: field('type'),
    date: field('date', () => moment().format('YYYY-MM-DD')),
  }
}
