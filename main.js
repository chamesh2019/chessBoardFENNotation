let board = document.querySelector(".board");

const rows = 8;
const columns = 8;

function createBoard(rows, columns) {
    /**
    * Creates a game board with the specified number of rows and columns.
    *
    * @param {number} rows - The number of rows in the game board.
    * @param {number} columns - The number of columns in the game board.
    */

    board.innerHTML = "";
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            let square = document.createElement("div");
            square.id = `index${8 * row + column}`;
            square.classList.add("square");

            if (row % 2 === 0) {
                if (column % 2 === 0) {
                    square.classList.add("white")
                } else {
                    square.classList.add("black")
                }
            } else {
                if (column % 2 === 0) {
                    square.classList.add("black")
                } else {
                    square.classList.add("white")
                }
            }

            board.appendChild(square);
        }
    }
}

let pieces = {
    'Q': 'Wqueen.png',
    'B': 'Wbishop.png',
    'R': 'Wrook.png',
    'K': 'Wking.png',
    'N': 'Wknight.png',
    'P': 'Wpone.png',
    'q': 'Bqueen.png',
    'b': 'Bbishop.png',
    'r': 'Brook.png',
    'k': 'Bking.png',
    'n': 'Bknight.png',
    'p': 'Bpone.png'
};

// give me a random fenstring
let fenstring = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

// on paste
function onpaste(event) {
    createBoard(rows, columns);
    let text = (event.clipboardData || window.clipboardData).getData('Text');    
    fentoBoard(text)
}

document.querySelector("body").addEventListener("paste", onpaste);

function fentoBoard(fenstring) {
    // convert fenstring to board
    let piecesString = fenstring.split(" ")[0];
    let boardRows = piecesString.split("/");
    for (let i = 0; i < boardRows.length; i++) {
        fenRowtoBoard(boardRows[i], i);
    }

    toMove(fenstring.split(" ")[1]);
}

function fenRowtoBoard(fenRow, row) {
    /**
    * Converts a FEN row to a chessboard row.
    *
    * @param {string} fenRow - The FEN row to convert.
    * @param {number} row - The row index of the chessboard.
    * @return {void}
    */

    let column = 0;
    for (let i = 0; i < fenRow.length; i++) {

        if (fenRow[i] === '/') {
            row++;
            column = 0;
        } else if (isNaN(fenRow[i])) {
            let piece = fenRow[i];
            let img = document.createElement("img");
            img.src = `images/${pieces[piece]}`;
            img.classList.add("piece");
            document.querySelector(`#index${8 * row + column}`).appendChild(img);
            column++;
        } else {
            column += Number(fenRow[i]);
        }
    }
}

function toMove(side) {
    let div = document.createElement("div");
    div.classList.add("move");
    if (side === "w") {
        side = "White";
    } else {
        side = "Black";
    }
    div.innerHTML = `${side} to move`;
    document.querySelector(".content").appendChild(div);
}