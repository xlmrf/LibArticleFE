<template>
  <div class="select-search-area">
    <h3>{{this.$store.getters.getLanguage.documents.sidebar.search_area }}:</h3>
    <span @click="this.$refs.all.click()" :class="{active_date_format:only_own===false}">
      <input type="radio" v-model="only_own" :value="false" @change="query(only_own)" name="all" ref="all">
      <span class="label">{{this.$store.getters.getLanguage.documents.sidebar.all }}</span>
    </span>
    <span @click="this.$refs.only_own.click()" :class="{active_date_format:only_own==='my'}">
      <input type="radio" v-model="only_own" value="my" @change="query(only_own)" name="only_own" ref="only_own">
      <span class="label">{{this.$store.getters.getLanguage.documents.sidebar.only_my }}</span>
    </span >
    <span @click="this.$refs.im_author.click()" :class="{active_date_format:only_own==='author'}">
      <input type="radio" v-model="only_own" value="author" @change="query(only_own)" name="im_author" ref="im_author">
      <span class="label">{{this.$store.getters.getLanguage.documents.sidebar.im_author }}</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      only_own: false,
    }
  },
  watch: {
    '$route.query':{
      handler(k){
        if (this.$route.query.my !== undefined&&this.$route.query.my==="true") {
          this.only_own = 'my';
        }
      }
    }
  },
  methods: {
    query(data) {
      let query = Object.assign({}, this.$route.query);
      // if (query.search){
      //   delete query.search
      // }

      const obj = {};
      if (data) {
        obj[data] = true;
      }

      delete query.page;
      delete query.my
      delete query.author

      this.$router.push({
        name: 'documents',
        query: {...query, ...obj}
      })
    },
  },
  mounted() {
    if (this.$route.query.my !== undefined&&this.$route.query.my==="true") {
      this.only_own = 'my';
    }
    if (this.$route.query.author !== undefined && this.$route.query.author === "true") {
      this.only_own = 'author';
    }
  }
}
</script>

<style scoped>
.select-search-area{
  display: flex;
  /*background: #F0DDD1;*/
}

.select-search-area > h3{
  padding: 1rem 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #bbb;
  font-weight: normal;
}

.select-search-area > span{
  cursor: pointer;
  padding: 7px 18px;
  margin: 3px 0;
  border-radius: 6px;
}

.active_date_format{
  /*background: rgba(9, 127, 218, 0.95);*/
  background: #1C75DD;
  color: #fff;
}

.select-search-area input{
  display: none;
}
</style>