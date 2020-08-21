import { v4 } from 'uuid';

/**
 * Defines a field.
 */
export interface FieldOptions<T> {
  name: string,
  required: boolean,
  generator: () => T,
};

/**
 * Defines a collection
 * of fields.
 */
export type FieldCollection<T> = {
  [K in keyof Required<T>]: FieldOptions<T[K]>
}

/**
 * Builds a field.
 *
 * @param name
 * @param generator
 * @param required
 */
export const field = <T>(name: string, generator: (() => T) | null = null) => {
  const out = {
    name,
    required: Boolean(generator),
    generator: generator || ((): never => { throw new Error(`Field '${name}' is required.`); }),
  };

  return out;
};


/**
 * Props for the Model
 */
export interface ModelProps {
  uuid?: string;
}

/**
 * Model Interface
 */
export interface Model<T extends ModelProps> extends Required<ModelProps> {}

/**
 * Model base class
 */
export class Model<T extends ModelProps> {
  public static namespace = 'models';

  public static fields: FieldCollection<Required<ModelProps>> = {
    uuid: field('uuid', () => v4()),
  }

  public created: boolean;

  constructor(props: T) {
    this.created = Boolean(props.uuid);

    const fields = (this.constructor as typeof Model).fields;

    Object.entries(fields).forEach((entry) => {
      const key = entry[0] as keyof Required<T>;
      const options = entry[1];

      if (key in props) {
        Object.defineProperty(this, key, props[name]);
      } else if ('generator' in options) {
        Object.defineProperty(this, key, options.generator());
      } else {
        throw new Error(`${key} is required field.`);
      }
    });
  }

  get $values(): Required<T> {
    const keys = Object.keys((this.constructor as typeof Model).fields);
    const entries = keys.map(key => [key, this[key as keyof ThisType<T>]]);

    return Object.fromEntries(entries);
  }
}
