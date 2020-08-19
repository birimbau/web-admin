<template>
  <div>
    <h2>Media</h2>
    <target :id="concept.uuid" name="media__detail">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="concept.name" type="text" name="concept__name" label="Name" />
          <v-text-field v-model="concept.description" type="text" name="concept__description" label="Description" />
          <date-picker v-model="concept.date" label="Date" name="concept__date" />
          <v-file-input show-size label="Add media" @input.native="addMedia" />
        </v-col>
      </v-row>
    </target>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';

import { Concept } from '@/app/models/Concept';
import { Media } from '@/app/models/Media';

import Target from '@/components/atoms/Target.vue';
import DatePicker from '@/components/atoms/DatePicker.vue';

export const addMedia = (state, $event: any) => {
  if (!$event.target || !$event.target.files) {
    return;
  }

  const file = $event.target.files[0];
  $event.target.value = '';

  console.log(file);
};

export default defineComponent({

  components: {
    DatePicker,
    Target,
  },

  async setup() {
    const context = useContext();

    let conceptData = {};
    let mediasData = [];

    if (context.route.value.params.uuid) {
      conceptData = (await axios.get('/api/concept')).data;
      mediasData = (await axios.get('/api/media')).data;
    }

    const concept = ref(new Concept(conceptData));
    const medias = mediasData.map((media: Media) => ref(new Media(media)));
    const conceptRequest = await axios.get('/api/concept');
    const mediaRequest = await axios.get('/api/media');

    return {
      concept,
      medias,
      addMedia,
    };
  },
});
</script>
