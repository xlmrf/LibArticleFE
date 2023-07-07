<template>
  <div>
    <div v-for="message in messages">
      <message :message="message" />
    </div>
  </div>
</template>

<script>
import Message from "@/components/actions/Message";
import axios from "axios";
import {mapState} from "vuex";
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
  },

  computed:{
    getLastNotices(){
      axios.get(this.api_url_v1 + '/actions/messages').then(response => {
        this.messages = response.data
      }, err => {
        console.log('cites error:',err);
      })
    },
    ...mapState(['api_url_v1'])
  },

  methods:{

  },

  mounted() {
    this.getLastNotices
  }

}
</script>

<style scoped>

</style>