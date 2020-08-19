import { Model, IModelProps } from '@/app/models/Model';


export enum MediaRole {
  PREVIEW = 'PREVIEW',
  FULL_QUALITY = 'FULL_QUALITY',
  RAW = 'RAW',
}

export enum MediaStorage {
  FREQUENT_ACCESS = 'FREQUENT_ACCESS',
  INFREQUENT_ACCESS = 'INFREQUENT_ACCESS',
  ARCHIVE = 'ARCHIVE',
}

export interface IMediaProps extends IModelProps {
  concept: string;
  role?: MediaRole;
  storage?: MediaStorage;
  data: string;
}

export interface IMedia extends Required<IMediaProps> {}
export interface Media extends IMedia {}

export class Media extends Model<IMediaProps> {
  static Role = MediaRole;
  static Storage = MediaStorage;
  file: any;

  constructor(props: IMediaProps) {
    super(props);
    this.concept = props.concept || '';
    this.role = props.role || MediaRole.PREVIEW;
    this.storage = props.storage || MediaStorage.FREQUENT_ACCESS;
    this.data = props.data;
  }
}
