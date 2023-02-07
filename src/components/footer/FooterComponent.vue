<template>
  <div class="subway-list">
    <div class="subway-tutorial">
      <span class="manual-item">@ 2022 LibArticle</span>
<!--      <router-link to="/tutorial" class="manual-item">-->
<!--        <span>Документація</span>-->
<!--      </router-link>-->
<!--      <router-link to="/support" class="manual-item">-->
<!--        <span>Підтримка</span>-->
<!--      </router-link>-->
<!--      <router-link to="/rules" class="manual-item">-->
<!--        <span>Правила</span>-->
<!--      </router-link>-->
    </div>
<!--    <div class="subway-info">-->
<!--      <small>&copy; 2022</small>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
  background: #F7F7FB;
}
.subway-list{
  text-align: center;
}

.subway-tutorial{
  align-items: end;
}
span{
  cursor: default;
}
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
.subway-info{
  margin: 5px;
}

.new-author{

  /*background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%);*/
  background-image: linear-gradient(135deg, #00c7c5 0%, #0088d7 100%);
  position: relative;
  cursor: pointer;
  margin: 0 10%;
  /*padding: 5px;*/
  overflow:hidden;
  /*background: none;*/
  border: none;
  outline: none;
  /*color: #525252;*/
  text-align: center;
  text-transform: uppercase;
  /*transition: 0.5s;*/
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  /*display: block;*/
  font-size: 14px;
  /*margin:0.5rem auto;*/
  /*align-self: end;*/
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: 0.5s ease all;
  -moz-transition: 0.5s ease all;
  -webkit-transition: 0.5s ease all;
}
</style>