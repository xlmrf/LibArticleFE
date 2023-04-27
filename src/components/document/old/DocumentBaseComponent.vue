<template>
  <div class="main-card" v-if="getDocument">
    <div class="card-top">
      <h2>{{getDocument.title}}</h2>
      <h4>{{getDocument.category}}</h4>
    </div>
    <div class="wrapper">
      <div class="file-card" >
        <file-frame></file-frame>
      </div>
      <div class="document-areas" >
        <div class="form-item" v-for="(item,idx) in fromStorage ? JSON.parse(getDocument.category.areas) : getCategories.filter(x => x.name === getDocument.category).map(x => x['areas'])[0]"> <!-- find method not work -->
          <label :for="item">{{translateAreas(item)}}</label>
          <div class="author-fill-list" v-if="item === 'authors'">
            <author-fields :getUser="getUser" @newAuthor="setAuthors"></author-fields>
          </div>

          <div class="complex-item-control" v-else-if="item === 'keywords' || item === 'references'">
                <span>
                  <input type="text" class="sample-input" :id="item" v-model="comprehensive[item]" @keypress.enter="addItem(item)" >
                  <span class="add-keyword-btn" @click="addItem(item)">Додати</span>
                </span>
            <div :class="[{'list-keywords':item === 'keywords'},{'list-references':item === 'references'},{'list-able':this.document.keywords.length}]">
              <li v-for="(el,idx) in document[item]"><span v-if="item === 'references'">{{idx+1}}.</span>{{el}}
                <small @click="deleteItem(item,idx)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line></svg></small>
              </li>
            </div>
            <small>{{ error[item] }}</small>
          </div>

          <div v-else-if="item === 'description'"><textarea class="sample-input document-description-area" v-model="document[item]"></textarea></div>
          <input type="text" class="sample-input sample-input-error" required :id="item" v-model="document[item]" v-else>
        </div>
        <div class="btn-control">
          <button class="btn conclusion-btn" @click="pushDocument">Створити</button>
          <span class="to-archive-btn" @click="pushDocument(false)">Занести в архів</span>
        </div>
      </div>
    </div>

  </div>
  <div>
    <h2>{{ getDocument.category }}</h2>
    <table>
      <tr><td>Title</td><td>{{getDocument.title}}</td></tr>
      <tr><td>Edition</td><td>{{getDocument.edition}}</td></tr>
      <tr><td>Authors</td><td><span v-for="(author,idx) in getDocument.authors">{{author.first_name[0]}}. {{author.last_name}}{{getDocument.authors[idx+1] ?', ':'.'}}</span></td></tr>
      <tr><td>Keywords</td><td><span v-for="word in getDocument.keywords">{{word}}; </span></td></tr>
      <tr><td>Publication date</td><td>{{getDocument.year}}</td></tr>
      <tr><td>References</td><td><ol><li v-for="link in getDocument.links">
        <router-link v-if="link.reference_document_id!=null" :to="'/document/'+link.reference_document_id">{{link.reference}}</router-link>
        <span v-else>{{link? link.reference:'Посилань немає'}}</span>
      </li></ol></td></tr>
      <tr><td>Description</td><td>{{getDocument.description}}</td></tr>
    </table>
    <button @click="documentEdit">Змінити</button>
<!--    <h3>Title: {{getDocument.title}}</h3>-->
<!--    <h4>Year: {{getDocument.year}}</h4>-->
<!--    <h4>Publication: {{getDocument.publication}}</h4>-->
    <div class="comments-area">
      <p>Commentaries</p>
      <div>
        <input type="text" name="comment" v-model="comment">
        <button class="btn" @click="pushComment(comment)">add</button>
      </div>
      <span class="comment" v-for="(comment, index) in comments">{{comment.text}} <small @click="removeComment([comment.id, index])">x</small></span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import FileFrame from "./FileFrameComponent";
export default {
  mixins:['translate'],
  data(){
    return{
      comments:[],
      comment:'',
    }
  },
  methods:{
    ...mapActions(['reviseDocument','pushComment','reviseComments','removeComment']),
  },

  computed:{
    enterComment(){
      this.comments.push(this.comment)
      this.comment = ''
    },
    ...mapGetters(['getDocument','getComments'])
  },
  components:{FileFrame},
  watch:{
    getComments(){
      this.comments = this.getComments
    }
  },
  mounted() {
    // (async () => {
    //   this.reviseDocument(this.base.id)
    //   await console.log('something')
    //
    // })()
    this.reviseDocument()
    this.reviseComments()
  }

}
</script>

<style scoped>
h2{
  margin: 0 50px;
}
table{
  margin: 5px;
}
td{
  padding: 2px 10px;
  /*border: 1px solid black;*/
}
.comments-area{
  margin: 10px;
  border-radius: 3px;
  width: 400px;
  border:1px solid rgba(62, 62, 62, 0.2)
}
.btn{
  margin: 0 5px;
}
</style>