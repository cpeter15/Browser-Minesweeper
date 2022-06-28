// Beginner: 8x8, 10 Mines
// Intermediate: 16x16 40 Mines
// Expert: 30x16 99 Mines 

let gameBoard

const makeBoard = (x, y, numMines) => {
    // tests if there are too many mines to fit into the board
    if (numMines > (x * y)) {
        console.log("too many mines")
        return null;
    }
    let board = [];
    let numFlagged = 0;
    let numRevealed = 0;
    let gameDiv = document.querySelector("#gameDiv");
    const boardSection = document.createElement("section");
    boardSection.setAttribute("id", "board");
    gameDiv.style.width = (x * 50) + 'px';
    boardSection.style.width = (x * 50) + 'px';
    gameDiv.appendChild(boardSection);

    for (let i = 0; i < y; i++) {
        let arr = [];
        for (let j = 0; j < x; j++) {
            let space = crateSpace(j, i, board);
            arr.push(space);
            boardSection.appendChild(space.button);
        }
        board.push(arr);
    }

    armBoard(board, numMines);

    const clearBoard = () => {
        console.log("clearing board");
        board = null;
        boardSection.remove();
        gameDiv.remove();
    }

    const checkWinCondition = () => {
        console.log(`flagged: ${gameBoard.flagged} revealed: ${gameBoard.revealed}`);
        if ((gameBoard.flagged === numMines) && (gameBoard.flagged + gameBoard.revealed === (x * y))) {
            gameOver(true);
        }
    }

    const gameOver = (win) => {
        if (win) {
            setTimeout(() => alert("You Won"), 10);

        } else {
            setTimeout(() => alert("Game Over"), 10);
        }
        setTimeout(() => {
            clearBoard();
            difficultyMenu();
        }, 10)
    }

    return {
        board: board,
        revealed: numRevealed,
        flagged: numFlagged,
        check: checkWinCondition,
        gameOver: gameOver
    }
}


const crateSpace = (x, y, board) => {
    const space = document.createElement("button");
    space.textContent = "";
    space.setAttribute("class", "spaces");

    let isBomb = false;
    let isRevealed = false;
    let isFlaged = false;

    const chooseColor = (num) => {
        let color = "pink";
        switch (num) {
            case 0:
                color = "white";
                break;
            case 1:
                color = "blue";
                break;
            case 2:
                color = "green";
                break;
            case 3:
                color = "red";
                break;
            case 4:
                color = "purple";
                break;
            case 5:
                color = "maroon";
                break;
            case 6:
                color = "turquoise";
                break;
            case 7:
                color = "black";
                break;
            case 8:
                color = "gray";
                break;
            default:
                console.log("color defaulted");
                break;
        }
        return color;
    }

    const revealSpace = () => {
        if (isFlaged) {
            space.style.backgroundImage = "none";
            gameBoard.flagged--;
            isFlaged = false;
        }
        if (isBomb) {
            space.textContent = "bomb";
            gameBoard.gameOver(false)
        } else if (!isRevealed) {
            let count = 0;
            if (board[y - 1] && board[y - 1][x - 1] && board[y - 1][x - 1].getBomb()) {
                count++;
            }
            if (board[y - 1] && board[y - 1][x] && board[y - 1][x].getBomb()) {
                count++;
            }
            if (board[y - 1] && board[y - 1][x + 1] && board[y - 1][x + 1].getBomb()) {
                count++;
            }
            if (board[y][x - 1] && board[y][x - 1].getBomb()) {
                count++;
            }
            if (board[y][x + 1] && board[y][x + 1].getBomb()) {
                count++;
            }
            if (board[y + 1] && board[y + 1][x - 1] && board[y + 1][x - 1].getBomb()) {
                count++;
            }
            if (board[y + 1] && board[y + 1][x] && board[y + 1][x].getBomb()) {
                count++;
            }
            if (board[y + 1] && board[y + 1][x + 1] && board[y + 1][x + 1].getBomb()) {
                count++;
            }
            isRevealed = true;
            gameBoard.revealed += 1;
            console.log("revealed " + gameBoard.revealed)
            if (count !== 0) {
                space.textContent = count;
            } else {
                space.textContent = "";
            }
            space.style.color = chooseColor(count);
            space.setAttribute("class", "spaces-reveled");
            if (count === 0) {
                if (board[y - 1] && board[y - 1][x - 1]) {
                    board[y - 1][x - 1].revealSpace();
                }
                if (board[y - 1] && board[y - 1][x]) {
                    board[y - 1][x].revealSpace();
                }
                if (board[y - 1] && board[y - 1][x + 1]) {
                    board[y - 1][x + 1].revealSpace();
                }
                if (board[y] && board[y][x - 1]) {
                    board[y][x - 1].revealSpace();
                }
                if (board[y] && board[y][x + 1]) {
                    board[y][x + 1].revealSpace();
                }
                if (board[y + 1] && board[y + 1][x - 1]) {
                    board[y + 1][x - 1].revealSpace();
                }
                if (board[y + 1] && board[y + 1][x]) {
                    board[y + 1][x].revealSpace();
                }
                if (board[y + 1] && board[y + 1][x + 1]) {
                    board[y + 1][x + 1].revealSpace();
                }
            }
            gameBoard.check();
        }


    }
    const flagSpace = () => {
        if (!isFlaged && !isRevealed) {
            space.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/76px-Minesweeper_flag.svg.png')";
            console.log("flagged");
            isFlaged = true;
            gameBoard.flagged++;
        } else {
            space.style.backgroundImage = "none";
            isFlaged = false;
            gameBoard.flagged--;
        }
        gameBoard.check();
    }

    space.addEventListener("contextmenu", e => {
        e.preventDefault();
    })
    space.addEventListener("click", revealSpace);
    space.addEventListener("auxclick", (e) => {
        if (e.button == 2) {
            flagSpace();
        }
        else if (e.button == 1) {
            console.log("middle click");
        }
    });

    const makeBomb = () => {
        isBomb = true;
        space.textContent = "";
    }

    const getBomb = () => {
        return isBomb;
    }

    return {
        button: space,
        x: x,
        y: y,
        placeBomb: makeBomb,
        getBomb: getBomb,
        revealSpace: revealSpace
    };
}

