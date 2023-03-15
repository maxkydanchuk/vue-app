<template>
  <ul class="pagination">
    <li v-for="page in pages" :key="page" class="page-item">
      <router-link
        :to="{
          name: 'globalFeed',
          query: { page },
        }"
        class="page-link"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { range } from '@/helpers/utils';

export default defineComponent({
  name: 'VaPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const pageCount = computed(() => {
      return Math.ceil(props.total / props.limit);
    });
    const pages = computed(() => {
      return range(1, pageCount.value);
    });
    return {
      pageCount,
      pages,
    };
  },
});
</script>
