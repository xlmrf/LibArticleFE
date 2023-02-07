export default {
    data(){
        return{
            emailFail:''
        }
    },
    methods:{
        checkEmail(value){
            // console.log('enter valid email 222', value);
            if (value === '' || value === null){
                return this.emailFail = 'Вкажіть email'
            }
            let email = String(value).toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            if(email){
                return this.emailFail = ''
            }
            else{
                console.log('email not correct');
                return this.emailFail = 'Email не корректний'
            }
        }
    }
}
