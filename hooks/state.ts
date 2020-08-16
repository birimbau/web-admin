import { ref, Ref } from '@vue/composition-api';

import { Project, Concept } from '@/types/models.interface';

export const media: Ref<{
  concepts: {
    [key: string]: Concept,
  },
  projects: {
    [key: string]: Project,
  },
}> = ref({
  concepts: {},
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
