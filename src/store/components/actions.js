import router from '../../router.js'

export default {
    state() {
        return {
            messages: {
                notices: [],
                events: []
            }
        }
    },
    actions: {

    },
    mutations: {
        upnotices(ctx, data){
            ctx.messages.notices = data
        },
        upevents(ctx, data){
            ctx.messages.events = data;
        },
        // updComment(ctx, data){
        //     ctx.comments[ctx.comments.length-1] = data
        // }
    },
    getters: {
        getMessages(ctx) {
            return ctx.messages
        }
    },

}
