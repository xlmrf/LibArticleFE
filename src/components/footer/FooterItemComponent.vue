<template>
    <div class="block">
      <button class="manual-item btn btn-mid">hello</button>
      <button class="manual-item btn btn-bottom">hello</button>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.block{
  border:1px solid #919191;
  background:#F7F7FB;
  height:50px;
  font-family: "Roboto",-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI",Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
}
.manual{
  list-style:none;
}
.manual li{
  position:relative;
  float:left;
}
.btn{
  padding:10px;
  text-decoration:none;
  background: none;
  position:relative;
  border: none;
  outline: none;
  color: #212121
}
.btn::after{
  content:'';
  position:absolute;
  width:100%;
  height:0.1rem;
  left:0;
  bottom:0;
  background: #ea0e4b;
}

.btn-mid::after{
  transform:scale(0,1);
  transition: transform 0.2s ease;
}
.btn-mid:hover::after{
  transform:scale(1,1);
}

.btn-bottom{
  overflow:hidden;
}
.btn-bottom::after{
  transform: translateY(3px);
  transition: transform 0.3s ease;
}
.btn-bottom:hover::after{
  transform: translateY(0);
}
</style>