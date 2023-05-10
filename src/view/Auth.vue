<template>
  <div class="auth-template">
    <h2>LIBARTICLE</h2>
    <div class="content">
      <h2>
        <span v-if="$route.name === 'login'">Login</span>
        <span v-if="$route.name === 'registration'">Registration</span>
      </h2>
      <div class="mainframe">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

*{
  box-sizing: border-box;
}

.auth-template{
  height: 100%;
  display: flex;
  flex-flow: column;
  position: relative;
}

.auth-template > h2{
  margin-left: 50px;
}

.content{
  /*padding: 1rem;*/
  display:flex;
  flex-direction: column;
  justify-content: center;
  width:100%;
  /*max-width:500px;*/
  position: relative;
  top: 25%;
  /*left: 50%;*/
  /*margin-right: -50%;*/
  /*transform: translate(-50%, -50%);*/
}

.content > h2{
  text-align: center;
  position: relative;
  bottom: 40px;
  font-size: 28px;
  /*margin-bottom: 10px;*/
}

.marker{
  font-size: 18px;
}
.form-control{
  display:grid;
  /*border: 1px dashed darkblue;*/
  grid-template-rows: auto;
}
.area-control, .sign-in-system{
  display: flex;
  justify-self: center;
}
.area-control{
  position: relative;
  margin-bottom: 30px;

}
.form-control > div{
  /*border: 1px solid darkmagenta;*/
  /*width: 300px;*/
  display: flex;
  justify-self: center;
}
.form-trip{
  display:flex;
  flex-direction:column;
}
.input{
  font-size: 18px;
  padding: 10px;
  display: block;
  width: 300px;
  border: 1px solid #cecece;
  border-radius:7px;
  position: relative;
  height: 2.7rem;
  color: #212121;
  /*border-bottom: 1px solid #ccc;*/
}

.input:valid {
  border: 1px solid #1059FF;
}

.input:hover {
  border: 1px solid #212121;
}

.input:focus {
  outline: none;
  border: 2px solid #212121;
}

.btn{
  height:40px;
  width: 300px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 16px;
  background: none;
  border: 1px solid #212121;
  color: #212121;
  transition: 0s;
}

.btn:hover{
  border: 2px solid #212121;
}
.link{
  /*text-decoration: none;*/
  color: #212121;
}

.load{
  cursor: default;
  border: 1px solid #717171;
  color: #717171;
}
.load:hover{
  border: 1px solid #717171;
}
.form-trip{
  display: flex;
  text-align: center;
}
.form-trip>span{
  padding-top: 1rem;
}
.text-to{
  /*text-decoration: underline;*/
  color: #212121;
}

.type-loader{
  position: relative;
  display: flex;
  align-items: center;
  left: 50px;
}

.sign-in-system{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}

.message-error{
  position: absolute;
  left: 50%;
  top:10%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  /*text-align: center;*/
  color: rgba(21,21,21, 0.6);
}
</style>