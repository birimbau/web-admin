<template>
  <div>
    <h2>Media</h2>
    <target :id="concept.uuid" name="media__detail">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="concept.name" type="text" name="concept__name" label="Name" />
          <v-text-field v-model="concept.description" type="text" name="concept__description" label="Description" />
          <v-select v-model="concept.type" label="Type" :items="types" name="concept__type" />
          <date-picker v-model="concept.date" label="Date" name="concept__date" />
          <div v-if="concept.created">
            <v-file-input id="concept__file" v-model="file" show-size label="Add media" name="concept__file" />
            <v-btn small text color="error" data-cy="concept__remove" @click="client.remove(concept)">
              Delete Concept
            </v-btn>
          </div>
          <div v-else>
            <v-btn small text color="primary" data-cy="concept__create" @click="client.create(concept)">
              Create Concept
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <media-card v-for="media in medias" :key="media.value.uuid" :concept="concept" :media="media.value" />
        </v-col>
      </v-row>
    </target>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Ref } from '@vue/composition-api';
import { defineComponent, ref, useContext, onBeforeMount, watch } from '@nuxtjs/composition-api';

import { client } from '@/hooks/api';
import { Concept } from '@/app/models/Concept';
import { Media, IMedia } from '@/app/models/Media';

import Target from '@/components/atoms/Target.vue';
import DatePicker from '@/components/atoms/DatePicker.vue';
import MediaCard from '@/components/organisms/media/MediaCard.vue';
import { toOption } from '@/app/utils';

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

    const file: Ref<any> = ref(null);
    const concept = ref(new Concept({ type: Concept.Type.IMAGE }));
    const medias: Array<Ref<Media>> = [];

    onBeforeMount(async () => {
      if (context.route.value.params.uuid) {
        const conceptResponse = await axios.get('/api/concept');
        const mediasResponse = await axios.get('/api/medias');

        concept.value = new Concept(conceptResponse.data);
        mediasResponse.data.forEach((props: IMedia) => {
          const media = new Media(props);
          medias.push(ref(media));
        });
      };
    });

    watch(file, async () => {
      if (file.value) {
        const data = await readFile(file.value);

        const media = new Media({
          concept: concept.value.uuid,
          data,
        });
        medias.unshift(ref(media));

        file.value = null;
      }
    });

    return {
      client,
      concept,
      medias,
      file,
      types: Object.values(Concept.Type).map(toOption),
    };
  },
});
</script>
