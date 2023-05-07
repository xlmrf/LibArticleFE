import router from "./../../router"
import axios from "axios";

export default {
    state() {
        return {
            document: {},
            last_documents: [],
            info: '',
            types: [],
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
        requestTypes(ctx) {
            axios.get(ctx.rootState.api_url_v1 + '/document-types').then(response => {
                ctx.commit('types', response.data)
            })
        },
        findAuthor(ctx, data) {
            axios.get(ctx.rootState.api_url_v1 + '/author?email=' + data.email,).then(response => {
                ctx.commit('upAuthor', {res:response.data,idx:data.idx})
            }).catch(err => {
                console.log(err.response)
            })
        },
        createDocument(ctx, data) {
            axios.post(ctx.rootState.api_url_v1 + '/document/make', {data: data}).then(response => {
                // ctx.commit('documentCreated', response.data)
                console.log('wef', response.data);
                ctx.commit('updateDocument', response.data)
                // localStorage.setItem('not_finished_document', JSON.stringify(response.data))
                // router.push('new_document/'+response.data.id).catch(err => console.log('to new document:',err));
            }, err => {
                console.log('error info -', err.message);
                ctx.commit('setInfo', err)
            })
        },

        requestDocument(ctx, id) {

            axios.get(ctx.rootState.api_url_v1 + '/document/' + id).then(response => {
                ctx.commit('DocumentMutate', response.data)
            }, err => {
                ctx.commit('catchInfo', err)
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
            axios.get(ctx.rootState.api_url_v1 + '/last-documents').then(response => {
                ctx.commit('mutateLastDocuments', response.data)
            })
        },

    },
    mutations: {
        catchInfo(ctx,data){
            ctx.info = data
        },
        uploadResult(state, data){
           // state.document = data
            router.push('/document/' + data.id)

        },
        updateDocument(state, data) {
            router.push('/document/make/' + data.id)
            state.document = {...state.document, ...data}
        },
        DocumentMutate(state,data){
            state.document = data
        },
        types(state, data) {
            state.types = data
        },
        upAuthor(ctx, data) {
            ctx.propose_authors[data.idx] = data.res
        },
        mutateLastDocuments(ctx, data) {
            ctx.last_documents = data
        },

    },
    getters: {
        getUncompletedDocument(ctx) {
            return ctx.uncompletedDocument
        },
        getTypes(ctx) {
            // console.log('ctx:', ctx.categories);
            return ctx.types;
        },
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

    },

}
