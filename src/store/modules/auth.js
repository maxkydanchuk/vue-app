import authApi from '@/store/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const state = {
  isSubmitted: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false,
};

export const mutationTypes = {
  registerStart: 'auth/registerStart',
  registerSuccess: 'auth/registerSuccess',
  registerFailure: 'auth/registerFailure',
  loginStart: 'auth/loginStart',
  loginSuccess: 'auth/loginSuccess',
  loginFailure: 'auth/loginFailure',

  getCurrentUserStart: 'auth/getCurrentUserStart',
  getCurrentUserSuccess: 'auth/getCurrentUserSuccess',
  getCurrentUserFailure: 'auth/getCurrentUserFailure',
};

export const actionTypes = {
  register: 'auth/register',
  login: 'auth/login',
  getCurrentUser: 'auth/getCurrentUser',
};

export const getterTypes = {
  currentUser: 'auth/currentUser',
  isLoggedIn: 'auth/isLoggedIn',
  isAnonymous: 'auth/isAnonymous',
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerStart);
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log(result.response.data);
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log(result.response.data);
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getCurrentUser]({ commit }) {
    return new Promise((resolve) => {
      commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          commit(mutationTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitted = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitted = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.validationErrors = payload;
    state.isSubmitted = false;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitted = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitted = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.validationErrors = payload;
    state.isSubmitted = false;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
