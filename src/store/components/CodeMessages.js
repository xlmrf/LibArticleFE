export default {


    state() {
        return {
            ErrorCodeMessage:{
                'credentials_incorrect': 'Введений пароль або логін не вірний.',
                'invalid_hash': 'Хешу не існує.'
            },
            NotesCodeMessage: {
                'recovery-password': 'Форма підтвердження про відновлення паролю відправлено на вказану почту.',
                'confirmation': 'Для підтвердження реєстрації на вказану почту надіслано повідомлення.',
                'password-changed': 'Пароль змінено.'
            },
        }
    },
    getters:{
        getNotesMessage(ctx){
            return ctx.NotesCodeMessage
        },
        getErrorMessage(ctx){
            return ctx.ErrorCodeMessage
        }
    }




}