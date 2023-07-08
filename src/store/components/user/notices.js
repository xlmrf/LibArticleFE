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
            if (data === -1){
                ctx.newMessagesCount--
            }
            else {
                ctx.newMessagesCount = data
            }
        }
    },
    getters: {

        getNewMessagesCount(ctx){
            return ctx.newMessagesCount
        }
    },

}
