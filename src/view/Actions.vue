<template>
  <div class="settings-main-card">
    <side-action-bar></side-action-bar>
    <div class="settings-main-window">
      <actions-nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Loader from "@/components/additional/loader";
import SideActionBar from "@/components/actions/SideActionBar";
import ActionsNav from "@/components/actions/ActionsNav";

import {mapGetters, mapState} from "vuex";

export default {
  components: {SideActionBar, Loader, ActionsNav},
  data() {
    return {
      isDragging: false,
      files: [],
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
      }
    },
    'search.events':{
      handler(){
        //
      }
    }
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
    ...mapGetters(['getLanguage', 'getNewNoticesCount']),
    ...mapState(['api_url_v1'])
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100vh;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  display: flex;
  width: 592px;
  height: 400px;
  padding:10px;
  border-radius: 4px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.dropzone-active{
  border: 2px solid #1C75DD;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  width: 100%;
  align-self: center;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}



</style>