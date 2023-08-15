<template>
  <div class="doc-list-item doc-comments">
    <h3 @click="hide_comments = !hide_comments">Коментарі <tumbler-filter-button :toggle="!hide_comments"/></h3>
    <div class="comments-field" :class="{'display-none':hide_comments}">
      <div>
        <input type="text" class="sample-input comment-input" :class="{'sample-input-error':comment_warning}" @keypress.enter="SendComment()" name="comment" v-model="comment" required>
        <button @click="SendComment()">Додати</button>
      </div>
      <div class="comment" v-for="(comment, index) in getComments">
        <div class="comment-text">{{comment.text}}</div>
<!--        <div class="left-comment-side">-->
          <small @click="removeComment([comment.id, index])" title="Видалити коммент">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg></small>
          <span class="comment-date">{{comment.created_at}}</span>
<!--        </div>-->
      </div>
      <h5 class="noun-comments" v-if="getComments.length <= 0">Додайте перший коментар до документа</h5>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TumblerFilterButton from "@/components/additional/TumblerFilterButton";

export default {
  components: {TumblerFilterButton},
  data(){
    return{
      comment:'',
      comment_warning:false,
      hide_comments:true
    }
  },
  watch:{
    comment(){
      this.comment_warning = false
    }
  },
  methods:{
    ...mapActions(['pushComment','removeComment','reviseComments']),
    SendComment(){
      if (this.comment.length > 0){
        this.pushComment(this.comment)
        this.comment = ''
      }
      else{
        this.comment_warning = true
      }
    },
  },

  computed:{
    ...mapGetters(['getComments'])
  },
  mounted(){
    this.reviseComments()
  }
}
</script>

<style scoped>

/*.doc-comments{*/
/*  font-weight: bold;*/
/*}*/

.comments-field > div{
  margin: 1rem 5rem;
  display: flex;
  padding: 1rem;
}

.doc-comments input{
  padding: 0.5rem;
  font-size: 1.1rem;
  color: #222222;
}

.doc-comments button{
  background: transparent;
  margin-left: 1rem;
  padding: 0.2rem 2rem;
  cursor: pointer;
  border: 1px solid rgba(65, 159, 217, 0.6);
  color: rgba(65, 159, 217, 0.8);
}

.noun-comments{
  color: #222222;
  text-align: center;
  font-size: 0.8em;
}

.comment{
  position: relative;
  justify-content: space-between;
  align-items: center;
  color: #222222;
  font-size: 0.8em;
  font-weight: normal;
  background: rgba(255, 255, 255, 0.27);
  border: 1px solid rgba(34, 34, 34, 0.25);
  border-radius: 3px;
}

.comment > small{
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
.comment svg{
  stroke: rgba(22, 22, 22, 0.79);
}

.comment-date{
  position: absolute;
  bottom: 0;
  font-weight: normal;
  font-size: 0.9em;
  color: #535353;
  right: 2rem;
}

.comment-input{
  margin-left: 50px;
}

</style>