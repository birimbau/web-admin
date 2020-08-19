import axios from 'axios';

import { Concept, ConceptInterface } from '@/app/models/Concept';
import { media } from '@/hooks/state';
import { Project } from '@/types/models.interface';


export const loadState = async () => {
  const response = await axios.get('/api');

  if (response.data.projects) {
    response.data.projects.forEach((project: Project) => {
      media.value.projects[project.uuid] = project;
    });
  }

  if (response.data.concepts) {
    response.data.concepts.forEach((concept: ConceptInterface) => {
      media.value.concepts[concept.uuid] = new Concept(concept);
    });
  }
};

export default async () => {
  await loadState();
};
