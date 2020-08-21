import { Model, ModelProps, FieldCollection, field } from '@/app/models/Model';


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

export class Media extends Model<MediaProps> {
  static namespace = 'medias';

  static Role = MediaRole;
  static Storage = MediaStorage;

  static fields: FieldCollection<Required<MediaProps>> = {
    ...Model.fields,
    concept: field('concept', () => ''),
    role: field('role', () => MediaRole.PREVIEW),
    storage: field('storage', () => MediaStorage.FREQUENT_ACCESS),
    data: field('data'),
  }

  file: any;
}
