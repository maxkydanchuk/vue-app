<template>
  <div>
    <div v-if="isLoading">Loading..</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
              class="author"
              >{{ article.author.username }}
            </router-link>
            <span class="date"> {{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">add to favs</div>
        </div>
        <router-link
          :to="{
            name: 'article',
            params: { slug: article.slug },
          }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="(tag, index) in article.tagList"
              :key="index"
            >
              {{ tag }}
            </li>
          </ul>
        </router-link>
      </div>
      <va-pagination
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        :url="url"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { actionTypes as actionTypes } from '@/store/modules/feed';
import { useStore } from 'vuex';
import VaPagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'VaFeed',
  components: {
    VaPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    onMounted(() => {
      store.dispatch(actionTypes.getFeed, { apiUrl: props.apiUrl });
    });

    const isLoading = computed(() => {
      return store.state.feed.isLoading;
    });
    const feed = computed(() => {
      return store.state.feed.data;
    });
    const error = computed(() => {
      return store.state.error;
    });

    const total = ref(500);
    const limit = ref(10);
    const currentPage = ref(5);
    const url = ref('/tags/dragons');
    return {
      isLoading,
      feed,
      error,
      total,
      limit,
      currentPage,
      url,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.container page) {
  width: 100%;
}
</style>
