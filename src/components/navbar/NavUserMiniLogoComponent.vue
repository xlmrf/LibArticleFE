<template>
  <div class="user-logo-menu">
    <nav>
      <span @click="toggleDropdown" :class="{'active-nav-menu':openNavMenu}">
<!--        https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg-->
<!--        <img v-if="getPhoto" class="user-nav-avatar" :src="getPhoto !== 'not_found'? 'http://s1.libarticle.loc/api/image/'+ getPhoto : '../../assets/default_user_icon2.png'" alt="">-->
            <img v-if="getPhoto" class="user-nav-avatar" :src="getPhoto" alt="">
      </span>
      <ul :class="['nav-menu',{'open-nav-menu':openNavMenu}]">
        <li><router-link class="menu-link-item" :to="'/profile/'+getUser.id">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Акаунт</router-link></li>
        <li><router-link class="menu-link-item" :to="isDocument ? '/document/make/'+isDocument.id : '/document/make'">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"/><path d="M14 3v5h5M18 21v-6M15 18h6"/></svg>
          Додати</router-link></li>
        <li><router-link class="menu-link-item" to="/my-documents?my=true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          Документи</router-link></li>
        <li><router-link class="menu-link-item" to="/activity">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Активність</router-link></li>
        <li><router-link class="menu-link-item settings-link" to="/settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Налаштування</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  // emits:['openMenu'],
  data(){
    return{
      openNavMenu:false,
      isDocument: ''
    }
  },
  methods:{
    toggleDropdown(e) {
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
    ...mapGetters(['getPhoto','getUser'])
  },
  mounted() {
    document.addEventListener('click', this.close)
    this.isDocument = JSON.parse(localStorage.getItem('not_finished_document'))
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
  /*position: fixed;*/
  height: 100%;

  /*left: 0;*/
  right: 0;
  background: #fff;
  /*box-shadow: 0 5px 10px rgba(0,0,0,.1);*/
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
  /*box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;*/
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  position: absolute;
  margin-top: 52px;
  left: -7.5rem;
  display: none;
  min-width: auto;
  border-radius: 5px;
  background: #fff;
  list-style: none;
  z-index: 999;
}
.nav-menu li{
  width: 11rem;
}
.menu-link-item:hover{
  background: rgba(19, 9, 24, 0.12);
  /*background: rgba(34, 202, 229, 0.32);*/
  /*border-top: 1px solid #212121;*/
  /*border-bottom: 1px solid #212121;*/
}
.nav-menu li:hover{
  /*background: #D3E0FF;*/
  border-radius: 3px;
}
.menu-link-item{
  border: 1px solid transparent;
  white-space: nowrap;
  display: flex;
  align-items: center;
  /*justify-content: space-around;*/
  /*display: inline-block;*/
  padding: 5px 0;
  position: relative;
  width: 100%;
  text-decoration: none;
  color: #212121;
}
.menu-link-item > svg{
  margin: 0 5px;
}
.user-logout-item{
  cursor: pointer;
  transition: transform 0.7s ease;
}
.user-logout-item:hover{
  box-shadow: rgba(239, 54, 54, 0.82) 0px -5px 2px -2px inset;
  border: 1px solid transparent;
}
.nav-menu li a:hover{
  /*background: #eaecef;*/
}

.user-nav-avatar{
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
span{
  display: flex;
  align-items: center;
  cursor: pointer;
}
span::after{
  content: "›";
  margin-left: 5px;
  height:20px;
  width:20px;
  line-height:20px;
  font-size: 25px;
  text-align: center;
  transform: rotate(90deg);
  position:relative;
}
.active-nav-menu::after{
  right:8px;
  transform: rotate(-90deg);
  color: #1360b6;
}
.open-nav-menu{
  display: initial;
}

/*.router-link-exact-active{*/
/*  background: rgba(19, 9, 24, 0.12);*/
/*}*/
/*.user-logo-menu nav:focus-within > ul,*/


</style>