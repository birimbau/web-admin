import { ref } from '@vue/composition-api';


export const media = ref({
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
