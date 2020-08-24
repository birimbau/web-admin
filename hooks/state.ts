import { ref, Ref } from '@vue/composition-api';

import { Concept } from '@/app/models/Concept';
import { Project } from '@/app/models/Project';
import { Fragment } from '~/app/models/Fragment';

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
