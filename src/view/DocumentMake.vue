<template>
  <div class="document-make-body">
    <loader class="loader middle-spinner" width="3" radius="15" v-if="loader" />
    <second-stage @prev="prev" v-else-if="!prev_stage && this.$route.params.id"/>
    <first-stage v-else @next="next"/>
<!--    {{this.getDocument.title}}-->
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations, mapState} from "vuex"
import FirstStage from "@/components/DocumentMake/PrevMakeDocument";
import SecondStage from "@/components/DocumentMake/EditDocument";
import axios from "axios";
import router from "@/router";
import Loader from "@/components/additional/loader";

export default {


  data() {
    return{
      prev_stage: true,
      error: null,
      loader: false
    }
  },

  methods: {
    ...mapMutations(['DocumentMutate','updateStoreDocument', 'catchError']),
    ...mapActions(['requestDocumentMake']),

    async next(forced = '') {


      const id = this.$route.params.id;
      const keyParts = [];

      if (id) {
        keyParts.push('first-stage=true');
      }

      if (forced === 'forced') {
        keyParts.push('forced=true');
      }

      const key = keyParts.length > 0 ? '?' + keyParts.join('&') : '';

      const url = id
          ? this.api_url_v1 + '/document/make/' + id + key
          : this.api_url_v1 + '/document/make' + key;

      try {

        // create or update document
        const response = await axios[id ? 'patch' : 'post'](url, { title: this.getMakeDocument.title, type_id: this.getMakeDocument.type_id });  //{ title: this.getMakeDocument.title, type_id: this.getMakeDocument.type_id }
        this.prev_stage = false;
        if (response.data.message !== 'update'){
          this.updateStoreDocument(response.data);
          router.push('/document/make/' + response.data.id);
        }
      } catch (err) {
        console.error('error info -', err.message);
        this.catchError(err.response?.data?.errors);
      }
    },

    async getDocument(){
      this.loader = true
      await axios.get(this.api_url_v1 + '/document/make/' + this.$route.params.id).then(response =>
          this.updateStoreDocument(response.data), err => this.catchError(err.response))
      this.loader = false
    },

    prev() {
      this.prev_stage = true
    }
  },
  computed: {
    ...mapGetters(['getMakeDocument', 'getTypes']),
    ...mapState(['api_url_v1'])
  },
  watch: {
    '$route': {
      handler(item) {
        if (item.name === 'DocumentMake') {
          if (item.params.id !== this.getMakeDocument.id)
            this.getDocument()
          this.prev_stage = !item.params.id;
        }
      },
      deep: true
    },
    'getMakeDocument':{
      handler(){
        this.titleError = false
        localStorage.setItem('makeDocument', JSON.stringify(this.getMakeDocument))
      },
      deep:true
    }
  },

  async mounted() {
    // this.DocumentMutate({})
    // this.updateStoreDocument({});
    if(this.$route.params.id !== '') {
      this.prev_stage = false
      if (this.$route.params.id != this.getMakeDocument.id) {
        await this.getDocument()
      }
      if (this.$route.params.id === JSON.parse(localStorage.getItem('makeDocument')).id){
        this.updateStoreDocument(JSON.parse(localStorage.getItem('makeDocument')))
      }
    }
  },

  name: "DocumentMake",
  components: {Loader, SecondStage, FirstStage}
}
</script>

<style scoped>

.document-make-body {
  height: 100%;
  /*background: #FCFCFC;*/
  /*border:1px solid #0d2839;*/
}

.loader{
  display: flex;
}

.document-make-body > div{
  position: relative;
}
</style>