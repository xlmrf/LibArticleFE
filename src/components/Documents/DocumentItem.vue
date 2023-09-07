<template>
  <div class="document-item" :class="{'document-draft': type === 'draft' || this.$route.query.refs_doc_id}" v-if="documentItem.title">
    <box-selector :doc="documentItem" />
    <div class="list-document-type" :class="{'draft-type-style': type === 'draft'}">
      <span>
        {{getTypes.find(item => item.id === documentItem.type_id)?.name}}
      </span>
<!--      <div class="publication-date" v-if="type === 'draft'">-->
<!--&lt;!&ndash;        {{getDate(document.publication_date)}}&ndash;&gt;23.05.22-->
<!--      </div>-->
      <div class="publication-date">
        {{getDate(documentItem.publication_date)}}
      </div>

    </div>
    <div class="context-document-item">
      <div class="first-piece">
        <h3>
          <router-link :to="'/document/'+ (type === 'draft' ? 'make/' : '') +documentItem.id">
           {{documentItem.title}}
          </router-link>
        </h3>

        <div class="authors" v-if="type !== 'draft'">
          <span class="author-item" v-for="author in documentItem.authors">
            <router-link class="author-item-link" :to="'/profile/'+author.user_id" v-if="author.user_id">
              {{author.last_name}} {{author.first_name?author.first_name[0]:''}}
            </router-link>
            <span v-else>
              {{author.last_name}} {{author.first_name?author.first_name[0]:''}}.
            </span>
          </span>
        </div>

        <span class="document-list-keywords" v-if="type === 'searcher'">
          <span v-for="keyword in documentItem.keywords">
          {{keyword}}
          </span>
        </span>
        <span class="profile-file-download-link" v-if="type !== 'draft'">
          <svg xmlns="http://www.w3.org/2000/svg" v-if="type === 'profile'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <span v-if="type === 'profile' && views.document_views">{{views.document_views.value}}</span>
          <span v-if="type === 'searcher'">
            <router-link class="file-download-link" :to="''">
              Завантажити
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3684DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
            </router-link>
<!--            <span v-else>Доступ до файлу закритий</span>-->
          </span>
        </span>
      </div>
      <download-part />
    </div>
  </div>
</template>

<script>
import viewsDocument from "@/components/document/viewsDocument";
import {mapGetters, mapMutations, mapState} from "vuex";
import axios from "axios";
import {apa} from "@/styleLib"
import BoxSelector from "@/components/DocumentMake/DocumentComponents/BoxSelector";
import DownloadPart from "@/components/DocumentMake/DocumentComponents/DownloadPart";


export default {
  props:['documentItem'],

  data(){
    return{
      views:{},
      pointDocument: null,
      type: 'searcher'
    }
  },

  methods:{
    viewsDocument(){
      axios.get(this.api_url_v1 + '/report/document-views/' + this.documentItem.id).then(response => {
        this.views = response.data
      }, err => {
        console.log('views error:',err);
      })
    },
    getDate(old_date){
      if (old_date) {
        let date_arr = old_date.split('-')

        const yyyy = date_arr[0]
        let mm = date_arr[1]
        let dd = date_arr[2]

        // if (dd < 10) dd = '0' + dd
        // if (mm < 10) mm = '0' + mm

        return dd + '.' + mm + '.' + yyyy
      }
      return ''
    }
  },

  computed:{
    ...mapGetters(['getTypes','getMakeDocument','getSelectedRefs']),
    ...mapState(['api_url_v1'])
  },
  beforeMount() {
    // if (this.$route.query.refs_doc_id){
    //   this.type = 'draft'
    // }
  },
  mounted() {

    if (this.type !== 'draft')
      this.viewsDocument()

    // if (this.$route.query.refs_doc_id){
    //   this.updateSelectedRefs([])
    //   this.checkItem = this.$route.query.refs_doc_id && JSON.parse(this.$route.query.refs_doc_id).find(id => id === this.documentItem.id) !== undefined
    //   this.getSelectedRefs.push(
    //       {
    //         reference_document_id:this.documentItem.id,
    //         bibliographic_description: apa(this.documentItem)
    //       }
    //   )
    // }

  },


  components:{DownloadPart, BoxSelector, viewsDocument}
}
</script>

<style scoped>

.document-item{
  position: relative;
  padding: 0.5rem 1rem;
  overflow:hidden;
  outline: none;
}
.check-item{
  position: absolute;
  left: 0.8rem;
  top: calc(50% - 9px);
}

.context-document-item{
  display: flex;
  position: relative;
  justify-content: space-between;
  height: calc(100% - 49px);
}

.first-piece{
  display: inherit;
  flex-flow: column;
  margin: 10px 0;
  height: calc(100% - 10px);
}

.first-piece > h3{
  margin-bottom: 10px;
}

.second-piece{
  padding: 0 15px;
  display: inherit;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.second-piece > svg{
  width: 50px;
  height: 50px;
}

.document-list-keywords{
  /*border: 1px solid black;*/
  display: flex;
  flex-flow: row wrap;
  padding: 5px 0;
}
.document-list-keywords > span{
  background: rgba(125, 215, 207, 0.38);
  color: #212121;
  /*background: rgba(32, 178, 170, 0.15);*/
  /*border-radius: 50px;*/
  border-radius: 3px;
  padding: 8px 16px;
  margin: 5px 10px 5px 0;
}

.authors{
  margin-top: auto;
}

.list-document-type{
  display: flex;
  font-size: 1rem;
  margin-top: 10px;
}

.list-document-type > span{
  border: 1px solid #55B8CA;
  padding: 2px 8px;
  border-radius: 3px;
  text-align: center;
  /*width: auto;*/
  color: #55B8CA;
}
.draft-type-style > span{

  padding: 0;
  border: 1px solid transparent;
}

.document-item a:visited{
  color: #3684DD;
}
.document-item a{
  text-decoration: none;
  /*color: #0F0F0F;*/
  color: #0969DA;
}

.file-download-link{
  display: flex;
}

.file-download-link > svg{
  margin-left: 5px;
}

.publication-date{
  color: #535353;
  margin-left: auto;
  font-size: 0.8em;
  margin-top: 4px;
  /*margin: 0.25rem;*/
}

.profile-file-download-link{
  display: flex;
  position: absolute;
  bottom: 15px;
  right: 10px;
}

.profile-file-download-link > span{
  padding-left: 5px;
  color: #999999;
  cursor: default;
}

.profile-file-download-link > a:hover{
  color: rgba(28, 117, 221, 0.75);
  stroke: #55B8CA;
  cursor: pointer;
}

.document-draft{
  background: white;
  padding: 0.1rem 0.5rem 0.1rem 3rem;
  margin-bottom: 5px;
  border-radius: 4px;
}

</style>