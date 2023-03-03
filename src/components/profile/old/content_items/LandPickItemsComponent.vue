<template>
  <div>
    <ul>
      <router-link to="statistics" class="manual-item">
        <span>Статистика</span>
      </router-link>
      <router-link to="folders" class="manual-item">
        <span>Папки</span>
      </router-link>
      <router-link to="rules" class="manual-item">
        <span>Останні додані</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.manual-item{
  font-size: 14px;
  padding:10px 25px;
  text-decoration:none;
  background: none;
  /*   border:1px solid #999; */
  position:relative;
  border: none;
  outline: none;
  color: #212121
}
.manual-item::after{
  content:'';
  position:absolute;
  width:100%;
  height:0.1rem;
  left:0;
  bottom:5px;
  background: #141414;
}
.manual-item{
  overflow:hidden;
}
.manual-item::after{
  transform:scale(0,1);
  transition: transform 0.22s ease;
}
.manual-item:hover::after{
  transform:scale(1,1);
}
/*router-link-active router-link-exact-active menu-link-item*/
</style>