export default {


    state() {
        return {
            ua:{
                settings:{
                    left_bar_titles:{
                        'account': "Акаунт",
                        'security': "Безпека",
                        'other': "Інше",
                    },
                    account_titles:{
                        'bio': "Про себе",
                        'name': "Ім`я",
                        'last_name': "Прізвище",
                        'middle_name': "По батькові",
                        'city': "Місце проживання",
                        'university': "Університет"
                    },
                    security_titles:{
                        'title_change_password': "Зміна паролю",

                        'password': "Діючий пароль",
                        'new_password': "Новий пароль",
                        'confirm_password': "Підтвердження паролю",

                        'btn_save_settings': "Змінити пароль",
                        'better_password_hint': "Для створення надійного паролю не використовуйте легкі комбінації (Дата народження, ПІБ, 12345678...)"
                    },
                    other_settings_titles:{
                        'title_notices': "Повідомлення",

                        'send_email_box': "Відправляти повідомлення на email",
                        'send_email_advice': "Відмітивши поле, на ваш email будуть відправлятись повідомлення про: використання вашого документу як посилання, позначення вас як співавтора в доданому іншими користувачами документа та ін.",

                        'title_privacy': "Приватність",
                        'open_profile_box': "Відкрити профіль для перегляду іншим користувачам",

                        'btn_save_settings': "Зберегти"

                    }
                }
            },
            en: {
                settings: {
                    left_bar_titles: {
                        'account': "Account",
                        'security': "Security",
                        'other': "Other",
                    },
                    account_titles: {
                        'bio': "Bio",
                        'name': "Name",
                        'last_name': "Last name",
                        'middle_name': "Middle name",
                        'city': "Place of residence",
                        'university': "University"
                    },
                    security_titles: {
                        'title_change_password': "Password",

                        'password': "Password",
                        'new_password': "New password",
                        'confirm_password': "Confirm password",

                        'btn_save_settings': "Save",
                        'better_password_hint': "To create a strong password, do not use easy combinations (Birth date, full name, 123456 etc.)"
                    },
                    other_settings_titles: {
                        'title_notices': "Notices",

                        'send_email_box': "Send notices to email",
                        'send_email_advice': "Messages about marking you as a co-author in a document added by other users, using your document as a cite, etc. will be notice you in email.",

                        'title_privacy': "Privacy",
                        'open_profile_box': "Makes your user info confidential.",

                        'btn_save_settings': "Save"

                    }
                }
            }
        }
    },
    getters:{
        getLabelUa(ctx){
            return ctx.ua
        },
        getLabelEn(ctx){
            return ctx.en
        }
    }




}