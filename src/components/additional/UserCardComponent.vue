<template>
  <div class="nav-nickname" @click="dropToggle = !dropToggle">
    <div>
      <!--            <router-link class="nav-name link" to="/user/settings">{{user.name}}</router-link>-->
      <span class="user-nickname">{{user.name}}</span>
    </div>
    <div :class="['dropdown-content', {'drop-vision' : !dropToggle}]">
      <router-link class="drop-list-item link" :to="'/new_document'">Новый документ</router-link>
      <router-link class="drop-list-item link" :to="'/library'">Библиотека</router-link>
      <router-link class="drop-list-item link" to="/story">История</router-link>
      <router-link class="drop-list-item link" to="/settings">Настройки</router-link>
      <span class="drop-list-item link" @click="alert = true">Выйти</span>
    </div>
  </div>
  <teleport to="body" v-if="alert">
    <div class="exit-alert modal" v-if="!loader">
      <h3>Вы действительно хотите выйти?</h3>
      <div class="choice-btn">
        <span @click="logOut">Да</span>
        <span @click="alert = false">Нет</span>
      </div>
    </div>
    <div class="loading modal" v-else>
      <loader class="mid_loader" :width="4" :radius="12"></loader>
    </div>
    <div class="alert-background" @click="alert = false"></div>
  </teleport>
</template>

<script>
import loader from "../helpers/loader";
import {mapActions, mapGetters} from "vuex";
export default {
  props:['user'],
  data(){
    return{
      dropToggle: false,
      alert: false,
      loader: false
    }
  },
  methods:{
    ...mapActions(['logout'])
  },
  computed:{
    logOut(){
      this.loader = true
      this.logout()
    }
  },
  components:{loader}

}
</script>

<style scoped>
.exit-alert{
  display: flex;
  flex-direction: column;
  font-size: 1em;
  width: 350px;
  height: 120px;
  background: whitesmoke;
  border-radius: 1rem;
  z-index: 50;
}
.exit-alert > h3{
  margin: 5px;
  color: #212121;
  text-align: center;
}
.choice-btn{
  display: inherit;
  height: 90%;
  align-items: end;
  margin: 20px 10px;
  justify-content: space-around;
}
.choice-btn > span{
  font-size: 1.2em;
  cursor: pointer;
  border-bottom: 1px solid transparent;
}
.choice-btn > span:hover{
  border-bottom: 1px solid #1059FF;
}
.alert-background{
  background: rgba(33,33,33,0.7);
  z-index: 49;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.dropdown-content{
  display: grid;
  /*height: 100px;*/
  margin-top: 20px;
  position: absolute;
  width: 200px;
  left: 85%;
  min-width: 160px;
  /*box-shadow: 0px 2px 1px 0px rgba(0,0,0);*/
  z-index: 2;
  transition: 0.1s;
}
.drop-vision{
  display: none;
}
.drop-list-item{
  background: whitesmoke;
  border-bottom: 1px solid transparent;
}
.drop-list-item:hover{
  /*background: rgba(241, 242, 250);*/

  border-bottom: 1px solid #318CE7;
}
.nav-nickname{
  font-size: 1.3em;
  text-transform: uppercase;
  cursor: pointer;
}
.loading {
  background: #efefef;
  border-radius: 5px;
  height: 70px;
  width: 70px;
  z-index: 51;
}
.mid_loader{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
