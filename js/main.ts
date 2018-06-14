//import {Board} from "./board";


var board = new Board();
// board.drawBoard();
var timerForLoadingResult = window.setInterval("board.drawBoard()", 20);
var timerForLoadingResult = window.setInterval("board.decrTime()", 40);
window.onresize = function(event) {
    //console.log("Calling resize");
    board.drawBoard();
    //drawPeice(12);
};