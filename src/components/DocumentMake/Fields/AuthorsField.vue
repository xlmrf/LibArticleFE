<template>
  <div>
    <span class="author-control">
        <label class="check-coauthor">
          <input type="checkbox" name="save-user" id="co-author" v-model="coAuthor">
          <span class="label">{{ this.$store.getters.getLanguage.document_make.signs.im_coauthor}}</span>
        </label>
        <span class="new-author-btn" @click="addAuthor">{{ this.$store.getters.getLanguage.document_make.signs.add_author}}</span>
    </span>
    <div v-for="(author,idx) in getDocument.authors?.filter(item=>!item.delete)" :key="idx" class="author-list-item">
      <div>
        <label for="author_email">{{ this.$store.getters.getLanguage.document_make.signs.email}}</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false"
               name="author_email" id="author_email" required
               v-model="author.email"
               @blur="author.email !== '' ? findAuthorByEmail({email:author.email,idx:idx}): false"
               :class="{'sample-input-error': authorError[idx]?.includes('email')}"
               class='sample-input'>
      </div>
      <div>
        <label for="last_name">{{ this.$store.getters.getLanguage.document_make.signs.last_name}}</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false"
               name="last_name" id="last_name" required
               v-model="author.last_name"
               :class="{'sample-input-error':authorError[idx]?.includes('last_name')}"
               class='sample-input'>
      </div>
      <div>
        <label for="first_name">{{ this.$store.getters.getLanguage.document_make.signs.first_name}}</label>
        <input type="text" :disabled="idx === 0 ? coAuthor : false"
               name="first_name" id="first_name" required
               v-model="author.first_name"
               :class="{'sample-input-error':authorError[idx]?.includes('first_name')}"
               class='sample-input'>
      </div>
      <span class="user-remove-btn" v-if="getDocument.authors?.filter(item=>!item.delete).length>1"
            @click="removeAuthor(idx, author)">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </span>
      <span class="text-error error-area-text author-error" v-if="authorError[idx]">{{getMistakes(authorError[idx])}}</span>
      <div class="propose-authors" v-if="proposeAuthors[idx] && Object.keys(proposeAuthors[idx]).length>0">
        <span v-for="(author) in proposeAuthors[idx]" @click="addExistAuthor(author, idx)">
          {{ author.last_name }} {{ author.first_name }}
        </span>
      </div>
    </div>
    <div class="text-error error-area-text" v-if="invalid === 'none_author'">{{ $store.getters.getLanguage.document_make.field_error[invalid] }}</div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import axios from "axios";

export default {
  props: ['isReady'],
  emits:['catchValidate'],
  mixins:['email'],
  name:'authors',
  data() {
    return {
      emailValid: '',
      authorError:[],
      coAuthor: false,
      invalid:'',
      proposeAuthors:[]
    }
  },
  watch: {
    isReady(){
      if (this.isReady)
        this.validation()
    },
    coAuthor() {
      this.imCoAuthor()
    },
    'getDocument.authors':{
      handler(){
        this.authorError = []
        this.invalid = ''
      },
      deep:true
    }
  },
  computed: {
    ...mapGetters(['getDocument', 'getUser']),
    ...mapState(['api_url_v1']),

  },
  methods: {
    ...mapActions(['deleteAuthor']),
    ...mapMutations(['DocAuthors']),

    validation(){
      console.log('validation')
      this.authorError = []
      this.invalid = ''
      if (this.getDocument.authors.length < 1 ||
          (this.getDocument.authors.length < 2 && Object.keys(this.getDocument.authors[0]).length < 1)){
        // this.$emit('checkField', this.$options.name)
        this.invalid = 'none_author'
        return this.$emit('catchValidate', this.$options.name)//if component has mistakes
      }

      for (let i in this.getDocument.authors){
        let author = this.getDocument.authors[i]
        if (author.first_name === '' || author.last_name === '' || author.email === '')
          this.authorError[i] = []
        if (!author.first_name)
          this.authorError[i].push('first_name');
        if (!author.last_name)
          this.authorError[i].push('last_name');
        if (!author.email)
          this.authorError[i].push('email');

        this.invalid = !this.authorError[i] ? '' : 'partially_filled'
        if (!this.invalid){
          if (this.checkEmail(this.getDocument.authors[i].email)){
              this.invalid = this.checkEmail(this.getDocument.authors[i].email)
              this.authorError[i] = this.invalid
              this.$emit('catchValidate', this.$options.name)
          }
        }
      }
    },

    getMistakes(arr){
      let txt = []
      if (typeof arr === 'string')
        return `${this.$store.getters.getLanguage.document_make.field_error[this.invalid]}`
      for (let item in arr){
        txt.push(this.$store.getters.getLanguage.settings.account_titles[arr[item]])
      }
      return `${this.$store.getters.getLanguage.document_make.field_error[this.invalid]}: ${txt.reverse().join(', ')}`

    },

    findAuthorByEmail(author) {
      axios.get(this.api_url_v1 + '/author?email=' + author.email,).then(response => {
        this.proposeAuthors[author.idx] = response.data
      }).catch(err => {
        console.log(err.response)
      })
    },
    addExistAuthor(author,idx) {
      this.getDocument.authors[idx] = author;
      this.proposeAuthors[idx] = null;
    },
    addAuthor() {
      console.log(this.getDocument);
      this.getDocument.authors.push({
        first_name:'',
        last_name: '',
        email:''
      })
    },
    removeAuthor(idx, author) {
      if (author.id) {
        this.getDocument.authors[idx]['delete'] = true;
      } else {
        this.getDocument.authors.splice(idx, 1)
      }
      if (this.proposeAuthors[idx]){
        this.proposeAuthors[idx] = null
      }

    },

    imCoAuthor(){
      let author = {
        first_name:this.getUser.info.first_name,
        last_name:this.getUser.info.last_name,
        email: this.getUser.email
      }
      if (this.coAuthor) {
        if (!this.getDocument.authors[0]){
          this.authorError.unshift(null)
          this.getDocument.authors.unshift(author)
        }
        else if (Object.values(this.getDocument.authors[0]).some(e => e)) {
          this.authorError.unshift(null)
          this.getDocument.authors.unshift(author)
        } else {
          this.getDocument.authors[0] = author
        }
      } else {
        this.getDocument.authors.shift()
        if (!this.getDocument.authors[0]) {
          this.getDocument.authors.unshift({
            first_name: '',
            last_name: '',
            // middle_name: '',
            email: ''
          })
        }
      }
    },


  },
  mounted() {
    if (!this.getDocument.authors || !this.getDocument.authors.length) {
      // this.DocAuthors([{}])
      // this.getDocument.authors = []
      // this.getDocument.authors.push({})
    }
  }
}
</script>

