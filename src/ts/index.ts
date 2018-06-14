import {Piece} from './Piece/Piece';
import {TPiece} from './Piece/TPiece'; 
import {Board} from './Board/Board';  
        
var board = new Board();
function drawBoard(){
    //console.log("Calling draw board")
    board.drawBoard();
};
function descTime(){
    board.decrTime();
}
// board.drawBoard();
var timerForLoadingResult = window.setInterval(drawBoard, 20);
var timerForLoadingResult = window.setInterval(descTime, 1000);
window.addEventListener('keydown',check,false);

function check(e:any) {
    board.keyPress(e);
}

window.onresize = function(event) { 
    board.drawBoard();

};