<template>
  {{message}}
  <div class="message-item" v-if="message.check">
    <p>{{message.type}}</p>
    <h3 @click="$router.push('/document/1')">{{message.document_title}}</h3>
<!--    <span>{{message}}</span>-->
    <span>{{ getConvertDate(message.created_at) }}</span>
<!--    // new Date(Date.parse(message.created_at)).toUTCString().slice(0,-4)-->
  </div>

  <div class="message-item unread-message" @click="read" v-else>

    <p>{{message.type}}</p>
    <h3 @click="$router.push('/document/1')">{{message.document_title}}</h3>
    <span>{{ getConvertDate(message.created_at) }}</span>

  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  mixins:['dateConverter'],
  props:['message'],
  computed:{
    read(){
      axios.get(this.$store.state.api_url_v1+'/actions/check-message/'+this.message.id).then(res => {
        this.message.check = res.data.notice_check
        console.log('response',res);
      })
    },
    // ...mapState(['api_url_v1'])
  }

}
</script>

<style scoped>

.message-item{
  background: white;
  padding: 20px 5px;
}

.unread-message{
  background: #d1effd;
  cursor: pointer;
}
</style>