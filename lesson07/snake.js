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

// начинаем игру
function startGame(event) {
    event.preventDefault();
    if(gameStarted) {
        return;
    }

    // читаем настройки
    var data = new FormData(event.target);
    xPoints = parseInt(data.get("field-width"));
    yPoints = parseInt(data.get("field-height"));
    snakeSpeed = parseInt(data.get("snake-speed"));
    var showGrid = data.get("show-grid") === "on";
    var enableBlock = data.get("enable-block") === "on";
    var blockersMax = parseInt(data.get("blocks-amount"));

    // готовимся генерить поле
    var cellSize = parseInt(data.get("cell-size"));
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

    // прячем украшалки
    document.getElementById("field-veil").className = "";
    document.getElementById("field-veil").style.height = 0;
    document.getElementById("field-veil").style.width = 0;
    gameBoard.append(document.getElementById("field-veil"));

    // генерим поле на основе шаблона одной клетки
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

    // стартуем нужные объекты и таймеры
    score = 0;
    snake = new Snake();
    if(enableBlock) {
        blocker = []
        for(data = 0; data < blockersMax; data++) {
            blocker.push(new BlockBuilder());
        }
    }
    moveTimerID = setInterval(snake.move, parseInt(1000 / snakeSpeed));
    foodTimerID = setTimeout(growFood, parseInt(4000 / snakeSpeed));
    document.getElementById("score-field").innerText = `Score: ${score.pad(5)}`;
    document.addEventListener("keydown", kbDispatcher);
    gameField.focus();
    gameStarted = true;
}

// ставим игру на паузу
function pauseGame() {
    if(gameStarted && !gamePaused) {
        clearInterval(moveTimerID);
        gamePaused = true;
        // украшалки
        gameField.append(document.getElementById("field-veil"));
        document.getElementById("field-veil").className = "paused";
        document.getElementById("field-veil").style.height = `${gameField.clientHeight}px`;
        document.getElementById("field-veil").style.width = `${gameField.clientWidth}px`;
        gameField.focus();
    }
}

// снимаем игру с паузы
function resumeGame() {
    if(gameStarted && gamePaused) {
        moveTimerID = setInterval(snake.move, parseInt(1000 / snakeSpeed));
        gamePaused = false;
        // украшалки
        document.getElementById("field-veil").className = "";
        document.getElementById("field-veil").style.height = 0;
        document.getElementById("field-veil").style.width = 0;
        gameBoard.append(document.getElementById("field-veil"));
        gameField.focus();
    }
}

// тормозим игру
function stopGame(event) {
    if(gameStarted) {
        clearInterval(moveTimerID);
        document.removeEventListener("keydown", kbDispatcher);
        snake = null;
        blocker = null;
        gameStarted = false;
        gamePaused = false;
        if(!Object.is(foodTimerID, null)) {
            clearTimeout(foodTimerID);
            foodTimerID = null;
        }
        // украшалки
        if(!event) {
            setTimeout(function() {
                gameField.append(document.getElementById("field-veil"));
                document.getElementById("field-veil").className = "gameover";
                document.getElementById("field-veil").style.height = `${gameField.clientHeight}px`;
                document.getElementById("field-veil").style.width = `${gameField.clientWidth}px`;
            }, 900);
        }
        else {
            gameField.append(document.getElementById("field-veil"));
            document.getElementById("field-veil").className = "stopped";
            document.getElementById("field-veil").style.height = `${gameField.clientHeight}px`;
            document.getElementById("field-veil").style.width = `${gameField.clientWidth}px`;
        }
    }
}

// следим за клавишами
function kbDispatcher(event) {
    if(!gameStarted) {
        return;
    }

    var dirMap = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    
    switch (event.keyCode) {
        case 37:
        case 38:
        case 39:
        case 40:
            snake.turn(dirMap[event.keyCode]);
            break;
        case 32:
            if (gamePaused) {
                resumeGame();
            }
            else {
                pauseGame();
            }
            break;
        default:
    }
}

