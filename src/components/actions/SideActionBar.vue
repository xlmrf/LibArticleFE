<template>
  <div class="settings-sidebar-list">
    <div>
      <span class="settings-bar-link"><router-link :to="{name:'actions.notices'}"><span>{{ this.$store.getters.getLanguage.actions.left_bar_titles.notices }}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></router-link></span>
      <span class="settings-bar-link"><router-link :to="{name:'actions.story'}"><span>{{ this.$store.getters.getLanguage.actions.left_bar_titles.actions }}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></router-link></span>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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