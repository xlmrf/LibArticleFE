<template>
  <div class="actions-top-bar">
    <span class="settings-bar-link message-count" v-if="getMessages[$route.fullPath.substring($route.fullPath.lastIndexOf('/') + 1)].length > 0">{{countMessage[$route.fullPath.substring($route.fullPath.lastIndexOf('/') + 1)]}}</span>
    <span class="settings-bar-link message-count" v-else>Not found</span>
    <span class="settings-bar-link search-bar">
        <span>
          <input type="text" name="" id="searcher" required
                 v-model="search[$route.fullPath.substring($route.fullPath.lastIndexOf('/') + 1)]"
                 :placeholder="getLanguage.actions.left_bar_titles.searcher[$route.name]">
        </span>
        <label for="searcher"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></label>
    </span>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import axios from "axios";
import router from "@/router";

export default {

  data() {
    return {
      countMessage:{
        notices:0,
        events:0,
      },
      test:'',
      search:{
        notices: '',
        events: ''
      }
    };
  },
  watch:{
    'search.notices':{
      handler(){
        this.getNotices
        this.getCites()
      }
    },
    'search.events':{
      handler(){
        //
        this.getCites()
      }
    },
    'getMessages.notices':{
      handler(){
        this.countMessage.notices = this.getMessages.notices.length
      }
    },
    'getMessages.events':{
      handler(){
        this.countMessage.events = this.getMessages.events.length
      }
    }
  },
  methods:{
    getCites(){
      let id = router.currentRoute.value.params.id
      axios.get(this.api_url_v1 + '/actions/'+ this.$route.fullPath.substring(this.$route.fullPath.lastIndexOf('/') + 1) + '?q='+this.search[this.$route.fullPath.substring(this.$route.fullPath.lastIndexOf('/') + 1)]+'&perPage=5').then(response => {
        this.$store.commit('up'+this.$route.fullPath.substring(this.$route.fullPath.lastIndexOf('/') + 1), response.data.data)

        this.lastPage = response.data.last_page

        this.pageCounter = 1

      }, err => {
        console.log('get cites error:',err);
      })
    },
  },

  computed: {
    getNotices() {
      // axios.get(this.api_url_v1 + '/document/' + id + '/citation?q=' + this.searchCites + '&perPage=5').then(response => {
      //
      //   this.lastPage = response.data.last_page
      //   this.document_cites = response.data.data
      //   this.pageCounter = 1

      // }, err => {
      //   console.log('get cites error:', err);
      // })
    },
    // getNoticesCount(){
    //   axios.get(this.api_url_v1 + '/actions/notices-count').then(response => {
    //     this.countMessage.notices = response.data.notices_count
    //   }, err => {
    //     console.log('views error:',err);
    //   })
    // },
    // getActionsCount(){
    //   axios.get(this.api_url_v1 + '/actions/events-count').then(response => {
    //     this.countMessage.events = response.data.events_count
    //   }, err => {
    //     console.log('views error:',err);
    //   })
    // },
    ...mapGetters(['getLanguage', 'getNewNoticesCount','getMessages']),
    ...mapState(['api_url_v1'])
  },

  mounted() {
    // this.getNoticesCount
    // this.getActionsCount
    console.log(this.$route);
  }


}
</script>

<style scoped>

.actions-top-bar{
  display: flex;
  padding: 10px 5px;
}

.message-count{
  align-self: center;
  margin-left: 20px;
  color: #7f7f7f;
}

.search-bar{
  display: flex;
  margin-left: auto;
  width: fit-content;
  position: relative;
  /*bottom: 0;*/
}
.search-bar input{
  padding: 7px 30px 7px 5px;
  font-size: 16px;
  border-radius: 3px;
  width: 200px;

  background: #fafafa;
  border: 1px solid #bbbbbb;
  resize: none;
  outline: none;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  transition: all .3s ease-out
}

.search-bar input:valid{
  border: 1px solid #929292;
  width: 300px;
}

.search-bar input:focus,
.search-bar input:hover {
  width: 300px;
  background: #fff;
  border: 1px solid #419FD9;
}

.search-bar svg{
  position: absolute;
  top: 7px;
  right: 5px;

}
</style>