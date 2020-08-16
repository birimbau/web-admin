import axios from 'axios';

import { media } from '@/hooks/state';
import { Project } from '@/types/models.interface';


export const loadState = async () => {
  const response = await axios.get('/api');

  if (response.data.projects) {
    response.data.projects.forEach((project: Project) => {
      media.value.projects[project.uuid] = project;
    });
  }
};

export default async () => {
  await loadState();
};
