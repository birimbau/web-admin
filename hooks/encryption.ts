import { ref, computed } from '@vue/composition-api';
import { LocalStorageHandler, PasswordHandler } from 'keylocal';


export const key = 'PHOTION_SECRETS_STORAGE_KEY';

export const strategy = new PasswordHandler();

export const handler = new LocalStorageHandler(key, {
  strategy,
  localStorage: window.localStorage,
});

export const username = ref(window.sessionStorage.getItem('PHOTION_USERNAME') || '');

export const password = ref('');

export const creds = computed(() => `${username.value}#${password.value}`);

export const encrypt = (plaintext: string): Promise<string> => strategy.encrypt({ password: creds.value }, plaintext);

export const decrypt = (encrypted: string): Promise<string> => strategy.decrypt({ password: creds.value }, encrypted);

export const useEncryption = () => ({
  key,
  strategy,
  handler,
  password,
  encrypt,
  decrypt,
});
