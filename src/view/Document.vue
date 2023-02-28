<template>
  <div v-if="getDocument" >
    document:


    <h1>{{ getDocument.title }}</h1>
    <h1>{{ getDocument.type_id }}</h1>


    <ol>
      <li v-for="author in getDocument.authors">
        <span>
          <router-link :to="'/profile/'+author.user_id" v-if="author.user_id">{{ author.last_name }}</router-link>
          <span v-else>{{ author.last_name }}</span>
        </span>
      </li>
    </ol>

    <info>{{ getDocument.keywords }}</info>

    <files>{{ getDocument.files }}</files>

    <comment>
      comment
    </comment>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import info from "@/components/document/info";
import files from "@/components/document/files";
import comment from "@/components/document/comment";

export default {
  methods: {
    ...mapActions(['requestDocument'])
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  components:{info,files,comment},
  mounted() {
    this.requestDocument(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>