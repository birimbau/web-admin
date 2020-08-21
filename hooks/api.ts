
import { ref, Ref, computed } from '@vue/composition-api';
import { HttpClient } from '~/app/api/HttpClient';

export enum Clients {
  '' = 'HttpClient',
  HttpClient = 'HttpClient',
}

type Client = keyof typeof Clients;

export const clients = {
  '': HttpClient,
  HttpClient,
};

export const clientName: Ref<Client> = ref('');

export const client = computed(() => clients[clientName.value]);
