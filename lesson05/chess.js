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

var blackCell = false;
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
            if(blackCell) {
                chessCell.className += " black-cell"
            }
            blackCell = !blackCell;
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
        blackCell = !blackCell;
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
}
// черные
for(var figure of chessFigures.black) {
    document.querySelector(`#${figure.cell}`).innerHTML = figure.symbol;
}