import router from '../../router.js'

export default {
    state() {
        return {
            comments:[]
        }
    },
    actions: {
        pushComment(ctx, data){
            let id = router.currentRoute.value.params.id
            // ctx.commit('addComment', {text:data,sort:ctx.state.comments.length})
            axios.post(ctx.rootState.api_url_v1+'/document/'+id+'/comments', {text:data}).then(response => {
                console.log('response push comment',response.data);
                ctx.commit('addComment', response.data)
            }).catch(error => console.log(error.response.data))
        },
        removeComment(ctx,[comment_id, index]){
            // alert();
            // console.log(ctx);
            ctx.state.comments.splice(index, 1);
            let id = router.currentRoute.value.params.id
            axios.delete(ctx.rootState.api_url_v1+'/document/'+id+'/comments/'+comment_id).then(response => {
                console.log('response push comment',response.data);
            }).catch(error => console.log(error.response.data))
        },
        reviseComments(ctx){
            let id = router.currentRoute.value.params.id
            axios.get(ctx.rootState.api_url_v1+'/document/'+id+'/comments').then(response => {
                console.log('response push comment',response.data);
                ctx.commit('updateComments', response.data)
            }).catch(error => console.log(error.response.data))
        }

    },
    mutations: {
        updateComments(ctx, data){
            ctx.comments = data.reverse()
        },
        addComment(ctx, data){
            ctx.comments.unshift(data);
        },
        // updComment(ctx, data){
        //     ctx.comments[ctx.comments.length-1] = data
        // }
    },
    getters: {
        getComments(ctx) {
            return ctx.comments
        }
    },

}
