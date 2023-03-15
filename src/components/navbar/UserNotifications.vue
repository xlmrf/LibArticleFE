<template>
  <div class="user-logo-menu">
    <nav>
      <span @click="toggleDropdown" :class="{'active-nav-menu':openNavMenu}">
        <svg class="alert-bell" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
      </span>
      <ul :class="['nav-menu',{'open-notices-menu':openNavMenu}]">
        <li v-for="notice in notificationMessages.slice(0,2)">
          <router-link :class="['menu-link-item',{'unread-notice':!notice.check}]" :to="'/profile/1'">{{notice.message+' '+myTruncate(this.title,15, '...')}}<span>{{ notice.date }}</span></router-link>
        </li>
        <span class="menu-link-item " @click="ShowNotices" v-if="notificationMessages.length > 2">Переглянути всі <small>{{Object.values(notificationMessages).filter(item => item.check === true).length}}</small></span>
        <span class="none-messages" v-if="!notificationMessages.length">Нових повідомлень немає</span>
      </ul>
    </nav>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  mixins:['truncate'],
  data(){
    return{
      openNavMenu:false,
      title:'Технології оптимального оброблення сигналів',
      notificationMessages:[
        {
          date:'18.06.2022',
          message: 'Ваш документ використали як посилання',
          check:false
        },
        {
          date:'16.06.2022',
          message: 'Вас позначили співавтором у документі',
          check:true
        },
        {
          date:'11.06.2022',
          message: 'Вас позначили співавтором у документі',
          check:false
        },
        {
          date:'08.06.2022',
          message: 'Вас позначили співавтором у документі',
          check:true
        },
        {
          date:'05.06.2022',
          message: 'Вас позначили співавтором у документі',
          check:false
        },
        {
          date:'01.06.2022',
          message: 'Вас позначили співавтором у документі',
          check:true
        }
      ]
    }
  },
  methods:{
    toggleDropdown(e) {
      this.notificationMessages.some(e => e.check)
      this.openNavMenu = !this.openNavMenu
    },
    close (e) {
      if (!this.$el.contains(e.target) || e.target.localName === 'a')
      {
        this.openNavMenu = false
      }
    }
  },
  computed:{
    ...mapGetters(['getUser']),
    ShowNotices(){
      // console.log(this.$route.name);
      this.$router.push('/actions/notices?from='+this.$route.name)
    }
  },
  mounted() {
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
  left: -10.5rem;
  display: none;
  min-width: auto;
  border-radius: 5px;
  background: #fff;
  list-style: none;
  z-index: 999;
}
.nav-menu li{
  border-radius: 3px;
  width: 13rem;
}
.nav-menu > *:hover{
  background: rgba(187, 187, 187, 0.42);
}

.menu-link-item{
  border: 1px solid transparent;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  padding: 10px 0 10px 5px;
  position: relative;
  width: 100%;
  text-decoration: none;
  color: #212121;
}
.menu-link-item small{
  font-size: 14px;
  margin: 0 0.5rem;
  padding: 0 10px;
  border-radius: 40px;
  background: rgba(19, 9, 24, 0.12);
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