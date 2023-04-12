<template>
  <div class="document-wrapper" v-if="getDocument && getTypes">
    <h3 class="document-title">{{ getDocument.title }}</h3>
    <div class="under-title-info">
      <span class="document-type">{{getTypes.find(item => item.id === getDocument.type_id)?.name}}</span>
      <router-link class="remake-link" :to="'/document/make/'+$route.params.id" >Редагувати</router-link>
      <span class="pdf-loader file-download">PDF</span>
    </div>


<!--    <info :info="getDocument"></info>-->

<!--    <authors />-->

    <div class="authors">
      <span class="author-item" v-for="author in getDocument.authors">
          <router-link class="author-item-link" :to="'/profile/'+author.user_id" v-if="author.user_id">{{ author.last_name }}</router-link>
          <span v-else>{{ author.last_name }}</span>
      </span>
    </div>

    <div><span>загрузчик документа</span><span>кількість переглядів документа</span> <span>кількість посилань на документ</span><span>скопіювати посилання</span></div>

    <div>ключові слова</div>

    <div class="references-block">
      <h2>посилання данного файла</h2>
      <div v-for="(reference,idx) in getDocument.references">
        <span class="ref-body">{{idx+1}}. {{reference.bibliographic_description}}</span>
        <div class="ref-bottom">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="#24292F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg> copy</span>
          <span>root</span>
        </div>
      </div>
    </div>

    <div>комменти</div>



<!--    <files>{{ getDocument.files }}</files>-->

<!--    <comment>-->
<!--      comment-->
<!--    </comment>-->
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

export default {
  methods:{
    ...mapActions(['requestDocument','requestTypes']),
    ...mapMutations(['DocumentMutate'])
  },
  computed: {
    ...mapGetters(['getDocument','getTypes'])
  },
  components:{Authors, Loader, info,files,comment},
  mounted() {
    this.requestDocument(this.$route.params.id)
    this.requestTypes()
  },
  beforeUnmount() {
    this.DocumentMutate({})
  }
}
</script>

<style scoped>

.under-title-info{

  margin: 10px 0;
}

.references-block{
  margin: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}

.ref-bottom{
  display: flex;

  border: 1px solid green;
}
.ref-bottom > span{
  /*color: #0969DA;*/
  display: inherit;
  border: 1px solid red;

  margin: 5px 10px;
  cursor: pointer;
}

.document-wrapper{
  font-size: 1.3em;
  padding: 10px;
  height: 100vh;
  width: 80%;
  display: flex;
  flex-flow: column;
  /*border: 1px solid #222222;*/
  margin: auto;
  margin-top: 0.2rem;
}

.document-title{
  margin: 3rem 0;
  padding-bottom: 1rem;
  font-size: 1.5em;
  font-weight: bold;
  color: #212121;
  font-family: HelveticaNeue Regular,sans-serif;
  /*font-family: 'Inter Var','Inter',Roboto,Arial,sans-serif;*/
  /*font-family: 'Manrope Var','Manrope','Inter Var','Inter',Arial,sans-serif;*/
}
.document-type{
  font-size: 1em;
  /*font-weight: bold;*/
  margin: 1rem;
  padding: 0.3rem 0.5rem;
  /*border: 1px solid rgba(32, 178, 170, 0.71);*/
  background: rgba(32, 178, 170, 0.31);
  border-radius: 4px;
  width: fit-content;
}

.file-download{
  border-radius: 3px;
  padding: 8px 20px;
  cursor: pointer;
  margin: 0 10px;
}

.pdf-loader{
  color: white;
  /*background: #00c7c5;*/
  background: #FB3449;
}

.remake-link{
  text-decoration: none;
  color: #535353;
}

.author-item{
  font-size: 1.1rem;
}

</style>