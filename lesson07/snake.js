// функция, возвращающяя строковое представление переданного значения,
// дополненное лидирующими нулями или заданным символом до нужной длины
function pad(val, fullLen, leadSymbol="0") {
    if(val === undefined || Object.is(val, null)) {
        console.warn("Функция pad(): передано неопределённое значение val");
        return pad("", fullLen, leadSymbol);
    }
    if(val.toString().length >= fullLen) {
        console.warn("Функция pad(): длина строчного представления val превышает запрошенную длину строки");
        return val.toString();
    }
    var arr = new Array(fullLen - val.toString().length);
    arr.fill(leadSymbol);
    arr.push(val);
    return arr.join("");
}

function initBoard(pWidth, pHeight, dotTemplate, gameField) {}