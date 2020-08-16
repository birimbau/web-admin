<template>
  <div :id="`${name}__${id}`" :data-target-name="name" :data-target-id="id">
    <slot />
  </div>
</template>

<script lang="ts">
export default {

  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
