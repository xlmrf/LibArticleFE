export default {
    data(){
        return {
            ua:{
                messages:{
                    'coauthor': "Вас додано як співавтора у документі *",
                    'use': "Документ * використали як посилання",
                    'popular': "Документ * набрав найвищу популярність серед ваших документів"
                },
                actions:{
                    'not-ready': "Документ "
                }
            },


            en: {
                messages: {
                    'coauthor': "Message",
                },
                actions: {
                    'not-ready': "The document is not ready"
                }
            },
            document:''
        }
    },
    methods:{
        getMessageUa(data){

            let text = `<span style="color: #318CE7;font-weight: bold;">${data.document_title}</span>`

            return this.ua.messages[data.type]?.replace(/\*/g, text);
        },
        getMessageEn(data){
            return this.en
        }
    }
    // getters:{
    //     getMessageUa(ctx){
    //         return ctx.ua
    //     },
    //     getMessageEn(ctx){
    //         return ctx.en
    //     }
    // }




}