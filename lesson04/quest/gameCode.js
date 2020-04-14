var promptText, answer, step = 0, gameLog = [];

while(true) {
    // body
    promptText = works[step].scene;
    for(var el of works[step].answers) {
        promptText += el.index + el.text;
    }
    promptText += "-1 - Выход из игры";
    answer = prompt(promptText);
    if(answer == -1) {
        gameLog.push({
            step: step,
            answer: answer + " - Выход из игры"
        });
        break;
    }
    answer = works[step].answers.findIndex(function(element) {return element.index == this}, answer);
    if(answer == -1) {
        if(confirm("Вы ввели некорректный ответ. Выйти из игры?")) {
            gameLog.push({
                step: step,
                answer: "Некорректный ввод - Выход из игры"
            });
            break;
        }
    }
    else {
        gameLog.push({
            step: step,
            answer: works[step].answers[answer].index + works[step].answers[answer].text
        });
        step = works[step].answers[answer].nextstep;
        if(step == -1) {
            break;
        }
    }
};
alert('Спасибо за игру');

// проверка выбранных ответов
answer = prompt(
    "Введите номер хода, который хотите проверить.\n"+
    "Всего ходов в игре было " + gameLog.length
);
if(!isNaN(answer) && answer != "" && !Object.is(answer, null) && answer > 0 && answer <= gameLog.length) {
    answer = parseInt(answer) - 1;
    step = gameLog[answer].step;
    promptText = works[step].scene;
    for(var el of works[step].answers) {
        promptText += el.index + el.text;
    }
    promptText += "-1 - Выход из игры\n\n";
    promptText += "Ваш ответ:\n" + gameLog[answer].answer;
    alert(promptText);
}


/************************ старый код *****************************
var event, ok;

do {//Выводим первый вопрос
    ok = false;
    event = +prompt(works.a00 + works.a1 + works.a2 + '-1 - Выход из игры');
    if (event == -1) {
        break;
    }
    else {
        ok = isAnswer(works.a0, event);
    }
} while (!ok);
switch (event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        do {
            ok = false;
            event = +prompt(works.b00 + works.b1 + works.b2 + '-1 - Выход из игры');
            if (event == -1) {
                break;
            }
            else {
                ok = isAnswer(works.b0, event);
            }
        } while (!ok);
        switch (event) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    }
                    else {
                        ok = isAnswer(works.d0, event);
                    }
                } while (!ok);

                break;
            case 2: // Второе действие   Если ввели 2 то также переходим на 4 окно
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    }
                    else {
                        ok = isAnswer(works.d0, event);
                    }
                } while (!ok);

                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        do {
            ok = false;
            event = +prompt(works.c00 + works.c1 + works.c2 + '-1 - Выход из игры');
            if (event == -1) {
                break;
            }
            else {
                ok = isAnswer(works.c0, event);
            }
        } while (!ok);
        switch (event) {
            case 1: // Второе действие
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    }
                    else {
                        ok = isAnswer(works.d0, event);
                    }
                } while (!ok);

                break;
            case 2: // Второе действие
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    }
                    else {
                        ok = isAnswer(works.d0, event);
                    }
                } while (!ok);

                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');

//------------------------------------------
function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
	return true;
    
}
*/