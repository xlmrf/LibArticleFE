<template>
  <div class="settings-sidebar-list">
    <div>
      <span class="settings-bar-link"><router-link :to="{name:'settings.profile'}">Акаунт</router-link></span>
      <span class="settings-bar-link"><router-link :to="{name:'settings.security'}">Безпека</router-link></span>
      <span class="settings-bar-link"><router-link :to="{name:'settings.privacy'}">Приватність</router-link></span>
      <span class="settings-bar-link"><router-link :to="{name:'settings.advanced'}">Інше</router-link></span>
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