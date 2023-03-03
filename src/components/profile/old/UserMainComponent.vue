<template>
  <div class="middle-spinner" v-if="!getAuthor.user_id">
    <span><loader width="4" radius="20"></loader></span>
  </div>
  <div class="card-profile" v-else>
<!--    <user-card :getUser="getAuthor" class="user-card-component"></user-card>-->
    <div class="profile-content">
      <div class="content-list">
        <li v-for="item in items">{{item}}</li>
      </div>
    </div>


  </div>
</template>

<script>
import UserCard from './UserCardComponent'
import DocumentItem from '../../library/ItemListDocumentComponent'
import loader from "../../additional/loader";
import Documents from "@/view/Documents";
import {mapActions, mapGetters} from "vuex";
export default {
  data(){
    return{
      items:[
          "Документів додано",
          "Цього року додано",
          "Прочитано ваших документів",
          "Посилань на ваші документи",
          "Ви співавтор у 22 документах",
      ]
    }
  },
  computed:{
    ...mapActions(['requestAuthor','requestAuthorPhoto']),
    ...mapGetters(['getUser','getUniversities','getAuthor'])
  },

  mounted() {
    this.requestAuthor
    // this.requestAuthorPhoto
  },
  components:{UserCard,DocumentItem,loader,Documents}
}
</script>

<style scoped>
.card-profile{
  display: flex;
}
.user-card-component{
  margin: 10px 20px;
  height: 100%;
  min-width: 25%;
}
.profile-content{
  /*box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;*/
  /*background: #ffffff;*/
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  margin: 10px 20px;
  width: 100%;
}
.profile-land-pick{
  padding: 10px;
  border: 1px solid blue;
}
.content-list{
  display: flex;
  flex-direction: column;
  list-style: none;
  height: 100%;
}
.content-list > li{

}
</style>