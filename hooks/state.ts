import { ref, Ref } from '@vue/composition-api';

import { Project } from '@/types/models.interface';

export const media: Ref<{
  projects: {
    [key: string]: Project
  }
}> = ref({
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
