<template>
  <div class="complex-item-control">
    <span>
      <input type="text" class="inp-e" v-model="reference" @keypress.enter="addKeyword">
       <small @click="deleteReferenceIntup()" class="delete-ref-btn delete-item" v-if="reference!==''">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </small>
      <span class="add-keyword-btn" @click="addKeyword">{{ edit ? "Зберегти" : 'Додати' }}</span>
    </span>
    <span v-for="(el,idx) in getDocument.references.filter(item=>!item.delete)" :key="idx">
      <span @dblclick="editRef(el)" :class="{'italic':el.edit}">{{
        idx + 1
      }}. {{ el.bibliographic_description }}</span>
        <small @click="deleteKeyword(idx,el)" class="delete-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </small>
    </span>
<!--    <ol>-->
<!--      <li v-for="(el,idx) in getDocument.references.filter(item=>!item.delete)" :key="idx">-->

<!--      </li>-->
<!--    </ol>-->
    <small>{{ error }}</small>
  </div>
  <!--  <div>-->
  <!--    <small>keywords</small>-->
  <!--    <input type="text" name="" id="" v-model="getDocument.keywords">-->
  <!--  </div>-->
</template>

<script>
import {mapGetters} from "vuex";

export default {

  data() {
    return {
      reference: '',
      error: '',
      edit: false,
    }
  },
  methods: {
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
    },
    addKeyword() {
      if (this.reference === '' || this.reference === undefined) {
        this.error = 'Введіть значення'
      } else {
        if (this.error) {
          this.error = ''
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
    deleteKeyword(idx, reference) {
      console.log("item", idx);
      if (reference.id) {
        this.getDocument.references[idx]['delete'] = true;
      } else {
        this.getDocument.references.splice(idx, 1)
      }
    },
  },
  computed: {
    ...mapGetters(['getDocument'])
  },
  beforeMount() {
    console.log('ReF11111111111111111111111111');
    if (!this.getDocument.references) {
      this.getDocument.references = []
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
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
</style>