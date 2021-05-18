let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let columns = [1, 2, 3, 4, 5, 6, 7, 8];

window.onload = function() {
    boxes = getAllSquare();
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', boxClick, false);
    }
}

let kingWhitePosition;
let kingBlackPosition;
let kingWhiteBoxesIndice;
let kingBlackBoxesIndice;
let whiteInCheck = false;
let blackInCheck = false;
let specialMoveOn = false;
let castleWhiteOn = true;
let castleBlackOn = true;
let castleKingsideWhiteOn = true;
let castleQueensideWhiteOn = true;
let castleKingsideBlackOn = true;
let castleQueensideBlackOn = true;
let movePiece1 = "";
let movePiece2 = "";
let colorPiece = "";
let activateMove = "";
let pieceNotation = "";
let letterPieceWhite = "";
let letterPieceBlack = "";
let movePieceWhiteNotation = "";
let movePieceBlackNotation = "";
let gameMovesPGN = "";
let gameMovesHTMLTotal = '<div class="moves" id="moveNotation">' +
    '<div class="order-move"><br> </div>' +
    '<div class="move-1"><br> </div>' +
    '<div class="move-2"><br> </div>' +
    '</div>';
let piece;
let piece2;
let color;
let color2;
let oppositeColor;
let oppositeColor2;
let specialMove1 = "";
let specialMove2 = "";
let specialNumberMoves = 0;
let numberMovesWhite = 0;
let numberMovesBlack = 0;
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

function pieceMoveInDiagonal(pieceSquare1, pieceSquare2, n) {
    let columnSign = Math.sign(columnRealDiference(pieceSquare2, pieceSquare1));
    let rowSign = Math.sign(rowRealDiference(pieceSquare2, pieceSquare1));
    let limit = n;
    let pieceSquare3 = pieceSquare2;
    for (let i = 0; i < limit; i++) {
        pieceSquare3 = String.fromCharCode(pieceSquare3.charCodeAt(0) + columnSign) +
            (Number(pieceSquare3.charAt(1)) + rowSign);
    }
    return (pieceSquare3);
}

function pieceMoveInColumn(pieceSquare1, pieceSquare2, n) {
    let rowSign = Math.sign(rowRealDiference(pieceSquare2, pieceSquare1));
    let limit = n;
    let pieceSquare3 = pieceSquare2;
    for (let i = 0; i < limit; i++) {
        pieceSquare3 = pieceSquare3.charAt(0) + (Number(pieceSquare3.charAt(1)) + rowSign);
    }
    return (pieceSquare3);
}

