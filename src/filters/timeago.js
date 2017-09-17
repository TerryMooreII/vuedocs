import moment from 'moment';

const VueTimeagoFilter = {
  install (Vue) {
    Vue.filter('timeago', function (value) {
      return moment(value).fromNow();
    });
  }
};

export default VueTimeagoFilter;
