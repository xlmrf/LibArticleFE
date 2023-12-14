<template>
  <p class="modal-text-warning">
    <!--          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>-->
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>{{ $store.getters.getLanguage.document_make.warnings.document_exists}}<router-link :to="'/document/'+getDocumentMakeWarning?.documents[0].id" class="link-to-doc" target="_blank">
            {{ $store.getters.getLanguage.document_make.warnings.view}} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#318CE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg></router-link></span>
  </p>
  <div class="btn-panel">
    <button class="btn" @click="changeTitle()">{{ $store.getters.getLanguage.document_make.warnings.change_title}}</button>
    <button class="btn" @click="createToDespite">{{ $store.getters.getLanguage.document_make.warnings.create}}</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {

  methods:{

    ...mapMutations(['updateForce']),

    closeWindow(e){
      if (e.target.className === 'title-modal')
      {
        this.$emit('close-modal')
      }
    },

    createToDespite(){
      this.updateForce(true)
      console.log(this.getForced);
    },

    changeTitle(){

      this.$emit('close-modal')
      const titleInput = this.getTitleInput

      titleInput.select();

    }
  },

  computed:{
    ...mapState(['api_url_v1']),
    ...mapGetters(['getTitleInput','getDocumentMakeWarning', 'getMakeDocument', 'getForced'])

  },

}
</script>

<style scoped>
.modal-text-warning{
  display: flex;
  width: 80%;
  font-size: 1.1em;
  margin: auto;
}
.modal-text-warning > svg{
  flex: 1;
  margin-right: 10px;
  stroke: #4B89D9;
  align-self: center;
}

.modal-text-warning > span{
  color: #535353;
  font-size: 0.9em;
  flex: 5;
}

.btn-panel{
  display: flex;
  margin: 10px;
}
.btn-panel > button{
  margin: 10px;
}
.btn-panel > button:first-child{
  border: 1px solid transparent;
  background: #1C75DD;
  color: white;
}
.btn-panel > button:first-child:hover{
  background: #4188db;
  color: white;
}
.btn-panel > button:last-child:hover{
  border: 1px solid #006acd;
  color: #006acd;
}
.btn-panel > button:last-child{
  border: 1px solid #318CE7;
  color: #318CE7;
}

.cite-frame{
  display: flex;
}

.cite-frame > span{
  font-weight: bold;
  color: #333333;
}

.link-to-doc{
  display: flex;
  text-decoration: none;
  align-items: center;
  color: #318CE7;
  cursor: pointer;
  font-size: 1em;
}
.link-to-doc > svg{
  position: relative;
  top: 2px;
}
</style>