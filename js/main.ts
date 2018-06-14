//import {Board} from "./board";


var board = new Board();
// board.drawBoard();
var timerForLoadingResult = window.setInterval("board.drawBoard()", 20);
var timerForLoadingResult = window.setInterval("board.decrTime()", 1000);
window.addEventListener('keydown',this.check,false);

function check(e:any) {
    console.log("Calling check");
    board.keyPress(e);
   // alert(e.keyCode);
}
window.onresize = function(event) {
    //console.log("Calling resize");
    board.drawBoard();
    //drawPeice(12);
};