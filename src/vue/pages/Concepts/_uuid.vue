<template>
  <div>
    <h2>Fragment</h2>
    <target :id="concept.uuid" name="fragment__detail">
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
          <v-row>
            <v-col cols="6">
              <v-switch v-model="concept.public" class="mx-2" label="Public" name="concept__public" />
            </v-col>
            <v-col cols="6">
              <v-switch v-model="concept.featured" class="mx-2" label="Featured" name="concept__featured" />
            </v-col>
          </v-row>
          <div v-if="concept.created">
            <v-btn
              small
              text
              color="primary"
              data-cy="concept__save"
              @click="concept.save()">
              Save Concept
            </v-btn>
            <v-btn
              small
              text
              color="error"
              data-cy="concept__remove"
              @click="concept.remove()">
              Delete Concept
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              small
              text
              color="primary"
              data-cy="concept__create"
              @click="concept.save()">
              Create Concept
            </v-btn>
          </div>
        </v-col>
        <v-col v-if="concept.created" cols="12" sm="6">
          <v-file-input
            id="concept__file"
            v-model="file"
            show-size
            label="Add fragment"
            name="concept__file" />
          <fragment-card
            v-for="fragment in fragments"
            :key="fragment.uuid"
            :concept="concept"
            :fragment="fragment"
            @remove="removeFragment(fragment)" />
        </v-col>
      </v-row>
    </target>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from '@vue/composition-api';

import { Concept } from '~/src/models/Concept';
import { Fragment } from '~/src/models/Fragment';
import { Project } from '~/src/models/Project';

import { router } from '~/src/vue/router';
import Target from '~/src/vue/components/atoms/Target.vue';
import DatePicker from '~/src/vue/components/atoms/DatePicker.vue';
import FragmentCard from '~/src/vue/components/organisms/fragments/FragmentCard.vue';
import { SelectOption, toOption } from '~/src/utils';


export default defineComponent({

  components: {
    DatePicker,
    FragmentCard,
    Target,
  },

  setup() {

    const file = ref<File | null>(null);
    const concept = ref(new Concept({ type: Concept.Type.IMAGE }));
    const fragments = ref<Fragment[]>([]);
    const projects = ref<SelectOption[]>([]);

    const removeFragment = (fragment: Fragment) => {
      const index = fragments.value.findIndex(el => el.uuid === fragment.uuid);

      if (index > -1) {
        fragments.value.splice(index, 1);
      }
    };

    onBeforeMount(async () => {
      if (router.currentRoute.params.uuid !== 'new') {
        concept.value = await Concept.retrieve(router.currentRoute.params.uuid as string);

        (await Fragment.list())
          .forEach(fragment => fragments.value.push(fragment));
      }

      (await Project.list())
        .map((project): SelectOption => ({ value: project.uuid, text: project.name }))
        .forEach(option => projects.value.push(option));
    });

    watch(file, async () => {
      if (file.value) {
        const fragment = new Fragment({ concept: concept.value.uuid });
        await fragment.setFile(file.value);

        fragments.value.unshift(fragment);

        file.value = null;
      }
    });

    return {
      file,
      concept,
      fragments,
      projects,
      types: Object.values(Concept.Type).map(toOption),
      removeFragment,
    };
  },
});
</script>
