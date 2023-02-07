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
            console.log('comment',data);
            axios.post('http://libarticle.loc/api/v1/documents/'+id+'/comments', {text:data}).then(response => {
                console.log('response push comment',response.data);
                ctx.commit('addComment', response.data)
            }).catch(error => console.log(error.response.data))
        },
        removeComment(ctx,[comment_id, index]){
            // alert();
            // console.log(ctx);
            ctx.state.comments.splice(index, 1);
            let id = router.currentRoute.value.params.id
            axios.delete('http://libarticle.loc/api/v1/documents/'+id+'/comments/'+comment_id).then(response => {
                console.log('response push comment',response.data);
            }).catch(error => console.log(error.response.data))
        },
        reviseComments(ctx){
            let id = router.currentRoute.value.params.id
            axios.get('http://libarticle.loc/api/v1/documents/'+id+'/comments').then(response => {
                console.log('response push comment',response.data);
                ctx.commit('updateComments', response.data)
            }).catch(error => console.log(error.response.data))
        }

    },
    mutations: {
        updateComments(ctx, data){
            ctx.comments = data
        },
        addComment(ctx, data){
            ctx.comments.push(data);
        }
    },
    getters: {
        getComments(ctx) {
            return ctx.comments
        }
    },

}
