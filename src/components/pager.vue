<template>
  <nav class="pagination is-small is-centered" role="navigation" aria-label="pagination" v-if="total <= itemsPerPage">
    <a class="pagination-previous" v-if="page > 1" @click="change(-1)">Previous</a>
    <a class="pagination-next" v-if="total === itemsPerPage" @click="change(1)">Next</a>
  </nav>
</template>

<script>
export default {
  name: 'VdPager',
  props: {
    page: {
      type: String,
      required: false,
      default: '1'
    },
    total: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      itemsPerPage: 20
    };
  },
  methods: {
    change (val) {
      let query = this.$route.query;
      query.page = this.page ? parseInt(this.page) + val : 1;

      this.$router.push({
        name: 'articles',
        query
      });
    }
  }
};
</script>


<style scoped>
  .pagination {
    justify-content: center;
  }
</style>
