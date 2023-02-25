<template>
  <div class="select-search-area">
    <h4>Вибрати документи:</h4>
    <label class="save-session">
      <input type="radio" v-model="only_own" value="false" @change="query({my: only_own})" name="only_own" id="">
      <span class="label">Всі</span>
    </label>
    <label class="save-session">
      <input type="radio" v-model="only_own" value="true" @change="query({my: only_own})" name="only_own" id="save-user">
      <span class="label">Тільки мої</span>
    </label>
  </div>
</template>

<script>
export default {
  data(){
    return{
      only_own: this.$route.query.my ? this.$route.query.my : false,
    }
  },
  methods:{
    query(data) {
      let query = Object.assign({}, this.$route.query);
      // if (query.search){
      //   delete query.search
      // }
      delete query.page;
      this.$router.push({
        name: 'documents',
        query: {...query, ...data}
      })
    },
  }
}
</script>

<style scoped>

</style>