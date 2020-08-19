import { Model, IModelProps } from '@/app/models/Model';


export enum MediaType {
  IMAGE = 'IMAGE',
  SOUND = 'SOUND',
  VIDEO = 'VIDEO',
}

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
  type: MediaType;
  role?: MediaRole;
  storage?: MediaStorage;
}

export interface IMedia extends Required<IMediaProps> {}
export interface Media extends IMedia {}

export class Media extends Model<IMediaProps> {
  constructor(props: IMediaProps) {
    super(props);
    this.concept = props.concept || '';
    this.type = props.type || MediaType.IMAGE;
    this.role = props.role || MediaRole.PREVIEW;
    this.storage = props.storage || MediaStorage.FREQUENT_ACCESS;
  }
}
