<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'VaValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const errorMessages = computed(() => {
      return Object.keys(props.validationErrors).map((name) => {
        return props.validationErrors[name].join(',');
      });
    });

    return {
      errorMessages,
    };
  },
});
</script>

<style scoped></style>
