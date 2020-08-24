import { modelize, ModelProps } from '@/app/models/Model';


export enum FragmentRole {
  PREVIEW = 'PREVIEW',
  FULL_QUALITY = 'FULL_QUALITY',
  RAW = 'RAW',
}

export enum FragmentStorage {
  FREQUENT_ACCESS = 'FREQUENT_ACCESS',
  INFREQUENT_ACCESS = 'INFREQUENT_ACCESS',
  ARCHIVE = 'ARCHIVE',
}

export interface FragmentProps extends ModelProps {
  concept: string;
  role?: FragmentRole;
  storage?: FragmentStorage;
  data: string;
}

export interface Fragment extends Required<FragmentProps> {}

const namespace = 'fragments';
const fields: Array<keyof FragmentProps> = ['uuid', 'concept', 'role', 'storage', 'data'];

export class Fragment extends modelize<FragmentProps>(namespace, fields) {
  static Role = FragmentRole;
  static Storage = FragmentStorage;

  file: any;

  constructor(props: FragmentProps) {
    super(props);
    this.concept = props.concept;
    this.role = props.role ?? FragmentRole.PREVIEW;
    this.storage = props.storage ?? FragmentStorage.FREQUENT_ACCESS;
    this.data = props.data;
  }

  async upload(file: any = null) {
    // save for the latest metadata
    await this.save();
    await this.client.uploadFile(namespace, this.uuid, this.$values, file || this.file);
  }
}
