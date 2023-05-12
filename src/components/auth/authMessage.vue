<template>
  <div v-if="messages.length !== 0">
    <div v-for="item in messages.errors" v-if="messages.errors">
      <div  class="alert" :class="alert_class(item.code)">
        <small v-if="item.code === 'credentials_incorrect'">
          <span>{{getErrorMessage[item.code]}}</span>
          <router-link class="link-reset" :to="{name:'recovery'}">Відновити пароль</router-link>
        </small>
        <small v-else>
          <span>{{getErrorMessage[item.code]}}</span>
        </small>
      </div>
    </div>
    <div class="alert alert-warning" v-for="item in messages.notes" v-else>
      <small>
        {{getNotesMessage[item.code]}}
      </small>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {

  props:['messages'],

  methods:{
    alert_class(code) {
      if (code === 'credentials_incorrect')
        return 'alert-error';
      if (code === 'email_not_confirmed')
        return 'alert-warning';
    }
  },

  computed:{
    ...mapGetters(['getNotesMessage', 'getErrorMessage'])
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
  /*border: 1px solid rgb(34,46,152);*/
  /*background: rgba(153, 159, 239, 0.1);*/
  position: relative;
  width: 320px;
  padding: 15px;
  font-size: 18px;
  border: 1px solid rgba(28, 117, 221, 0.5);
  background: rgba(128, 167, 221, 0.1);
}
.alert-error{
  border: 1px solid #EB4C42;
  background: rgba(255, 15, 0, 0.1);
}
</style>