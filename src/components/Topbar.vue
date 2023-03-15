<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <div>
        <router-link class="navbar-brand" :to="{ name: 'globalFeed' }"
          >Vue App
        </router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'globalFeed' }"
              active-class="active"
            >
              Home
            </router-link>
          </li>
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'globalFeed' }"
                active-class="active"
                exact
              >
                <i class="ion-compose"></i> New Article &nbsp;
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'globalFeed' }"
                active-class="active"
              >
                <i class="ion-gear-a"></i> Settings &nbsp;
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{
                  name: 'globalFeed',
                  params: { slug: currentUser.username },
                }"
                active-class="active"
              >
                <img class="user-pic" :src="currentUser.image" />
                {{ currentUser.username }} &nbsp;
              </router-link>
            </li>
          </template>
          <template v-if="isAnonymous">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'login' }"
                active-class="active"
              >
                Sign in
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'register' }"
                active-class="active"
              >
                Sign up
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { getterTypes } from '@/store/modules/auth';

export default defineComponent({
  name: 'VaTopbar',
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.getters[getterTypes.currentUser]);
    const isLoggedIn = computed(() => store.getters[getterTypes.isLoggedIn]);
    const isAnonymous = computed(() => store.getters[getterTypes.isAnonymous]);

    return {
      isLoggedIn,
      currentUser,
      isAnonymous,
    };
  },
});
</script>

<style scoped></style>
