// функция, возвращающяя строковое представление переданного значения,
// дополненное лидирующими нулями или заданным символом до нужной длины
function pad(fullLen, leadSymbol="0") {
    if(this.toString().length >= fullLen) {
        console.warn("Функция pad(): в числе цифр больше, чем запрошенная длина строки");
        return this.toString();
    }
    var arr = new Array(fullLen - this.toString().length);
    arr.fill(leadSymbol);
    arr.push(this);
    return arr.join("");
}

function startGame(event) {
    event.preventDefault();
    if(gameStarted) {
        return;
    }

    var data = new FormData(event.target);
    xPoints = parseInt(data.get("field-width"));
    yPoints = parseInt(data.get("field-height"));
    snakeSpeed = parseInt(data.get("snake-speed"));
    showGrid = data.get("show-grid") === "on" ? true : false ;

    var cellSize = 10;
    while(gameBoard.offsetLeft + 60 + cellSize * xPoints > window.innerWidth && cellSize > 4) {
        cellSize--;
    }
    while(gameField.offsetTop + cellSize * yPoints > window.innerHeight && cellSize > 4) {
        cellSize--;
    }
    var gfCell = document.createElement("div");
    if(showGrid) {
        cellSize--;
        gfCell.style.borderRight = "1px solid #ebebeb";
        gfCell.style.borderBottom = "1px solid #ebebeb";
    }
    gfCell.style.width = `${cellSize}px`;
    gfCell.style.height = `${cellSize}px`;

    gameField.innerHTML = "";
    for(var yPos = 0; yPos < yPoints; yPos++) {
        for(var xPos = 0; xPos < xPoints; xPos++) {
            data = gfCell.cloneNode();
            data.id = `x${xPos.pad(3)}y${yPos.pad(3)}`;
            gameField.append(data);
        }
    }
    gameField.style.width = `${xPoints * cellSize}px`;
    gameField.style.height = `${yPoints * cellSize}px`;

    score = 0;
    document.getElementById("score-field").innerText = `Score: ${score.pad(5)}`;
    document.addEventListener("keydown", kbControl);
    gameField.focus();
    snake = new Snake();
    moveTimerID = setInterval(snake.move, parseInt(1000 / snakeSpeed));
    foodTimerID = setTimeout(growFood, parseInt(2500 / snakeSpeed));
    gameStarted = true;
}

function stopGame() {
    if(gameStarted) {
        clearInterval(moveTimerID);
        document.removeEventListener("keydown", kbControl);
        snake = null;
        direction = "up";
        gameStarted = false;
        gameSuspended = false;
        if(!Object.is(foodTimerID, null)) {
            clearTimeout(foodTimerID);
            foodTimerID = null;
        }
    }
}

function growFood() {
    if(gameStarted && !gameSuspended) {
        var xPos, yPos;
        do {
            xPos = Math.round(Math.random() * (xPoints - 1));
            yPos = Math.round(Math.random() * (yPoints - 1));
        } while(checkCell(xPos, yPos) !== "free");
        document.getElementById(`x${xPos.pad(3)}y${yPos.pad(3)}`).className = "food";
        if(!Object.is(foodTimerID, null)) {
            clearTimeout(foodTimerID);
            foodTimerID = null;
        }
    }
}

function kbControl(event) {
    if (!gameSuspended) {
        switch(event.key) {
            case "ArrowDown":
                if(direction !== "up") {
                    direction = "down";
                }
                break;
            case "ArrowUp":
                if(direction !== "down") {
                    direction = "up";
                }
                break;
            case "ArrowLeft":
                if(direction !== "right") {
                    direction = "left";
                }
                break;
            case "ArrowRight":
                if(direction !== "left") {
                    direction = "right";
                }
        }
    }
}

// проверка что находится в точке поля
function checkCell(xPos, yPos) {
    var cellToCheck = document.getElementById(`x${xPos.pad(3)}y${yPos.pad(3)}`);
    return cellToCheck.className === "" ? "free" : cellToCheck.className;
}

// конструктор змейки
function Snake() {
    // поскольку движение будет запускаться через таймер,
    // переменная this будет содержать объект window вместо
    // самой змейки; обходим это через альтернативное имя
    var self = this;
    self.head = {x: parseInt(xPoints / 2), y: parseInt(yPoints / 2) + 1};
    self.body = [{x: self.head.x, y: self.head.y + 1}];
    self.move = function() {
        self.body = [{x: self.head.x, y: self.head.y}].concat(self.body);
        switch(direction) {
            case "up":
                self.head.y--;
                if(self.head.y < 0) {
                    self.head.y = yPoints - 1;
                }
                break;
            case "down":
                self.head.y++;
                if(self.head.y == yPoints) {
                    self.head.y = 0;
                }
                break;
            case "left":
                self.head.x--;
                if(self.head.x < 0) {
                    self.head.x = xPoints - 1;
                }
                break;
            case "right":
                self.head.x++;
                if(self.head.x == xPoints) {
                    self.head.x = 0;
                }
                break;
            default:
                console.log("Случилось странное при передвижении змейки");
        }
        switch(checkCell(self.head.x, self.head.y)) {
            case "free":
                var tail = self.body.pop();
                document.getElementById(`x${tail.x.pad(3)}y${tail.y.pad(3)}`).className = "";
                break;
            case "food":
                growFood();
                score++;
                document.getElementById("score-field").innerText = `Score: ${score.pad(5)}`;
                break;
            case "snake-body":
            case "block-post":
                stopGame();
                break;
            default:
                console.log("Странностей всё больше, но продолжаем ползти");
                break;
        }
        document.getElementById(`x${self.head.x.pad(3)}y${self.head.y.pad(3)}`).className = "snake-body";
    }
    // заставим змейку саму прорисоваться на длину 2 и приползти в среднюю точку
    self.move();
    self.move();
}

var gameBoard = document.getElementById("game-board"),
    gameField = document.getElementById("game-field"),
    score = 0,
    yPoints = 20,
    xPoints = 20,
    snakeSpeed = 3,
    gameStarted = false,
    gameSuspended = false,
    direction = "up", 
    snake,
    moveTimerID,
    foodTimerID;

Number.prototype.pad = pad;

document.getElementById("params").addEventListener("submit", startGame);
document.getElementById("stop-game").addEventListener("click", stopGame);
document.getElementById("pause-game").addEventListener("click", function() {
    if(gameStarted && !gameSuspended) {
        clearInterval(moveTimerID);
    }
});
document.getElementById("resume-game").addEventListener("click", function() {
    if(gameStarted && gameSuspended) {
        moveTimerID = setInterval(snake.move, parseInt(1000 / snakeSpeed));
    }
});
