export default {
    data(){
        return {
            ua:{
                notices:{
                    'coauthor': "Вас додано як співавтора у документі *",
                    'use': "Документ * використали як посилання",
                    'popular': "Документ * набрав найвищу популярність серед ваших документів"
                },
                events:{
                    'not-ready': "Документ ",
                    'new document': "Створено новий документ *"
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
        getMessageUa(data,type = 'notices'){

            let text = `<span style="color: #2E76BE;font-weight: bold; font-size: 0.95em">${data?.document_title}</span>`

            return this.ua[type][data?.type]?.replace(/\*/g, text);
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