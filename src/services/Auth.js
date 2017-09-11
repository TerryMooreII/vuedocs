import axios from 'axios';

export default {
  login (user) {
    return axios.post('/login', user).then((response) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.id_token}`;

      localStorage.setItem('id_token', response.data.id_token);
      return response.data;
    });
  },
  logout () {
    console.log('called?');
    return axios.get('/logout').then(() => {
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem('id_token');
    });
  }
};
