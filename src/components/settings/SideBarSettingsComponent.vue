<template>
  <div class="settings-sidebar-list">
    <span><router-link to="/settings/profile">Акаунт</router-link></span>
    <span><router-link to="/settings/privacy">Приватність</router-link></span>
<!--    <span><router-link to="/settings/advanced">Інші</router-link></span>-->
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
  padding: 1rem;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  width: 15%;
}

.settings-sidebar-list > span{
  display: flex;
  /*padding: 5px 10px;*/
  margin: 5px 0;
  border: 1px solid #419FD9;
  border-radius: 4px;
}
.settings-sidebar-list >span > a{
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  /*margin: 5px 0;*/
  /*border: 1px solid #1c5cfc;*/
  border-radius: 4px;
  outline: none;
  text-decoration: none;
  /*color: #535353;*/
}


.router-link-active, .router-link-exact-active{
  color: white;
  /*background-image: linear-gradient(120deg, #141E30 0%, #243B55  100%); */
  background: #419FD9;
  /*#141E30 0%, #243B55  51%*/
  /*#00c7c5 0%, #0088d7 100%*/
    /*background-image: linear-gradient(to right, #ECE9E6 0%, #FFFFFF  51%, #ECE9E6  100%);*/
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