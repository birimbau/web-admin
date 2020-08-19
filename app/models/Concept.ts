
import moment from 'moment';

import { Model, IModelProps } from '@/app/models/Model';

export enum ConceptType {
  IMAGE = 'IMAGE',
  SOUND = 'SOUND',
  VIDEO = 'VIDEO',
}

export interface IConceptProps extends IModelProps {
  name?: string;
  description?: string;
  type: ConceptType,
  date?: string;
}

export interface IConcept extends Required<IConceptProps> {}
export interface Concept extends IConcept {}

export class Concept extends Model<IConceptProps> {
  static Type = ConceptType;

  constructor(props: IConceptProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
    this.type = props.type;
    this.date = props.date ?? moment().format('YYYY-MM-DD');
  }
}
