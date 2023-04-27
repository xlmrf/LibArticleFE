import axios from "axios";
import router from "@/router";

export default {
    state(){
        return{
            documents:[],
            filter:{},
            authors:[],
            years: {},
            filter_types: [],
            page_paginate_count:[10,25,50,100],
            info:''
        }
    },

    actions:{
        DocumentSearcher(ctx,data) {
            // let link = '?'+Object.entries(data).join('&').split(',').join('=');
            axios.get(ctx.rootState.api_url_v1+'/documents' + data).then(response => {
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
            axios.get(ctx.rootState.api_url_v1+'/filter-authors' + data).then(response => {
                ctx.commit('AuthorsFilterMutate', response.data)
            }).catch(err => {
                console.log('authors error:', err.response)
                // ctx.commit('errorsDocument', err.response)
            })
        },
        YearsFilter(ctx,data){
            axios.get(ctx.rootState.api_url_v1+'/filter-years' + data).then(response => {
                ctx.commit('YearsFilterMutate', response.data)
            }).catch(err => {
                console.log('authors error:', err.response)
                // ctx.commit('errorsDocument', err.response)
            })
        },
        TypesFilter(ctx,data){
            axios.get(ctx.rootState.api_url_v1+'/filter-types' + data).then(response => {
                ctx.commit('TypesFilterMutate', response.data)
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
        DocumentsMutate(state, data){
            state.documents = data
        },
        TypesFilterMutate(state,data){
            state.filter_types = data
        },
        errorsDocument(state, data){
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
        },
        getFilterTypes(ctx){
            return ctx.filter_types
        },
        getPageCountPaginate(ctx){
            return ctx.page_paginate_count
        }
    }
}