// помещаем в список ячеек нужный класс
function markCells(cellList, newClass="") {
    for(var point of cellList) {
        document.getElementById(`x${point.x.pad(3)}y${point.y.pad(3)}`).className = newClass;
    }
}

// проверка что находится в точке поля
function checkCell(xPos, yPos) {
    var cellToCheck = document.getElementById(`x${xPos.pad(3)}y${yPos.pad(3)}`);
    return cellToCheck.className === "" ? "free" : cellToCheck.className;
}

// сажаем алюминевые огурцы на брезентовом поле
function growFood() {
    if(gameStarted) {
        var xPos, yPos;
        do {
            xPos = Math.round(Math.random() * (xPoints - 1));
            yPos = Math.round(Math.random() * (yPoints - 1));
        } while(checkCell(xPos, yPos) !== "free");

        markCells([{x: xPos, y: yPos}], "food");

        if(!Object.is(foodTimerID, null)) {
            clearTimeout(foodTimerID);
            foodTimerID = null;
        }
    }
}

// ведем счёт
function incScore(incSize=1) {
    score += incSize;
    document.getElementById("score-field").innerText = `Score: ${score.pad(5)}`;
}

// конструктор змейки
function Snake(bodyLen=2) {
    // поскольку движение будет запускаться через таймер,
    // переменная this будет содержать объект window вместо
    // самой змейки; обходим это через альтернативное имя
    var self = this;
    self.head = {x: parseInt(xPoints / 2), y: parseInt(yPoints / 2)};
    self.body = [];
    for(var i = bodyLen - 1; i > 0; i--) {
        self.body.push({x: self.head.x, y: self.head.y + i});
    }
    self.direction = "up";
    self.canTurn = true;
    self.turnBuffer = false;

    self.turn = function(newDirection) {
        // уменьшаем влияние спорадических нервных нажатий на стрелки
        if((self.canTurn || (!self.canTurn && !self.turnBuffer))
            && newDirection === self.direction) {
            return;
        }
        // для резкого разворота в течение двух тиков:
        // если можно повернуть в этот тик, поворачиваем
        // если в этот тик повернуть нельзя, но буфер пуст,
        // второе направление поворота сохраним в буфере
        if(self.canTurn || !self.turnBuffer) {
            switch(newDirection) {
                case "down":
                    if(self.direction !== "up") {
                        // если можно повернуть в этот тик в обычном порядке
                        // то поворачиваем, иначе сохраняем направление
                        self.direction = self.canTurn ? "down" : self.direction;
                        // если можно было повернуть, буфер остаётся пустым
                        // в противном случае сохраняем направление в буфере
                        self.turnBuffer = self.canTurn ? false : "down";
                        // в любом случае возможности повернуть в этот тик
                        // точно больше нет
                        self.canTurn = false;
                    }
                    break;
                case "up":
                    if(self.direction !== "down") {
                        self.direction = self.canTurn ? "up" : self.direction;
                        self.turnBuffer = self.canTurn ? false : "up";
                        self.canTurn = false;
                    }
                    break;
                case "left":
                    if(self.direction !== "right") {
                        self.direction = self.canTurn ? "left" : self.direction;
                        self.turnBuffer = self.canTurn ? false : "left";
                        self.canTurn = false;
                    }
                    break;
                case "right":
                    if(self.direction !== "left") {
                        self.direction = self.canTurn ? "right" : self.direction;
                        self.turnBuffer = self.canTurn ? false : "right";
                        self.canTurn = false;
                    }
            }
        }
    }

    self.move = function() {
        self.body.push({x: self.head.x, y: self.head.y});
        switch(self.direction) {
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
                // убираем хвост
                markCells(self.body.splice(0, 1));
                break;
            case "food":
                growFood();
                incScore();
                break;
            case "snake-body":
            case "block-post":
                // змейка убилась, моргаем тельцем змейки
                markCells(self.body, "snake-fault");
                setTimeout(function() { markCells(self.body, "snake-dead");}, 150);
                setTimeout(function() { markCells(self.body, "snake-fault");}, 350);
                setTimeout(function() { markCells(self.body, "snake-dead");}, 500);
                setTimeout(function() { markCells(self.body, "snake-fault");}, 700);
                setTimeout(function() { markCells(self.body, "snake-dead");}, 850);
                // прерываем игру
                stopGame(false);
                return;
            default:
                console.log("Странностей всё больше, но продолжаем ползти");
        }
        // рисуем голову
        markCells([self.head], "snake-body");
        // если в буфере поворота что-то лежит
        if(self.turnBuffer) {
            // то поворачиваем и чистим буфер
            self.direction = self.turnBuffer;
            self.turnBuffer = false;
        }
        else {
            // иначе по завершении этого тика можно повернуть
            self.canTurn = true;
        }
    }

    // рисуем созданную змейку
    markCells(self.body.concat([self.head]), "snake-body");
}

