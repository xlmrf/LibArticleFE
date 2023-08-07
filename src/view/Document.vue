<template>
  <div class="document-wrapper" v-if="getDocument.authors && getTypes">

    <div class="top-document-info">
      <span class="document-type" @click="smooth()">{{getTypes.find(item => item.id === getDocument.type_id)?.name}}</span>
      <router-link v-if="getDocument.authors.map(item => item.user_id === getUser.id).includes(true)" class="remake-link" :to="'/document/make/'+$route.params.id" >
        {{ this.$store.getters.getLanguage.document.topics.edit }}
      </router-link>
    </div>

    <div class="doc-body">
      <h3 class="document-title">{{ getDocument.title }}</h3>
      <div class="doc-main-info">
        <div class="left-side-info">
          <div class="under-title-info">
            <span>{{ this.$store.getters.getLanguage.document.characteristic.publisher }}: Ходаніцький Олексій Олексійович</span>
          </div>

          <div class="authors">
            {{ this.$store.getters.getLanguage.document.characteristic.authors }}:
            <span v-for="(author,idx) in getDocument.authors">
              <router-link class="author-item-link" :to="'/profile/'+author.user_id" v-if="author.user_id">{{ author.first_name[0] }}. {{ author.last_name }} </router-link>
              <span v-else>{{ author.first_name[0] }}. {{ author.last_name }} </span><span v-if="idx+1 < getDocument.authors.length">; </span>
            </span>
          </div>

          <div>{{ this.$store.getters.getLanguage.document.characteristic.keywords }}:
            <span v-for="keyword in getDocument.keywords">{{keyword}}; </span>
          </div>

          <div>{{ this.$store.getters.getLanguage.document.characteristic.publication_date }}:
            <span>{{new Date(Date.parse(getDocument.publication_date)).toDateString()}}</span>
<!--            {{this.getDocument.authors.map(item => item.user_id === 1).includes(true)}}-->
          </div>

          <div class="doc-counters">
            <views-document />
            <cites-document :getDocument="getDocument" />
          </div>
        </div>
        <files v-if="getDocument.files.main" :files="getDocument.files" @close-modal-file="openModalFile = false" />
      </div>


      <annotation  :getDocument="getDocument" />
      <document-refs :getDocument="getDocument" />
      <comment />
    </div>


<!--    <files>{{ getDocument.files }}</files>-->

    <!--              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="#24292F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>-->

<!--    <span>-->
<!--            Переглядати як:-->
<!--            <select class="select-cite-format">-->
<!--              <option value="apa">apa</option>-->
<!--            </select>-->
<!--          </span>-->

  </div>

  <loader class="middle-spinner" :width="4" :radius="20" v-else/>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import info from "@/components/document/info";
import files from "@/components/document/files";
import comment from "@/components/document/comment";
import Loader from "@/components/additional/loader";
import Authors from "@/components/document/authors";
import citesDocument from "@/components/document/citesDocument";
import viewsDocument from "@/components/document/viewsDocument";
import DocumentRefs from "@/components/document/documentRefs";
import Annotation from "@/components/document/annotation";

export default {
  // data(){
  //   return{
  //     openModalFile:false
  //   }
  // },
  methods:{
    ...mapActions(['requestDocument'
    // 'requestTypes'
    ]),
    ...mapMutations(['DocumentMutate']),
    smooth(){
      window.scrollTo({top: 0, behavior: "smooth"});
    },
    handleScroll() {
      const scrollBtn = this.$refs.scrollTopButton;
    }
  },
  computed: {
    ...mapGetters(['getDocument','getTypes', 'getUser']),
  },
  components:{Annotation, DocumentRefs, Authors, Loader, info,files,comment, citesDocument,viewsDocument},
  mounted() {
    this.requestDocument(this.$route.params.id)
    // this.requestTypes()
  },
  beforeUnmount() {
    this.DocumentMutate({})
  }
}
</script>

<style>

.frame{
  min-width: 90px;
}

.left-side-info > div{
  margin: 15px 0;
}

.left-side-info{
  flex:1;
}



.doc-main-info{
  display: flex;
}



.doc-counters{
  display: flex;
}


.top-document-info{
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
}

.under-title-info{
  display: flex;
  align-items: center;
}


.select-cite-format{
  font-size: 1rem;
  margin: 0 10px;
  color: #212121;
  background: transparent;
  cursor: pointer;
}


.document-wrapper{
  /*background: rgba(241, 241, 241, 0.4);*/
  font-size: 1.1em;
  width: 80%;
  display: flex;
  flex-flow: column;
  /*border: 1px solid #222222;*/
  margin: auto;
}

.doc-body{
  padding: 20px;
}

.document-title{
  padding-bottom: 1rem;
  font-size: 1.5em;
  font-weight: bold;
  color: #212121;
  font-family: HelveticaNeue Regular,sans-serif;
  /*font-family: 'Inter Var','Inter',Roboto,Arial,sans-serif;*/
  /*font-family: 'Manrope Var','Manrope','Inter Var','Inter',Arial,sans-serif;*/
}
.document-type{
  font-size: 1.2em;
  color: #212121;
  /*font-weight: bold;*/
  margin-top: 1rem;
  display: flex;
  padding: 0.7rem 1.4rem;
  /*border: 1px solid rgba(32, 178, 170, 0.71);*/
  /*background: rgba(32, 178, 170, 0.25);*/
  background: rgba(85, 184, 242, 0.23);
  justify-content: center;
  border-radius: 1px;
  width: fit-content;
}



.remake-link{
  /*border: 1px solid #bbb;*/
  margin-top: 1.2rem;
  padding: 0.7rem 1.2rem;
  text-decoration: none;
  color: #525252;
  position: absolute;
  border-bottom: 1px solid transparent;
  right: 0;
}
.remake-link:hover{
  border-bottom: 1px solid #525252;
  color: #222222;
}

.author-item{
  font-size: 1.1rem;
}

.pin-all-authors{
  cursor: pointer;
  color: #1C75DD;
  margin-left: 15px;
}

</style>