import { v4 } from 'uuid';

export const fields = {
    UUID: {
        type: 'UUID',
        default: v4,
    },
    BOOLEAN: {
        type: 'BOOLEAN',
        default: () => false,
    },
    STRING: {
        type: 'STRING',
        default: () => '',
    },
};

export const createField = (name, type, options = {}) => {
    const field = fields[type];

    if (!field) {
        throw new Error(`Undefined field type: ${type}.`);
    }

    return {
        name,
        ...field,
        ...options,
    };
};

export const schema = {

    Project: {
        uuid: createField('uuid', 'UUID'),
        name: createField('name', 'STRING'),
        featured: createField('featured', 'BOOLEAN'),
    },
};

export const createModel = (type, props = {}) => {
    const model = schema[type];

    if (!model) {
        throw new Error(`Undefined model type: ${type}`);
    }

    const instance = {};

    Object.values(model).forEach((field) => {
        if (field.name in props) {
            instance[field.name] = props[field.name];
        } else {
            instance[field.name] = field.default();
        }
    });

    return instance;
};
