<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <va-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import VaFeed from '@/components/Feed.vue';
import { ref } from 'vue';

export default {
  name: 'VaGlobalFeed',
  components: {
    VaFeed,
  },
  setup() {
    const apiUrl = ref('/articles');

    return {
      apiUrl,
    };
  },
};
</script>

<style scoped></style>
