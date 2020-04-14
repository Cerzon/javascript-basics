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