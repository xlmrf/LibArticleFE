<template>
  <div class="main-card">
    <side-bar></side-bar>
    <div class="main-window">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBarSettingsComponent"
export default {

  components:{SideBar}
}
</script>

<style scoped>
.main-card{
  background: #F1F1F1;
  height: auto;
  flex-direction: row;
  padding: 1rem;
  /*padding: 1rem;*/

}
.main-card:last-child{

}
.main-window{
  background: #fff;
  margin: 0 5%;
  padding: 10px;
  width: 60%;
  border: 1px solid #bbb;
  border-radius: 5px;
}
.inp-e{
  border: 1px solid #CCCCCC;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-size: 16px;
  resize: none;
  outline: none;
  width: 100%;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -ms-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  transition: all .3s ease-out
}

</style>