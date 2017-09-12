<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Search For Article" v-model="q">
    </div>
    <div class="control">
      <a class="button is-info" @click="search">
        Search
      </a>
    </div>
  </div>

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
      }
    }
  };
</script>


<style scoped>

</style>
