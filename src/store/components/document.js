import router from "./../../router"
import axios from "axios";

export default {
    state() {
        return {
            document: {},
            makeDocument: {},
            forced:false,

            warnings: [],
            titleInputRef:null,

            propose_authors: [],

        }
    },
    actions: {
        updateDocument(ctx, data) {
            console.log('vuex upload document data:', data);
            let id = router.currentRoute.value.params.id
            axios.patch(ctx.rootState.api_url_v1 + '/document/make/' + id, data).then(response => {
                ctx.commit('uploadResult', response.data)
            }, err => {
                console.log('error info -', err.message);
                ctx.commit('setInfo', err)
            })
        },

        requestDocumentMake(ctx, id) {

            axios.get(ctx.rootState.api_url_v1 + '/document/make/' + id).then(response => {
                ctx.commit('DocumentMakeMutate', response.data)
            }, err => {
                ctx.commit('catchError', err)
            })
        },

        requestDocument(ctx, id) {

            axios.get(ctx.rootState.api_url_v1 + '/document/' + id).then(response => {
                ctx.commit('DocumentMutate', response.data)
            }, err => {
                ctx.commit('catchError', err)
            })
        },
        deleteAuthor(ctx, data) {
            axios.delete(ctx.rootState.api_url_v1 + '/document/' + data.document_id + '/author/' + data.author_id).then(res => {
                console.log('author was delete', res.status)
            }, err => {
                console.log('error delete author', err.response.data)
            })
        },

        lastDocuments(ctx) {
            // axios.get(ctx.rootState.api_url_v1 + '/last-documents').then(response => {
            //     ctx.commit('mutateLastDocuments', response.data)
            // })
        }

    },
    mutations: {
        catchError(ctx,data){
            ctx.warnings = data
        },
        uploadResult(ctx, data){
           // state.document = data
            router.push('/profile/' + data.pivot.user_id)

        },

        updateForce(ctx, data){
            ctx.forced = data
        },

        updateStoreDocument(ctx, data) {
            data === {} ? ctx.makeDocument = {} : ctx.makeDocument = {...ctx.makeDocument, ...data}
        },

        DocumentMutate(ctx,data){
            ctx.document = data
        },

        DocumentMakeMutate(ctx,data){
            ctx.makeDocument = data
        },

        DocAuthors(ctx,data){
            ctx.document.authors = data
        },

        updateTitle(ctx,data){
            ctx.titleInputRef = data
        }

    },
    getters: {

        getDocumentMakeWarning(ctx){
            return ctx.warnings
        },

        getDocument(ctx) {
            return ctx.document
        },

        getForced(ctx) {
            return ctx.forced
        },

        getMakeDocument(ctx){
            return ctx.makeDocument
        },


        // get title input into MD (MakeDocument)
        getTitleInput(ctx){
            return ctx.titleInputRef
        }

    },

}
