import axios from "axios";
import router from "@/router";

export default {
    state(){
        return{
            documents:[],
            filter:{},
            authors:[],
            years: {},
            info:''
        }
    },

    actions:{
        DocumentSearcher(ctx,data) {
            // let link = '?'+Object.entries(data).join('&').split(',').join('=');
            axios.get(ctx.rootState.api_url_v1+'' + data).then(response => {
                ctx.commit('DocumentsMutate', response.data)
            }).catch(err => {
                ctx.commit('errorsDocument', err.response)
            })
        },
        FilterDocuments(ctx,data){
            let link = '?'+Object.entries(data).join('&').split(',').join('=');
            axios.get(ctx.rootState.api_url_v1+'/filter-documents' + link).then(response => {
                ctx.commit('FilterMutate', response.data)
            }).catch(err => {
                ctx.commit('errorsDocument', err.response)
            })
        },
        AuthorsFilter(ctx,data){
            axios.get(ctx.rootState.api_url_v1+'/authors' + data).then(response => {
                ctx.commit('AuthorsFilterMutate', response.data)
            }).catch(err => {
                console.log('authors error:', err.response)
                // ctx.commit('errorsDocument', err.response)
            })
        },
        YearsFilter(ctx,data){
            axios.get(ctx.rootState.api_url_v1+'/documents-year' + data).then(response => {
                ctx.commit('YearsFilterMutate', response.data)
            }).catch(err => {
                console.log('authors error:', err.response)
                // ctx.commit('errorsDocument', err.response)
            })
        },
        reviseDocument(ctx) {
            // console.log("in js, id:", ctx);
            let id = router.currentRoute.value.params.id
            axios.get(ctx.rootState.api_url_v1+'/document/' + id).then(response => {
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
        AuthorsFilterMutate(state,data){
            state.authors = data
        },
        YearsFilterMutate(state,data){
            state.years = data
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
            return ctx.documents
        },
        getFilter(ctx){
            return ctx.filter
        },
        getAuthors(ctx){
            return ctx.authors
        },
        getYears(ctx){
            return ctx.years
        }
    }
}
