<template>
  <div class="settings-sidebar-list">
    <span><router-link :to="{name:'settings.profile'}">Акаунт</router-link></span>
    <span><router-link :to="{name:'settings.privacy'}">Приватність</router-link></span>
    <span><router-link :to="{name:'settings.security'}">Безпека</router-link></span>
    <span><router-link :to="{name:'settings.advanced'}">Інше</router-link></span>
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
  height: 100%;
  background: #fff;
  display: flex;
  flex-flow: column;
  /*position: fixed;*/
  /*flex-flow: column;*/
  /*padding: 1rem;*/
  padding-right: 5px;
  position: relative;
  border-radius: 5px;
  width: 15%;
}

.settings-sidebar-list:after{
  content: '';
  position:absolute;
  width: 1px;
  height:100%;
  /*left:0;*/
  right: 1px;
  bottom:0;
  background: #bfbfbf;
}

.settings-sidebar-list > span{
  display: flex;
  /*padding: 5px 10px;*/
  margin: 5px 0;

  border-radius: 4px;
}



.settings-sidebar-list >span > a{
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