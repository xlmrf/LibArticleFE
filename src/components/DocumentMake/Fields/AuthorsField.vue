<template>
  <div>
    <!--    <p class="authors">-->
    <!--      {{getAuthor}}-->
    <!--    </p>-->
    <span>
      <label class="check-coauthor">
        <input type="checkbox" name="save-user" id="co-author" v-model="coAuthor">
        <span class="label">Я співавтор</span>
      </label>
      <span class="new-author-btn" @click="addAuthor">Додати автора</span>
    </span>
    <div  v-for="(author,idx) in getDocument.authors" :key="idx">
      <div v-if="!author.delete" class="author-list-item">
        <div>
          <label for="author_email">Email</label>
          <input type="text" :disabled="idx === 0 ? coAuthor : false" name="author_email" id="author_email" required
                 v-model="author.email"
                 @blur="author.email !== '' ? findAuthor(author.email): false"
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
        <span class="user-remove-btn" v-if="getDocument.authors.filter(item=>!item.delete).length>1" @click="removeAuthor(idx, author)">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  // props:['getUser'],
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
    ...mapGetters(['getAuthor', 'getDocument', 'getUser'])
  },
  methods: {
    ...mapActions(['findAuthor', 'deleteAuthor']),
    addAuthor() {
      this.getDocument.authors.push({})
    },
    removeAuthor(idx, author) {
      if (author.id) {
        // let data = {
        //   document_id: this.getDocument.id,
        //   author_id: author.id
        // }
        // this.deleteAuthor(data)
        this.getDocument.authors[idx]['delete'] = true;
      } else {
        this.getDocument.authors.splice(idx, 1)
      }

    },
  },
  mounted() {
    if (!this.getDocument.authors) {
      this.getDocument.authors = []
      this.getDocument.authors.push({})
    }
  }
}
</script>

<style scoped>

.authors {
  border: 1px solid #a9a9a9;
}
</style>