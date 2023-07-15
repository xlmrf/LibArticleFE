export default {
    state() {
        return {
            notices:[],
            newNoticesCount:0
        }
    },
    actions: {


    },
    mutations: {


        updateNewNoticesCount(ctx,data){
            if (data === -1){
                ctx.newNoticesCount--
            }
            else {
                ctx.newNoticesCount = data
            }
        }
    },
    getters: {

        getNewNoticesCount(ctx){
            return ctx.newNoticesCount
        }
    },

}
