export default {


    state() {
        return {
            ErrorCodeMessage:{
                'credentials_incorrect': 'Введений пароль або логін не вірний.',
                'invalid_hash': 'Хешу не існує.',
                'enter_value': 'Необхідно ввести значення',
                'different_pass': 'Паролі не збігаються',
                'incorrect_pass': 'Не вірний пароль',
                'not_enough_symbols': 'Поле повинно включати більше символів',
                'empty_field': 'Поле не може бути пустим',

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