<template>
  <div class="paginate" v-if="paginate">
    <span class="page_tumbler" v-if="paginate.current_page !== 1"><router-link :to="thePath(1)">1</router-link></span>
    <!--    <span class="page_tumbler">{{ // Page }}</span>-->
    <!--    <span class="page_tumbler"><router-link :to="thePath('back')"-->
    <!--    >&lt</router-link></span>-->
    <span v-if="paginate.current_page-1!==1&&paginate.current_page-1!==0&& paginate.current_page-2!==1">...</span>

    <span class="page_tumbler " v-if="paginate.current_page-1!==1&&paginate.current_page-1!==0">
      <router-link :to="thePath(paginate.current_page-1)">{{ paginate.current_page - 1 }} </router-link></span>


    <span class="page_tumbler current-page-pagination"><router-link
        :to="thePath(paginate.current_page)">{{ paginate.current_page }} </router-link></span>
    <!--    <span class="page_tumbler"><router-link v-if="paginate.current_page !== paginate" :to="thePath('next')">></router-link></span>-->


    <span class="page_tumbler ">
      <router-link v-if="paginate.current_page+1!==paginate.last_page&&paginate.current_page+1!==paginate.last_page+1"
                   :to="thePath(paginate.current_page+1)">
        {{ paginate.current_page + 1 }} </router-link>
    </span>

    <span v-if="paginate.current_page+2!==paginate.last_page&&paginate.current_page+1!==paginate.last_page&&paginate.current_page+1!==paginate.last_page+1">...</span>


    <span class="page_tumbler"><router-link v-if="paginate.current_page !== paginate.last_page"
                                            :to="thePath(paginate.last_page)"
    >{{ paginate.last_page }}</router-link></span>

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
  border: 2px solid cyan;
}

.current-page-pagination {
  font-weight: bold;
}
</style>