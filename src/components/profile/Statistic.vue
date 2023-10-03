<template>
  <loader radius="10" width="2" v-if="statisticLoader" />
  <div class="user-state-panel" v-else>

    <router-link class="state-link" to="">
      <div class="state-upload">
        <span class="state-count">{{document_count}}</span>
        <span class="sub-name-state">{{$store.getters.getLanguage.profile.headers.documents_load}}</span>
      </div>
    </router-link>

    <router-link class="state-link" to="">
      <div class="state-upload">
        <span class="state-count">{{document_count}}</span>
        <span class="sub-name-state">{{$store.getters.getLanguage.profile.headers.documents_author}}</span>
      </div>
    </router-link>

    <router-link class="state-link" to="">
      <div class="state-citation">
        <span class="state-count">0</span>
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
      document_count:0,
      documents_views:{},
      statisticLoader: false
    }
  },
  watch: {
    '$route.params.id': {
      handler(item) {
        if (this.$route.params.id !== undefined) {
          this.getDocumentCount()
          this.getDocumentsViews()
        }
      }
    }
  },
  methods: {
    getDocumentCount() {
      axios.get('https://libarticle.polidar.in.ua/api/v1/report/documents-count/profile/' + this.$route.params.id).then(response => {
        this.document_count = response.data.count;
      }, err => {
        console.log('error info -', err.message);
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
  height: auto;
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