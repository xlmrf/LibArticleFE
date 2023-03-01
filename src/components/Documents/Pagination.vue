<template>
  <div class="paginate" v-if="paginate">
      <span class="page_tumbler " :class="{disable_link:paginate.current_page-1===0}">
        <router-link :to="thePath(paginate.current_page-1)" v-if="paginate.current_page-1!==0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(16, 89, 255, 0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </router-link>
        <svg xmlns="http://www.w3.org/2000/svg" v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(16, 89, 255, 0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </span>
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
    <span class="page_tumbler " :class="{disable_link:paginate.current_page === paginate.last_page}">
        <router-link :to="thePath(paginate.current_page+1)" v-if="paginate.current_page !== paginate.last_page">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(16, 89, 255, 0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </router-link>
      <svg xmlns="http://www.w3.org/2000/svg" v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(16, 89, 255, 0.75)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </span>
    <button @click="scrollToTop">BOOM</button>
  </div>
</template>

<script>

export default {
  data(){
    return{
      scTimer: 0,
      scY: 0,
    }
  },
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

    },
    scrollToTop() {

      window.scrollTo({ top: 0, behavior: "smooth" });

    },
    handleScroll() {

      const scrollBtn = this.$refs.scrollTopButton;



      if (window.scrollY > 0) {

        scrollBtn.classList.remove("invisible");

      } else {

        scrollBtn.classList.add("invisible");

      }

    },


  },
  computed: {
    Page() {
      // getDocuments.last_page
      return 0;
    }
  },
  mounted() {

    window.addEventListener("scroll", this.handleScroll);

  },
  beforeUnmount() {

    window.removeEventListener("scroll", this.handleScroll);

  },
}
</script>

<style scoped>

.paginate {
  display: flex;
  justify-content: center;
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
  padding: 0.4rem 0.8rem;
  /*width: 1rem;*/
  /*height: 1rem;*/
  /*width: 100%;*/
}
.paginate a{
  padding: 0.4rem 0.8rem;
  /*width: 1rem;*/
  /*height: 1rem;*/
  /*width: 100%;*/
}
.paginate span{
  /*border: 1px solid fuchsia;*/
  margin: 0.3rem;
}
.page_tumbler{
  /*border: 1px solid red;*/
  /*padding: 10px;*/
}
.current-page-pagination > a{
  background: rgba(16, 89, 255, 0.75);
  color: #f1f1f1;
  font-weight: bold;
}
.disable_link svg{
  stroke: #bbbbbb;
}
</style>
