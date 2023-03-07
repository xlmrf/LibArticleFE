export default {
    data(){
        return{
            equals:{
                'title': 'Назва',
                'edition': 'Науковий напрямок',
                'authors': 'Автори',
                'place' : 'Місце',
                'publication_date' : 'Дата публікації',
                'keywords' : 'Ключові слова',
                'pages' : 'Сторінки',
                'references' : 'Посилання',
                'description' : 'Опис',
            },
            filters_equal:{
                'authors': 'Автори:',
                'type_id': 'Тип:',
                'publication_date': 'Дата публікації:'
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
        },
        translateFilters(e){
            console.log('eee',this.filters_equal)
            return this.filters_equal[e]
        }
    }
}
