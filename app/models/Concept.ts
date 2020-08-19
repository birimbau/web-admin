
import moment from 'moment';

import { Model, IModelProps } from '@/app/models/Model';

export interface IConceptProps extends IModelProps {
  name?: string;
  description?: string;
  date?: string;
}

export interface IConcept extends Required<IConceptProps> {}
export interface Concept extends IConcept {}

export class Concept extends Model<IConceptProps> {
  constructor(props: IConceptProps) {
    super(props);
    this.name = props.name ?? '';
    this.description = props.description ?? '';
    this.date = props.date ?? moment().format('YYYY-MM-DD');
  }
}