// конструктор строителя заграждений
function BlockBuilder(ttl=25000, maxLength=3) {
    // та же история с запусками через таймеры
    var self = this;
    self.maxTTL = ttl;
    self.maxLen = maxLength;
    self.blockCells = [];

    // создание препятствия
    self.create = function() {
        // проверка состояния игры
        if(!gameStarted) {
            clearTimeout(self.timerID);
            self.timerID = null;
            return;
        }
        if(gamePaused) {
            // запоминаем, что делали, когда началась пауза
            self.todo = self.create;
            self.timerID = setInterval(self.suspend, 2000);
            return;
        }

        var len, blockPoint, orient, success;
        do {
            self.blockCells = [];
            success = true;
            len = Math.round(Math.random() * self.maxLen);
            orient = Math.round(Math.random());
            blockPoint = [
                Math.round(Math.random() * (xPoints - 1)),
                Math.round(Math.random() * (yPoints - 1))
            ];
            for(var i = 0; i < len; i++, blockPoint[orient]++) {
                // страховка от выпадения препятствия за пределы поля
                blockPoint[0] = blockPoint[0] == xPoints ? 0 : blockPoint[0];
                blockPoint[1] = blockPoint[1] == yPoints ? 0 : blockPoint[1];

                if(checkCell(blockPoint[0], blockPoint[1]) !== "free") {
                    success = false;
                    break;
                }
                self.blockCells.push({x: blockPoint[0], y: blockPoint[1]});
            }
        } while(!success);
        markCells(self.blockCells, "block-post");
        self.timerID = setTimeout(self.destroy, parseInt(self.maxTTL * (0.67 + Math.random() / 3)));
    }

    // уничтожение ранее созданного препятствия
    self.destroy = function() {
        // проверка состояния игры
        if(!gameStarted) {
            clearTimeout(self.timerID);
            self.timerID = null;
            return;
        }
        if(gamePaused) {
            // запоминаем, что делали, когда началась пауза
            self.todo = self.destroy;
            self.timerID = setInterval(self.suspend, 2000);
            return;
        }

        markCells(self.blockCells);
        self.blockCells = [];
        self.timerID = setTimeout(self.create, parseInt(2000 / (Math.random() * snakeSpeed + 1)));
    }

    // если игра повешена на паузу, тоже вешаемся на паузу
    // и периодически проверяем статус игры
    self.suspend = function() {
        if(!gameStarted) {
            clearInterval(self.timerID);
            self.timerID = null;
            return;
        }
        if(!gamePaused) {
            clearInterval(self.timerID);
            self.todo();
        }
    }

    self.timerID = setTimeout(self.create, parseInt(2000 / (Math.random() * snakeSpeed + 1)));
}

// глобальные переменные
var gameBoard = document.getElementById("game-board"),
    gameField = document.getElementById("game-field"),
    score = 0,
    yPoints = 20,
    xPoints = 20,
    snakeSpeed = 3,
    gameStarted = false,
    gamePaused = false,
    snake,
    blocker,
    moveTimerID,
    foodTimerID;

// к цифиркам добавляем маленький функционал
Number.prototype.pad = pad;

// слушаем события
document.getElementById("params").addEventListener("submit", startGame);
document.getElementById("pause-game").addEventListener("click", pauseGame);
document.getElementById("resume-game").addEventListener("click", resumeGame);
document.getElementById("stop-game").addEventListener("click", stopGame);