function pieceMoveInRow(pieceSquare1, pieceSquare2, n) {
    let columnSign = Math.sign(columnRealDiference(pieceSquare2, pieceSquare1));
    let limit = n;
    let pieceSquare3 = pieceSquare2;
    for (let i = 0; i < limit; i++) {
        pieceSquare3 = String.fromCharCode(pieceSquare3.charCodeAt(0) + columnSign) + pieceSquare3.charAt(1);
    }
    return (pieceSquare3);
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

function moveIlluminateSquare(pieceSquare1) {
    document.getElementById(pieceSquare1).innerHTML = '<div class="illuminateSquare"></div>';
}

function moveIlluminateSquare2(pieceSquare1, htmlPieceSquare) {
    document.getElementById(pieceSquare1).innerHTML =
        htmlPieceSquare + '<div class="illuminateSquare2"></div>' +
        '<div class="illuminateSquare3"></div>';
}

function moveIlluminateSquare3(pieceSquare1, htmlPieceSquare) {
    document.getElementById(pieceSquare1).innerHTML =
        htmlPieceSquare + '<div class="illuminateSquare4"></div>';
}

function moveActiveSquare1(pieceSquare1, htmlPieceSquare) {
    document.getElementById(pieceSquare1).innerHTML =
        htmlPieceSquare + '<div class="activeSquare1"></div>';
}

function moveActiveSquare2(pieceSquare1, htmlPieceSquare) {
    document.getElementById(pieceSquare1).innerHTML =
        htmlPieceSquare + '<div class="activeSquare2"></div>';
}

function moveWhiteNotation(pieceSquare1) {
    document.getElementById('gameNotation').innerHTML =
        gameMovesHTMLTotal +
        '<div class="moves" id="moveNotation">' +
        '<div class="order-move">' + numberMovesWhite + '</div>' +
        '<div class="move-1">' + letterPieceWhite + pieceSquare1 + '</div>' +
        '<div class="move-2"></div>' +
        '</div>';
}

function moveBlackNotation(pieceSquare1, pieceSquare2) {
    document.getElementById('gameNotation').innerHTML =
        gameMovesHTMLTotal +
        '<div class="moves" id="moveNotation">' +
        '<div class="order-move">' + numberMovesWhite + '</div>' +
        '<div class="move-1">' + letterPieceWhite + pieceSquare1 + '</div>' +
        '<div class="move-2">' + letterPieceBlack + pieceSquare2 + '</div>' +
        '</div>';
}

function gameMovesHTML(pieceSquare1, pieceSquare2) {
    return '<div class="moves" id="moveNotation">' +
        '<div class="order-move">' + numberMovesWhite + '</div>' +
        '<div class="move-1">' + letterPieceWhite + pieceSquare1 + '</div>' +
        '<div class="move-2">' + letterPieceBlack + pieceSquare2 + '</div>' +
        '</div>';
}

function gameMovesWhitePGN(pieceSquare1) {
    gameMovesPGN = gameMovesPGN +
        numberMovesWhite + '. ' + letterPieceWhite + pieceSquare1;
}

function gameMovesBlackPGN(pieceSquare1) {
    gameMovesPGN = gameMovesPGN + ' ' + letterPieceBlack + pieceSquare1 + ' ';
}

function kingsOnCheck() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("king-white") !== -1) {
                kingWhitePosition = boxes[i].id;
                kingWhiteBoxesIndice = i;
            };
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("king-black") !== -1) {
                kingBlackPosition = boxes[i].id;
                kingBlackBoxesIndice = i;
            };
        }
    }

    for (let i = 0; i < boxes.length; i++) {
        if (moveKnightWhite(kingWhitePosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("knight-black") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingWhiteBoxesIndice].id,
                    boxes[kingWhiteBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                whiteInCheck = true;
            };
        }
        if (moveBishopWhite(kingWhitePosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-black") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("bishop-black") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingWhiteBoxesIndice].id,
                    boxes[kingWhiteBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                whiteInCheck = true;
            };
        }
        if (moveRookWhite(kingWhitePosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-black") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-black") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingWhiteBoxesIndice].id,
                    boxes[kingWhiteBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                whiteInCheck = true;
            };
        }
        if (capturePawnWhite(kingWhitePosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("pawn-black") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingWhiteBoxesIndice].id,
                    boxes[kingWhiteBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                whiteInCheck = true;
            }
        }
        if (moveKnightBlack(kingBlackPosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("knight-white") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingBlackBoxesIndice].id,
                    boxes[kingBlackBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                blackInCheck = true;
            };
        }
        if (moveBishopBlack(kingBlackPosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-white") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("bishop-white") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingBlackBoxesIndice].id,
                    boxes[kingBlackBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                blackInCheck = true;
            };
        }
        if (moveRookBlack(kingBlackPosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-white") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-white") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingBlackBoxesIndice].id,
                    boxes[kingBlackBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                blackInCheck = true;
            };
        }
        if (capturePawnBlack(kingBlackPosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("pawn-white") !== -1) {
                moveIlluminateSquare2(boxes[i].id,
                    boxes[i].getElementsByClassName('piece')[0].outerHTML);
                moveIlluminateSquare3(boxes[kingBlackBoxesIndice].id,
                    boxes[kingBlackBoxesIndice]
                    .getElementsByClassName('piece')[0].outerHTML);
                blackInCheck = true;
            }
        }
    }
}

