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
               class='sample-input sample-input-error'>
      </div>
      <div>
        <label for="last_name">Прізвище</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false" name="last_name" id="last_name" required
               :value = author.last_name
               @input="author.last_name = $event.target.value;$emit('newAuthor', author)"
               class='sample-input sample-input-error'>
      </div>
      <div>
        <label for="first_name">Ім'я</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false" name="first_name" id="first_name" required
               :value = author.first_name
               @input="author.first_name = $event.target.value;$emit('newAuthor', author)"
               class='sample-input sample-input-error'>
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
  props:['getUser'],
  emits:['newAuthor'],
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

/*.author-fill-list{*/
/*  border-left: 1px solid #BBBBBB;*/
/*  margin-left: 0.2rem;*/
/*  padding-left: 0.2rem;*/
/*  !*padding: 10px;*!*/
/*  !*width: 80%;*!*/
/*  !*border: 1px solid green;*!*/
/*  !*overflow:hidden;*!*/
/*  !*font-size: 14px;*!*/
/*  !*padding:10px 25px;*!*/
/*  text-decoration:none;*/
/*  background: none;*/
/*  outline: none;*/
/*  position: relative;*/
/*  !*border: 1px solid seagreen;*!*/
/*}*/
/*.author-list-item{*/
/*  text-decoration:none;*/
/*  background: none;*/
/*  outline: none;*/
/*  position: relative;*/
/*  display: flex;*/
/*  !*border: 1px solid orangered;*!*/
/*}*/
/*.author-list-item >:first-child{*/
/*  flex: 3;*/
/*}*/
/*.author-list-item > div{*/
/*  flex: 2;*/
/*}*/
/*.author-list-item > div{*/
/*  margin: 2px;*/
/*}*/
/*.author-fill-list > span{*/
/*  display: flex;*/
/*  align-items: center;*/
/*  padding: 0.2rem;*/
/*  width: 100%;*/
/*}*/
/*.author-fill-list > span > label{*/
/*  cursor: pointer;*/
/*}*/
/*.new-author-btn{*/
/*  align-self: center;*/
/*  position: relative;*/
/*  cursor: pointer;*/
/*  margin: 0 5%;*/
/*  padding: 5px;*/
/*  overflow:hidden;*/
/*  background: none;*/
/*  outline: none;*/
/*  color: #525252;*/
/*}*/
/*.new-author-btn::after{*/
/*  content:'';*/
/*  position:absolute;*/
/*  width:100%;*/
/*  height:0.05rem;*/
/*  left:0;*/
/*  bottom:0;*/
/*  background: #525252;*/
/*}*/
/*.new-author-btn::after{*/
/*  transform:scale(0.85,1);*/
/*  transition: transform 0.1s ease;*/
/*}*/
/*.new-author-btn:hover::after{*/
/*  transform:scale(1,1);*/
/*}*/


/*.check-coauthor>input{*/
/*  opacity: 0;*/
/*  position: absolute;*/
/*  z-index: -1;*/
/*}*/
/*.check-coauthor>span{*/
/*  display: inline-flex;*/
/*  align-items: center;*/
/*  user-select: none;*/
/*  font-size: 16px;*/
/*}*/

/*.check-coauthor>span::before {*/
/*  content: '';*/
/*  display: inline-block;*/
/*  width: 1em;*/
/*  height: 1em;*/
/*  flex-shrink: 0;*/
/*  flex-grow: 0;*/
/*  border: 1px solid #adb5bd;*/
/*  border-radius: 0.25em;*/
/*  margin-right: 0.5em;*/
/*  background-repeat: no-repeat;*/
/*  background-position: center center;*/
/*  background-size: 50% 50%;*/
/*}*/
/*.check-coauthor>input:not(:disabled):not(:checked)+span:hover::before {*/
/*  border-color: #4E5477;*/
/*}*/
/*.check-coauthor>input:checked+span::before {*/
/*  border-color: #525252;*/
/*  background-color: #525252;*/
/*  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");*/
/*}*/
/*#co-author{*/
/*  margin: 0 0.5rem;*/
/*}*/
</style>