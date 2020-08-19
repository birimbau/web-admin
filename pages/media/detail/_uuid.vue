<template>
  <div>
    <h2>Media</h2>
    <target :id="concept.uuid" name="media__detail">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="concept.name" type="text" name="concept__name" label="Name" />
          <v-text-field v-model="concept.description" type="text" name="concept__description" label="Description" />
          <v-select v-model="concept.type" label="Type" :items="types" />

          <date-picker v-model="concept.date" label="Date" name="concept__date" />
          <v-file-input show-size label="Add media" @input.native="addMedia" />
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
import { defineComponent, ref, useContext, onBeforeMount } from '@nuxtjs/composition-api';

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

    const addMedia = async ($event: any) => {
      if (!$event.target || !$event.target.files) {
        return;
      }
      const data = await readFile($event.target.files[0]);
      $event.target.value = '';

      const media = new Media({
        concept: concept.value.uuid,
        data,
      });


      medias.push(ref(media));

      return media;
    };

    return {
      concept,
      medias,
      addMedia,
      types: Object.values(Concept.Type).map(toOption),
    };
  },
});
</script>