function kingWhiteOnCheck(pieceSquare1) {
    for (let i = 0; i < boxes.length; i++) {
        if (moveKingWhite(pieceSquare1, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("king-black") !== -1) {
                return true;
            };
        }
        if (moveKnightWhite(pieceSquare1, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("knight-black") !== -1) {
                return true;
            };
        }
        if (pieceSquare1 !== boxes[i].id) {
            if (moveBishopWhite(pieceSquare1, boxes[i].id) &&
                boxes[i].getElementsByClassName('piece').length == 1) {
                if (boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("queen-black") !== -1 ||
                    boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("bishop-black") !== -1) {
                    return true;
                };
            }
            if (moveRookWhite(pieceSquare1, boxes[i].id) &&
                boxes[i].getElementsByClassName('piece').length == 1) {
                if (boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("queen-black") !== -1 ||
                    boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("rook-black") !== -1) {
                    return true;
                };
            }
        }
        if (moveBishopWhite(kingWhitePosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-black") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("bishop-black") !== -1) {
                if (pieceSquare1 == pieceMoveInDiagonal(boxes[i].id, kingWhitePosition, 1)) {
                    return true;
                };
            }
        }
        if (moveRookWhite(kingWhitePosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-black") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-black") !== -1) {
                if (pieceSquare1 == pieceMoveInRow(boxes[i].id, kingWhitePosition, 1) ||
                    pieceSquare1 == pieceMoveInColumn(boxes[i].id, kingWhitePosition, 1)) {
                    return true;
                };
            };
        }
        if (capturePawnWhite(pieceSquare1, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("pawn-black") !== -1) {
                return true;
            }
        }
    }
    return false;
}

