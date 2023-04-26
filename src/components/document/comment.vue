<template>
  <div class="doc-list-item doc-comments">
    <h2 @click="hide_comments = !hide_comments">комменти <tumbler-filter-button :toggle="!hide_comments"/></h2>
    <div class="comments-field" :class="{'comments-field-none':hide_comments}">
      <div>
        <input type="text" class="inp-e" @keypress.enter="pushComment(comment); comment = ''" name="comment" v-model="comment">
        <button @click="pushComment(comment);comment = ''">Додати</button>
      </div>
      <div class="comment" v-for="(comment, index) in getComments">
        <span class="comment-text">{{comment.text}}</span>
        <small @click="removeComment([comment.id, index])" title="Видалити коммент">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg></small>
        <span class="comment-date">20.09.2022</span>
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
      hide_comments:true
    }
  },

  methods:{
    ...mapActions(['pushComment','removeComment'])
  },

  computed:{
    ...mapGetters(['getComments'])
  }
}
</script>

<style scoped>

.doc-comments{
  font-size: 1.2em;
  font-weight: bold;

}

.doc-comments > h2{
  display: flex;
  align-items: center;
  color: #222222;
  padding-bottom: 10px;
  cursor: pointer;
}

.comments-field > div{
  margin: 1rem 5rem;
  display: flex;
  padding: 1rem;
}

.comments-field-none{
  display: none;
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
  font-size: 0.6em;
}

.comment{
  display: flex;
  position: relative;
  align-items: center;
  color: #222222;
  padding: 0.8rem 1.3rem 1rem 0.8rem;
  margin: 0.5rem 0;
  font-size: 0.6em;
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

</style>