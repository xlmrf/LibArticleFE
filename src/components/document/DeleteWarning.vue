<template>
  <p class="modal-text-warning">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e45b5b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    <span>{{ $store.getters.getLanguage.document.delete_modal.delete_text }}</span>
  </p>
  <div class="btn-panel">
<!--    <button class="btn" @click="$emit('delete-cancel')">{{ $store.getters.getLanguage.document.delete_modal.delete_cancel  }}</button>-->
    <button class="remove-btn" @click="deleteDocument">{{ $store.getters.getLanguage.document.delete_modal.delete_btn}}</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // emits:['delete-cancel','delete-document'],

  methods:{
    deleteDocument(){
      axios.delete(this.api_url_v1 + '/document/'+this.getDocument.id).then(res => {
        console.log("The document has been delete:",res)
      })
    }
  }
}
</script>

<style scoped>

.modal-text-warning{
  display: flex;
  font-size: 1em;
  width: 80%;
  margin: auto;
  padding: 20px 10px;
}
.modal-text-warning > svg{
  flex: 1;
  align-self: center;
}

.modal-text-warning > span{
  color: #4e4e4e;
  font-size: 1.1em;
  flex: 5;
  margin: auto;
}

.btn-panel{
  display: flex;
  margin-top: auto;
  justify-content: center;
}
.remove-btn{
  margin: 10px;
  background: none;
  padding: 5px 10px;
}
/*.btn-panel > button:first-child{*/
/*  border: 1px solid #006acd;*/
/*  color: #006acd;*/

/*}*/
/*.btn-panel > button:first-child:hover{*/
/*  border: 1px solid #006acd;*/
/*  color: #006acd;*/
/*}*/
.btn-panel > button:last-child:hover{
  /*background-color: #ff3333;*/
  border-bottom: 1px solid #f51717;
  /*text-decoration: underline;*/
  /*box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);*/
}
.btn-panel > button:last-child{
  /*background-color: #ff4444; !* Червоний колір для кнопки *!*/
  color: #ff4444; /* Колір тексту на кнопці (білий) */
  border: 1px solid transparent;
  /*padding: 12px 24px; !* Внутрішні відступи *!*/
  /*border-radius: 8px; !* Закруглені кути *!*/
  cursor: pointer;
  transition: background-color 0.4s, transform 0.4s;
  font-size: 18px;
  /*font-weight: 600; !* Товщина шрифта *!*/
  /*text-transform: uppercase; !* Великі літери *!*/
  letter-spacing: 1px; /* Міжсимвольний інтервал */
  outline: none; /* Заборона виділення при натисканні */

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