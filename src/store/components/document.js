import router from "./../../router"
import axios from "axios";

export default {
    state() {
        return {
            document: {},
            last_documents: [],
            info: '',
            // types: [],
            titleInputRef:null,
            propose_authors: [],
            newDocumentId: null,
            uncompletedDocument: '',
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
        // requestTypes(ctx) {
        //     axios.get(ctx.rootState.api_url_v1 + '/document-types').then(response => {
        //         ctx.commit('types', response.data)
        //     })
        // },

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
            ctx.info = data
        },
        uploadResult(state, data){
           // state.document = data
            router.push('/document/' + data.id)

        },
        updateDocument(state, data) {
            state.document = {...state.document, ...data}
        },
        DocumentMutate(state,data){
            state.document = data
        },
        DocAuthors(state,data){
            state.document.authors = data
        },
        // types(state, data) {
        //     state.types = data
        // },
        mutateLastDocuments(ctx, data) {
            ctx.last_documents = data
        },
        updateTitle(ctx,data){
            ctx.titleInputRef = data
        }

    },
    getters: {
        getUncompletedDocument(ctx) {
            return ctx.uncompletedDocument
        },
        getDocumentMakeWarning(ctx){
            return ctx.info
        },
        // getTypes(ctx) {
        //     // console.log('ctx:', ctx.categories);
        //     return ctx.types;
        // },
        getProposeAuthors(ctx) {
            return ctx.propose_authors
        },
        getNewDocumentId(ctx) {
            return ctx.newDocumentId
        },
        getLastDocuments(ctx) {
            return ctx.last_documents
        },
        getDocument(ctx) {
            return ctx.document
        },
        getTitleInput(ctx){
            return ctx.titleInputRef
        }

    },

}
