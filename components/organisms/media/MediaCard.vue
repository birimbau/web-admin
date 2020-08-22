<template>
  <target id="media.uuid" name="media__card">
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
          <div v-if="media.created">
            <v-btn text small color="primary" data-cy="media__download">
              Download
            </v-btn>
            <v-btn text small color="error" data-cy="media__remove" @click="removeMedia">
              Delete
            </v-btn>
          </div>
          <div v-else>
            <v-btn text small color="error" data-cy="media__upload" @click="media.upload()">
              Upload
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </target>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

import { Concept } from '@/app/models/Concept';
import { Media } from '@/app/models/Media';
import { toOption } from '@/app/utils';
import Target from '@/components/atoms/Target.vue';
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
    Target,
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

  setup(props, { emit }) {
    const roles = Object.values(Media.Role).map(toOption);
    const storages = Object.values(Media.Storage).map(toOption);
    const preview = computed(() => Component[props.concept.type]);

    const removeMedia = async () => {
      await props.media.remove();
      emit('remove');
    };

    return {
      roles,
      storages,
      preview,
      removeMedia,
    };
  },
});
</script>
