export default {
    state() {
        return {
            messages:[],
            newMessagesCount:0
        }
    },
    actions: {


    },
    mutations: {


        updateNewMessagesCount(ctx,data){
            ctx.newMessagesCount = data
        }
    },
    getters: {

        getNewMessagesCount(ctx){
            return ctx.newMessagesCount
        }
    },

}
