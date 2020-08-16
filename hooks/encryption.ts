import { ref } from '@vue/composition-api';
import { LocalStorageHandler } from 'keylocal/dist/storage/localStorage';
import { PasswordHandler } from 'keylocal/dist/strategy/pgp/password';


export const key = 'PHOTION_SECRETS_STORAGE_KEY';

export const strategy = new PasswordHandler();

export const handler = new LocalStorageHandler(key, {
  strategy,
  localStorage: window.localStorage,
});

export const password = ref('');

export const encrypt = (plaintext: string): Promise<string> => strategy.encrypt({ password: password.value }, plaintext);

export const decrypt = (encrypted: string): Promise<string> => strategy.decrypt({ password: password.value }, encrypted);

export const useEncryption = () => ({
  key,
  strategy,
  handler,
  password,
  encrypt,
  decrypt,
});
