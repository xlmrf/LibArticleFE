<template>
  <div class="settings-main-card">
    <side-action-bar></side-action-bar>
    <div class="settings-main-window">
      <div class="actions-top-bar">
        <span class="settings-bar-link search-bar">
          <span>
            <input type="text" name="" id="searcher"
                   v-model="search[$route.fullPath.substring($route.fullPath.lastIndexOf('/') + 1)]"
                   :placeholder="getLanguage.actions.left_bar_titles.searcher[$route.name]">
          </span>
          <label for="searcher"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></label>
      </span>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Loader from "@/components/additional/loader";
import SideActionBar from "@/components/actions/SideActionBar";
import {mapGetters, mapState} from "vuex";

export default {
  components: {SideActionBar, Loader},
  data() {
    return {
      isDragging: false,
      files: [],
      search:{
        notices: '',
        story: ''
      }
    };
  },
  watch:{
    'search.notices':{
      handler(){
        this.getNotices
      }
    },
    'search.story':{
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
    ...mapGetters(['getLanguage', 'getNewMessagesCount']),
    ...mapState(['api_url_v1'])
  },
  methods: {
    onChange() {
      this.files = [...this.$refs.file.files];
      console.log('onChange',this.files)
    },
    dragover(e) {
      e.preventDefault();
      console.log('dragOver')
      this.isDragging = true;
    },
    dragleave() {
      console.log('dragLeave')
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      console.log('drop')
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
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


.actions-top-bar{
  padding: 10px 5px;
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
  width: 176px;

  background: #fafafa;
  border: 1px solid #bbbbbb;
  resize: none;
  outline: none;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  transition: all .3s ease-out
}

.search-bar input:valid,
.search-bar input:focus {
  border: 1px solid #929292;
}

.search-bar input:focus,
.search-bar input:hover {
  background: #fff;
  border: 1px solid #419FD9;
}

.search-bar svg{
  position: absolute;
  top: 5px;
  right: 5px;

}

</style>