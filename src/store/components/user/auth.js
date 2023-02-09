import axios from "axios";
import router from "./../../../router"

export default {

    recoveryPass(ctx, data) {
        axios.post(ctx.api_url_v1+'/recovery-password', data).then(res => {
                ctx.commit('userMessages', {agree: 'На вказаний email прийшла анкета для відновлення паролю', date: Date.now()})
            },
            err => {
                ctx.commit('userMessages', {error:err.response.data, date: Date.now(), status:err.response.status})
                console.log('err',err.response);
            })
    },
    createPass(ctx, data) {
        axios.post(ctx.api_url_v1+'/reset-password/'+data.token, data).then(res => {
                ctx.commit('requestPasswordCreate', res.data)
            },
            err => {
                ctx.commit('userMessages', {error: err.response.data.message, date: Date.now()})
                console.log(err.response.data.message);
            })
    },
    verifyEmail(ctx) {
        let params = router.currentRoute.value.query
        console.log('params', params);
        axios.get(ctx.api_url_v1+'/confirm-email', {params: params}).then(response => {
            console.log('verify js response', response);
            ctx.commit('updateUser', response.data)
            ctx.commit('pageMessage',{status:response.status,message:'verified'})
            ctx.commit('setAT', response.data.api_token);
        }).catch(err => {
            console.log('error: ', err.response)
            ctx.commit('pageMessage', {message:err.response.data.message,status:err.response.status})
        })
    },
    // confirmChangeEmail(ctx) {
    //     console.log("confEm");
    //     axios.get('http://libarticle.loc/api/v1/confirm-email/', {params: "*"}).then(response => {
    //         console.log('verify js response', response);
    //         router.push('/')
    //     })
    // },
    registrationUser(ctx, data) {
        console.log('auth data ->', data);
        axios.post(ctx.api_url_v1+'/registration', data).then(res => {
                // ctx.commit('updateUser', res.data)
                ctx.commit('userMessages', {agree: 'На вказаний email прийшло повідомлення з підтвердженням акаунту', date: Date.now()})
                console.log('registration user axios response: ', res.data);
                // ctx.commit('setAT', res.data);
            },
            err => {
                ctx.commit("userMessages", {error: err.response.data})
                console.log("registration user axios error: ", err.response.data);
            })
    },
    login(ctx, data) {
        console.log('auth data ->', data);
        axios.post(ctx.api_url_v1+'/login', data).then(res => {
                ctx.commit('updateUser', res.data)
                console.log('auth response', res);
                ctx.commit('setAT', res.data.api_token);
                router.push('/')
            },
            err => {
                ctx.commit('userMessages', {message: err.response.data, date: Date.now(), status:err.response.status})
                console.log('auth error', err.response);
            })

    },
    logout(ctx) {
        axios.post(ctx.api_url_v1+'/logout').then(res => {
            ctx.commit('updateUser', null)
            // localStorage.removeItem('X-XSRF-TOKEN')
            router.push('login')
            console.log(res);
        })
    }
}
