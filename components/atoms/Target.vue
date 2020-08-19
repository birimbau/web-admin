<template>
  <div :id="`${name}__${id}`" :target-name="name" :target-id="id">
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
