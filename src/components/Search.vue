<template>
  <form @submit.prevent="search">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Search For Article" v-model="q">
      </div>
      <div class="control">
        <a class="button is-info">
          Search
        </a>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'search',

    data () {
      return {
        q: ''
      };
    },
    methods: {
      search () {
        this.$router.push('/' + '?q=' + this.q);
        this.q = '';
      }
    }
  };
</script>


<style scoped>

</style>
