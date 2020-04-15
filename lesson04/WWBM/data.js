var prizes = [
    500,
    1000,
    2000,
    3000,
    5000,
    10000,
    15000,
    25000,
    50000,
    100000,
    200000,
    400000,
    800000,
    1500000,
    3000000
];
var questions = {
    easy: [
        {
            text: "Как называют манекенщицу супер-класса?",
            answers: [
                {
                    text: "Топ-модель",
                    correct: true
                },
                {
                    text: "Тяп-модель",
                    correct: false
                },
                {
                    text: "Поп-модель",
                    correct: false
                },
                {
                    text: "Ляп-модель",
                    correct: false
                }
            ]
        },
        {
            text: "Кто вырос в джунглях среди диких зверей?",
            answers: [
                {
                    text: "Маугли",
                    correct: true
                },
                {
                    text: "Колобок",
                    correct: false
                },
                {
                    text: "Бэтмен",
                    correct: false
                },
                {
                    text: "Чарльз Дарвин",
                    correct: false
                }
            ]
        },
        {
            text: "Как называлась детская развлекательная программа, популярная в прошлые годы?",
            answers: [
                {
                    text: "АБВГДейка",
                    correct: true
                },
                {
                    text: "ЁКЛМНейка",
                    correct: false
                },
                {
                    text: "ЁПРСТейка",
                    correct: false
                },
                {
                    text: "ЁЖЗИКейка",
                    correct: false
                }
            ]
        },
        {
            text: "Как звали невесту Эдмона Дантеса, будущего графа Монте-Кристо?",
            answers: [
                {
                    text: "Мерседес",
                    correct: true
                },
                {
                    text: "Тойота",
                    correct: false
                },
                {
                    text: "Хонда",
                    correct: false
                },
                {
                    text: "Лада",
                    correct: false
                }
            ]
        },
        {
            text: "Кто автор \"Сказки о попе и работнике его Балде\"?",
            answers: [
                {
                    text: "Пушкин",
                    correct: true
                },
                {
                    text: "Лермонтов",
                    correct: false
                },
                {
                    text: "Крылов",
                    correct: false
                },
                {
                    text: "Достоевский",
                    correct: false
                }
            ]
        },
        {
            text: "Исполнитель роли Бендера в «Золотом теленке»?",
            answers: [
                {
                    text: "Юрский",
                    correct: true
                },
                {
                    text: "Гомиашвили",
                    correct: false
                },
                {
                    text: "Миронов",
                    correct: false
                },
                {
                    text: "Папанов",
                    correct: false
                }
            ]
        },
        {
            text: "В каком году Россия объявила дефолт?",
            answers: [
                {
                    text: "1998",
                    correct: true
                },
                {
                    text: "2008",
                    correct: false
                },
                {
                    text: "1986",
                    correct: false
                },
                {
                    text: "1991",
                    correct: false
                }
            ]
        },
        {
            text: "За чем послала жена мужа в мультфильме \"Падал прошлогодний снег\"?",
            answers: [
                {
                    text: "За ёлкой",
                    correct: true
                },
                {
                    text: "За подснежниками",
                    correct: false
                },
                {
                    text: "За спичками",
                    correct: false
                },
                {
                    text: "За дровами",
                    correct: false
                }
            ]
        },
        {
            text: "Где, если верить пословице, любопытной Варваре нос оторвали?",
            answers: [
                {
                    text: "На базаре",
                    correct: true
                },
                {
                    text: "На фонтане",
                    correct: false
                },
                {
                    text: "На лавке",
                    correct: false
                },
                {
                    text: "На печке",
                    correct: false
                }
            ]
        },
        {
            text: "Кто стал героиней песни Максима Леонидова?",
            answers: [
                {
                    text: "Девочка — видение",
                    correct: true
                },
                {
                    text: "Девочка — мираж",
                    correct: false
                },
                {
                    text: "Девочка — приведенье",
                    correct: false
                },
                {
                    text: "Девочка — галлюцинация",
                    correct: false
                }
            ]
        },
        {
            text: "Какой из этих фильмов не мультипликационный?",
            answers: [
                {
                    text: "\"Римские каникулы\"",
                    correct: true
                },
                {
                    text: "\"Каникулы Бонифация\"",
                    correct: false
                },
                {
                    text: "\"Каникулы в Простоквашино\"",
                    correct: false
                },
                {
                    text: "\"Монстры на каникулах\"",
                    correct: false
                }
            ]
        },
        {
            text: "В какой из этих игр ни один из судей не сидит на вышке?",
            answers: [
                {
                    text: "Настольный теннис",
                    correct: true
                },
                {
                    text: "Волейбол",
                    correct: false
                },
                {
                    text: "Бадминтон",
                    correct: false
                },
                {
                    text: "Теннис",
                    correct: false
                }
            ]
        },
    ],
    medium: [
        {
            text: "В какой из этих стран один из официальных языков - французский?",
            answers: [
                {
                    text: "Республика Гаити",
                    correct: true
                },
                {
                    text: "Кения",
                    correct: false
                },
                {
                    text: "Эквадор",
                    correct: false
                },
                {
                    text: "Венесуэла",
                    correct: false
                }
            ]
        },
        {
            text: "В каком из этих фильмов не снимался Александр Абдулов?",
            answers: [
                {
                    text: "\"Московские каникулы\"",
                    correct: true
                },
                {
                    text: "\"Карнавал\"",
                    correct: false
                },
                {
                    text: "\"Чародеи\"",
                    correct: false
                },
                {
                    text: "\"Убить дракона\"",
                    correct: false
                }
            ]
        },
        {
            text: "Какой цвет получается при смешении синего и красного?",
            answers: [
                {
                    text: "Фиолетовый",
                    correct: true
                },
                {
                    text: "Коричневый",
                    correct: false
                },
                {
                    text: "Зелёный",
                    correct: false
                },
                {
                    text: "Голубой",
                    correct: false
                }
            ]
        },
        {
            text: "Из какого мяса традиционно готовится начинка для чебуреков?",
            answers: [
                {
                    text: "Баранина",
                    correct: true
                },
                {
                    text: "Свинина",
                    correct: false
                },
                {
                    text: "Телятина",
                    correct: false
                },
                {
                    text: "Конина",
                    correct: false
                }
            ]
        },
        {
            text: "Какой народ придумал танец чардаш?",
            answers: [
                {
                    text: "Венгры",
                    correct: true
                },
                {
                    text: "Румыны",
                    correct: false
                },
                {
                    text: "Чехи",
                    correct: false
                },
                {
                    text: "Молдаване",
                    correct: false
                }
            ]
        },
        {
            text: "Как называется самая глубокая точка поверхности Земли, находящаяся на дне Марианской впадины?",
            answers: [
                {
                    text: "Бездна Челленджера",
                    correct: true
                },
                {
                    text: "Филиппинская плита",
                    correct: false
                },
                {
                    text: "Кермадек",
                    correct: false
                },
                {
                    text: "Черное Логово",
                    correct: false
                }
            ]
        },
        {
            text: "Кто автор антиутопического романа \"О дивный новый мир\"?",
            answers: [
                {
                    text: "Олдос Хаксли",
                    correct: true
                },
                {
                    text: "Рэй Брэдбери",
                    correct: false
                },
                {
                    text: "Джордж Оруэлл",
                    correct: false
                },
                {
                    text: "Сомерсет Моэм",
                    correct: false
                }
            ]
        },
        {
            text: "Какой титул имел Дон Кихот?",
            answers: [
                {
                    text: "Идальго",
                    correct: true
                },
                {
                    text: "Барон",
                    correct: false
                },
                {
                    text: "Маркиз",
                    correct: false
                },
                {
                    text: "Вождь",
                    correct: false
                }
            ]
        },
        {
            text: "Какая картина Малевича находится в Русском музее?",
            answers: [
                {
                    text: "Красный квадрат",
                    correct: true
                },
                {
                    text: "Белый квадрат",
                    correct: false
                },
                {
                    text: "Чёрный квадрат",
                    correct: false
                },
                {
                    text: "\"Точильщик\"",
                    correct: false
                }
            ]
        },
        {
            text: "Кто автор музыки к детской песенке Чунга-Чанга?",
            answers: [
                {
                    text: "Шаинский",
                    correct: true
                },
                {
                    text: "Зацепин",
                    correct: false
                },
                {
                    text: "Дербенёв",
                    correct: false
                },
                {
                    text: "Шпиц",
                    correct: false
                }
            ]
        },
        {
            text: "В каком году произошла Куликовская битва?",
            answers: [
                {
                    text: "1380",
                    correct: true
                },
                {
                    text: "1569",
                    correct: false
                },
                {
                    text: "1616",
                    correct: false
                },
                {
                    text: "1773",
                    correct: false
                }
            ]
        },
    ],
    hard: [
        {
            text: "Изучение соединений какого элемента является основой органической химии?",
            answers: [
                {
                    text: "Углерод",
                    correct: true
                },
                {
                    text: "Кислород",
                    correct: false
                },
                {
                    text: "Азот",
                    correct: false
                },
                {
                    text: "Кремний",
                    correct: false
                }
            ]
        },
        {
            text: "Кто открыл тайну трёх карт графине из \"Пиковой дамы\" А. С. Пушкина?",
            answers: [
                {
                    text: "Сен-Жермен",
                    correct: true
                },
                {
                    text: "Казанова",
                    correct: false
                },
                {
                    text: "Калиостро",
                    correct: false
                },
                {
                    text: "Томас Воган",
                    correct: false
                }
            ]
        },
        {
            text: "В какой стране была пробурена первая промышленная нефтяная скважина?",
            answers: [
                {
                    text: "Азербайджан",
                    correct: true
                },
                {
                    text: "Кувейт",
                    correct: false
                },
                {
                    text: "Иран",
                    correct: false
                },
                {
                    text: "Ирак",
                    correct: false
                }
            ]
        },
        {
            text: "Сколько раз в сутки подзаводят куранты Спасской башни Кремля?",
            answers: [
                {
                    text: "Два",
                    correct: true
                },
                {
                    text: "Один",
                    correct: false
                },
                {
                    text: "Три",
                    correct: false
                },
                {
                    text: "Четыре",
                    correct: false
                }
            ]
        },
        {
            text: "Кто первым получил Нобелевскую премию по литературе?",
            answers: [
                {
                    text: "Поэт",
                    correct: true
                },
                {
                    text: "Романист",
                    correct: false
                },
                {
                    text: "Драматург",
                    correct: false
                },
                {
                    text: "Эссеист",
                    correct: false
                }
            ]
        },
        {
            text: "Какой химический элемент назван в честь злого подземного гнома?",
            answers: [
                {
                    text: "Кобальт",
                    correct: true
                },
                {
                    text: "Гафний",
                    correct: false
                },
                {
                    text: "Бериллий",
                    correct: false
                },
                {
                    text: "Теллур",
                    correct: false
                }
            ]
        },
        {
            text: "В какой из этих столиц бывших союзных республик раньше появилось метро?",
            answers: [
                {
                    text: "Тбилиси",
                    correct: true
                },
                {
                    text: "Ереван",
                    correct: false
                },
                {
                    text: "Баку",
                    correct: false
                },
                {
                    text: "Минск",
                    correct: false
                }
            ]
        },
        {
            text: "Реки с каким названием нет на территории России?",
            answers: [
                {
                    text: "Спина",
                    correct: true
                },
                {
                    text: "Шея",
                    correct: false
                },
                {
                    text: "Палец",
                    correct: false
                },
                {
                    text: "Уста",
                    correct: false
                }
            ]
        },
        {
            text: "Какой вид кавалерии предназначался для боевых действий как в конном, так и в пешем строю?",
            answers: [
                {
                    text: "Драгуны",
                    correct: true
                },
                {
                    text: "Кирасиры",
                    correct: false
                },
                {
                    text: "Уланы",
                    correct: false
                },
                {
                    text: "Гусары",
                    correct: false
                }
            ]
        },
        {
            text: "В каком немецком городе родилась будущая императрица России Екатерина II?",
            answers: [
                {
                    text: "Штеттин",
                    correct: true
                },
                {
                    text: "Висбаден",
                    correct: false
                },
                {
                    text: "Цербст",
                    correct: false
                },
                {
                    text: "Дармштадт",
                    correct: false
                }
            ]
        },
        {
            text: "Что запрещал указ, который в 1726 году подписала Екатерина I?",
            answers: [
                {
                    text: "Пускать пыль в глаза",
                    correct: true
                },
                {
                    text: "Точить лясы",
                    correct: false
                },
                {
                    text: "Бить баклуши",
                    correct: false
                },
                {
                    text: "Переливать из пустого в порожнее",
                    correct: false
                }
            ]
        },
    ]
};
