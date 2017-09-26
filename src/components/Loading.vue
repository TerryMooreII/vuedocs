<template>
  <div v-if="isLoading" class="loading-overlay flex-container">
    <div class="flex-item">
      <i class="fa fa-circle-o-notch fa-3x fa-spin"></i>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'Vuex';

  export default {
    name: 'VdLoading',
    watch: {
      isLoading (val) {
        console.log('loading', val);
      }
    },
    computed: {
      ...mapGetters({isLoading: 'isLoading'})
    }
  };
</script>


<style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.6);
  }

  .flex-container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-item {
    text-align: center;
  }

</style>
