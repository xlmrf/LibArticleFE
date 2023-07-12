<template>
  <div class="actions-top-bar">
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
import {mapGetters, mapState} from "vuex";

export default {
  data() {
    return {
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

}
</script>

<style scoped>

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