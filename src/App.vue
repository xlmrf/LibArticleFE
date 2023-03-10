<template v-cloak>
  <div class="window">
    <div class="city">
      <router-view />
    </div>
    <supplement class="subway"></supplement>
  </div>
  <!--  <loader v-else class="page-loader" width="3" radius="15"></loader>-->
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import Supplement from "./components/footer/FooterComponent"

export default {
  name: 'App',
  components: {Supplement},
  mounted() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'ua')
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: 0;
  /*font-family: 'Manrope Var','Manrope','Inter Var','Inter',Arial,sans-serif;*/
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

[v-cloak] {
  display: none;
}

.window {
  /*overflow: scroll;*/
  /*overflow-x: hidden;*/
  height: 100%;
  display: flex;
  flex-direction: column;
}


body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.subway {
  min-height: 22px;
  height: 100px;
  display: block;
}

.city {
  flex: 1;
  /*min-height: 450px;*/
}

input {
  border: 1px solid #bbb;
}

.w-70{
  width: 70%;
}

.w-40{
  width: 40%;
}

.item-underline{
  position: relative;
  overflow:hidden;
  outline: none;
}

.item-underline:after{
  content:'';
  position:absolute;
  width:100%;
  height:0.05rem;
  left:0;
  bottom:3px;
  background: #bfbfbf;
}

.user-avatar-cycle{
  object-fit: cover;
  border-radius: 50%;
}

/*others*/


.middle-spinner {
  justify-content: center;
  /*background: rgba(222, 222, 222, 0.38);*/
  border-radius: 5px;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 -50% 0 0;
  transform: translate(-50%, -50%);
  /*width: 100%;*/
  /*height: 100%;*/
  z-index: 999;
}

.middle-spinner > span {
  display: flex;
  margin: 24px;
}

.main-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  /*border: 1px solid fuchsia;*/
}

.save-session {
  /*width: 250px;*/
  /*margin: 1rem 0 1rem 7rem;*/
  cursor: pointer;
}

.delete-item{
  cursor: pointer;
  color: rgba(229, 50, 45, 0.8);
}
.delete-item > svg:hover{
  stroke: rgba(229, 50, 45, 0.8);
}
.button{
  background: white;
  cursor: pointer;
  border: 1px solid #222222;
  padding: 3px 5px;
}

</style>