import { ref, Ref } from '@vue/composition-api';

import { Concept } from '@/app/models/Concept';
import { Media } from '@/app/models/Media';
import { Project } from '@/app/models/Project';

export const media: Ref<{
  concepts: { [key: string]: Concept },
  media: { [key: string]: Media },
  projects: { [key: string]: Project },
}> = ref({
  concepts: {},
  media: {},
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
  media,
  site,
  user,
});
