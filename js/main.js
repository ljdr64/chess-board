let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let columns = [1, 2, 3, 4, 5, 6, 7, 8];

window.onload = function() {
    boxes = getAllSquare();
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', boxClick, false);
    }
}

let specialMoveOn = false;
let castleWhiteOn = true;
let castleBlackOn = true;
let castleKingsideWhiteOn = true;
let castleQueensideWhiteOn = true;
let castleKingsideBlackOn = true;
let castleQueensideBlackOn = true;
let movePiece1 = "";
let movePiece2 = "";
let colorPiece;
let piece;
let color;
let specialMove1 = "";
let specialMove2 = "";
let specialNumberMoves = 0;
let numberMoves = 0;

function myFunction() {
    window.location.reload(true);
}

function columnValorString(pieceSquare1) {
    return (pieceSquare1.charAt(0));
}

function rowValorNumber(pieceSquare1) {
    return (pieceSquare1.charAt(1));
}

function columnAdjacent(pieceSquare1, pieceSquare2) {
    if (Math.abs(pieceSquare1.charAt(0).charCodeAt() - pieceSquare2.charAt(0).charCodeAt()) == 1) {
        return (true);
    }
    return (false);
}

function columnRealDiference(pieceSquare1, pieceSquare2) {
    return (Number(pieceSquare1.charAt(0).charCodeAt()) - Number(pieceSquare2.charAt(0).charCodeAt()));
}

function rowRealDiference(pieceSquare1, pieceSquare2) {
    return (Number(pieceSquare1.charAt(1)) - Number(pieceSquare2.charAt(1)));
}

function columnDiference(pieceSquare1, pieceSquare2, n) {
    if (Math.abs(Number(pieceSquare1.charAt(0).charCodeAt()) - Number(pieceSquare2.charAt(0).charCodeAt())) == n) {
        return (true);
    }
    return (false);
}

function rowDiference(pieceSquare1, pieceSquare2, n) {
    if (Math.abs(Number(pieceSquare1.charAt(1)) - Number(pieceSquare2.charAt(1))) == n) {
        return (true);
    }
    return (false);
}

function columnDiferenceNumber(pieceSquare1, pieceSquare2) {
    return (Math.abs(Number(pieceSquare1.charAt(0).charCodeAt()) - Number(pieceSquare2.charAt(0).charCodeAt())));
}

function rowDiferenceNumber(pieceSquare1, pieceSquare2) {
    return (Math.abs(Number(pieceSquare1.charAt(1)) - Number(pieceSquare2.charAt(1))));
}

function columnEqual(pieceSquare1, pieceSquare2) {
    if (pieceSquare1.charAt(0) == pieceSquare2.charAt(0)) {
        return (true);
    }
    return (false);
}

function rowEqual(pieceSquare1, pieceSquare2) {
    if (pieceSquare1.charAt(1) == pieceSquare2.charAt(1)) {
        return (true);
    }
    return (false);
}

function rowNumber(pieceSquare1, n) {
    if (Number(pieceSquare1.charAt(1)) == n) {
        return (true);
    }
    return (false);
}

function pieceInSquare(pieceSquare1) {
    return (document.getElementById(String(pieceSquare1)).getElementsByClassName('piece').length == 1)
}

function pieceIntermediateDiagonal(pieceSquare1, pieceSquare2) {
    let columnSign = Math.sign(columnRealDiference(pieceSquare2, pieceSquare1));
    let rowSign = Math.sign(rowRealDiference(pieceSquare2, pieceSquare1));
    let pieceIntermediate = false;
    let limit = Math.abs(rowRealDiference(pieceSquare2, pieceSquare1));
    let increment = 1;
    let pieceSquare3 = pieceSquare1;
    while (pieceIntermediate == false && increment < limit) {
        increment = ++increment;
        pieceSquare3 = String.fromCharCode(pieceSquare3.charCodeAt(0) + columnSign) +
            (Number(pieceSquare3.charAt(1)) + rowSign);
        if (pieceInSquare(pieceSquare3)) {
            pieceIntermediate = true;
        };
    }
    return (pieceIntermediate);
}