function kingBlackOnCheck(pieceSquare1) {
    for (let i = 0; i < boxes.length; i++) {
        if (moveKingBlack(pieceSquare1, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("king-white") !== -1) {
                return true;
            };
        }
        if (moveKnightBlack(pieceSquare1, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("knight-white") !== -1) {
                return true;
            };
        }
        if (pieceSquare1 !== boxes[i].id) {
            if (moveBishopBlack(pieceSquare1, boxes[i].id) &&
                boxes[i].getElementsByClassName('piece').length == 1) {
                if (boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("queen-white") !== -1 ||
                    boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("bishop-white") !== -1) {
                    return true;
                };
            }
            if (moveRookBlack(pieceSquare1, boxes[i].id) &&
                boxes[i].getElementsByClassName('piece').length == 1) {
                if (boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("queen-white") !== -1 ||
                    boxes[i].getElementsByClassName('piece')[0]
                    .outerHTML.indexOf("rook-white") !== -1) {
                    return true;
                };
            }
        }
        if (moveBishopBlack(kingBlackPosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-white") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("bishop-white") !== -1) {
                if (pieceSquare1 == pieceMoveInDiagonal(boxes[i].id, kingBlackPosition, 1)) {
                    return true;
                };
            };
        }
        if (moveRookBlack(kingBlackPosition, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("queen-white") !== -1 ||
                boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("rook-white") !== -1) {
                if (pieceSquare1 == pieceMoveInRow(boxes[i].id, kingBlackPosition, 1) ||
                    pieceSquare1 == pieceMoveInColumn(boxes[i].id, kingBlackPosition, 1)) {
                    return true;
                };
            };
        }
        if (capturePawnBlack(pieceSquare1, boxes[i].id) &&
            boxes[i].getElementsByClassName('piece').length == 1) {
            if (boxes[i].getElementsByClassName('piece')[0]
                .outerHTML.indexOf("pawn-white") !== -1) {
                return true;
            }
        }
    }
    return false;
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
        if (!emptySquarePiece()) {
            element.classList.add("activeSquare");
            if (document.getElementById(movePiece1).outerHTML.indexOf('square-white') !== -1) {
                moveActiveSquare1(movePiece1, element.outerHTML);
            };
            if (document.getElementById(movePiece1).outerHTML.indexOf('square-black') !== -1) {
                moveActiveSquare2(movePiece1, element.outerHTML);
            };

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
                                        !kingWhiteOnCheck(boxes[i].id) &&
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
                                        !kingBlackOnCheck(boxes[i].id) &&
                                        (moveKingBlack(movePiece1, boxes[i].id) ||
                                            (castleBlackOn &&
                                                ((castleKingsideBlackOn && moveCastleKingsideBlack(movePiece1, boxes[i].id)) ||
                                                    (castleQueensideBlackOn && moveCastleQueensideBlack(movePiece1, boxes[i].id))))))) &&
                                occupiedSquareBlack()))) {
                        moveIlluminateSquare(boxes[i].id);
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
                            moveIlluminateSquare2(boxes[i].id,
                                boxes[i].getElementsByClassName('piece')[0].outerHTML);
                        }
                    }
                }
            }
            illuminateAll();
        }
    }

    if (clickedSquares == 1) {
        numberMoves = ++numberMoves;
        movePiece2 = squareId;

        function eliminateAll() {

            for (let i = 0; i < boxes.length; i++) {
                if (boxes[i].getElementsByClassName('piece').length == 0) {
                    document.getElementById(boxes[i].id).innerHTML = '';
                }
                if (boxes[i].getElementsByClassName('piece').length == 1) {
                    document.getElementById(boxes[i].id).innerHTML = boxes[i].
                    getElementsByClassName('piece')[0].outerHTML;
                }
            }
        }
        eliminateAll();

        if (colorPiece == "pawn-white") {
            if ((movePawnWhite(movePiece1, movePiece2) &&
                    emptySquarePiece()) ||
                (capturePawnWhite(movePiece1, movePiece2) &&
                    occupiedSquareBlack() && emptySquare('king-black'))) {
                movePawnWhiteSquare(movePiece1, movePiece2);
                if (capturePawnWhite(movePiece1, movePiece2)) {
                    letterPieceWhite = movePiece1.charAt(0) + 'x';
                };
                if (rowNumber(movePiece1, 2) && rowNumber(movePiece2, 4)) {
                    specialMove1 = movePiece1;
                    specialMove2 = movePiece2;
                    specialNumberMoves = numberMoves;
                };
                activateMove = movePiece2;
                numberMovesWhite++;
            }
            if (capturePawnWhiteEnPassant(movePiece1, movePiece2, specialMove1, specialMove2) &&
                numberMoves - specialNumberMoves == 1) {
                movePawnWhiteSquare(movePiece1, movePiece2);
                document.getElementById(specialMove2).innerHTML = '';
                letterPieceWhite = movePiece1.charAt(0) + 'x';
                activateMove = movePiece2;
                numberMovesWhite++;
            }
        }
        if (colorPiece == "knight-white") {
            if (moveKnightWhite(movePiece1, movePiece2) &&
                emptySquareWhite() && emptySquare('king-black')) {
                moveKnightWhiteSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesWhite++;
            }
        }
        if (colorPiece == "bishop-white") {
            if (moveBishopWhite(movePiece1, movePiece2) &&
                emptySquareWhite() && emptySquare('king-black')) {
                moveBishopWhiteSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesWhite++;
            }
        }
        if (colorPiece == "rook-white") {
            if (moveRookWhite(movePiece1, movePiece2) &&
                emptySquareWhite() && emptySquare('king-black')) {
                moveRookWhiteSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesWhite++;
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
                emptySquareWhite() && emptySquare('king-black')) {
                moveQueenWhiteSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesWhite++;
            }
        }
        if (colorPiece == "king-white") {
            if (moveKingWhite(movePiece1, movePiece2) &&
                emptySquareWhite() && emptySquare('king-black') &&
                !kingWhiteOnCheck(movePiece2)) {
                moveKingWhiteSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesWhite++;
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
                activateMove = '0-0';
                letterPieceWhite = '';
                numberMovesWhite++;
            };
            if (moveCastleQueensideWhite(movePiece1, movePiece2) &&
                castleQueensideWhiteOn && castleWhiteOn) {
                moveRookWhiteSquare('a1', 'd1');
                moveKingWhiteSquare(movePiece1, movePiece2);
                castleWhiteOn = false;
                activateMove = '0-0-0';
                letterPieceWhite = '';
                numberMovesWhite++;
            }
        }
        if (colorPiece == "pawn-black") {
            if ((movePawnBlack(movePiece1, movePiece2) &&
                    emptySquarePiece()) ||
                (capturePawnBlack(movePiece1, movePiece2) &&
                    occupiedSquareWhite() && emptySquare('king-white'))) {
                movePawnBlackSquare(movePiece1, movePiece2);
                if (capturePawnBlack(movePiece1, movePiece2)) {
                    letterPieceBlack = movePiece1.charAt(0) + 'x';
                };
                if (rowNumber(movePiece1, 7) && rowNumber(movePiece2, 5)) {
                    specialMove1 = movePiece1;
                    specialMove2 = movePiece2;
                    specialNumberMoves = numberMoves;
                };
                activateMove = movePiece2;
                numberMovesBlack++;
            }
            if (capturePawnBlackEnPassant(movePiece1, movePiece2, specialMove1, specialMove2) &&
                numberMoves - specialNumberMoves == 1) {
                movePawnBlackSquare(movePiece1, movePiece2);
                document.getElementById(specialMove2).innerHTML = '';
                letterPieceBlack = movePiece1.charAt(0) + 'x';
                activateMove = movePiece2;
                numberMovesBlack++;
            }
        }
        if (colorPiece == "knight-black") {
            if (moveKnightBlack(movePiece1, movePiece2) &&
                emptySquareBlack() && emptySquare('king-white')) {
                moveKnightBlackSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesBlack++;
            }
        }
        if (colorPiece == "bishop-black") {
            if (moveBishopBlack(movePiece1, movePiece2) &&
                emptySquareBlack() && emptySquare('king-white')) {
                moveBishopBlackSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesBlack++;
            }
        }
        if (colorPiece == "rook-black") {
            if (moveRookBlack(movePiece1, movePiece2) &&
                emptySquareBlack() && emptySquare('king-white')) {
                moveRookBlackSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesBlack++;
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
                emptySquareBlack() && emptySquare('king-white')) {
                moveQueenBlackSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesBlack++;
            }
        }
        if (colorPiece == "king-black") {
            if (moveKingBlack(movePiece1, movePiece2) &&
                emptySquareBlack() && emptySquare('king-white') &&
                !kingBlackOnCheck(movePiece2)) {
                moveKingBlackSquare(movePiece1, movePiece2);
                activateMove = movePiece2;
                numberMovesBlack++;
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
                activateMove = '0-0';
                letterPieceBlack = '';
                numberMovesBlack++;
            };
            if (moveCastleQueensideBlack(movePiece1, movePiece2) &&
                castleQueensideBlackOn && castleBlackOn) {
                moveRookBlackSquare('a8', 'd8');
                moveKingBlackSquare(movePiece1, movePiece2);
                castleBlackOn = false;
                activateMove = '0-0-0';
                letterPieceBlack = '';
                numberMovesBlack++;
            }
        }

        kingsOnCheck();

        if (color == 'White' &&
            activateMove !== '') {
            moveWhiteNotation(activateMove);
            movePieceWhiteNotation = activateMove;
            pieceNotation = letterPieceWhite;
            gameMovesWhitePGN(activateMove);
        }

        if (color == 'Black' &&
            activateMove !== '') {
            letterPieceWhite = pieceNotation;
            moveBlackNotation(movePieceWhiteNotation, activateMove);
            gameMovesHTMLTotal = gameMovesHTMLTotal +
                gameMovesHTML(movePieceWhiteNotation, activateMove);
            gameMovesBlackPGN(activateMove);
        }

        console.log(gameMovesPGN);
        console.log('colorPiece=> ', colorPiece);

        // console.log('kingWhitePosition=> ', kingWhitePosition);
        // console.log('kingBlackPosition=> ', kingBlackPosition);
        // console.log('whiteInCheck=> ', whiteInCheck);
        // console.log('blackInCheck=> ', blackInCheck);


        element.classList.add("activeSquare");

        resetClickedBoardPieces();
        resetClickedBoard(movePiece1);
        resetClickedBoard(movePiece2);
        whiteInCheck = false;
        blackInCheck = false;
        letterPieceWhite = "";
        letterPieceBlack = "";
        activateMove = "";
        colorPiece = "";
        piece = "";
        piece2 = "";
        color = "";
        color2 = "";
        oppositeColor = "";
        oppositeColor2 = "";

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

        // console.log("specialMove1=> " + specialMove1 + " specialMove2=> " + specialMove2);
        // console.log("movePiece1=> " + movePiece1 + " movePiece2=> " + movePiece2);
        // console.log("numberMoves=> " + numberMoves + " specialNumberMoves=> " + specialNumberMoves);
        // console.log("emptySquarePiece()=> " + emptySquarePiece());
    }

    if (element.className.indexOf("pawn-white") > -1) {
        letterPieceWhite = "";
        colorPiece = "pawn-white";
        piece = "Pawn";
        piece2 = "pawn";
        color = "White";
        color2 = "white";
        oppositeColor = "Black";
        oppositeColor2 = "black";
    }

    if (element.className.indexOf("knight-white") > -1) {
        letterPieceWhite = "N";
        colorPiece = "knight-white";
        piece = "Knight";
        piece2 = "knight";
        color = "White";
        color2 = "white";
        oppositeColor = "Black";
        oppositeColor2 = "black";
    }

    if (element.className.indexOf("bishop-white") > -1) {
        letterPieceWhite = "B";
        colorPiece = "bishop-white";
        piece = "Bishop";
        piece2 = "bishop";
        color = "White";
        color2 = "white";
        oppositeColor = "Black";
        oppositeColor2 = "black";
    }

    if (element.className.indexOf("rook-white") > -1) {
        letterPieceWhite = "R";
        colorPiece = "rook-white";
        piece = "Rook";
        piece2 = "rook";
        color = "White";
        color2 = "white";
        oppositeColor = "Black";
        oppositeColor2 = "black";
    }

    if (element.className.indexOf("queen-white") > -1) {
        letterPieceWhite = "Q";
        colorPiece = "queen-white";
        piece = "Queen";
        piece2 = "queen";
        color = "White";
        color2 = "white";
        oppositeColor = "Black";
        oppositeColor2 = "black";
    }

    if (element.className.indexOf("king-white") > -1) {
        letterPieceWhite = "K";
        colorPiece = "king-white";
        piece = "King";
        piece2 = "king";
        color = "White";
        color2 = "white";
        oppositeColor = "Black";
        oppositeColor2 = "black";
    }

    if (element.className.indexOf("pawn-black") > -1) {
        letterPieceBlack = "";
        colorPiece = "pawn-black";
        piece = "Pawn";
        piece2 = "pawn";
        color = "Black";
        color2 = "black";
        oppositeColor = "White";
        oppositeColor2 = "white";
    }

    if (element.className.indexOf("knight-black") > -1) {
        letterPieceBlack = "N";
        colorPiece = "knight-black";
        piece = "Knight";
        piece2 = "knight";
        color = "Black";
        color2 = "black";
        oppositeColor = "White";
        oppositeColor2 = "white";
    }

    if (element.className.indexOf("bishop-black") > -1) {
        letterPieceBlack = "B";
        colorPiece = "bishop-black";
        piece = "Bishop";
        piece2 = "bishop";
        color = "Black";
        color2 = "black";
        oppositeColor = "White";
        oppositeColor2 = "white";
    }

    if (element.className.indexOf("rook-black") > -1) {
        letterPieceBlack = "R";
        colorPiece = "rook-black";
        piece = "Rook";
        piece2 = "rook";
        color = "Black";
        color2 = "black";
        oppositeColor = "White";
        oppositeColor2 = "white";
    }

    if (element.className.indexOf("queen-black") > -1) {
        letterPieceBlack = "Q";
        colorPiece = "queen-black";
        piece = "Queen";
        piece2 = "queen";
        color = "Black";
        color2 = "black";
        oppositeColor = "White";
        oppositeColor2 = "white";
    }

    if (element.className.indexOf("king-black") > -1) {
        letterPieceBlack = "K";
        colorPiece = "king-black";
        piece = "King";
        piece2 = "king";
        color = "Black";
        color2 = "black";
        oppositeColor = "White";
        oppositeColor2 = "white";
    }
}

function getAllSquare() {
    const boxes = document.getElementsByClassName('box');
    return boxes;
};

function getAllPieces() {
    const pieces = document.getElementsByClassName('piece');
    return pieces;
};

function countClickedSquare() {
    const nRows = document.getElementsByClassName('activeSquare').length;
    return nRows;
};

function resetClickedBoardPieces() {
    let pieces = getAllPieces();
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].classList.remove("activeSquare");
    };
}