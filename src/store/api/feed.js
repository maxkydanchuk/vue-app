import axios from 'axios';

const getFeed = (url) => {
  return axios.get(url);
};

export default {
  getFeed,
};
