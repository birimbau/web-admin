import axios from 'axios';

import { media } from '@/hooks/state';
import { Concept, Project } from '@/types/models.interface';


export const loadState = async () => {
  const response = await axios.get('/api');

  if (response.data.projects) {
    response.data.projects.forEach((project: Project) => {
      media.value.projects[project.uuid] = project;
    });
  }

  if (response.data.concepts) {
    response.data.concepts.forEach((concept: Concept) => {
      media.value.concepts[concept.uuid] = concept;
    });
  }
};

export default async () => {
  await loadState();
};
