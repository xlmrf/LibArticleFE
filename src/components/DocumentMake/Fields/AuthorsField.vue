<template>
  <!--    <p class="authors">-->
  <!--      {{getAuthor}}-->
  <!--    </p>-->
<!--  {{getProposeAuthors}}-->
  <span class="author-control">
      <label class="check-coauthor">
        <input type="checkbox" name="save-user" id="co-author" v-model="coAuthor">
        <span class="label">Я співавтор</span>
      </label>
      <span class="new-author-btn" @click="addAuthor">Додати автора</span>
    </span>
  <div v-for="(author,idx) in getDocument.authors?.filter(item=>!item.delete)" :key="idx" class="author-list-item">
    <div>
      <label for="author_email">Email</label>
      <input type="text" :disabled="idx === 0 ? coAuthor : false" name="author_email" id="author_email" required
             v-model="author.email"
             @blur="author.email !== '' ? findAuthor({email:author.email,idx:idx}): false"
             class='inp-e required-area'>
    </div>
    <div>
      <label for="last_name">Прізвище</label>
      <input type="text" :disabled="idx === 0 ? coAuthor : false" name="last_name" id="last_name" required
             v-model="author.last_name"
             class='inp-e required-area'>
    </div>
    <div>
      <label for="first_name">Ім'я</label>
      <input type="text" :disabled="idx === 0 ? coAuthor : false" name="first_name" id="first_name" required
             v-model="author.first_name"
             class='inp-e required-area'>
    </div>
    <span class="user-remove-btn" v-if="getDocument.authors?.filter(item=>!item.delete).length>1"
          @click="removeAuthor(idx, author)">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
             stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </span>
    <div class="break"></div>
    <div class="propose-authors">
      <span v-for="author in getProposeAuthors[idx]" @click="addExistAuthor(author,idx)">
        {{ author.last_name }} {{ author.first_name[0] }}.
      </span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['authors'],
  // emits:['newAuthor'],
  data() {
    return {
      emailValid: '',
      author: {
        first_name: '',
        last_name: '',
        email: ''
      },
      coAuthor: false
    }
  },
  watch: {
    coAuthor() {
      let author = {
        // first_name:this.getUser.info.first_name,
        // last_name:this.getUser.info.last_name,
        email: this.getUser.email
      }
      if (this.coAuthor) {
        if (Object.values(this.getDocument.authors[0]).some(e => e)) {
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
    // getAuthor(){
    //   if (this.getAuthor) {
    //     this.authors.find(k => k.email === this.getAuthor.email).first_name = this.getAuthor.first_name
    //     this.authors.find(k => k.email === this.getAuthor.email).last_name = this.getAuthor.last_name
    //   }
    // },
    // deleteAuthor(idx){
    //   this.getDocument.authors.splice(idx, 1)
    // }
  },
  computed: {
    ...mapGetters(['getAuthor', 'getDocument', 'getUser', 'getProposeAuthors'])
  },
  methods: {
    ...mapActions(['findAuthor', 'deleteAuthor']),
    addExistAuthor(author, idx) {
      this.getDocument.authors[idx] = author;
      this.getProposeAuthors[idx]=null;
    },
    addAuthor() {
      console.log(this.getDocument);
      this.getDocument.authors.push({})
    },
    removeAuthor(idx, author) {
      if (author.id) {
        this.getDocument.authors[idx]['delete'] = true;
      } else {
        this.getDocument.authors.splice(idx, 1)
      }
      this.getProposeAuthors.splice(idx, 1);

    },
  },
  mounted() {
    if (this.getDocument.authors===undefined || !this.getDocument.authors || !this.getDocument.authors[0]) {
      console.log('push');
      this.getDocument.authors = []
      this.getDocument.authors.push({})
    }
  }
}
</script>

<style scoped>
.author-control {
  display: flex;
  align-items: end;
}

.authors {
  border: 1px solid #a9a9a9;
}

.break{
  flex-basis: 100%;
  height: 0;
}
.propose-authors{
  /*border: 1px solid darkgrey;*/
}

.propose-authors > *{
  cursor: pointer;
  color: #0d2839;
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
  width: 90%;
  margin: 0.3rem 0;
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
  border-color: rgba(65, 159, 217, 0.45);
  background-color: rgba(65, 159, 217, 0.45);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.user-remove-btn{
  display: flex;
  margin-top: auto;
  align-self: center;
  /*top: 45%;*/
  right: -5%;
  position: absolute;
  /*right: -30px;*/
  cursor: pointer;
  /*border: 1px solid black;*/
}
.user-remove-btn:hover{
  stroke: #525252;
  /*border: 1px solid black;*/
}
</style>