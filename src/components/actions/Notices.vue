<template>
  <div>
    <div v-for="message in messages">
      <message :message="message" />
    </div>
  </div>
</template>

<script>
import Message from "@/components/actions/Message";
export default {
  components: {Message},
  data(){
    return{
      messages:[
        {
          id:7,
          text: 'Вас відзначено як співавтора в документі "Sensor system and new..."',
          date: '22-05-2022',
          type: 'coauthor',
          check: 'false',
          ref_doc_title_id: {id:12, title:'Sensor system..'},
          who_marked_full_name_id: {id:1, name:'Name'},
        },
        {
          id:8,
          text: 'Документ набрав високої популярності. "Sensor system and new..."',
          date: '29-05-2022',
          type: 'popular',
          check: 'false',
          ref_doc_title_id: {id:12, title:'Sensor system..'}
        },

      ]
    }
  }

}
</script>

<style scoped>

</style>