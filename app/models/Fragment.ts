import { modelize, ModelProps, FileMetadata, FileStorage } from '@/app/models/Model';


export interface FragmentProps extends ModelProps {
  concept: string;
  meta?: FileMetadata;
  notes?: string;
}

export interface Fragment extends Required<FragmentProps> {}

const namespace = 'fragments';
const fields: Array<keyof FragmentProps> = ['uuid', 'concept', 'meta', 'notes'];

export class Fragment extends modelize<FragmentProps>(namespace, fields) {
  data: string = '';
  file: File | null = null;

  constructor(props: FragmentProps) {
    super(props);
    this.concept = props.concept;
    this.meta = props.meta ?? { filename: '', mime: '', size: 0, storage: FileStorage.PREVIEW };
    this.notes = props.notes ?? '';
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

  get url() {
    if (this.meta.storage !== FileStorage.PREVIEW) {
      return null;
    }

    if (this.data) {
      return this.data;
    }

    return this.client.getFileUrl(namespace, this.uuid, this.meta);
  }

  async upload(file: File | null = null) {
    // save for the latest metadata
    await this.save();

    await this.client.uploadFile(namespace, this.uuid, this.meta, file || this.file);
  }

  async remove() {
    await this.client.deleteFile(namespace, this.uuid, this.meta);

    return super.remove();
  }
}
