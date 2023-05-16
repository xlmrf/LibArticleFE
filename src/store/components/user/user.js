import router from "./../../../router";
import axios from "axios";
import auth from "./auth"
import settings from "./settings";


export default {
    state: {
        user: {},
        author: {},
        profile:null,
        token: '',
        info: {},
        errors: [],

        universities: []

    },
    actions: {
        requestProfile(ctx,id) {
            console.log('id:',id)
            axios.get(ctx.rootState.api_url_v1 + '/profile/' + id)
                .then(res => {
                    ctx.commit('updateProfile', res.data)
                    // ctx.commit('userMessages', res.statusText)
                    console.log("author info", res);
                }, error => {
                    ctx.commit('makeErrors', error)
                })
        },
        async requestUser(ctx) {
            await axios.get(ctx.rootState.api_url_v1 + '/user?info')
                .then(res => {
                    ctx.commit('updateUser', res.data)
                    console.log("user info", res);
                }, error => {
                    console.log("user info");
                    ctx.commit('makeErrors', error)
                })
        },
        requestUniversity(ctx) {
            axios.get(ctx.rootState.api_url_v1 + '/universities').then(response => {
                ctx.commit('universities', response.data)
            })
        },
        ...auth,
        ...settings
    },
    mutations: {
        updateProfile(ctx, data) {
            ctx.profile = data
        },
        updateUser(ctx, data) {
            ctx.user = data
        },

        universities(ctx, data) {
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

        getProfile(state) {
            return state.profile
        },

        getUniversities(state) {
            return state.universities
        }
    }
}
