<template>
  <div class="columns">
    <div class="column is-offset-2 is-two-thirds">
      <article class="message is-primary">
        <div class="message-header">
          <p>Add New Article</p>
        </div>
        <div class="message-body">
          <form @submit.prevent="onSubmit">

            <div class="field">
              <label class="label">Title</label>
              <div class="control has-icons-right">
                <input
                  :class="{'input': true, 'is-danger': errors.has('title'), 'is-success': !errors.has('title') && fields.title && fields.title.touched }"
                  type="text" name="title" placeholder="Article Title" v-model="article.title" v-validate="'required'">
                <span class="icon is-small is-right"
                      v-show="!errors.has('title') && fields.title && fields.title.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</p>
            </div>
            <div class="field">
              <label class="label">URL</label>
              <div class="control has-icons-right">
                <input
                  :class="{'input': true, 'is-danger': errors.has('url'), 'is-success': !errors.has('url') && fields.url && fields.url.touched }"
                  name="url" type="text" placeholder="URL to the Article" v-model="article.url"
                  v-validate="'required|url'">
                <span class="icon is-small is-right" v-show="!errors.has('url') && fields.url && fields.url.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p class="help has-text-grey">Please remove tracking parameters from the end of the URL</p>
              <p v-show="errors.has('url')" class="help is-danger">{{ errors.first('url') }}</p>
            </div>

            <div class="field">
              <label class="label">Tags</label>
              <div class="control has-icons-right">
                <input class="input" name="tag" type="text" placeholder="Add Tag" v-model="tag"
                       @keydown.enter.prevent="addTag">
              </div>
              <div>
                <span class="tag is-primary" v-for="(tag, index) in article.tags" :key="tag">
                  {{tag}}
                  <button type="button" class="delete is-small" @click="removeTag(index)"></button>
                </span>
              </div>
            </div>
            
            <div class="field">
              <label class="label">Category</label>
              <div class="select is-fullwidth">
                <select v-model="article.type" name="type" v-on:change="updateTitle()">
                  <option v-for="option in types" v-bind:value="option.value" :key="option.value" >
                    {{ option.title }}
                  </option>
                </select>
              </div>
            </div>
            <br>
            <div class="field">
              <button class="button is-primary" :disabled="errors.any()">Submit</button>
              <router-link :to="{ name: 'articles'}" class="button is-default is-outlined">Cancel</router-link>
            </div>

          </form>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import axios from 'axios';

  export default {
    name: 'VdArticleForm',
    data () {
      return {
        tag: null,
        article: {
          author: '',
          publishedDate: '',
          submittedBy: '',
          submittedDate: '',
          type: '',
          tags: [],
          votesDown: 0,
          votesUp: 0,
          title: '',
          url: ''
        },
        types: [
          {title: 'Article', value: 'article', slug: ''},
          {title: 'Show', value: 'show', slug: '[Show]'},
          {title: 'Ask', value: 'ask', slug: '[Ask]'},
          {title: 'Job Posting', value: 'job', slug: '[Job]'}
        ]
      };
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    created () {
      this.article.type = this.types[0].value;
    },
    methods: {
      updateTitle () {
        this.types.forEach((type) => {
          this.article.title = this.article.title.replace(type.slug, '');
        });
        const slug = this.types.filter(type => this.article.type === type.value);
        this.article.title = slug[0].slug + (slug[0].slug ? ' ' : '') + this.article.title.trim();
      },
      addTag (event) {
        this.article.tags.push(event.target.value);
        this.tag = null;
      },
      removeTag (index) {
        this.article.tags.splice(index, 1);
      },
      onSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.article.submittedDate = Date.now();
            this.article.submittedBy = this.user;
            if (!this.article.url.startsWith('http')) {
              this.article.url = 'http://' + this.article.url;
            }
            axios.post('articles', this.article).then(() => {
              this.$notify({
                group: 'messages',
                type: 'success',
                text: 'Article Successfully Added'
              });
              this.$router.push('/');
            });
          }
        });
      }
    }
  };
</script>


<style scoped>
  .tag {
    margin-right: 4px;
    margin-top: 4px;
  }
</style>
