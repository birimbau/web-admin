
import { ref, Ref, computed } from '@vue/composition-api';
import { AbstractClient } from '~/app/api/AbstractClient';
import { HttpClient } from '~/app/api/HttpClient';
import { AwsClient } from '~/app/api/aws/AwsClient';

const http = new HttpClient();
const aws = new AwsClient();

export const clientName: Ref<string> = ref(window.localStorage.getItem('PHOTION_INTEGRATION') || '');

export const client = computed((): AbstractClient => {
  if (clientName.value === 'aws') {
    return aws;
  }

  return http;
});
