<template>
  <div class="document-wrapper" v-if="getDocument.authors && getTypes">

    <div class="top-document-info">
      <span class="document-type">{{getTypes.find(item => item.id === getDocument.type_id)?.name}}</span>
      <router-link class="remake-link" :to="'/document/make/'+$route.params.id" >
        Редагувати
      </router-link>
    </div>

    <div class="doc-body">
      <div class="doc-main-info">
        <h3 class="document-title">{{ getDocument.title }}</h3>

        <div class="under-title-info">
          <span>Опублікував: Ходаніцький Олексій Олексійович</span>
          <span class="pdf-loader file-download">PDF</span>
        </div>

        <div class="authors">
          Автори:
          <span v-for="author in getDocument.authors">
            <router-link class="author-item-link" :to="'/profile/'+author.user_id" v-if="author.user_id">{{ author.first_name[0] }}. {{ author.last_name }} </router-link>
            <span v-else>{{ author.first_name[0] }}. {{ author.last_name }} </span>;
        </span>
        </div>

        <div>Ключові слова:
          <span v-for="keyword in getDocument.keywords">{{keyword}}; </span>
        </div>

        <div class="doc-counters">
          <span>Перегляди <span>250253</span></span>
          <span>Посилань <span>235</span></span>
        </div>
      </div>



      <div class="references-block">
        <h2>посилання данного файла</h2>
        <div v-for="(reference,idx) in getDocument.references">
          <span class="ref-body">{{idx+1}}. {{reference.bibliographic_description}}</span>
          <div class="ref-bottom">
            <span>
              <span @click="copy()" class="ref-copy-area">
  <!--              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="#24292F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>-->
                скопіювати як
              </span>
              <select class="select-cite-format">
                <option value="apa">apa</option>
              </select>
            </span>
            <span>root</span>
          </div>
        </div>
      </div>

      <div>комменти</div>
    </div>


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
    ...mapMutations(['DocumentMutate']),
    async copy(){
        try {
          await navigator.clipboard.writeText(this.getDocument.title);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
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

.doc-main-info > div{
  margin: 15px 0;
}

.doc-counters{
  display: flex;
}

.doc-counters > span{
  display: flex;
  padding: 10px;
  margin: 15px 10px;
  align-items: center;
  flex-flow: column;
  /*padding: 20px;*/
  background: rgba(187, 187, 187, 0.25);
  border-radius: 5px;
}

.doc-counters > span:hover{
  background: #e0e0e0;
  cursor: default;
}

.doc-counters > span:last-child:hover{
  cursor: pointer;
}

.doc-counters > span > span{
  font-weight: bold;
  color: #333333;
  font-size: 1.1em;
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

.ref-copy-area{
  display: flex;
  align-self: center;
}

.select-cite-format{
  margin: 0 10px;
  font-size: 1.2rem;
  color: #212121;
  padding: 5px;
  background: transparent;
  cursor: pointer;
}

.references-block{
  margin: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}

.ref-bottom{
  display: flex;
}
.ref-bottom > span{
  /*color: #0969DA;*/
  display: inherit;
  margin: 5px 10px;
  cursor: pointer;
}

.document-wrapper{
  background: rgba(241, 241, 241, 0.4);
  font-size: 1.3em;
  /*padding: 10px;*/
  height: 100vh;
  width: 80%;
  display: flex;
  flex-flow: column;
  /*border: 1px solid #222222;*/
  margin: auto;
  /*margin-top: 0.2rem;*/
}

.doc-body{
  padding: 20px;
}

.document-title{
  margin: 1.5rem 0;
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
  /*margin: 1rem;*/
  display: flex;
  padding: 0.7rem;
  /*border: 1px solid rgba(32, 178, 170, 0.71);*/
  /*background: rgba(32, 178, 170, 0.25);*/
  background: rgba(65, 159, 217, 0.15);
  flex: 1;
  justify-content: center;
  border-radius: 1px;
  width: fit-content;
}

.file-download{
  border-radius: 3px;
  padding: 8px 20px;
  cursor: pointer;
  margin-right: 1rem;
  margin-left: auto;
}

.pdf-loader{
  color: white;
  /*background: #00c7c5;*/
  background: #FB3449;
}

.remake-link{
  /*border: 1px solid #bbb;*/
  padding: 0.7rem 1.2rem;
  text-decoration: none;
  color: #525252;
  position: absolute;
  right: 0;
}
.remake-link:hover{
  border-bottom: 1px solid #525252;
  color: #222222;
}

.author-item{
  font-size: 1.1rem;
}

</style>