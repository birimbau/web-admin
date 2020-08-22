import { modelize, ModelProps } from '@/app/models/Model';


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

export interface MediaProps extends ModelProps {
  concept: string;
  role?: MediaRole;
  storage?: MediaStorage;
  data: string;
}

export interface Media extends Required<MediaProps> {}

export class Media extends modelize<MediaProps>('medias', ['uuid', 'concept', 'role', 'storage', 'data']) {
  static Role = MediaRole;
  static Storage = MediaStorage;

  file: any;

  constructor(props: MediaProps) {
    super(props);
    this.concept = props.concept;
    this.role = props.role ?? MediaRole.PREVIEW;
    this.storage = props.storage ?? MediaStorage.FREQUENT_ACCESS;
    this.data = props.data;
  }
}
