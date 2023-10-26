<template>
  <loader radius="10" width="2" v-if="statisticLoader" />
  <div class="user-state-panel" v-else>

    <router-link class="state-link" :to="toUserDocuments">
      <div class="state-upload">
        <loader v-if="counter_not_ready" />
        <span v-else class="state-count">{{loader_documents_count}}</span>
        <span class="sub-name-state">{{$store.getters.getLanguage.profile.headers.documents_load}}</span>
      </div>
    </router-link>

    <router-link class="state-link" :to="toAuthorDocuments">
      <div class="state-upload">
        <loader v-if="counter_not_ready" />
        <span v-else class="state-count">{{author_documents_count}}</span>
        <span class="sub-name-state">{{$store.getters.getLanguage.profile.headers.documents_author}}</span>
      </div>
    </router-link>

    <router-link class="state-link" :to="toCitesDocuments">
      <div class="state-citation">
        <span class="state-count">{{cites_documents_count}}</span>
        <span class="sub-name-state">{{$store.getters.getLanguage.profile.headers.cites}}</span>
      </div>
    </router-link>

    <router-link class="state-link" to="">
      <div class="state-views">
        <span class="state-count">{{ documents_views.views }}({{ documents_views.unique_views }})</span>
        <span class="sub-name-state">{{$store.getters.getLanguage.profile.headers.views}}</span>
      </div>
    </router-link>


  </div>

</template>

<script>

import axios from "axios";
import Loader from "@/components/additional/loader";

export default {

  // get: /report/documents-count/profile/{id}
  // get: /report/documents-views/profile/{id}
  // get: /report/documents-top/profile/{id}
  // get: /report/co-author-top/profile/{id}

  data(){
    return{
      loader_documents_count:0,
      author_documents_count:0,
      cites_documents_count:0,
      counter_not_ready: false,
      documents_views:{},
      statisticLoader: false
    }
  },
  watch: {
    '$route': {
      handler(item) {
        if (item.name === 'profile' && item.params.id) {
          this.getDocumentCount();
          this.getDocumentsViews();
        }
      },
      deep:true
    },
  },
  methods: {
    getDocumentCount() {
      this.counter_not_ready = true
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/documents-count/profile/' + this.$route.params.id).then(response => {
        this.loader_documents_count = response.data.documents_count.loader_documents_count;
        this.author_documents_count = response.data.documents_count.author_documents_count;
        this.cites_documents_count = response.data.documents_count.cites_documents_count;
        this.counter_not_ready = false
      }, err => {
        console.log('error info -', err.message);
        this.counter_not_ready = false
        this.loader_documents_count = 0
        this.author_documents_count = 0
        this.cites_documents_count = 0
        // ctx.commit('setInfo', err)
      })
    },
    getDocumentsViews() {
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/documents-views/profile/' + this.$route.params.id).then(response => {
        this.documents_views = response.data;
      }, err => {
        console.log('error info -', err.message);
        // ctx.commit('setInfo', err)
      })
    },

  },
  computed:{
    toUserDocuments(){
      if (this.loader_documents_count > 0){
        return '/documents?user_loader='+this.$route.params.id
      }
      else{
        return ''
      }
    },
    toCitesDocuments(){
      if (this.cites_documents_count > 0){
        return '/documents?user_cites='+this.$route.params.id
      }
      else{
        return ''
      }
    },
    toAuthorDocuments(){
      if (this.author_documents_count > 0){
        return '/documents?user_author='+this.$route.params.id
      }
      else{
        return ''
      }
    }
  },
  mounted() {
    this.getDocumentCount();
    this.getDocumentsViews();
  },
  components:{Loader}

}
</script>

<style scoped>
.user-state-panel{
  display: flex;
  flex-flow: row;
  position: relative;
}
.state-link > div{
  /*border:  1px solid red;*/
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  min-width: 80px;
}
.state-link{
  text-decoration: none;
  margin: 0.5rem 1rem;
  padding: 0.5rem;
}
.state-link:hover{
  background: rgba(241, 241, 241, 0.75);
  border-radius: 5px;
}
.state-count{
  font-size: 28px;
  color: #525252;
  margin: 0.5rem;
  flex: 1;
}
.sub-name-state{
  margin-top: auto;
  white-space: nowrap;
  font-size: 0.9em;
  color: #2a2a2a;
}



/*.state-count{*/
/*  color: #525252;*/
/*  margin: 0.5rem;*/
/*}*/
/*hr {*/
/*  display: block;*/
/*  height: 1px;*/
/*  border: 0;*/
/*  border-top: 1px solid #ccc;*/
/*  margin: 1em 0;*/
/*  padding: 0;*/
/*  width: 100%;*/
/*}*/
</style>