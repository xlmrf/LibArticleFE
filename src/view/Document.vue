<template>
  <div class="document-wrapper" v-if="getDocument && getTypes">
    <span class="document-type">{{getTypes.find(item => item.id === getDocument.type_id).name}}</span>
    <router-link :to="'/document/make/'+$route.params.id" >Remake</router-link>

    <h3 class="document-title">{{ getDocument.title }}</h3>

    <info :info="getDocument"></info>

    <authors />

    <ol>
      <li v-for="author in getDocument.authors">
        <span>
          <router-link :to="'/profile/'+author.user_id" v-if="author.user_id">{{ author.last_name }}</router-link>
          <span v-else>{{ author.last_name }}</span>
        </span>
      </li>
    </ol>


    <files>{{ getDocument.files }}</files>

    <comment>
      comment
    </comment>
  </div>

  <loader class="middle-spinner" :width="4" :radius="20" v-else/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import info from "@/components/document/info";
import files from "@/components/document/files";
import comment from "@/components/document/comment";
import Loader from "@/components/additional/loader";
import Authors from "@/components/document/authors";

export default {
  methods:{
    ...mapActions(['requestDocument','requestTypes']),
  },
  computed: {
    ...mapGetters(['getDocument','getTypes'])
  },
  components:{Authors, Loader, info,files,comment},
  mounted() {
    this.requestDocument(this.$route.params.id)
    this.requestTypes()
  }
}
</script>

<style scoped>
.document-wrapper{
  height: 100vh;
  width: 80%;
  display: flex;
  flex-flow: column;
  border: 1px solid #222222;
  margin: auto;
  margin-top: 0.2rem;
}

.document-title{
  font-size: 1.5em;
  font-weight: normal;
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
</style>