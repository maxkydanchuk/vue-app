<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Need an account?</router-link>
          </p>
          <va-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              :disabled="isSubmitted"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import VaValidationErrors from '@/components/UI/ValidationErros';
import { actionTypes } from '@/store/modules/auth';

export default defineComponent({
  name: 'VaLogin',
  components: {
    VaValidationErrors,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const onSubmit = () => {
      store
        .dispatch(actionTypes.login, {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          router.push({ name: 'globalFeed' });
        });
    };

    const isSubmitted = computed(() => {
      return store.state.auth.isSubmitted;
    });

    const validationErrors = computed(() => {
      return store.state.auth.validationErrors;
    });

    return {
      onSubmit,
      isSubmitted,
      email,
      password,
      validationErrors,
    };
  },
});
</script>

<style scoped></style>
