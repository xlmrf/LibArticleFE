export default {
    data(){
        return{
            equals:{
                'title': 'Назва',
                'edition': 'Науковий напрямок',
                'authors': 'Автори',
                'place' : 'Місце',
                'year' : 'Рік',
                'keywords' : 'Ключові слова',
                'pages' : 'Сторінки',
                'references' : 'Посилання',
                'description' : 'Опис',
            }
        }
    },
    methods:{
        translateAreas(e){
            return this.equals[e]
            // if(email){
            //     return this.emailFail = ''
            // }
            // else{
            //     console.log('email not correct');
            //     return this.emailFail = 'Email not correct'
            // }
        }
    }
}
