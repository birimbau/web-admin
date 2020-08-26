
import { ref, Ref, computed } from '@vue/composition-api';
import { AbstractClient } from '~/app/api/AbstractClient';
import { HttpClient } from '~/app/api/HttpClient';
import { AwsClient } from '~/app/api/aws/AwsClient';
import { secrets } from '~/hooks/secrets';


/**
 * Tracks the current client name.
 */
export const clientName: Ref<string> = ref(window.localStorage.getItem('PHOTION_INTEGRATION') || '');

/**
 * Tracks the current client.
 */
export const client = computed((): AbstractClient => {
  if (clientName.value === 'aws') {
    return new AwsClient({
      region: secrets.values.AWS_REGION.value,
      accessKeyId: secrets.values.AWS_ACCESS_KEY_ID.value,
      secretAccessKey: secrets.values.AWS_SECRET_ACCESS_KEY.value,
    });
  }

  return new HttpClient();
});
