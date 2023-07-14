export default {


    state() {
        return {
            ua:{
                navbar:{
                    nav_menu:{
                        'account': "Акаунт",
                        'add_document': "Додати",
                        'documents': "Документи",
                        'actions': "Активність",
                        'settings': "Налаштування"
                    },
                    nav_notices:{
                        'none_messages': "Переглянути всі",
                        'new_messages': "Переглянути нові"
                    }
                },

                actions:{
                    left_bar_titles: {
                        'notices': "Повідомлення",
                        'actions': "Діяльність",
                        searcher:{
                            'actions.notices': "Пошук повідомлення...",
                            'actions.story': "Пошук активностей..."
                        }
                    },
                },

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
                        'university': "Університет",

                        'change_photo': "змінити фото",

                        'btn_save_info': "Зберегти",
                        'btn_logout': "Вийти"
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

                        'send_email_box': "Повідомляти в email",
                        'send_email_advice': "Відмітивши поле, на ваш email будуть відправлятись повідомлення про: використання вашого документу як посилання, позначення вас як співавтора в доданому іншими користувачами документа та ін.",
                        'clear_notices': "Видалити повідомлення",
                        'clear_notices_advice': "Очистити повністю список повідомлень",

                        'clear_story': "Видалити історію",
                        'clear_story_advice': "Очистити повністю список подій",

                        'title_privacy': "Приватність",
                        'open_profile_box': "Відкрити профіль для перегляду іншим користувачам",

                        'title_change_lang': "Мова",

                        'system_lang': "Мова системи",

                        'select_lang_ua': "Українська",
                        'select_lang_en': "English",

                        'btn_save_settings': "Зберегти",
                    }
                }
            },



            en: {
                navbar:{
                    nav_menu:{
                        'account': "Account",
                        'add_document': "Add document",
                        'documents': "Documents",
                        'actions': "Actions",
                        'settings': "Settings"
                    },
                    nav_notices:{
                        'none_messages': "See all",
                        'new_messages': "See new"
                    }
                },

                actions:{
                    left_bar_titles: {
                        'notices': "Notices",
                        'actions': "Actions",
                        searcher:{
                            'actions.notices': "Find message...",
                            'actions.story': "Find action..."
                        }
                    },
                },

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
                        'university': "University",

                        'change_photo': "change photo",

                        'btn_save_info': "Save",
                        'btn_logout': "Logout"
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

                        'send_email_box': "Notify by email",
                        'send_email_advice': "Messages about marking you as a co-author in a document added by other users, using your document as a cite, etc. will be notice you in email.",
                        'clear_notices': "Clear notices",
                        'clear_notices_advice': "Clear the message list completely",

                        'clear_story': "Clear actions",
                        'clear_story_advice': "Clear the actions list completely",

                        'title_privacy': "Privacy",
                        'open_profile_box': "Makes your user info confidential.",

                        'title_change_lang': "Language",

                        'system_lang': "System language",

                        'select_lang_ua': "Українська",
                        'select_lang_en': "English",

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