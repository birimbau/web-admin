<template>
  <div>
    <h2>Media</h2>
    <target :id="concept.uuid" name="media__detail">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="concept.name" type="text" name="concept__name" label="Name" />
          <v-text-field v-model="concept.description" type="text" name="concept__description" label="Description" />
          <v-select v-model="concept.type" label="Type" :items="types" name="concept__type" />
          <v-select
            v-model="concept.projects"
            label="Projects"
            :items="projects"
            name="concept__projects"
            data-cy="concept__projects"
            :menu-props="{ closeOnContentClick: true }"
            multiple
            small-chips
          />
          <v-combobox
            id="concept__tags"
            v-model="concept.tags"
            label="Tags"
            name="concept__tags"
            multiple
            small-chips
          />
          <date-picker v-model="concept.date" label="Date" name="concept__date" />
          <div v-if="concept.created">
            <v-btn small text color="error" data-cy="concept__remove" @click="concept.remove()">
              Delete Concept
            </v-btn>
          </div>
          <div v-else>
            <v-btn small text color="primary" data-cy="concept__create" @click="concept.save()">
              Create Concept
            </v-btn>
          </div>
        </v-col>
        <v-col v-if="concept.created" cols="12" sm="6">
          <v-file-input id="concept__file" v-model="file" show-size label="Add media" name="concept__file" />
          <media-card v-for="media in medias" :key="media.uuid" :concept="concept" :media="media" @remove="removeMedia(media)" />
        </v-col>
      </v-row>
    </target>
  </div>
</template>


<script lang="ts">
import { defineComponent, useContext, ref, onBeforeMount, watch } from '@nuxtjs/composition-api';

import { Concept } from '@/app/models/Concept';
import { Media } from '@/app/models/Media';
import { Project } from '@/app/models/Project';

import Target from '@/components/atoms/Target.vue';
import DatePicker from '@/components/atoms/DatePicker.vue';
import MediaCard from '@/components/organisms/media/MediaCard.vue';
import { SelectOption, toOption } from '@/app/utils';

export const readFile = async (file: File): Promise<string> => {
  const fr = new FileReader();

  const url = await new Promise((resolve) => {
    fr.onload = () => resolve(fr.result);
    fr.readAsDataURL(file);
  });

  return url as string;
};


export default defineComponent({

  components: {
    DatePicker,
    MediaCard,
    Target,
  },

  setup() {
    const context = useContext();

    const file = ref<any>(null);
    const concept = ref(new Concept({ type: Concept.Type.IMAGE }));
    const medias = ref<Media[]>([]);
    const projects = ref<SelectOption[]>([]);

    const addMedia = (media: Media) => medias.value.unshift(media);

    const removeMedia = (media: Media) => {
      const index = medias.value.findIndex(el => el.uuid === media.uuid);

      if (index > -1) {
        medias.value.splice(index, 1);
      }
    };

    onBeforeMount(async () => {
      if (context.route.value.params.uuid) {
        concept.value = await Concept.retrieve(context.route.value.params.uuid);

        (await Media.list())
          .forEach(media => medias.value.push(media));
      };

      (await Project.list())
        .map((project): SelectOption => ({ value: project.uuid, text: project.name }))
        .forEach(option => projects.value.push(option));
    });

    watch(file, async () => {
      if (file.value) {
        const data = await readFile(file.value);

        const media = new Media({
          concept: concept.value.uuid,
          data,
        });

        addMedia(media);

        file.value = null;
      }
    });

    return {
      file,
      concept,
      medias,
      projects,
      types: Object.values(Concept.Type).map(toOption),
      addMedia,
      removeMedia,
    };
  },
});
</script>
