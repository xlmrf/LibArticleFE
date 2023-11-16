export default {


    state() {
        return {
            ua:{

                profile:{
                    headers:{
                        'documents_load': 'Документів завантажено',
                        'documents_author': 'Авторських документів',
                        'cites': 'Процитовано',
                        'views': 'Переглядів',

                        'popular_publication': 'Популярні публікації',
                        'popular_coauthors': 'Популярні співавтори'
                    }
                },

                type_areas:{
                    signs:{
                        type: 'Тип документу',
                        fill_areas: 'Поля для заповнення',
                        category_tip: 'Оберіть категорію',
                        title_tip: 'Навчальний посібник з дисципліни «Теорія ймовірностей, імовірнісні процеси та математична статистика». Курс лекцій'
                    },

                    areas:{
                        'title': 'Назва',
                        'subject_area': 'Науковий напрямок',
                        'authors': 'Автори',
                        'place' : 'Місце публікації',
                        'publication_date' : 'Дата публікації',
                        'keywords' : 'Ключові слова',
                        'pages' : 'Сторінки',
                        'references' : 'Посилання',
                        'description' : 'Опис',
                    },
                    filter_areas:{
                        'authors': 'автори:',
                        'type_id': 'тип:',
                        'publication_date': 'дата публікації:'
                    }
                },

                areas:{
                    'title': 'Назва',
                    'type': 'Тип',
                    'last name': 'Прізвище',
                    'first name': "Ім'я",
                    'email': 'Email',
                    'description': 'Опис',
                    'keywords': 'Ключові слова',
                    'references': 'Посилання',

                },

                common:{
                    'empty_field': 'Введіть значення',
                    'too_few_characters': 'Мінімальне значення символів: '
                },
                types:{
                    'Стаття': 'Стаття',
                    'Тезис': 'Тезис',
                    'Конспект': 'Конспект',
                    'Дисертація': 'Дисертація',
                    'Підручник': 'Підручник',
                    'Монографія': 'Монографія'
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
                    },
                    cites:{
                        'doc_refs': 'Посилання документа',
                        'load_refs': 'Підвантажити посилання'
                    },
                    comments:{
                        'title': 'Коментарі',
                        'add_btn': 'Додати',
                        'input_hint': 'There is something interesting...',
                        'add_first_comment': 'Додайте перший коментар'
                    },
                    delete_modal:{
                        'delete_text': 'Ви хочете видалити документ?',
                        'delete_btn': 'Видалити',
                        'delete_cancel': 'Відмінити'
                    },
                    other:{
                        'views_hint': 'Унікальних переглядів: '
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
                        'subject_area': 'Науковий напрямок',
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
                        'description': 'Опис/Анотація',
                        'save_draft_btn': 'Зберегти в чернетки',
                        'publish_btn': 'Опублікувати',
                        'add_btn': 'Додати',
                        'search_in_lib': 'Пошук у системі',
                        'save_btn': 'Зберегти',

                        'put_doc_area': 'Щоб завантажити файл перетягніть його у поле або натисність сюди'
                    },
                    hint_description:{
                        'authors': 'Автори файлового контенту',
                        'subject_area': 'Тематика документу, конкретна наукова область, наприклад: Tesla coil або TDOA',
                        'place': 'Місце першого опублікування документу',
                        'publication_date': 'Дата першого опублікування документу',

                        'keywords': 'Основні терміни або слова в роботі',
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
                    },
                    draftModal:{
                        'topTitle': 'Не закінчені документи',
                        'count': 'Записів'
                    }
                },
                documents:{
                    sidebar:{
                        'search_area':'Область пошуку',

                        'all': 'Всі',
                        'only_my': 'Тільки мої',
                        'im_author': "Я автор",

                        'authors': 'Автори',
                        'publication_year': 'Роки публікації',
                        'types': 'Типи',


                        'selected_refs': 'Посилання',
                        'clear_btn': 'очистити',


                    },
                    nav_filter:{
                        'sort_by': 'Сортувати по',
                        'applied_filters': 'Застосовані фільтри',
                        'find_documents_p1': 'Переглядаються ',
                        'find_documents_p2': ' із ',
                        'find_documents_p3': ' знайдених документів',
                        'clear': 'очистити',
                        'date_start': 'нових',
                        'date_end': 'старших',
                        'alphabet': 'назві',
                        'match': 'пошуку',
                        'views': 'переглядах',
                        'per_page': 'На сторінці ',
                    },
                    other:{
                        'documents_not_found': 'Документів не знайдено'
                    }
                }

            },



            en: {

                profile:{
                    headers:{
                        'documents_load': 'Documents uploaded',
                        'documents_author': 'Author\'s documents',
                        'cites': 'Cites',
                        'views': 'Views',

                        'popular_publication': 'Popular publications',
                        'popular_coauthors': 'Popular coauthors'
                    }
                },

                type_areas:{
                    signs:{
                        type: 'Type of document',
                        fill_areas: 'Fields to fill',
                        category_tip: 'Choose category',
                        title_tip: 'Filtration of UAV Movement Parameters Based on the Received Signal Strength Measurement Sensor Networks in the Presence of Anomalous Measurements of Unknown Power'
                    },

                    areas:{
                        'title': 'Title',
                        'subject_area': 'Subject area',
                        'authors': 'Authors',
                        'place' : 'Publication place',
                        'publication_date' : 'Publication date',
                        'keywords' : 'Keywords',
                        'pages' : 'Pages',
                        'references' : 'References',
                        'description' : 'Description',
                    },
                    filter_areas:{
                        'authors': 'authors:',
                        'type_id': 'type:',
                        'publication_date': 'publication date:'
                    }
                },

                areas:{
                    'title': 'Title',
                    'type': 'Type',
                    'last name': 'Last name',
                    'first name': 'First name',
                    'email': 'Email',
                    'description': 'Description',
                    'keywords': 'Keywords',
                    'references': 'References',

                },

                types:{
                    'Стаття': 'Article',
                    'Тезис': 'Thesis',
                    'Конспект': 'Compendium',
                    'Дисертація': 'Dissertation',
                    'Підручник': 'Textbook',
                    'Монографія': 'Monograph'
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
                    },
                    cites:{
                        'doc_refs': 'Document references',
                        'load_refs': 'Load more references'
                    },
                    comments:{
                        'title': 'Comments',
                        'add_btn': 'Add',
                        'input_hint': 'There is something interesting...',
                        'add_first_comment': 'Add the first comment'
                    },
                    delete_modal:{
                        'delete_text': `Delete the document from your account?`,
                        'delete_btn': 'Delete',
                        'delete_cancel': 'Cancel'
                    },
                    other:{
                        'views_hint': 'unique views: '
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
                        'subject_area': 'Subject area',
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
                        'authors': 'File content authors',
                        'subject_area': 'The topic of the document, a specific scientific field, for example: Tesla coil or TDOA',
                        'place': 'Place of first publication of the document',
                        'publication_date': 'The date of the first publication of the document',

                        'keywords': 'Key terms or words in the document',
                        'references': 'Documents and resources referred to by the authors',
                        'description': 'Providing a brief description of the document',
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
                    },
                    draftModal:{
                        'topTitle': 'Unfinished documents',
                        'count': 'Drafts count'
                    }
                },
                documents:{

                    sidebar:{
                        'search_area':'Search area',

                        'all': 'All',
                        'only_my': 'Only my',
                        'im_author': "I am the author",

                        'authors': 'Authors',
                        'publication_year': 'Publication years',
                        'types': 'Types',


                        'selected_refs': 'Selected refs',
                        'clear_btn': 'Clear',

                    },

                    nav_filter:{
                        'sort_by': 'Sort by',
                        'applied_filters': 'Applied filters',
                        'find_documents_p1': 'Showing ',
                        'find_documents_p2': ' out of ',
                        'find_documents_p3': ' found documents',
                        'clear': 'clear',
                        'per_page': 'Per page',

                        'date_start': 'newest',
                        'date_end': 'oldest',
                        'alphabet': 'A-z',
                        'match': 'match',
                        'views': 'views'
                    },
                    other:{
                        'documents_not_found': 'Documents not found'
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