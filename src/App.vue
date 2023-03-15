<template>
  <va-topbar />
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { actionTypes } from '@/store/modules/auth';
import { useStore } from 'vuex';

import VaTopbar from '@/components/Topbar';

export default defineComponent({
  name: 'VaApp',
  components: {
    VaTopbar,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(actionTypes.getCurrentUser);
    });
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
