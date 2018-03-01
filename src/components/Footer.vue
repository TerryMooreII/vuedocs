<template>
  <footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>VueNews.io</strong> is made with <i class="fa fa-heart has-text-danger"></i> by <a href="http://github.com/terrymooreii" target="_blank">Terry Moore II</a>.
      </p>
      <p>
        Please report any
        <a href="https://github.com/TerryMooreII/vuedocs/issues">bugs</a>
        or
        <a href="https://github.com/TerryMooreII/vuedocs/issues">feature requests</a>
      </p>
      <p>
        <a class="icon is-github" href="https://github.com/terrymooreii/vuedocs">
          <i class="fa fa-github"></i>
        </a>
        <a class="icon is-twitter" href="https://twitter.com/VueNews_io">
          <i class="fa fa-twitter"></i>
        </a>
      </p>
    </div>
  </div>
  </footer>
</template>

<script>
export default {
  name: 'VdFooter',
  data () {
    return {
    };
  }
};
</script>


<style scoped>
  .is-twitter {
    color: #55acee;
  }
  .is-github {
    color: #444;
  }
</style>
