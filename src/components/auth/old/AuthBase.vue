<template>
<!--  <div class="loader" v-if="loader">-->
<!--    <loader :radius="15" :width="4"></loader>-->
<!--  </div>-->
  <h2>LIBARTICLE</h2>
  <div class="content">
    <h2>{{$route.name}}</h2>
    <div class="mainframe">
        <router-view></router-view>
    </div>
  </div>

<!--  main-->
<!--    - login {req->email, pass; res-> [User+token]||[errors:[{error:''},{error:''}]]}-->
<!--    - registration {req-> email}-->
<!--      - registration-confirm (email&token)-->
<!--    - recovery (email)-->
<!--      - recovery-confirm (email&token -> email&token&password)-->


<!--  ['errors' => [['code' => 'credentials_incorrect', 'text' => 'The provided credentials are incorrect.']]]-->
<!--  ['message' => [['code' => 'confirmation', 'text' => 'Confirmations token send you on email']]]-->

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import loader from "../../additional/loader";

export default {

  setup() {
    return{
      token:''
    }
  },
  methods:{
    // ...mapActions(['requestUser']),
  },
  computed:{
    // ...mapGetters(['getUser']),
    // ...mapGetters(['loader']),
  },
  mounted() {
    // this.token = localStorage.getItem('access_token')
    // this.requestUser(this.token)
  },
  components:{loader}

}
</script>

<style>
/**{*/
/*  box-sizing: border-box;*/
/*}*/
.auth-top{
  display: flex;
  justify-content: center;
  position: relative;
}
.mainframe{
  display: flex;
  /*padding: 2rem;*/
  /*box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;*/
  /*border-radius: 4px;*/
  /*background: #fff;*/
  flex-flow: column;
  width:100%;
}
h2{
  cursor: default;
  /*position: absolute;*/
  color: #212121;
  /*padding: 1rem;*/
  /*text-align: center;*/
  font-size: 28px;
}
.content h2{
  top: -4.5rem;
}
.sign-in-system{
  color: aqua;
  background: rgba(255, 0, 0, 0.32);
}
/*.input{*/
/*  font-size: 16px;*/
/*  display: block;*/
/*  border: 1px solid #cecece;*/
/*  position: relative;*/
/*  color: #212121;*/
/*}*/
/*.btn{*/
/*  cursor: pointer;*/
/*  font-size: 16px;*/
/*  background: none;*/
/*  border: 1px solid #212121;*/
/*  color: #212121;*/
/*  transition: 0s;*/
/*}*/

/*.sign-in-system{*/
/*  height:40px;*/
/*  width: 200px;*/
/*  border-radius: 7px;*/
/*}*/

/*.auth-form{*/
/*  display:flex;*/
/*  flex-direction: column;*/
/*  justify-content: center;*/
/*  width:100%;*/
/*  max-width:500px;*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  margin-right: -50%;*/
/*  transform: translate(-50%, -50%)*/
/*}*/
/*.marker{*/
/*  font-size: 18px;*/
/*}*/
/*.area-control, .sign-in-system{*/
/*  display: flex;*/
/*  justify-self: center;*/
/*}*/
/*.form-trip{*/
/*  display:flex;*/
/*  flex-direction:column;*/
/*}*/
/*.input{*/
/*  font-size: 18px;*/
/*  padding: 10px;*/
/*  display: block;*/
/*  width: 300px;*/
/*  border: 1px solid #cecece;*/
/*  border-radius:7px;*/
/*  position: relative;*/
/*  height: 2.7rem;*/
/*  color: #212121;*/
/*  !*border-bottom: 1px solid #ccc;*!*/
/*}*/
/*h1{*/
/*  display:flex;*/
/*  justify-content:center;*/
/*  padding:10px;*/
/*  margin-bottom: 50px;*/
/*  color: #212121;*/
/*}*/
/*.link{*/
/*  !*text-decoration: none;*!*/
/*  color: #212121;*/
/*}*/

/*.load{*/
/*  cursor: default;*/
/*  border: 1px solid #717171;*/
/*  color: #717171;*/
/*}*/
/*.load:hover{*/
/*  border: 1px solid #717171;*/
/*}*/
/*.form-trip{*/
/*  display: flex;*/
/*  text-align: center;*/
/*}*/
/*.form-trip>span{*/
/*  padding-top: 1rem;*/
/*}*/
/*.text-to{*/
/*  !*text-decoration: underline;*!*/
/*  color: #212121;*/
/*}*/
/*.link-reset{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  color: #212121;*/
/*}*/
/*.link-reset:hover{*/
/*  color: #7f7f7f;*/
/*}*/
/*.alert{*/
/*  border: 1px solid #EB4C42;*/
/*  background: rgba(255, 15, 0, 0.1);*/
/*  border-radius: 5px;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  width: 300px;*/
/*}*/

/*.type-loader{*/
/*  position: absolute;*/
/*  right: 11rem;*/
/*}*/

/*.message-error{*/
/*  position: absolute;*/
/*  left: 50%;*/
/*  top:10%;*/
/*  margin-right: -50%;*/
/*  transform: translate(-50%, -50%);*/
/*  !*text-align: center;*!*/
/*  color: rgba(21,21,21, 0.6);*/
/*}*/
/*.message-agree{*/
/*  border-radius: 5px;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  width: 400px;*/
/*}*/

/*////////////////////////////////////////////*/


*{
  box-sizing: border-box;
}
.content{
  padding: 1rem;
  display:flex;
  /*flex-direction: column;*/
  justify-content: center;
  width:100%;
  /*max-width:500px;*/
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
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
.link-reset{
  display: flex;
  justify-content: center;
  color: #212121;
}
.link-reset:hover{
  color: #7f7f7f;
}
.alert{
  border: 1px solid #B2B2B2;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 300px;
  font-size: 16px;
  text-align: center;
  align-self: center;
}
.alert-warning{
  border: 1px solid rgb(34,46,152);
  background: rgba(153, 159, 239, 0.1);
}
.alert-error{
  border: 1px solid #EB4C42;
  background: rgba(255, 15, 0, 0.1);
}
.type-loader{
  /*position: absolute;*/
  display: flex;
  align-items: center;
  top: 5%;
  height: 100%;
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
