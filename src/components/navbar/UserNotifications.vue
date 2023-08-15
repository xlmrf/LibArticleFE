<template>
  <div class="user-logo-menu">
    <nav>
      <span @click="toggleDropdown" :class="{'active-nav-menu':openNavMenu}">
        <svg class="alert-bell" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
      </span>
      <ul :class="['nav-menu',{'open-notices-menu':openNavMenu}]">
        <li v-for="notice in lastNotices" @click="goToMessage(notice.id)">
<!--          <router-link :class="['menu-link-item',{'unread-notice':!notice.check}]" :to="'/profile/1'">{{notice.message+' '+myTruncate(this.title,15, '...')}}<span>{{ notice.date }}</span></router-link>-->
          <span :class="['menu-link-item',{'unread-notice':!notice.check }]" v-html="getMessageUa({type:notice.type, document_title:myTruncate(notice.document_title,35, '...'), document_id:notice.document_id})"></span>
        </li>
        <li class="see-all" @click="ShowNotices" >
          <span class="menu-link-item" v-if="getNewNoticesCount === 0">{{ this.$store.getters.getLanguage.navbar.nav_notices.none_messages }}</span>
          <span class="menu-link-item" v-else>
            {{this.$store.getters.getLanguage.navbar.nav_notices.new_messages}}
            <small >{{getNewNoticesCount}}</small>
          </span>
        </li>
<!--        {{Object.values(notificationMessages).filter(item => item.check === true).length}}-->

<!--        <span class="menu-link-item" v-else>{{ this.$store.getters.getLanguage.navbar.nav_notices.none_messages }}</span>-->
      </ul>
    </nav>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import axios from "axios";

export default {
  mixins:['truncate', 'messages'],
  data(){
    return{
      openNavMenu:false,
      title:'Технології оптимального оброблення сигналів',
      lastNotices:[]
    }
  },
  methods:{
    ...mapMutations(['updateNewNoticesCount']),
    toggleDropdown(e) {
      this.lastNotices.some(e => e.check)
      this.openNavMenu = !this.openNavMenu
    },
    close (e) {
      if (!this.$el.contains(e.target) || e.target.localName === 'span')
      {
        this.openNavMenu = false
      }
    },
    goToMessage(id) {
      // Перехід до повного повідомлення з використанням якоря
      this.$router.push({ path: '/actions/notices#'+2 });
    },
  },
  computed:{
    ...mapGetters(['getUser', 'getNewNoticesCount']),
    ShowNotices(){
      this.$router.push('/actions/notices')
    },

    getNoticesCount(){
      axios.get(this.api_url_v1 + '/actions/count-new-notices').then(response => {
        this.updateNewNoticesCount(response.data.count_new_notices)
      }, err => {
        console.log('cites error:',err);
      })
    },
    getLastNotices(){
      axios.get(this.api_url_v1 + '/actions/last-notices').then(response => {
        this.lastNotices = response.data.last_notices
      }, err => {
        console.log('cites error:',err);
      })
    },
    ...mapState(['api_url_v1'])
  },

  mounted() {
    this.getNoticesCount
    this.getLastNotices
    document.addEventListener('click', this.close)
  },
  beforeDestroy () {
    document.removeEventListener('click',this.close)
  },
}
</script>

<style scoped>
*{
  font-size: 18px;
}
.user-logo-menu{
  height: 100%;
  right: 0;
  background: #fff;
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.user-logo-menu nav{
  position: relative;
  color: #212121;
  display: inherit;
}
.nav-menu{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: absolute;
  margin-top: 37px;
  left: -220px;
  display: none;
  min-width: auto;
  border-radius: 5px;
  background: #fff;
  list-style: none;
  z-index: 999;
}
.nav-menu li{
  border-radius: 3px;
  width: 280px;
  /*white-space: pre;*/
}
.nav-menu > *:hover{
  background: rgba(187, 187, 187, 0.42);
}

.menu-link-item{
  border: 1px solid transparent;
  font-size: 15px;
  display: flex;
  align-items: center;
  padding: 10px 0 10px 5px;
  position: relative;
  width: 100%;
  text-decoration: none;
  color: #333333;
  flex-wrap: wrap;
}
.see-all{
  font-weight: bold;
}
.menu-link-item > small{
  font-size: 15px;
  margin: 0 10px;
  padding: 0 10px;
  border-radius: 40px;
  background: rgba(49, 140, 231, 0.22);
}
.unread-notice{
  /*background: rgba(65, 159, 217, 0.13);*/
  background: rgba(70, 194, 243, 0.3);
}
/*.menu-link-item:hover{*/
/*  background: rgba(255,255,255,0.5);*/
/*}*/
.menu-link-item > svg{
  margin: 0 5px;
}
span{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.open-notices-menu{
  display: initial;
}
.menu-link-item span{
  position: absolute;
  font-size: 0.6em;
  margin-top: 3.2rem;
  margin-left: 9.5rem;
}
.alert-circle{
  position: absolute;
  /*margin-top: -1.1rem;*/
  /*margin-left: 0.8rem;*/
  margin-left: -1rem;
  border: 1px solid;
}
.alert-circle svg{
  position: absolute;
  width: 16px;
  height: 16px;
  fill: rgb(243, 42, 42);
}
.alert-circle small{
  z-index: 10;
  margin-left: 0.5rem;
  color: #212121;
}
.none-messages{
  text-align: center;
  cursor: default;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.alert-bell:hover{
  stroke: #212121;
}

</style>