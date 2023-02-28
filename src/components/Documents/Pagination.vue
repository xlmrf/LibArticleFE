<template>
  <div class="paginate" v-if="paginate">
    <div>
<!--      first page-->
      <span class="page_tumbler" v-if="paginate.current_page !== 1"><router-link :to="thePath(1)">1</router-link></span>
<!--      between-->
      <span v-if="paginate.current_page-1!==1&&paginate.current_page-1!==0&& paginate.current_page-2!==1">...</span>
<!--      previous page-->
      <span class="page_tumbler " v-if="paginate.current_page-1!==1&&paginate.current_page-1!==0">
        <router-link :to="thePath(paginate.current_page-1)">{{ paginate.current_page - 1 }}</router-link>
      </span>
<!--      current page-->
      <span class="page_tumbler current-page-pagination"><router-link
          :to="thePath(paginate.current_page)">{{ paginate.current_page }} </router-link>
      </span>
<!--      next page-->
      <span class="page_tumbler ">
        <router-link v-if="paginate.current_page+1!==paginate.last_page&&paginate.current_page+1!==paginate.last_page+1"
                     :to="thePath(paginate.current_page+1)">
          {{ paginate.current_page + 1 }} </router-link>
      </span>
<!--      between -->
      <span v-if="paginate.current_page+2!==paginate.last_page&&paginate.current_page+1!==paginate.last_page&&paginate.current_page+1!==paginate.last_page+1">...</span>

<!--      last page-->
      <span class="page_tumbler" v-if="paginate.current_page !== paginate.last_page">
        <router-link :to="thePath(paginate.last_page)">{{ paginate.last_page }}</router-link>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: "Documents",
  props: ['paginate'],
  methods: {
    thePath(page) {
      let url = '/documents?';
      let paginate = this.paginate
      let query = Object.assign({}, this.$route.query);
      delete query.page;

      for (let e in query) {
        url += `${e}=${query[e]}&`
      }
      url += 'page=' + page;


      // else if(page === 'back'){
      //   url+='page='+(paginate.prev_page)
      // }
      // else if(page === 'next'){
      //   url+='page='+(paginate.current_page+1)
      // }

      return url;
      // '/documents?page='+getDocuments.last_page

    }


  },
  computed: {
    Page() {
      // getDocuments.last_page
      return 0;
    }
  },
  mounted() {
    console.log('p', this.paginate);
  }
}
</script>

<style scoped>

.paginate {
  display: flex;
  justify-content: center;
  border: 2px solid cyan;
  height: 80px;
  align-items: center;
}
.paginate span, .paginate a{
  text-decoration: none;
  color: #222222;
  /*margin: 0 0.5rem;*/
  /*padding: 4px;*/

  border-radius: 10%;
}
.paginate a{
  border: 1px solid darkslateblue;
  width: 100%;
}
.paginate span{
  border: 1px solid fuchsia;

}
.paginate a{
  width: 40px;
  height: 40px;
}
.current-page-pagination {
  font-weight: bold;
}
</style>
