// Beginner: 8x8, 10 Mines
// Intermediate: 16x16 40 Mines
// Expert: 16x30 99 Mines 


const makeBoard = (x, y, numMines) => {
    if (numMines > (x * y)) {
        console.log("too many mines")
        return null;
    }
    const board = [];
    const boardSection = document.createElement("section");
    boardSection.setAttribute("id", "board");
    document.body.append(boardSection)

    for (let i = 0; i < y; i++) {
        let arr = [];
        for (let j = 0; j < x; j++) {
            let space = crateSpace(j, i, board);
            arr.push(space);
            boardSection.appendChild(space.button);
        }
        board.push(arr);
    }

    armBoard(board, numMines)

    const clearBoard = () => {
        board = null;
        boardSection.remove();
    }

    return {
        board: board,
        clear: clearBoard
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
        space.style.backgroundImage = "none";
        isFlaged = false;
        if (isBomb) {
            space.textContent = "bomb";
            console.log("Game Over");
        } else if (!isRevealed) {
            let count = 0;
            console.log("test")
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
        }


    }
    const flagSpace = () => {
        if (!isFlaged && !isRevealed) {
            space.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/76px-Minesweeper_flag.svg.png')";
            console.log("flagged");
            isFlaged = true;
        } else {
            space.style.backgroundImage = "none";
            isFlaged = false;
        }
    }

    space.addEventListener("contextmenu", e => {
        e.preventDefault();
    })
    space.addEventListener("click", revealSpace);
    space.addEventListener("auxclick", flagSpace);

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
