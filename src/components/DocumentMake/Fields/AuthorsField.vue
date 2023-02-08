<template>
  <div>
    <span>
      <label class="check-coauthor">
        <input type="checkbox" name="save-user" id="co-author" v-model="coAuthor">
        <span class="label" >Я співавтор</span>
      </label>
      <span class="new-author-btn" @click="addAuthor">Додати автора</span>
    </span>
    <div class="author-list-item" v-for="(author,idx) in authors">
      <div>
        <label for="author_email">Email</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false" name="author_email" id="author_email" required
               :value = author.email
               @input="author.email = $event.target.value;$emit('newAuthor', author)"
               @blur="author.email !== '' ? findAuthor(author.email): false"
               class='inp-e required-area'>
      </div>
      <div>
        <label for="last_name">Прізвище</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false" name="last_name" id="last_name" required
               :value = author.last_name
               @input="author.last_name = $event.target.value;$emit('newAuthor', author)"
               class='inp-e required-area'>
      </div>
      <div>
        <label for="first_name">Ім'я</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false" name="first_name" id="first_name" required
               :value = author.first_name
               @input="author.first_name = $event.target.value;$emit('newAuthor', author)"
               class='inp-e required-area'>
      </div>
      <span class="user-remove-btn" v-if="idx!==0" @click="removeAuthor(idx)">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  // props:['getUser'],
  // emits:['newAuthor'],
  data(){
    return{
      emailValid: '',
      authors:[{
        first_name:'',
        last_name:'',
        email:''
      }],
      coAuthor:false
    }
  },
  watch:{
    coAuthor(){

      let author = {
        first_name:this.getUser.info.first_name,
        last_name:this.getUser.info.last_name,
        email:this.getUser.email
      }
      if(this.coAuthor){
        if(Object.values(this.authors[0]).some(e => e)){
          this.authors.unshift(author)
        }
        else {
          this.authors[0] = author
        }
      }
      else {
        this.authors.shift()
        if(!this.authors[0]) {
          this.authors.unshift({
            first_name:'',
            last_name:'',
            middle_name: '',
            email:''
          })
        }
      }
      this.$emit('newAuthor', author)
    },
    getAuthor(){
      if (this.getAuthor) {
        this.authors.find(k => k.email === this.getAuthor.email).first_name = this.getAuthor.first_name
        this.authors.find(k => k.email === this.getAuthor.email).last_name = this.getAuthor.last_name
      }
    },
    deleteAuthor(idx){
      this.authors.splice(idx, 1)
    }
  },
  computed:{
    ...mapGetters(['getAuthor'])
  },
  methods:{
    ...mapActions(['findAuthor']),
    addAuthor() {
      this.authors.push({
        last_name: '',
        first_name: '',
        middle_name: '',
        email: ''
      })
    },
    removeAuthor(idx) {
      this.authors.splice(idx, 1)
    },
  }
}
</script>

<style scoped>

</style>