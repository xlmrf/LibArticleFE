<template>
  <div class="complex-item-control">
    <span>
      <input type="text" class="sample-input" :id="keyword" v-model="keyword" @keypress.enter="addKeyword">
      <span class="add-keyword-btn" @click="addKeyword">Додати</span>
    </span>
    <div :class="['list-keywords',{'list-able':this.getDocument.keywords}]">
      <li v-for="(el,idx) in getDocument.keywords">
        {{ el }}
        <small @click="deleteKeyword(idx)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </small>
      </li>
    </div>
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

  props:['isReady'],
  data() {
    return {
      keyword: '',
      error: ''
    }
  },
  methods: {
    addKeyword() {
      if (this.keyword === '' || this.keyword === undefined) {
        this.error = 'Введіть значення'
      } else {
        if (this.error) {
          this.error = ''
        }
        if (this.getDocument.keywords === undefined||this.getDocument.keywords === null) {
          this.getDocument.keywords = [];
        }
        this.getDocument.keywords.push(this.keyword)
        this.keyword = ''
      }
    },
    deleteKeyword(idx) {
      this.getDocument.keywords.splice(idx, 1)
    },
  },
  computed: {
    ...mapGetters(['getDocument'])
  }
}
</script>

<style scoped>

</style>