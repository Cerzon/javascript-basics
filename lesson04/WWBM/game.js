var idx, qst, round = 0, level = "easy", allowMistake = false;

var ansForm = document.querySelector("form#answers");
var radios = ansForm.querySelectorAll("input[type='radio']");
var helperListener = function(e) {
    e.target.disabled = true;
    e.target.style.borderStyle = "inset";
    switch(e.target.getAttribute("helper-type")) {
        case "half":
            var hideCount = 0, indexes = [0, 1, 2, 3];
            while(hideCount < 2) {
                idx = Math.round(Math.random() * (indexes.length - 1));
                idx = indexes.splice(idx, 1)[0];
                if(!qst.answers[idx].correct) {
                    radios[idx].parentElement.style.display = "none";
                    hideCount++;
                }
            }
            break;
        case "mistake":
            allowMistake = true;
            break;
        default:
            console.log("Случилось что-то странное в работе подсказок");
    }
    e.target.removeEventListener("click", helperListener);
}

for(var radio of radios){
    radio.addEventListener("change", function() {
        ansForm.querySelector("input[type='submit']").disabled = false;
    });
    radio.disabled = true;
}
ansForm.querySelector("input[type='submit']").disabled = true;

document.querySelector("button#play").innerText = "Начать игру";
document.querySelector("button#play").addEventListener("click", function() {
    if(round == 0) {
        for(var button of document.querySelectorAll("#helpers button")) {
            button.addEventListener("click", helperListener);
        }
    }
    if(round > 9) {
        level = "hard";
    }
    else if(round > 4) {
        level = "medium"
    }
    idx = Math.round(Math.random() * (questions[level].length - 1));
    qst = new prepQst(questions[level].splice(idx, 1)[0]);
    initRound();
});

document.querySelector("button#getout").innerText = "Забрать бабло и смыться";
document.querySelector("button#getout").addEventListener("click", function() {
    finishGame(`Вы прервали игру после ${round} хода и забираете с собой ${prizes[round - 1]} бирюлек`);
});
document.querySelector("button#getout").style.display = "none";

ansForm.addEventListener("submit", function(e){
    e.preventDefault();
    var data = new FormData(ansForm);
    data = data.get("answer");
    if(!qst.answers[data].correct) {
        radios[data].parentElement.style.backgroundColor = "lightcoral";
        if(allowMistake) {
            radios[data].disabled = true;
            allowMistake = false;
        }
        else {
            idx = qst.answers.findIndex(function(el) { return el.correct });
            radios[idx].parentElement.style.backgroundColor = "lightgreen";
            finishGame("Все бабки сгорели.");
        }
        return;
    }
    for(var radio of radios){
        radio.disabled = true;
        if(radio.checked){
            radio.parentElement.style.backgroundColor = "lightgreen";
        }
    }
    ansForm.querySelector("input[type='submit']").disabled = true;
    round++;
    if(round > 14) {
        finishGame(`Вы победили и забираете награду в ${prizes[14]} бирюлек!`);
        return;
    }
    document.querySelector("footer p").innerText = "Ответ верный";
    document.querySelector("button#play").innerText = "Продолжить игру";
    document.querySelector("button#getout").style.display = "inline-block";
    document.querySelector("footer").style.display = "block";
});

function prepQst(qst) {
    var idx, ans = [];
    for(var i = 0; i < 4; i++) {
        idx = Math.round(Math.random() * (qst.answers.length - 1));
        ans.push(qst.answers.splice(idx, 1)[0]);
    }
    this.text = qst.text;
    this.answers = ans;
}

function initRound() {
    allowMistake = false;
    document.querySelector("#round-count").innerText = "Раунд " + (round + 1);
    document.querySelector("#prize-size").innerText = `Приз за правильный ответ - ${prizes[round]} бирюлек`;
    document.querySelector("#question p").innerText = qst.text;
    for(var i = 0; i < 4; i++) {
        document.querySelector("#answer" + i).innerText = qst.answers[i].text;
    }
    for(var radio of radios) {
        radio.checked = false;
        radio.disabled = false;
        radio.parentElement.style.backgroundColor = "transparent";
        radio.parentElement.style.display = "block";
    }
    document.querySelector("footer").style.display = "none";
}

function finishGame(msg) {
    document.querySelector("footer").style.display = "block";
    document.querySelector("footer p").innerText = "Игра закончена. " + msg;
    document.querySelector("button#play").style.display = "none";
    document.querySelector("button#getout").style.display = "none";
    for(var radio of radios){
        radio.disabled = true;
    }
    ansForm.querySelector("input[type='submit']").disabled = true;
}