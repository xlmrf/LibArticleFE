<template>
  <div class="select-search-area">
    <h4>Вибрати документи:</h4>
    <label class="save-session">
      <input type="radio" v-model="only_own" :value="false" @change="query(only_own)" name="only_own">
      <span class="label">Всі</span>
    </label>
    <label class="save-session">
      <input type="radio" v-model="only_own" value="my" @change="query(only_own)" name="only_own">
      <span class="label">Тільки мої</span>
    </label>
    <label class="save-session">
      <input type="radio" v-model="only_own" value="author" @change="query(only_own)" name="only_own">
      <span class="label">Я автор</span>
    </label>
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
    // '$route.query':{
    //   handler(k){
    //     if (!k.my){
    //
    //     }
    //   }
    // }
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

</style>