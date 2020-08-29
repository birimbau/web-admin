import { ref, Ref, computed } from '@vue/composition-api';

import { Concept } from '@/app/models/Concept';
import { Project } from '@/app/models/Project';
import { Fragment } from '@/app/models/Fragment';

import { AbstractClient } from '@/app/api/AbstractClient';
import { HttpClient } from '@/app/api/HttpClient';
import { AwsClient } from '@/app/api/aws/AwsClient';
import { username } from '@/hooks/encryption';
import { secrets } from '@/hooks/secrets';

export const fragment: Ref<{
  concepts: { [key: string]: Concept },
  fragment: { [key: string]: Fragment },
  projects: { [key: string]: Project },
}> = ref({
  concepts: {},
  fragment: {},
  projects: {},
});

export const site = ref({
  domain: '',
  title: '',
  description: '',
});

export const user = ref({
  name: '',
  email: '',
  bio: '',
});

export const useState = () => ({
  fragment,
  site,
  user,
});

// Services
export interface Service {
  name: string;
  logo: string;
  slug: string;
  description: string;
};

export const aws: Service = {
  name: 'Amazon Web Services',
  logo: '/logos/aws.svg',
  slug: 'aws',
  description: 'Use your own S3 bucket to store files; DynamoDB will be used to keep track of your metadata.',
};

export const gcp: Service = {
  name: 'Google Cloud Platform',
  logo: '/logos/gcp.png',
  slug: 'gcp',
  description: 'Use Google Cloud Storage for your files; Firestore will be used to keep track of your metadata.',
};

export const googleDrive: Service = {
  name: 'Google Drive',
  logo: '/logos/googleDrive.svg',
  slug: 'googleDrive',
  description: 'Store your files on Google Drive. Google Sheet will be used as database for your metadata.',
};


export const services = {
  aws,
  gcp,
  googleDrive,
};


/**
 * Tracks the current client name.
 */
export const clientName = ref(window.localStorage.getItem('PHOTION_INTEGRATION') || '');

export const currentService = computed(() => {
  if (!clientName.value || clientName.value === 'http') {
    return null;
  }

  if (clientName.value in services) {
    return services[clientName.value as keyof typeof services];
  }

  return null;
});

/**
 * Tracks the current client.
 */
export const client = computed((): AbstractClient => {
  if (clientName.value === 'aws') {
    return new AwsClient({
      username: username.value,
      region: secrets.values.AWS_REGION.value,
      accessKeyId: secrets.values.AWS_ACCESS_KEY_ID.value,
      secretAccessKey: secrets.values.AWS_SECRET_ACCESS_KEY.value,
    });
  }

  return new HttpClient();
});
