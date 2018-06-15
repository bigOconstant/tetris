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
var timerForLoadingResult = window.setInterval(descTime, 300);
window.addEventListener('keydown',check,false);
window.addEventListener("gamepadconnected", function(e:any) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  });

function check(e:any) {
    board.keyPress(e);
}

window.onresize = function(event) { 
    board.drawBoard();

};