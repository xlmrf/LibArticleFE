<template>
  <div class="settings-sidebar-list">
    <div>
      <span class="settings-bar-link messages-link"><router-link :to="{name:'actions.notices'}">
        <span>{{ getLanguage.actions.left_bar_titles.notices }}
<!--        <small class="action-counter" v-if="messagesCount > 0">{{messagesCount}}</small>-->
      </span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span class="messages-count" v-if="getNewMessagesCount > 0">{{ getNewMessagesCount }}</span></router-link>
      </span>
      <span class="settings-bar-link"><router-link :to="{name:'actions.story'}"><span>{{ getLanguage.actions.left_bar_titles.actions }} <small class="action-counter" v-if="actionsCount > 0">{{actionsCount}}</small></span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg></router-link></span>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import axios from "axios";
import router from "@/router";

export default {

  data(){
    return{
      messagesCount: 0,
      actionsCount: 0,

    }
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
  computed:{
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
    getMessagesCount(){
      axios.get(this.api_url_v1 + '/actions/messages-count').then(response => {
        this.messagesCount = response.data.messages_count
      }, err => {
        console.log('views error:',err);
      })
    },
    getActionsCount(){
      axios.get(this.api_url_v1 + '/actions/actions-count').then(response => {
        this.actionsCount = response.data.actions_count
      }, err => {
        console.log('views error:',err);
      })
    },
    ...mapGetters(['getLanguage', 'getNewMessagesCount']),
    ...mapState(['api_url_v1'])
  },
  mounted() {
    this.getMessagesCount
    this.getActionsCount
  }

}
</script>

<style scoped>

.messages-count{
  background: #A0C7ED;
  color: #222222;
  padding: 1px 7px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  z-index: 99;
  /*right: -10px;*/
  left: calc(100% - 20px);
  top: -1px;
}

.messages-link{
  display: flex;
  align-items: center;
  position: relative;
}

.messages-link span{
  display: flex;
}

a{
  color: #535353;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.settings-sidebar-list{
  background: #fff;
  display: flex;
  flex-flow: column;
  /*position: fixed;*/
  /*flex-flow: column;*/
  /*padding: 1rem;*/
  min-height: 100vh;
  padding-right: 5px;
  position: relative;
  border-radius: 5px;
  width: 180px;
}

.settings-sidebar-list > div{
  position: fixed;
  height: 200px;
  /*height: calc(100% - 170px);*/
  /*min-height: 200px;*/
  width: 177px;
}

.settings-bar-link:hover{
  background: rgba(241, 241, 241, 0.5);
}

.settings-sidebar-list:after{
  content: '';
  position:absolute;
  width: 1px;
  height:100%;
  /*left:0;*/
  right: 1px;
  bottom:0;
  background: rgba(191, 191, 191, 0.5);
}

.settings-bar-link{
  display: flex;
  /*padding: 5px 10px;*/
  margin: 5px 0;

  border-radius: 4px;
}


.action-counter{
  /*background: #ffffff;*/
  color: #7f7f7f;
  font-size: 14px;
  border-radius: 30px;
  padding: 1px 8px;
  margin-left: 3px;
}

.settings-bar-link > a{
  width: 100%;
  height: 100%;
  padding: 10px;
  /*margin: 5px 0;*/
  /*border: 1px solid #1c5cfc;*/
  border-radius: 4px;
  outline: none;
  text-decoration: none;
  /*color: #535353;*/

}

.router-link-active, .router-link-exact-active{
  background: #f1f1f1;
}



.btn-grad {
  background-image: linear-gradient(to right, #141E30 0%, #243B55  51%, #141E30  100%);
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}



</style>