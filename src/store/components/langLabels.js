export default {


    state() {
        return {
            ua:{
                common:{
                    'empty_field': 'Введіть значення',
                    'too_few_characters': 'Мінімальне значення символів: '
                },
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
                    },

                    search_type:{
                        'references': 'посилання'
                    },

                    add_refs_btn:'Додати',
                    back_to_doc_btn:'Назад'

                },

                actions:{
                    left_bar_titles: {
                        'notices': "Повідомлення",
                        'actions': "Діяльність",
                        searcher:{
                            'actions.notices': "Пошук повідомлення...",
                            'actions.events': "Пошук активностей..."
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
                        'first_name': "Ім`я",
                        'last_name': "Прізвище",
                        'email': 'Email',
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

                        'clear_events': "Видалити історію",
                        'clear_events_advice': "Очистити повністю список подій",

                        'title_privacy': "Приватність",
                        'open_profile_box': "Відкрити профіль для перегляду іншим користувачам",

                        'title_change_lang': "Мова",

                        'system_lang': "Мова системи",

                        'select_lang_ua': "Українська",
                        'select_lang_en': "English",

                        'btn_save_settings': "Зберегти",
                    }
                },
                document:{
                    topics:{
                        'annotation': 'Опис',
                        'document_references': 'Посилання',
                        'comments': 'Коментарі',
                        'edit': 'Редагувати'
                    },
                    characteristic:{
                        'publisher': 'Опублікував',
                        'authors': 'Автори',
                        'keywords': 'Ключові слова',
                        'publication_date': 'Дата публікації',
                        'views': 'Перегляди',
                        'cites': 'Цитування',
                        'copy': 'копіювати',
                        'copied': 'скопійовано',
                        'document': 'документ'
                    }
                },
                document_make:{
                    field_error:{
                        'partially_filled': 'Необхідно заповнити поля',
                        'none_author': 'Потрібно внести хоча б одного автора',
                        'none_edition': 'Науковий напрямок відсутній',
                        'none_place':'Місце публікації відсутнє',
                        'none_publication_date': 'Дата публікації не вказана',
                        'none_keywords': 'Не вказані ключові слова',
                        'none_references': 'Не вказані посилання',
                        'none_file': 'Файл відсутній',
                        'none_description': 'Опис відсутній',
                        'not_enough':'Недостатньо символів',
                        'email_not_correct': 'Не коректний email',
                        'none_first_name': "Введіть ім'я",
                        'none_last_name': "Введіть прізвище",
                        'none_email': "Введіть email"

                    },
                    signs:{
                        'authors': 'Автори',
                        'im_coauthor': "Я співавтор",
                        'add_author': 'Додати автора',
                        'email': 'Email',
                        'last_name': 'Прізвище',
                        'first_name': "Ім'я",
                        'edition': 'Науковий напрямок',
                        'place': 'Місце публікації',
                        'publication_date': 'Дата публікації',
                        'only_year': 'рік',
                        'full_date': 'повна дата',
                        'none_date': 'без дати',
                        'year': 'Рік',
                        'month': 'Місяць',
                        'day': 'День',


                        'document_name': 'Назва документу',
                        'keywords': 'Ключові слова',
                        'references': 'Посилання',
                        'description': 'Опис/Абстракція',
                        'save_draft_btn': 'Зберегти в чернетки',
                        'publish_btn': 'Опублікувати',
                        'add_btn': 'Додати',
                        'search_in_lib': 'Пошук у системі',
                        'save_btn': 'Зберегти',

                        'put_doc_area': 'Щоб завантажити файл перетягніть його у поле або натисність сюди'
                    },
                    hint_description:{
                        'authors': 'Автори, що напряму причетні до вмісту документу',
                        'edition': 'Тематика документу, конкретна наукова область, наприклад: Tesla coil або TDOA',
                        'place': 'Місце першого опублікування документу',
                        'publication_date': 'Дата першого опублікування документу',

                        'keywords': 'Основні ключові слова, навколо яких описувалась робота',
                        'references': 'Документи та ресурси на які посилались автори',
                        'description': 'Наведення стислого опису документу',
                    },
                    file_field:{
                        'put_doc_area': 'Щоб завантажити файл перетягніть його у поле або натисність сюди',
                        'file_required': "Файл обов'язковий",
                        'put_file': 'Опускайте сюди',
                        'invalid_type': 'Тип файлу некоректний'
                    },
                    warnings:{
                        'document_exists':'Документ з такою назвою існує серед ваших документів',
                        'create':'Створити',
                        'change_title': 'Змінити назву',
                        'view': 'переглянути',
                        'move': 'Перейти'
                    }
                },
                documents:{
                    side_filter:{
                        'all': 'Всі',

                    },
                    nav_filter:{
                        'sort_by': 'Сортувати по',
                        'applied_filters': 'Застосовані фільтри',
                        'showing': 'Переглядаються',
                        'clear': 'очистити',

                        'date': 'даті',
                        'alphabet': 'назві',
                        'match': 'пошуку',
                        'views': 'переглядах'
                    }
                }

            },



            en: {
                areas:{
                    'title': 'Title',
                    'type': 'Type',
                    'last name': 'Last name',
                    'first name': 'First_name',
                    'email': 'Email',
                    'description': 'Description',
                    'keywords': 'Keywords',
                    'references': 'References',

                },
                common:{
                    'empty_field': 'Enter a value',
                    'too_few_characters': 'Minimum character count: '
                },
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
                    },

                    search_type:{
                        'references': 'references'
                    },

                    add_refs_btn:'Add',
                    back_to_doc_btn:'Back'
                },

                actions:{
                    left_bar_titles: {
                        'notices': "Notices",
                        'actions': "Actions",
                        searcher:{
                            'actions.notices': "Find message...",
                            'actions.events': "Find action..."
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
                        'first_name': "Name",
                        'last_name': "Last name",
                        'middle_name': "Middle name",
                        'email': 'Email',
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

                        'clear_events': "Clear actions",
                        'clear_events_advice': "Clear the actions list completely",

                        'title_privacy': "Privacy",
                        'open_profile_box': "Makes your user info confidential.",

                        'title_change_lang': "Language",

                        'system_lang': "System language",

                        'select_lang_ua': "Українська",
                        'select_lang_en': "English",

                        'btn_save_settings': "Save"

                    }
                },
                document:{
                    topics:{
                        'annotation': 'Abstract',
                        'document_references': 'Document references',
                        'comments': 'Comments',
                        'edit': 'Edit'
                    },
                    characteristic:{
                        'publisher': 'Publisher',
                        'authors': 'Authors',
                        'keywords': 'Keywords',
                        'publication_date': 'Publication date',
                        'views': 'Views',
                        'cites': 'Cites',
                        'copy': 'copy',
                        'copied': 'copied',
                        'document': 'document'
                    }
                },
                document_make:{
                    field_error:{
                        'partially_filled': 'Fields are required',
                        'none_author': 'At least one author must be entered',
                        'none_edition': 'Edition is missing',
                        'none_place':'Place is missing',
                        'none_publication_date': 'Publication date is missing',
                        'none_keywords': 'Keywords are absent',
                        'none_references': 'References are absent',
                        'none_file': 'There is no main file',
                        'none_description': 'Write an abstract',
                        'not_enough': 'Not enough characters',
                        'email_not_correct': 'Email not correct',
                        'none_first_name': 'Enter first name',
                        'none_last_name': 'Enter last name',
                        'none_email': 'Enter email'
                    },
                    signs:{
                        'authors': 'Authors',
                        'im_coauthor': "I'm coauthor",
                        'add_author': 'Add author',
                        'email': 'Email',
                        'last_name': 'Last name',
                        'first_name': 'First name',
                        'edition': 'Edition',
                        'place': 'Publication place',
                        'publication_date': 'Publication date',
                        'publication_year': 'year',
                        'full_date': 'full date',
                        'only_year': 'year',
                        'none_date': 'none',
                        'year': 'Year',
                        'month': 'Month',
                        'day': 'Day',

                        'document_name': 'Document title',
                        'keywords': 'Keywords',
                        'references': 'References',
                        'description': 'Description/Abstract',
                        'save_draft_btn': 'Save to depository',
                        'publish_btn': 'Publish',
                        'add_btn': 'Push',
                        'search_in_lib': 'Search in the system',
                        'save_btn': 'Save',

                    },
                    hint_description:{
                        'authors': 'Автори, що напряму причетні до вмісту документу',
                        'edition': 'Тематика документу, конкретна наукова область, наприклад: Tesla coil або TDOA',
                        'place': 'Місце першого опублікування документу',
                        'publication_date': 'Дата першого опублікування документу',

                        'keywords': 'Основні ключові слова, навколо яких описувалась робота',
                        'references': 'Документи та ресурси на які посилались автори',
                        'description': 'Наведення стислого опису документу',
                    },
                    file_field:{
                        'put_doc_area': 'To upload a file, drag it into the area or click here',
                        'file_required': 'File is required',
                        'put_file': 'Put it here',
                        'invalid_type': 'Type of file is incorrect'
                    },
                    warnings:{
                        'document_exists':'The document with this title exists.',
                        'create':'Create',
                        'change_title': 'Change title',
                        'view': 'view',
                        'move': 'Move on'
                    }
                },
                documents:{
                    nav_filter:{
                        'sort_by': 'Sort by',
                        'applied_filters': 'Applied filters',
                        'showing': 'Showing',
                        'clear': 'clear',

                        'date': 'date',
                        'alphabet': 'A-z',
                        'match': 'match',
                        'views': 'views'
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