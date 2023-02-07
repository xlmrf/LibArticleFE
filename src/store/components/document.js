import router from "./../../router"
import axios from "axios";

export default {
    state() {
        return {
            document:{

            },

            last_documents:[],
            info: '',
            categories:[],
            author_fn:{},
            newDocumentId:null,
            uncompletedDocument: ''
        }
    },
    actions: {
        updateDocument(ctx, data) {
            console.log('vuex upload document data:', data);
            let id = router.currentRoute.value.params.id
            axios.patch('http://libarticle.loc/api/v1/document/'+id, {data: data}).then(response => {
                ctx.commit('uploadResult', response.data)
            }, err => {
                console.log('error info -', err.message);
                ctx.commit('setInfo', err)
            })
        },
        requestCategories(ctx){
            axios.get('http://libarticle.loc/api/v1/document-categories').then(response => {
                ctx.commit('categories', response.data)
            })
        },
        findAuthor(ctx,email){
            console.log(email);
            axios.post('http://libarticle.loc/api/v1/author',{data:email}).then(response => {
                ctx.commit('upAuthor', response.data)
            }).catch(err => {console.log(err.response)})
        },
        createDocument(ctx,data){
            axios.post('http://libarticle.loc/api/v1/documents', {data:data}).then(response => {
                // ctx.commit('documentCreated', response.data)
                console.log('wef',response.data);
                localStorage.setItem('not_finished_document', JSON.stringify(response.data))
                router.push('new_document/'+response.data.id).catch(err => console.log('to new document:',err));
            }, err => {
                console.log('error info -', err.message);
                ctx.commit('setInfo', err)
            })
        },

        lastDocuments(ctx){
            axios.get('http://libarticle.loc/api/v1/last-documents').then(response => {
                ctx.commit('mutateLastDocuments', response.data)
            })
        }
    },
    mutations: {
        uploadResult(state, data) {
            state.info = data
        },
        categories(state,data){
            state.categories = data
        },
        upAuthor(ctx,data){
            ctx.author_fn = data
        },
        mutateLastDocuments(ctx,data){
            ctx.last_documents = data
        }
    },
    getters: {
        getUncompletedDocument(ctx){
            return ctx.uncompletedDocument
        },
        getCategories(ctx){
            // console.log('ctx:', ctx.categories);
            return ctx.categories
        },
        getFullNameAuthor(ctx){
            return ctx.author_fn
        },
        getNewDocumentId(ctx){
            return ctx.newDocumentId
        },
        getLastDocuments(ctx){
            return ctx.last_documents
        },
        getDocument(ctx){
            return ctx.document
        }
    },

}
