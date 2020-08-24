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

const namespace = 'medias';
const fields: Array<keyof MediaProps> = ['uuid', 'concept', 'role', 'storage', 'data'];

export class Media extends modelize<MediaProps>(namespace, fields) {
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

  async upload(file: any = null) {
    // save for the latest metadata
    await this.save();
    await this.client.uploadFile(namespace, this.uuid, this.$values, file || this.file);
  }
}