function pieceIntermediateColumn(pieceSquare1, pieceSquare2) {
    let rowSign = Math.sign(rowRealDiference(pieceSquare2, pieceSquare1));
    let limit = Math.abs(Number(pieceSquare1.charAt(1)) - Number(pieceSquare2.charAt(1)))
    let increment = 1;
    let pieceIntermediate = false;
    let pieceSquare3 = pieceSquare1;
    while (pieceIntermediate == false && increment < limit) {
        pieceSquare3 = pieceSquare3.charAt(0) + (Number(pieceSquare3.charAt(1)) + rowSign);
        increment = ++increment;
        if (pieceInSquare(pieceSquare3)) {
            pieceIntermediate = true;
        };
    }
    return (pieceIntermediate);
}

function pieceIntermediateRow(pieceSquare1, pieceSquare2) {
    let columnSign = Math.sign(columnRealDiference(pieceSquare2, pieceSquare1));
    let limit = Math.abs(pieceSquare1.charCodeAt(0) - pieceSquare2.charCodeAt(0))
    let increment = 1;
    let pieceIntermediate = false;
    let pieceSquare3 = pieceSquare1;
    while (pieceIntermediate == false && increment < limit) {
        pieceSquare3 = String.fromCharCode(pieceSquare3.charCodeAt(0) + columnSign) + pieceSquare3.charAt(1);
        increment = ++increment;
        if (pieceInSquare(pieceSquare3)) {
            pieceIntermediate = true;
        };
    }
    return (pieceIntermediate);
}

