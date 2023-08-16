<template>
  <div class="complex-item-control">
    <span>
      <input type="text" class="sample-input" v-model="reference" @keypress.enter="addReference" ref="referencesPort">
       <small @click="deleteReferenceIntup()" class="delete-ref-btn delete-item" v-if="reference!==''">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </small>
      <span class="add-btn add-ref-btn" @click="addReference">{{ edit ? $store.getters.getLanguage.document_make.signs.save_btn : $store.getters.getLanguage.document_make.signs.add_btn }}</span>
      <span class="add-btn search-in-system-btn" @click="searchReference">{{ $store.getters.getLanguage.document_make.signs.search_in_lib }}</span>
    </span>
    <div class="complex-item-control reference-list" v-if="getDocument.references.length > 0">
    <span class="reference-item" v-for="(el,idx) in getDocument.references.filter(item=>!item.delete)" :key="idx">
      <span :class="{'italic':el.edit}">{{
        idx + 1
      }}. {{ el.bibliographic_description }}</span>
      <small  @click="editRef(el)" class="change-ref-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
      </small>
        <small @click="deleteKeyword(idx,el)" class="delete-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </small>
    </span>
    </div>
    <small class="local-error-text">{{ localError }}</small>
<!--    <ol>-->
<!--      <li v-for="(el,idx) in getDocument.references.filter(item=>!item.delete)" :key="idx">-->

<!--      </li>-->
<!--    </ol>-->

  </div>
  <div class="text-error error-area-text border-error" v-if="invalid">{{ $store.getters.getLanguage.document_make.field_error[invalid] }}</div>
  <!--  <div>-->
  <!--    <small>keywords</small>-->
  <!--    <input type="text" name="" id="" v-model="getDocument.keywords">-->
  <!--  </div>-->
</template>

<script>
import {mapGetters} from "vuex";

export default {

  name: 'references',
  props:['isReady', 'field'],
  emits:['catchValidate'],

  data() {
    return {
      reference: '',
      localError: '',
      invalid:'',
      edit:false,
    }
  },

  watch:{
    keyword(){
      this.localError = ''
    },
    isReady(){
      if (this.isReady)
        this.validation()
    },
    'getDocument.references':{
      handler(){
        if (this.getDocument.references && this.getDocument.references.length > 0) {
          this.invalid = ''
        }
      },
      deep:true
    }
  },

  methods: {

    validation(){

      if (!this.getDocument.references || this.getDocument.references.length < 1){
        this.invalid = 'none_references'
        this.$emit('catchValidate', this.$options.name)
        this.getDocument.references = []
      }
    },

    deleteReferenceIntup() {
      this.getDocument.references.find(item => {
        delete item.edit
      })
      this.edit = false;
      this.reference = '';
    },

    editRef(el) {
      this.getDocument.references.find(item => {
        delete item.edit
      })
      this.reference = el.bibliographic_description
      el.edit = true
      this.edit = true
      console.log("refs: ",this.$refs,"Reference port: ",this.$refs);
      this.$refs.referencesPort.focus();
    },

    addReference() {
      console.log(this.reference)
      if (!this.reference) {
        this.localError = 'Введіть значення'
      }
      else if(this.getDocument.references.find(item => item.bibliographic_description === this.reference)) {
        this.localError = 'Посилання існує'
      }
      else {
        if (this.localError) {
          this.localError = ''
        }
        if (this.getDocument.references === undefined || this.getDocument.references === null) {
          this.getDocument.references = [];
        }
        let editEl = this.getDocument.references.find(item => item.edit === true);
        if (editEl) {
          editEl.bibliographic_description = this.reference;
          delete editEl.edit
          this.edit = false;
        } else {
          this.getDocument.references.push({bibliographic_description: this.reference});
        }
        this.reference = ''
      }
    },
    searchReference(){

    },

    deleteKeyword(idx, reference) {
      console.log("item", idx);
      if (reference.id) {
        this.getDocument.references[idx]['delete'] = true;
      } else {
        this.getDocument.references.splice(idx, 1)
      }
    },

    handleEscKeyPress(event) {
      if (this.edit && event.key === "Escape") {
        this.getDocument.references.find(item => {
          delete item.edit
        })
        this.edit = false
        this.reference = ''
        console.log("Esc key pressed! Execute your functions here.");
      }
    },
  },


  computed: {
    ...mapGetters(['getDocument'])
  },


  beforeMount() {
    if (!this.getDocument.references) {
      this.getDocument.references = []
    }
    document.removeEventListener("keydown", this.handleEscKeyPress);
  },
  mounted() {
    document.addEventListener("keydown", this.handleEscKeyPress);
  }


}
</script>

<style scoped>

.reference-item{
  margin: 6px 2px;
  font-size: 18px;
  padding: 8px 10px;
  border: 1px solid #a1a1a1;
  width: 100%;
}
.complex-item-control > span{
  position: relative;
}
.delete-ref-btn{
  right: 30%;
  top: 25%;
  position: absolute;
}
.italic {
  hyphens: auto;
  font-style: italic;
}
li{
  position: relative;
}
.change-ref-title{
  margin-left: auto;
  padding: 0 5px;
  cursor: pointer;
}
.change-ref-title:hover > svg{
  stroke: #1C75DD;
}
.delete-item{
  margin-left: 10px;
}

.search-in-system-btn{
  flex: 1;
  position: absolute;
  border-radius: 4px;
  margin: 0 5%;
  bottom: 140%;
  left: 160px;
  padding: 5px 10px;
  overflow: hidden;
  background: white;
  text-align: center;
  border: 1px solid #444444;
  outline: none;
  color: #444444;
}

.search-in-system-btn:hover{
  /*color: white;*/
  /*border: 1px solid transparent;*/
}
.add-ref-btn{

}
</style>