
import { ref, Ref, computed } from '@vue/composition-api';
import { HttpClient } from '~/app/api/HttpClient';

export enum Clients {
  '' = 'http',
  http = 'http',
}

type Client = keyof typeof Clients;

const http = new HttpClient();

export const clients = {
  '': http,
  http,
};

export const clientName: Ref<Client> = ref('');

export const client = computed(() => clients[clientName.value]);
