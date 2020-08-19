<template>
  <v-card outlined class="mb-5">
    <v-row>
      <v-col cols="4">
        <component :is="preview" :concept="concept" :media="media" />
      </v-col>
      <v-col col="8">
        <div>
          <v-select v-model="media.role" label="Role" :items="roles" />
          <v-select v-model="media.storage" label="Storage" :items="storages" />
        </div>
        <div>
          <v-btn text small color="primary">
            Download
          </v-btn>
          <v-btn text small color="error">
            Delete
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

import { Concept } from '@/app/models/Concept';
import { Media } from '@/app/models/Media';
import { toOption } from '@/app/utils';
import ImagePreview from '@/components/organisms/media/ImagePreview.vue';
import SoundPreview from '@/components/organisms/media/SoundPreview.vue';
import VideoPreview from '@/components/organisms/media/VideoPreview.vue';

enum Component {
  IMAGE = 'image-preview',
  SOUND = 'sound-preview',
  VIDEO = 'video-preview',
};

export default defineComponent({

  components: {
    ImagePreview,
    SoundPreview,
    VideoPreview,
  },

  props: {
    concept: {
      type: Concept,
      required: true,
    },
    media: {
      type: Media,
      required: true,
    },
  },

  setup(props) {
    const roles = Object.values(Media.Role).map(toOption);
    const storages = Object.values(Media.Storage).map(toOption);
    const preview = computed(() => Component[props.concept.type]);

    return {
      roles,
      storages,
      preview,
    };
  },
});
</script>
