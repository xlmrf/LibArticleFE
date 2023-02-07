import router from "./../../../router";
import axios from "axios";
import auth from "./auth"
import settings from "./settings";


export default {
    state: {
        user:{},
        author:{},
        token: '',
        info: {},
        user_info:{},
        universities:[]

    },
    actions: {
        requestAuthor(ctx){
            let id = router.currentRoute.value.params.id
            axios.get('http://libarticle.loc/api/v1/profile/'+id)
                .then(res => {
                    ctx.commit('updateAuthor', res.data)
                    // ctx.commit('userMessages', res.statusText)
                    console.log("author info", res);
                }, error => {
                    ctx.commit('makeErrors',error)
                    ctx.commit('userMessages', error)
                })
        },
        requestUserInfo(ctx){
            axios.get('http://libarticle.loc/api/v1/user-info')
                .then(res => {
                    ctx.commit('updateUserInfo', res.data)
                    // ctx.commit('userMessages', res.statusText)
                    console.log("author info", res);
                }, error => {
                    ctx.commit('makeErrors',error)
                    ctx.commit('userMessages', error)
                })
        },
        async requestUser(ctx) {
           await axios.get('http://libarticle.loc/api/v1/user')
                .then(res => {
                    ctx.commit('updateUser', res.data)
                    ctx.commit('userMessages', res.statusText)
                    console.log("user info", res);
                }, error => {
                    console.log("user info");
                    ctx.commit('makeErrors',error)
                    ctx.commit('userMessages', error)
                })
        },
        requestUniversity(ctx){
            axios.get('http://libarticle.loc/api/v1/universities').then(response => {
                ctx.commit('universities', response.data)
            })
        },
        ...auth,
        ...settings
    },
    mutations: {
        updateAuthor(ctx, data){
            ctx.author = data
        },
        updateUserInfo(ctx,data){
            ctx.user_info = data
        },
        updateUser(ctx, data) {
            ctx.user = data
        },
        userMessages(ctx, data) {
            ctx.info = data
            localStorage.setItem('message', data)
        },
        universities(ctx, data){
            ctx.universities = data
        },
        setAT(ctx, data) {
            console.log("set AT :", data);
            ctx.token = data
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data
            localStorage.setItem('access_token', data);
        },
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUserMessage(state) {
            return state.info
        },
        getAuthor(state){
            return state.author
        },
        getToken(state){
            return state.token
        },
        getUniversities(state){
            return state.universities
        },
        getUserInfo(state){
            return state.user_info
        }
    }
}
