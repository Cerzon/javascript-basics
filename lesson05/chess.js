var chessColumns = ["A", "B", "C", "D", "E", "F", "G", "H"];
var chessFigures = {
    white: [
        {
            name: "ладья",
            symbol: "&#9814;",
            cell: "A1"
        },
        {
            name: "ладья",
            symbol: "&#9814;",
            cell: "H1"
        },
        {
            name: "конь",
            symbol: "&#9816;",
            cell: "B1"
        },
        {
            name: "конь",
            symbol: "&#9816;",
            cell: "G1"
        },
        {
            name: "слон",
            symbol: "&#9815;",
            cell: "C1"
        },
        {
            name: "слон",
            symbol: "&#9815;",
            cell: "F1"
        },
        {
            name: "ферзь",
            symbol: "&#9813;",
            cell: "D1"
        },
        {
            name: "король",
            symbol: "&#9812;",
            cell: "E1"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "A2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "B2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "C2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "D2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "E2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "F2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "G2"
        },
        {
            name: "пешка",
            symbol: "&#9817;",
            cell: "H2"
        },
    ],
    black: [
        {
            name: "ладья",
            symbol: "&#9820;",
            cell: "A8"
        },
        {
            name: "ладья",
            symbol: "&#9820;",
            cell: "H8"
        },
        {
            name: "конь",
            symbol: "&#9822;",
            cell: "B8"
        },
        {
            name: "конь",
            symbol: "&#9822;",
            cell: "G8"
        },
        {
            name: "слон",
            symbol: "&#9821;",
            cell: "C8"
        },
        {
            name: "слон",
            symbol: "&#9821;",
            cell: "F8"
        },
        {
            name: "ферзь",
            symbol: "&#9819;",
            cell: "D8"
        },
        {
            name: "король",
            symbol: "&#9818;",
            cell: "E8"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "A7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "B7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "C7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "D7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "E7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "F7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "G7"
        },
        {
            name: "пешка",
            symbol: "&#9823;",
            cell: "H7"
        },
    ]
};

var isWhiteNext = false, srcCell;
var battleField = document.querySelector("#chess-board");
var chessRow, chessCell;
// рисуем доску
for(var i = 9; i >= 0; i--) {
    chessRow = document.createElement("tr");
    chessCell = document.createElement("td");
    chessCell.className = "side-column";
    if (i < 9 && i > 0) {
        chessCell.innerText = i;
    }
    else {
        chessCell.className += " side-row";
    }
    chessRow.appendChild(chessCell);
    for(var letter of chessColumns) {
        chessCell = document.createElement("td");
        if (i < 9 && i > 0) {
            chessCell.id = `${letter}${i}`;
            chessCell.className = "board-cell";
            if(isWhiteNext) {
                chessCell.className += " black-cell"
            }
            isWhiteNext = !isWhiteNext;
        }
        else {
            chessCell.innerText = letter;
            chessCell.className = "side-row";
        }
        if (i == 9) {
            chessCell.className += " reverse-look";
        }
        chessRow.appendChild(chessCell);
    }
    chessCell = document.createElement("td");
    chessCell.className = "side-column";
    if (i < 9 && i > 0) {
        isWhiteNext = !isWhiteNext;
        chessCell.innerText = i;
        chessCell.className += " reverse-look";
    }
    else {
        chessCell.className += " side-row";
    }
    chessRow.appendChild(chessCell);
    battleField.appendChild(chessRow);
}
// ставим фигуры
// белые
for(var figure of chessFigures.white) {
    document.querySelector(`#${figure.cell}`).innerHTML = figure.symbol;
    document.querySelector(`#${figure.cell}`).style.cursor = "pointer";
}
// черные
for(var figure of chessFigures.black) {
    document.querySelector(`#${figure.cell}`).innerHTML = figure.symbol;
    document.querySelector(`#${figure.cell}`).style.cursor = "pointer";
}

// функции для захвата и перемещения фигур по доске
function boardMouseMoveListener(event) {
    chessCell.style.left = `${event.clientX + 10}px`;
    chessCell.style.top = `${event.clientY + 10}px`;
}

function captureFigure(event) {
    chessCell.innerHTML = event.target.innerHTML;
    srcCell = event.target;
    event.target.innerHTML = "";
    event.target.style.cursor = "initial";
    chessCell.style.left = `${event.clientX + 10}px`;
    chessCell.style.top = `${event.clientY + 10}px`;
    chessCell.style.display = "block";
    chessCell.addEventListener("mousemove", boardMouseMoveListener);
    battleField.addEventListener("mousemove", boardMouseMoveListener);
}

function releaseFigure(event) {
    event.target.innerHTML = chessCell.innerHTML;
    srcCell = null;
    event.target.style.cursor = "pointer";
    chessCell.innerHTML = "";
    chessCell.style.display = "none";
    chessCell.removeEventListener("mousemove", boardMouseMoveListener);
    battleField.removeEventListener("mousemove", boardMouseMoveListener);
}

function boardCellClickListener(event) {
    if(event.target.innerHTML !== "") {
        if(Object.is(srcCell, null)) {
            captureFigure(event);
        }
        // else { // check bite possibility
        // }
    }
    else if(!Object.is(srcCell, null)) {
        if(srcCell === event.target) { // cancel move
            releaseFigure(event);
        }
        else { // check move possibility
            releaseFigure(event);
        }
    }
}

for(chessCell of battleField.querySelectorAll(".board-cell")) {
    chessCell.addEventListener("click", boardCellClickListener);
}

// действия с доской, фигурами и очерёдностью ходов
chessCell = document.querySelector("#figure-capture");
srcCell = null;
isWhiteNext = true;