function boxClick(event) {

    const element = event.target;
    let squareId = event.target.id;
    if (squareId == '') {
        squareId = event.target.parentElement.id;
    }

    function emptySquare(className2) {
        if (element.className.indexOf(className2) == -1) {
            return (true);
        }
        return (false);
    }

    function emptySquareWhite() {
        return (emptySquare('pawn-white') &&
            emptySquare('knight-white') &&
            emptySquare('bishop-white') &&
            emptySquare('rook-white') &&
            emptySquare('queen-white') &&
            emptySquare('king-white'));
    }

    function emptySquareBlack() {
        return (emptySquare('pawn-black') &&
            emptySquare('knight-black') &&
            emptySquare('bishop-black') &&
            emptySquare('rook-black') &&
            emptySquare('queen-black') &&
            emptySquare('king-black'));
    }

    function occupiedSquareWhite() {
        return (!emptySquare('pawn-white') ||
            !emptySquare('knight-white') ||
            !emptySquare('bishop-white') ||
            !emptySquare('rook-white') ||
            !emptySquare('queen-white') ||
            !emptySquare('king-white'));
    }

    function occupiedSquareBlack() {
        return (!emptySquare('pawn-black') ||
            !emptySquare('knight-black') ||
            !emptySquare('bishop-black') ||
            !emptySquare('rook-black') ||
            !emptySquare('queen-black') ||
            !emptySquare('king-black'));
    }

    function emptySquarePiece() {
        return (emptySquare('piece'));
    }

    function movePawnWhite(pieceSquare1, pieceSquare2) {
        let pieceSquare3 = pieceSquare1.charAt(0) + 3;
        if (columnEqual(pieceSquare1, pieceSquare2) &&
            (rowRealDiference(pieceSquare2, pieceSquare1) == 1 ||
                (rowNumber(pieceSquare1, 2) &&
                    rowNumber(pieceSquare2, 4) &&
                    !pieceInSquare(pieceSquare3)))) {
            return (true);
        }
        return (false);
    }

    function movePawnBlack(pieceSquare1, pieceSquare2) {
        let pieceSquare3 = pieceSquare1.charAt(0) + 6;
        if (columnEqual(pieceSquare1, pieceSquare2) &&
            (rowRealDiference(pieceSquare1, pieceSquare2) == 1 ||
                (rowNumber(pieceSquare1, 7) &&
                    rowNumber(pieceSquare2, 5) &&
                    !pieceInSquare(pieceSquare3)))) {
            return (true);
        }
        return (false);
    }

    function moveKnightWhite(pieceSquare1, pieceSquare2) {
        if ((columnDiference(pieceSquare1, pieceSquare2, 2) &&
                rowDiference(pieceSquare1, pieceSquare2, 1)) ||
            (columnDiference(pieceSquare1, pieceSquare2, 1) &&
                rowDiference(pieceSquare1, pieceSquare2, 2))) {
            return (true);
        }
        return (false);
    }

    function moveKnightBlack(pieceSquare1, pieceSquare2) {
        if ((columnDiference(pieceSquare1, pieceSquare2, 2) &&
                rowDiference(pieceSquare1, pieceSquare2, 1)) ||
            (columnDiference(pieceSquare1, pieceSquare2, 1) &&
                rowDiference(pieceSquare1, pieceSquare2, 2))) {
            return (true);
        }
        return (false);
    }

    function moveBishopWhite(pieceSquare1, pieceSquare2) {
        if (columnDiferenceNumber(pieceSquare1, pieceSquare2) == rowDiferenceNumber(pieceSquare1, pieceSquare2) &&
            !pieceIntermediateDiagonal(pieceSquare1, pieceSquare2)) {
            return (true);
        }
        return (false);
    }

    function moveBishopBlack(pieceSquare1, pieceSquare2) {
        if (columnDiferenceNumber(pieceSquare1, pieceSquare2) == rowDiferenceNumber(pieceSquare1, pieceSquare2) &&
            !pieceIntermediateDiagonal(pieceSquare1, pieceSquare2)) {
            return (true);
        }
        return (false);
    }

    function moveRookWhite(pieceSquare1, pieceSquare2) {
        if ((columnDiferenceNumber(pieceSquare1, pieceSquare2) == 0 &&
                !pieceIntermediateColumn(pieceSquare1, pieceSquare2)) ||
            ((rowDiferenceNumber(pieceSquare1, pieceSquare2) == 0) &&
                !pieceIntermediateRow(pieceSquare1, pieceSquare2))) {
            return (true);
        }
        return (false);
    }

    function moveRookBlack(pieceSquare1, pieceSquare2) {
        if ((columnDiferenceNumber(pieceSquare1, pieceSquare2) == 0 &&
                !pieceIntermediateColumn(pieceSquare1, pieceSquare2)) ||
            ((rowDiferenceNumber(pieceSquare1, pieceSquare2) == 0) &&
                !pieceIntermediateRow(pieceSquare1, pieceSquare2))) {
            return (true);
        }
        return (false);
    }

    function moveQueenWhite(pieceSquare1, pieceSquare2) {
        return (moveRookWhite(pieceSquare1, pieceSquare2) ||
            moveBishopWhite(pieceSquare1, pieceSquare2));
    }

    function moveQueenBlack(pieceSquare1, pieceSquare2) {
        return (moveRookBlack(pieceSquare1, pieceSquare2) ||
            moveBishopBlack(pieceSquare1, pieceSquare2));
    }

    function moveKingWhite(pieceSquare1, pieceSquare2) {
        return ((columnDiference(pieceSquare1, pieceSquare2, 1) &&
                rowDiference(pieceSquare2, pieceSquare1, 1)) ||
            (columnDiference(pieceSquare1, pieceSquare2, 1) &&
                rowDiference(pieceSquare2, pieceSquare1, 0)) ||
            (columnDiference(pieceSquare1, pieceSquare2, 0) &&
                rowDiference(pieceSquare2, pieceSquare1, 1)));
    }

    function moveKingBlack(pieceSquare1, pieceSquare2) {
        return ((columnDiference(pieceSquare1, pieceSquare2, 1) &&
                rowDiference(pieceSquare2, pieceSquare1, 1)) ||
            (columnDiference(pieceSquare1, pieceSquare2, 1) &&
                rowDiference(pieceSquare2, pieceSquare1, 0)) ||
            (columnDiference(pieceSquare1, pieceSquare2, 0) &&
                rowDiference(pieceSquare2, pieceSquare1, 1)));
    }

    function capturePawnWhite(pieceSquare1, pieceSquare2) {
        if (columnAdjacent(pieceSquare1, pieceSquare2) &&
            rowRealDiference(pieceSquare2, pieceSquare1) == 1) {
            return (true);
        }
        return (false);
    }

    function capturePawnBlack(pieceSquare1, pieceSquare2) {
        if (columnAdjacent(pieceSquare1, pieceSquare2) &&
            rowRealDiference(pieceSquare1, pieceSquare2) == 1) {
            return (true);
        }
        return (false);
    }

    function capturePawnWhiteEnPassant(pieceSquare1, pieceSquare2, specialSquare1, specialSquare2) {
        if (columnAdjacent(pieceSquare1, pieceSquare2) &&
            rowRealDiference(pieceSquare2, pieceSquare1) == 1 &&
            rowEqual(pieceSquare1, specialSquare2) &&
            columnAdjacent(pieceSquare1, specialSquare2) &&
            specialSquare1.charAt(1) == 7 &&
            specialSquare2.charAt(1) == 5 &&
            columnValorString(pieceSquare2) == columnValorString(specialSquare2)) {
            return (true);
        }
        return (false);
    }

    function capturePawnBlackEnPassant(pieceSquare1, pieceSquare2, specialSquare1, specialSquare2) {
        if (columnAdjacent(pieceSquare1, pieceSquare2) &&
            rowRealDiference(pieceSquare1, pieceSquare2) == 1 &&
            rowEqual(pieceSquare1, specialSquare2) &&
            columnAdjacent(pieceSquare1, specialSquare2) &&
            specialSquare1.charAt(1) == 2 &&
            specialSquare2.charAt(1) == 4 &&
            columnValorString(pieceSquare2) == columnValorString(specialSquare2)) {
            return (true);
        }
        return (false);
    }

    function moveCastleKingsideWhite(pieceSquare1, pieceSquare2) {
        if (pieceSquare1 == 'e1' && pieceSquare2 == 'g1' &&
            moveRookWhite('h1', 'f1') && moveRookWhite('e1', 'g1') &&
            boxes[7].getElementsByClassName('piece').length == 1) {
            if (boxes[7].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-white") !== -1) {
                return (true);
            }
        }
        return (false);
    }

    function moveCastleQueensideWhite(pieceSquare1, pieceSquare2) {
        if (pieceSquare1 == 'e1' && pieceSquare2 == 'c1' &&
            moveRookWhite('a1', 'd1') && moveRookWhite('e1', 'c1') &&
            boxes[0].getElementsByClassName('piece').length == 1) {
            if (boxes[0].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-white") !== -1) {
                return (true);
            }
        }
        return (false);
    }

    function moveCastleKingsideBlack(pieceSquare1, pieceSquare2) {
        if (pieceSquare1 == 'e8' && pieceSquare2 == 'g8' &&
            moveRookBlack('h8', 'f8') && moveRookBlack('e8', 'g8') &&
            boxes[56].getElementsByClassName('piece').length == 1) {
            if (boxes[56].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-black") !== -1) {
                return (true);
            }
        }
        return (false);
    }

    function moveCastleQueensideBlack(pieceSquare1, pieceSquare2) {
        if (pieceSquare1 == 'e8' && pieceSquare2 == 'c8' &&
            moveRookBlack('a8', 'd8') && moveRookBlack('e8', 'c8') &&
            boxes[63].getElementsByClassName('piece').length == 1) {
            if (boxes[63].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-black") !== -1) {
                return (true);
            }
        }
        return (false);
    }

    function movePawnWhiteSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece pawn-white"></div>';
    }

    function moveKnightWhiteSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece knight-white"></div>';
    }

    function moveBishopWhiteSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece bishop-white"></div>';
    }

    function movePawnBlackSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece pawn-black"></div>';
    }

    function moveKnightBlackSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece knight-black"></div>';
    }

    function moveBishopBlackSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece bishop-black"></div>';
    }

    function moveRookWhiteSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece rook-white"></div>';
    }

    function moveRookBlackSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece rook-black"></div>';
    }

    function moveQueenWhiteSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece queen-white"></div>';
    }

    function moveQueenBlackSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece queen-black"></div>';
    }

    function moveKingWhiteSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece king-white"></div>';
    }

    function moveKingBlackSquare(pieceSquare1, pieceSquare2) {
        document.getElementById(pieceSquare1).innerHTML = '';
        document.getElementById(pieceSquare2).innerHTML = '<div class="piece king-black"></div>';
    }

    let clickedSquares = countClickedSquare();

    console.log(numberMoves);

    console.log("squareId=> " + squareId + " clickedSquares=> " + clickedSquares);

    function resetClickedBoard(pieceSquare1) {
        let i = [(pieceSquare1.charCodeAt(0) - 97) + ((pieceSquare1.charAt(1) - 1) * 8)];
        boxes[i].classList.remove("activeSquare");
        boxes[i].classList.remove("activeSquareOne");
        boxes[i].classList.remove("activeSquareTwo");
    }

    if (clickedSquares == 0) {
        movePiece1 = squareId
        event.target.classList.add("activeSquare");
        event.target.classList.add("activeSquareOne");

        function illuminateAll() {

            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].getElementsByClassName('piece').length == 0 &&
                    ((((element.className.indexOf('pawn-white') > -1 &&
                                    (movePawnWhite(movePiece1, boxes[i].id) ||
                                        (capturePawnWhiteEnPassant(movePiece1, boxes[i].id,
                                                specialMove1, specialMove2) &&
                                            numberMoves - specialNumberMoves == 0))) ||
                                (element.className.indexOf('knight-white') > -1 &&
                                    moveKnightWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('bishop-white') > -1 &&
                                    moveBishopWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('rook-white') > -1 &&
                                    moveRookWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('queen-white') > -1 &&
                                    moveQueenWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('king-white') > -1 &&
                                    (moveKingWhite(movePiece1, boxes[i].id) ||
                                        (castleWhiteOn &&
                                            ((castleKingsideWhiteOn && moveCastleKingsideWhite(movePiece1, boxes[i].id)) ||
                                                (castleQueensideWhiteOn && moveCastleQueensideWhite(movePiece1, boxes[i].id))))))) &&
                            occupiedSquareWhite()) ||
                        (((element.className.indexOf('pawn-black') > -1 &&
                                    (movePawnBlack(movePiece1, boxes[i].id) ||
                                        (capturePawnBlackEnPassant(movePiece1, boxes[i].id,
                                                specialMove1, specialMove2) &&
                                            numberMoves - specialNumberMoves == 0))) ||
                                (element.className.indexOf('knight-black') > -1 &&
                                    moveKnightBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('bishop-black') > -1 &&
                                    moveBishopBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('rook-black') > -1 &&
                                    moveRookBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('queen-black') > -1 &&
                                    moveQueenBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('king-black') > -1 &&
                                    (moveKingBlack(movePiece1, boxes[i].id) ||
                                        (castleBlackOn &&
                                            ((castleKingsideBlackOn && moveCastleKingsideBlack(movePiece1, boxes[i].id)) ||
                                                (castleQueensideBlackOn && moveCastleQueensideBlack(movePiece1, boxes[i].id))))))) &&
                            occupiedSquareBlack()))) {
                    boxes[i].classList.add("illuminateSquare");
                }
                if (boxes[i].getElementsByClassName('piece').length == 1) {
                    if ((((element.className.indexOf('pawn-white') > -1 &&
                                    capturePawnWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('knight-white') > -1 &&
                                    moveKnightWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('bishop-white') > -1 &&
                                    moveBishopWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('rook-white') > -1 &&
                                    moveRookWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('queen-white') > -1 &&
                                    moveQueenWhite(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('king-white') > -1 &&
                                    moveKingWhite(movePiece1, boxes[i].id))) &&
                            occupiedSquareWhite() &&
                            boxes[i].getElementsByClassName('piece')[0]
                            .outerHTML.indexOf("black") !== -1) ||
                        (((element.className.indexOf('pawn-black') > -1 &&
                                    capturePawnBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('knight-black') > -1 &&
                                    moveKnightBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('bishop-black') > -1 &&
                                    moveBishopBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('rook-black') > -1 &&
                                    moveRookBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('queen-black') > -1 &&
                                    moveQueenBlack(movePiece1, boxes[i].id)) ||
                                (element.className.indexOf('king-black') > -1 &&
                                    moveKingBlack(movePiece1, boxes[i].id))) &&
                            occupiedSquareBlack() &&
                            boxes[i].getElementsByClassName('piece')[0]
                            .outerHTML.indexOf("white") !== -1)) {
                        boxes[i].classList.add("illuminateSquare2");
                    }
                }
            }
        }
        illuminateAll();
    }

    if (clickedSquares == 1) {
        numberMoves = ++numberMoves;
        movePiece2 = squareId

        function eliminateAll() {

            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].getElementsByClassName('piece').length == 0) {
                    boxes[i].classList.remove("illuminateSquare");
                }
                if (boxes[i].getElementsByClassName('piece').length == 1) {
                    boxes[i].classList.remove("illuminateSquare2");
                }
            }
        }
        eliminateAll();

        if (colorPiece == "pawn-white") {
            if ((movePawnWhite(movePiece1, movePiece2) &&
                    emptySquarePiece()) ||
                (capturePawnWhite(movePiece1, movePiece2) &&
                    occupiedSquareBlack())) {
                movePawnWhiteSquare(movePiece1, movePiece2);
                if (rowNumber(movePiece1, 2) && rowNumber(movePiece2, 4)) {
                    specialMove1 = movePiece1;
                    specialMove2 = movePiece2;
                    specialNumberMoves = numberMoves;
                }
            }
            if (capturePawnWhiteEnPassant(movePiece1, movePiece2, specialMove1, specialMove2) &&
                numberMoves - specialNumberMoves == 1) {
                movePawnWhiteSquare(movePiece1, movePiece2);
                document.getElementById(specialMove2).innerHTML = '';
            }
        }
        if (colorPiece == "knight-white") {
            if (moveKnightWhite(movePiece1, movePiece2) &&
                emptySquareWhite()) {
                moveKnightWhiteSquare(movePiece1, movePiece2);
            }
        }
        if (colorPiece == "bishop-white") {
            if (moveBishopWhite(movePiece1, movePiece2) &&
                emptySquareWhite()) {
                moveBishopWhiteSquare(movePiece1, movePiece2);
            }
        }
        if (colorPiece == "rook-white") {
            if (moveRookWhite(movePiece1, movePiece2) &&
                emptySquareWhite()) {
                moveRookWhiteSquare(movePiece1, movePiece2);
                if (movePiece1 == 'h1' &&
                    castleWhiteOn) {
                    castleKingsideWhiteOn = false;
                };
                if (movePiece1 == 'a1' &&
                    castleWhiteOn) {
                    castleQueensideWhiteOn = false;
                };
            }
        }
        if (colorPiece == "queen-white") {
            if (moveQueenWhite(movePiece1, movePiece2) &&
                emptySquareWhite()) {
                moveQueenWhiteSquare(movePiece1, movePiece2);
            }
        }
        if (colorPiece == "king-white") {
            if (moveKingWhite(movePiece1, movePiece2) &&
                emptySquareWhite()) {
                moveKingWhiteSquare(movePiece1, movePiece2);
                if (movePiece1 == 'e1' &&
                    castleWhiteOn) {
                    castleWhiteOn = false;
                };
            };
            if (moveCastleKingsideWhite(movePiece1, movePiece2) &&
                castleKingsideWhiteOn && castleWhiteOn) {
                moveRookWhiteSquare('h1', 'f1');
                moveKingWhiteSquare(movePiece1, movePiece2);
                castleWhiteOn = false;
            };
            if (moveCastleQueensideWhite(movePiece1, movePiece2) &&
                castleQueensideWhiteOn && castleWhiteOn) {
                moveRookWhiteSquare('a1', 'd1');
                moveKingWhiteSquare(movePiece1, movePiece2);
                castleWhiteOn = false;
            }
        }
        if (colorPiece == "pawn-black") {
            if ((movePawnBlack(movePiece1, movePiece2) &&
                    emptySquarePiece()) ||
                (capturePawnBlack(movePiece1, movePiece2) &&
                    occupiedSquareWhite())) {
                movePawnBlackSquare(movePiece1, movePiece2);
                if (rowNumber(movePiece1, 7) && rowNumber(movePiece2, 5)) {
                    specialMove1 = movePiece1;
                    specialMove2 = movePiece2;
                    specialNumberMoves = numberMoves;
                }
            }
            if (capturePawnBlackEnPassant(movePiece1, movePiece2, specialMove1, specialMove2) &&
                numberMoves - specialNumberMoves == 1) {
                movePawnBlackSquare(movePiece1, movePiece2);
                document.getElementById(specialMove2).innerHTML = '';
            }
        }
        if (colorPiece == "knight-black") {
            if (moveKnightBlack(movePiece1, movePiece2) &&
                emptySquareBlack()) {
                moveKnightBlackSquare(movePiece1, movePiece2);
            }
        }
        if (colorPiece == "bishop-black") {
            if (moveBishopBlack(movePiece1, movePiece2) &&
                emptySquareBlack()) {
                moveBishopBlackSquare(movePiece1, movePiece2);
            }
        }
        if (colorPiece == "rook-black") {
            if (moveRookBlack(movePiece1, movePiece2) &&
                emptySquareBlack()) {
                moveRookBlackSquare(movePiece1, movePiece2);
                if (movePiece1 == 'h8' &&
                    castleBlackOn) {
                    castleKingsideBlackOn = false;
                };
                if (movePiece1 == 'a8' &&
                    castleBlackOn) {
                    castleQueensideBlackOn = false;
                };
            }
        }
        if (colorPiece == "queen-black") {
            if (moveQueenBlack(movePiece1, movePiece2) &&
                emptySquareBlack()) {
                moveQueenBlackSquare(movePiece1, movePiece2);
            }
        }
        if (colorPiece == "king-black") {
            if (moveKingBlack(movePiece1, movePiece2) &&
                emptySquareBlack()) {
                moveKingBlackSquare(movePiece1, movePiece2);
                if (movePiece1 == 'e8' &&
                    castleBlackOn) {
                    castleBlackOn = false;
                };
            };
            if (moveCastleKingsideBlack(movePiece1, movePiece2) &&
                castleKingsideBlackOn && castleBlackOn) {
                moveRookBlackSquare('h8', 'f8');
                moveKingBlackSquare(movePiece1, movePiece2);
                castleBlackOn = false;
            };
            if (moveCastleQueensideBlack(movePiece1, movePiece2) &&
                castleQueensideBlackOn && castleBlackOn) {
                moveRookBlackSquare('a8', 'd8');
                moveKingBlackSquare(movePiece1, movePiece2);
                castleBlackOn = false;
            }
        }

        event.target.classList.add("activeSquare");
        event.target.classList.add("activeSquareTwo");
        resetClickedBoardPieces();
        resetClickedBoard(movePiece1);
        resetClickedBoard(movePiece2);
        colorPiece = "";

        // let castleKingside = [{
        //     '0-0 white=> ': castleKingsideWhiteOn,
        //     '0-0 black=> ': castleKingsideBlackOn
        // }];
        // console.table(castleKingside);
        // let castleQueenside = [{
        //     '0-0-0 white=> ': castleQueensideWhiteOn,
        //     '0-0-0 black=> ': castleQueensideBlackOn
        // }];
        // console.table(castleQueenside);


        // let castle = [{
        //     'castleWhite=> ': castleWhiteOn,
        //     'castleBlack=> ': castleBlackOn
        // }];
        // console.table(castle);

        console.log("specialMove1=> " + specialMove1 + " specialMove2=> " + specialMove2);
        console.log("movePiece1=> " + movePiece1 + " movePiece2=> " + movePiece2);
        console.log("numberMoves=> " + numberMoves + " specialNumberMoves=> " + specialNumberMoves);
        console.log("emptySquarePiece()=> " + emptySquarePiece());
    }

    if (element.className.indexOf('pawn-white') > -1) {
        // pawn-white
        console.log('pawn-white');
        colorPiece = "pawn-white";
        piece = "Pawn";
        color = "White";
    }

    if (element.className.indexOf('knight-white') > -1) {
        // knight-white
        console.log('knight-white');
        colorPiece = "knight-white";
        piece = "Knight";
        color = "White";
    }

    if (element.className.indexOf('bishop-white') > -1) {
        // knight-white
        console.log('bishop-white');
        colorPiece = "bishop-white";
        piece = "Bishop";
        color = "White";
    }

    if (element.className.indexOf('pawn-black') > -1) {
        // pawn-black
        console.log('pawn-black');
        colorPiece = "pawn-black";
        piece = "Pawn";
        color = "Black";
    }

    if (element.className.indexOf('knight-black') > -1) {
        // knight-black
        console.log('knight-black');
        colorPiece = "knight-black";
        piece = "Knight";
        color = "Black";
    }

    if (element.className.indexOf('bishop-black') > -1) {
        // knight-white
        console.log('bishop-black');
        colorPiece = "bishop-black";
        piece = "Bishop";
        color = "Black";
    }

    if (element.className.indexOf('rook-white') > -1) {
        // knight-black
        console.log('rook-white');
        colorPiece = "rook-white";
        piece = "Rook";
        color = "White";
    }

    if (element.className.indexOf('rook-black') > -1) {
        // knight-black
        console.log('rook-black');
        colorPiece = "rook-black";
        piece = "Rook";
        color = "Black";
    }

    if (element.className.indexOf('queen-white') > -1) {
        // knight-black
        console.log('queen-white');
        colorPiece = "queen-white";
        piece = "Queen";
        color = "White";
    }

    if (element.className.indexOf('queen-black') > -1) {
        // knight-black
        console.log('queen-black');
        colorPiece = "queen-black";
        piece = "Queen";
        color = "Black";
    }

    if (element.className.indexOf('king-white') > -1) {
        // knight-black
        console.log('king-white');
        colorPiece = "king-white";
        piece = "King";
        color = "White";
    }

    if (element.className.indexOf('king-black') > -1) {
        // knight-black
        console.log('king-black');
        colorPiece = "king-black";
        piece = "King";
        color = "Black";
    }
}

function getAllSquare() {
    const boxes = document.getElementsByClassName('box');
    return boxes;
}

function getAllPieces() {
    const pieces = document.getElementsByClassName('piece');
    return pieces;
}


function countClickedSquare() {
    const nRows = document.getElementsByClassName('activeSquare').length;
    return nRows;
}

function resetClickedBoardPieces() {
    let pieces = getAllPieces();
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].classList.remove("activeSquare");
        pieces[i].classList.remove("activeSquareOne");
        pieces[i].classList.remove("activeSquareTwo");
    }
}