<template>
  <div class="columns">
    <div class="column is-offset-2 is-two-thirds">
      <article class="message">
        <div class="message-header">
          <p>Add New Article</p>
        </div>
        <div class="message-body">
          <form @submit.prevent="onSubmit">

            <div class="field">
              <label class="label">Title</label>
              <div class="control has-icons-right">
                <input :class="{'input': true, 'is-danger': errors.has('title'), 'is-success': !errors.has('title') && fields.title && fields.title.touched }"
                       type="text" name="title" placeholder="Article Title" v-model="article.title" v-validate="'required|alpha'">
                <span class="icon is-small is-right" v-show="!errors.has('title') && fields.title && fields.title.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</p>
            </div>


            <div class="field">
              <label class="label">URL</label>
              <div class="control has-icons-right">
                <input :class="{'input': true, 'is-danger': errors.has('url'), 'is-success': !errors.has('url') && fields.url && fields.url.touched }"
                       name="url" type="text" placeholder="URL to the Article" v-model="article.url" v-validate="'required|url'">
                <span class="icon is-small is-right" v-show="!errors.has('url') && fields.url && fields.url.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p v-show="errors.has('url')" class="help is-danger">{{ errors.first('url') }}</p>
            </div>

            <!--<div class="columns">-->
              <!--<div class="column">-->
                <!--<div class="field">-->
                  <!--<label class="label">Author</label>-->
                  <!--<div class="control has-icons-right">-->
                    <!--<input :class="{'input': true, 'is-danger': errors.has('author'), 'is-success': !errors.has('author') && fields.author && fields.author.touched }"-->
                           <!--name="author" type="text" placeholder="Who Wrote It" v-model="article.author" v-validate="'required'">-->
                    <!--<span class="icon is-small is-right" v-show="!errors.has('author') && fields.author && fields.author.touched">-->
                  <!--<i class="fa fa-check"></i>-->
                <!--</span>-->
                  <!--</div>-->
                  <!--<p v-show="errors.has('author')" class="help is-danger">{{ errors.first('author') }}</p>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div class="column">-->
                <!--<div class="field">-->
                  <!--<label class="label">Published</label>-->
                  <!--<div class="control has-icons-right">-->
                    <!--<input :class="{'input': true, 'is-danger': errors.has('publishedDate'), 'is-success': !errors.has('publishedDate') && fields.publishedDate && fields.publishedDate.touched }"-->
                           <!--name="publishedDate" data-vv-as="publish date" type="text" placeholder="When Was It Published" v-model="article.publishedDate" v-validate="'required'">-->
                    <!--<span class="icon is-small is-right" v-show="!errors.has('publishedDate') && fields.publishedDate && fields.publishedDate.touched">-->
                  <!--<i class="fa fa-check"></i>-->
                <!--</span>-->
                  <!--</div>-->
                  <!--<p v-show="errors.has('publishedDate')" class="help is-danger">{{ errors.first('publishedDate') }}</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Vue Version</label>
                  <div class="select is-fullwidth">
                    <select v-model="article.version" name="version">
                      <option></option>
                      <option v-for="option in versions" v-bind:value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">Article Type</label>
                  <div class="select is-fullwidth">
                    <select v-model="article.type" name="type">

                      <option></option>
                      <option v-for="option in types" v-bind:value="option.value">
                        {{ option.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>


            <div class="field">
              <label class="label">Tags</label>
              <div class="control has-icons-right">
                <input class="input"  name="tag" type="text" placeholder="Add Tag" v-model="tag" @keydown.enter.prevent="addTag">
              </div>

              <div>
                <span class="tag is-primary" v-for="(tag, index) in article.tags">
                  {{tag}}
                  <button type="button" class="delete is-small" @click="removeTag(index)"></button>
                </span>
              </div>
            </div>

            <p class="control">
              <button class="button is-primary" :disabled="errors.any()">Submit</button>
              <router-link :to="{ name: 'articles'}" class="button is-default is-outlined">Cancel</router-link>
            </p>

          </form>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {db} from '../services/FirebaseService';

  export default {
    name: 'add-article',
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
          thumbsDown: 0,
          thumbsUp: 0,
          title: '',
          url: '',
          version: ''
        },
        types: [
          { title: 'Blog', value: 'blog' },
          { title: 'How To', value: 'how-to' },
          { title: 'Video', value: 'video' },
          { title: 'Code Sample', value: 'code-sample' },
          { title: 'Other', value: 'other' }
        ],
        versions: [
          '1.x',
          '2.x',
          '2.0',
          '2.1',
          '2.2',
          '2.3',
          '2.4'
        ]
      };
    },
    firebase: {
      articles: {
        source: db.ref(`articles`)
      }
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    methods: {
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
            this.$firebaseRefs.articles.push(this.article);
            this.$router.push('/');
          }
        });
      }
    }
  };
</script>


<style scoped>

</style>

