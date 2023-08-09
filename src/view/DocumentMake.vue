<template>
  <div class="document-make-body">
    <second-stage @prev="prev" v-if="!prev_stage && this.$route.params.id"/>
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

export default {


  data() {
    return{
      prev_stage: true,
      error: null
    }
  },

  methods: {
    ...mapMutations(['DocumentMutate','updateDocument', 'catchError']),
    ...mapActions(['requestDocument']),

    // next(type) {   old
    //   let key = '?'
    //   const id = this.$route.params.id
    //   if (id){
    //     key += 'first-stage=true'
    //   }
    //
    //   if (type === 'forced') {
    //     if (key !== '?')
    //       key += '&'
    //     key += 'forced=true'
    //   }
    //
    //   if (id){
    //     console.log('document patch')
    //     axios.patch(this.api_url_v1 + '/document/make/'+ id + (key!=='?' ? key : ''), {data: this.getDocument}).then(response => {
    //
    //       this.updateDocument( response.data)
    //       this.prev_stage = false
    //
    //       router.push('/document/make/' + response.data.id)
    //     }, err => {
    //
    //       console.log('error info -', err.message);
    //       this.catchError(err.response.data.errors)
    //
    //     })
    //   }
    //   else {
    //     console.log('document post')
    //     axios.post(this.api_url_v1 + '/document/make' + (key !== '?' ? key : ''), {data: this.getDocument}).then(response => {
    //
    //       this.updateDocument(response.data)
    //       this.prev_stage = false
    //
    //       router.push('/document/make/' + response.data.id)
    //     }, err => {
    //
    //       console.log('error info -', err.message);
    //       this.catchError(err.response.data.errors)
    //
    //     })
    //   }
    //
    //   // else {
    //   //   this.prev_stage = false
    //   // }
    //
    // },

    async next(type) {
      const id = this.$route.params.id;
      const keyParts = [];

      console.log(this.getDocument)

      if (id) {
        keyParts.push('first-stage=true');
      }

      if (type === 'forced') {
        keyParts.push('forced=true');
      }

      const key = keyParts.length > 0 ? '?' + keyParts.join('&') : '';

      const url = id
          ? this.api_url_v1 + '/document/make/' + id + key
          : this.api_url_v1 + '/document/make' + key;

      try {

        const response = await axios[id ? 'patch' : 'post'](url, { title: this.getDocument.title, type_id: this.getDocument.type_id });  //{ title: this.getDocument.title, type_id: this.getDocument.type_id }
        this.prev_stage = false;
        if (response.data.message !== 'update'){
          this.updateDocument(response.data);
          router.push('/document/make/' + response.data.id);
        }
      } catch (err) {
        console.error('error info -', err.message);
        this.catchError(err.response?.data?.errors);
      }
    },

    prev() {
      this.prev_stage = true
    }
  },
  computed: {
    ...mapGetters(['getDocument', 'getTypes']),
    ...mapState(['api_url_v1'])
  },
  watch: {
    '$route.params': {
      handler(item) {
        this.prev_stage = !item.id;
      },
      deep: true
    },
    'getDocument':{
      handler(){
        this.titleError = false
      },
      deep:true
    }
  },
  mounted() {
    this.DocumentMutate({})
    if (this.$route.params.id !== '') {
      this.requestDocument(this.$route.params.id);
      this.prev_stage = false
    }
    console.log('id:',this.$route.params.id);
  },
  updated() {
    if (this.$route.params.id !== '' && !this.getDocument.id) {
      console.log('beforeUpdate');
      // this.getDocumentById(this.$route.params.id);
      this.prev_stage = false
    }
  },

  name: "DocumentMake",
  components: {SecondStage, FirstStage}
}
</script>

<style scoped>
.code{
  border: 1px solid #bbb;
  color: #0e710e;
  border-radius: 2px;
  padding: 5px;
  margin: 5px;
}

.document-make-body {
  height: 100%;
  /*background: #FCFCFC;*/
  /*border:1px solid #0d2839;*/
}

.document-make-body > div{
  position: relative;
}
</style>