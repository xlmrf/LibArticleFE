import axios from "axios";
import router from "@/router";

export default {
    state(){
        return{
            documents:[],
            document:{},
            filter:{},
            info:''
        }
    },

    actions:{
        DocumentSearcher(ctx,data) {
            let link = '?'+Object.entries(data).join('&').split(',').join('=');
            axios.get('http://libarticle.loc/api/v1/documents' + link).then(response => {
                ctx.commit('DocumentsMutate', response.data)
            }).catch(err => {
                ctx.commit('errorsDocument', err.response)
            })
        },
        FilterDocuments(ctx,data){
            let link = '?'+Object.entries(data).join('&').split(',').join('=');
            axios.get('http://libarticle.loc/api/v1/filter-documents' + link).then(response => {
                ctx.commit('FilterMutate', response.data)
            }).catch(err => {
                ctx.commit('errorsDocument', err.response)
            })
        },
        reviseDocument(ctx) {
            // console.log("in js, id:", ctx);
            let id = router.currentRoute.value.params.id
            axios.get('http://libarticle.loc/api/v1/document/' + id).then(response => {
                ctx.commit('DocumentMutate', response.data);
                console.log('revise:',response.data);
            }).catch(err => {
                ctx.commit('errorsDocument', err.response.data);
                console.log('error in request document:', err);
            })
        }
    },

    mutations:{
        FilterMutate(state,data){
            state.filter = data
        },
        DocumentsMutate(state, data) {
            state.documents = data
        },
        DocumentMutate(state, data) {
            // console.log("Document update in mutations =>", data);
            state.document = data
        },
        errorsDocument(state, data) {
            state.info = data
        },
    },

    getters:{
        getDocuments(ctx) {
            return ctx.info ? ctx.info : ctx.documents
        },
        getFilter(ctx){
            return ctx.filter
        },
        getDocument(ctx) {
            return ctx.document
        }
    }
}