const armBoard = (board, mines) => {
    let arr = [];
    board.forEach((arr1) => {
        arr1.forEach((element) => {
            arr.push({
                y: element.y,
                x: element.x
            })
        })
    })

    console.log(arr)

    for (let i = 0; i < mines; i++) {
        let random = Math.floor((Math.random() * arr.length));
        let space = arr[random];
        board[space.y][space.x].placeBomb();
        arr.splice(random, 1);
        console.log(`made bomb ${i}`);
    }

}


const difficultyMenu = () => {
    let menu = document.createElement("div");
    menu.setAttribute("class", "menu");
    let form = document.createElement("form");
    form.setAttribute("id", "difficulty-options");

    let beginner = document.createElement("input");
    beginner.setAttribute("type", "radio");
    beginner.setAttribute("name", "difficulty");
    beginner.setAttribute("id", "beginner");
    beginner.setAttribute("value", "beginner");
    beginner.setAttribute("checked", "");
    let label = document.createElement("label");
    label.setAttribute("for", "beginner");
    label.textContent = "Beginner (8x8 Grid with 10 Mines)";
    let inputDiv = document.createElement("div");
    inputDiv.appendChild(beginner);
    inputDiv.appendChild(label);
    form.appendChild(inputDiv);

    let intermediate = document.createElement("input");
    intermediate.setAttribute("type", "radio");
    intermediate.setAttribute("name", "difficulty");
    intermediate.setAttribute("id", "intermediate");
    intermediate.setAttribute("value", "intermediate");
    label = document.createElement("label");
    label.setAttribute("for", "intermediate");
    label.textContent = "Intermediate (16x16 Grid with 40 Mines)";
    inputDiv = document.createElement("div");
    inputDiv.appendChild(intermediate);
    inputDiv.appendChild(label);
    form.appendChild(inputDiv);

    let expert = document.createElement("input");
    expert.setAttribute("type", "radio");
    expert.setAttribute("name", "difficulty");
    expert.setAttribute("id", "expert");
    expert.setAttribute("value", "expert");
    label = document.createElement("label");
    label.setAttribute("for", "expert");
    label.textContent = "Expert (30x16 Grid with 99 Mines)";
    inputDiv = document.createElement("div");
    inputDiv.appendChild(expert);
    inputDiv.appendChild(label);
    form.appendChild(inputDiv);

    menu.append(form);
    document.body.appendChild(menu);

    let submit = document.createElement("button");
    submit.textContent = "Start Game";

    submit.addEventListener("click", () => {
        let inputDifficulty = form.elements["difficulty"];
        menu.remove()
        gameStart(inputDifficulty)
    })

    form.appendChild(submit);


}

const makeGameHeader = (numMines) => {

}

const gameStart = (difficulty) => {

    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("id", "gameDiv");
    document.body.appendChild(gameDiv);


    if (difficulty.value === "beginner") {
        makeGameHeader(10);
        gameBoard = makeBoard(8, 8, 10);
    } else if (difficulty.value === "intermediate") {
        makeGameHeader(40);
        gameBoard = makeBoard(16, 16, 40);
    } else if (difficulty.value === "expert") {
        makeGameHeader(99);
        gameBoard = makeBoard(30, 16, 99);
    }
}

difficultyMenu();


