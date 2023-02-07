
<template v-cloak>
  <div class="window">
    <div class="city">
      <router-view/>
    </div>
    <!--    <supplement class="subway"></supplement>-->
  </div>
  <!--  <loader v-else class="page-loader" width="3" radius="15"></loader>-->
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import Supplement from "./components/footer/FooterComponent"

export default {
  //Lexa1
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
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

[v-cloak] {
  display: none;
}

.window {
  /*overflow: scroll;*/
  overflow-x: hidden;
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
  display: block;
}

.city {
  flex: 1;
  /*background: #f1f1f1;*/
  min-height: 450px;
}

input {
  border: 1px solid #bbb;
}

/*others*/


.middle-spinner {
  justify-content: center;
  background: #f1f1f1;
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

</style>