<template>
  <div class="message-item" :class="{'unread-message': !message.check}">
    <h2>{{message.type}}</h2>
    <p>{{message.text}}</p>
<!--    <span>{{message}}</span>-->
    <span>{{ getConvertDate(message.created_at) }}</span>

<!--    // new Date(Date.parse(message.created_at)).toUTCString().slice(0,-4)-->
  </div>
</template>

<script>

export default {
  mixins:['dateConverter'],
props:['message']

}
</script>

<style scoped>

.message-item{
  background: white;
  padding: 20px 5px;
}

.unread-message{
  background: #d1effd;
}
</style>