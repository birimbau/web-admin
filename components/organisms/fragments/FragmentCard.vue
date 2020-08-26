<template>
  <target id="fragment.uuid" name="fragment__card">
    <v-card outlined class="mb-5">
      <v-row>
        <v-col cols="4">
          <component :is="preview" :concept="concept" :fragment="fragment" />
        </v-col>
        <v-col cols="8">
          <div>
            <v-text-field disabled :value="fragment.meta.filename" label="Original Filename" />
            <v-select v-model="fragment.meta.storage" label="Storage" :items="storages" :disabled="fragment.created" />
            <v-text-field v-model="fragment.notes" label="Notes (Optional)" data-cy="fragment__notes" />
          </div>
          <div v-if="fragment.created">
            <v-btn text small color="primary" data-cy="fragment__download" @click="fragment.save()">
              Save
            </v-btn>
            <v-btn text small color="success" data-cy="fragment__download">
              Download
            </v-btn>
            <v-btn text small color="error" data-cy="fragment__remove" @click="removeFragment">
              Delete
            </v-btn>
          </div>
          <div v-else>
            <v-btn text small color="error" data-cy="fragment__upload" @click="fragment.upload()">
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
import { Fragment } from '@/app/models/Fragment';
import { FileStorage } from '@/app/models/Model';
import { toOption } from '@/app/utils';
import Target from '@/components/atoms/Target.vue';
import ImagePreview from '@/components/organisms/fragments/ImagePreview.vue';
import SoundPreview from '@/components/organisms/fragments/SoundPreview.vue';
import VideoPreview from '@/components/organisms/fragments/VideoPreview.vue';

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
    fragment: {
      type: Fragment,
      required: true,
    },
  },

  setup(props, { emit }) {
    const storages = Object.values(FileStorage).map(toOption);
    const preview = computed(() => Component[props.concept.type]);

    const removeFragment = async () => {
      await props.fragment.remove();
      emit('remove');
    };

    return {
      storages,
      preview,
      removeFragment,
    };
  },
});
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
