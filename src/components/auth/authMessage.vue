<template>
  <div>
    <div v-if="messages.errors">
      <div v-for="item in messages.errors" class="alert" :class="alert_class(item.code)">
        <small v-if="item.code === 'credentials_incorrect'">
          <span>Введений пароль або логін не вірний</span>
          <router-link class="link-reset" to="/forget-password">Відновити пароль</router-link>
        </small>
      </div>
    </div>

<!--    <div v-if="getUserMessage.status==='confirmation'" class="alert alert-warning" v-bind="loader=false">-->
<!--      <small>-->
<!--        На вказаний email прийшло повідомлення з підтвердженням акаунту-->
<!--      </small>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {

  props:['messages'],

  methods:{
    alert_class(code) {
      if (code === 'credentials_incorrect')
        return 'alert-error';
      if (code === 'email_not_confirmed')
        return 'alert-warning';
    }
  }

}
</script>

<style scoped>
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
</style>