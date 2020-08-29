import { ref } from '@vue/composition-api';
import { handler, creds } from '@/hooks/encryption';


export enum Secrets {
  AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID',
  AWS_REGION = 'AWS_REGION',
  AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY',
  GCP_API_KEY = 'GCP_API_KEY',
  GCP_API_SECRET = 'GCP_API_SECRET',
}

export const PHOTION_SESSION_CREDENTIALS = 'PHOTION_SESSION_CREDENTIALS';

export const secrets = {
  values: {
    AWS_ACCESS_KEY_ID: ref(''),
    AWS_REGION: ref('eu-west-1'),
    AWS_SECRET_ACCESS_KEY: ref(''),
    GCP_API_KEY: ref(''),
    GCP_API_SECRET: ref(''),
  },

  entries: () => Object.entries(secrets.values),

  list: () => Object.values(secrets.values),

  serialize: () => secrets.entries().map(([key, obj]) => [key, obj.value]),

  deserialize: (payload: { secrets: string[][] }) => {
    payload.secrets.forEach(([key, value]) => {
      const secret = secrets.values[key as Secrets];

      if (secret) {
        secret.value = value;
        return true;
      }

      return false;
    });
  },

  save: async () => {
    const serialized = secrets.serialize();
    window.sessionStorage.setItem(PHOTION_SESSION_CREDENTIALS, JSON.stringify(serialized));

    await handler.save({ password: creds.value }, { secrets: secrets.serialize() });
  },

  load: async () => {
    const payload = await handler.load({ password: creds.value }) as { secrets: string[][] };
    window.sessionStorage.setItem(PHOTION_SESSION_CREDENTIALS, JSON.stringify(payload.secrets));
    secrets.deserialize(payload);
  },

  init: () => {
    const encoded = window.sessionStorage.getItem(PHOTION_SESSION_CREDENTIALS);

    if (encoded) {
      return secrets.deserialize({ secrets: JSON.parse(encoded) });
    }

    return false;
  },
};
