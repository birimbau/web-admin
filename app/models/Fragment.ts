import { modelize, ModelProps, FileMetadata } from '@/app/models/Model';


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
  data?: string;
  meta?: FileMetadata;
}

export interface Fragment extends Required<FragmentProps> {}

const namespace = 'fragments';
const fields: Array<keyof FragmentProps> = ['uuid', 'concept', 'role', 'storage', 'data', 'meta'];

export class Fragment extends modelize<FragmentProps>(namespace, fields) {
  static Role = FragmentRole;
  static Storage = FragmentStorage;

  file: any;

  constructor(props: FragmentProps) {
    super(props);
    this.concept = props.concept;
    this.role = props.role ?? FragmentRole.PREVIEW;
    this.storage = props.storage ?? FragmentStorage.FREQUENT_ACCESS;
    this.data = props.data ?? '';
    this.meta = props.meta ?? { filename: '', mime: '', size: 0 };
  }

  getFileReader() {
    return new FileReader();
  }

  async setFile(file: File) {
    const fr = this.getFileReader();

    this.file = file;

    this.meta.filename = file.name;
    this.meta.size = file.size;
    this.meta.mime = file.type;

    this.data = await new Promise((resolve) => {
      fr.onload = () => resolve(fr.result as string);
      fr.readAsDataURL(file);
    });


    return this.data;
  }

  async upload(file: File | null = null) {
    // save for the latest metadata
    await this.save();

    await this.client.uploadFile(namespace, this.uuid, this.meta, file || this.file);
  }
}
