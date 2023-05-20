<template>
  <div class="loader" v-if="!getProfile">
    <span><loader width="2" radius="13"></loader></span>
  </div>
  <div class="privacy-settings" v-else>
<!--    <div class="setting-block">-->
<!--      <h3>Зміна почти</h3>-->
<!--      <span>-->
<!--&lt;!&ndash;        <input type="text" name="email" id="in-email" required v-model="data.email"&ndash;&gt;-->
<!--        &lt;!&ndash;               @keyup.enter="this.$el.nextSibling.childNodes[1].firstChild.focus()"&ndash;&gt;-->
<!--        &lt;!&ndash;               :class="['input in-form', {invalid:valid.email}]">&ndash;&gt;-->
<!--        &lt;!&ndash;        <label for="in-email" class="marker">Email</label>&ndash;&gt;-->
<!--        &lt;!&ndash;        <span>{{data.email}}</span>&ndash;&gt;-->
<!--        &lt;!&ndash;        <small class="field-message-error">{{ valid.email }}</small>&ndash;&gt;-->
<!--      </span>-->

<!--    </div>-->

    <div class="setting-block">
      <h3>Зміна паролю</h3>
      <span>
      <label for="real-password">Діючий пароль</label>
      <input type="text"
             name="real-password" id="real-password"

             class='sample-input'>
      </span>
      <span>
      <label for="new-password">Новий пароль</label>
      <input type="text"
             name="new-password" id="new-password"

             class='sample-input'>
      </span>
      <span>
      <label for="confirm-password">Підтвердження паролю</label>
      <input type="text"
             name="confirm-password" id="confirm-password"

             class='sample-input'>
      </span>
    </div>

    <button @click="changePrivacy">Змінити пароль</button>

  </div>
</template>



<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "@/components/additional/loader";

export default {
  components: {Loader},
  data(){
    return{
      data:{
        email:'',
        password:'',
        confirm_password:'',
        old_password:''
      }
    }
  },
  watch:{
    getUser(){
      this.data.email = this.getUser.email
    }
  },
  computed:{
    ...mapGetters(['getProfile'])
  },
  methods:{
    ...mapActions(['updatePrivacy']),
    changePrivacy(){
      if (this.data.email !== this.getUser.email){
        alert('На ваш попередній email прийде повідомлення для підтвердження зміни почти')
      }
      this.updatePrivacy(this.data)

    }
  }
}
</script>

<style scoped>
.privacy-settings{
  display: flex;
  flex-direction: column;
}

.privacy-settings > h3{
  justify-self: center;
  align-self: center;
}

.setting-block {
  display: inherit;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;
  width: 100%;
}

.privacy-settings > div{
  margin: 10px 0;
}
.person-email > span{
  margin: 1rem;
  font-weight: bold;
}

.privacy-settings > button{
  margin: 2rem;
  background: none;
  border: 1px solid rgba(32, 178, 170, 0.8);
  color: rgba(32, 178, 170, 0.8);
  width: 120px;
  height: 30px;
  cursor: pointer;
  align-self: center;
}






</style>