<style scoped>

.authors {
  border: 1px solid #a9a9a9;
}

.break{
  flex-basis: 100%;
  /*height: 0;*/
}
.propose-authors{
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 4px;
}

.propose-authors > *{
  cursor: pointer;
  color: #0d2839;
  padding: 5px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 6px;
}
.propose-authors > *:hover{
  background: #f1f1f1;
}

.author-fill-list {
  border-left: 1px solid #BBBBBB;
  margin-left: 0.2rem;
  padding-left: 0.2rem;
  /*padding: 10px;*/
  /*width: 80%;*/
  /*border: 1px solid green;*/
  /*overflow:hidden;*/
  /*font-size: 14px;*/
  /*padding:10px 25px;*/
  text-decoration: none;
  background: none;
  outline: none;
  position: relative;
  /*border: 1px solid seagreen;*/
}

.author-list-item {
  text-decoration: none;
  background: none;
  outline: none;
  position: relative;
  display: flex;
  width: 95%;
  margin: 1rem 0;
  flex-wrap: wrap;
  /*border: 1px solid orangered;*/
}

/*.author-list-item > :first-child {*/
/*  flex: 3;*/
/*}*/

/*.author-list-item > div {*/
/*  flex: 2;*/
/*}*/

.author-list-item > div {
  margin: 2px;
}

.author-list-item > div > label{
  position: relative;
  bottom: 3px;
}

/*.author-list-item > :last-child {*/
/*  width: 100%;*/
/*}*/

.check-coauthor > input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.check-coauthor > span {
  display: inline-flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
}

.check-coauthor > span::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid rgba(196, 196, 196, 0.8);
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.check-coauthor > input:not(:disabled):not(:checked) + span:hover::before {
  border-color: rgba(65, 159, 217, 0.65);
}

.check-coauthor > input:checked + span::before {
  border-color: #318CE7;
  background-color: #318CE7;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.user-remove-btn{
  display: flex;
  margin-top: auto;
  align-self: center;
  top: 25px;
  right: -30px;
  position: absolute;
  /*right: -30px;*/
  cursor: pointer;
  /*border: 1px solid black;*/
}
.user-remove-btn:hover{
  stroke: #525252;
  /*border: 1px solid black;*/
}

.check-coauthor{
  /*background: #f1f1f1;*/
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.author-control{
  /*background: #bbbbbb;*/
  position: absolute;
  top: -1px;
  right: -1px;
  border: 1px solid #E1DBC8;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  width: fit-content;
  display: flex;
  align-items: end;
}

.check-coauthor:hover{
  background: #eee;
}

.author-control{
  background: #f8f8f8;
}

.author-error{
  display: flex;
  flex-basis: 100%;
  /*border: 1px solid #EB4C42;*/
  /*padding: 5px 10px;*/
  /*border-radius: 4px;*/
}

.author-control > label{
  margin-right: 20px;
}

</style>