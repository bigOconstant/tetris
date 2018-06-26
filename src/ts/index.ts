import {Piece} from './Piece/Piece';
import {TPiece} from './Piece/TPiece'; 
import {Board} from './Board/Board';  
        
var board = new Board();
function drawBoard(){
    //console.log("Calling draw board")
    board.drawBoard();
};
var time = 400;
function descTime(){
    board.decrTime();
    time = time - 50;
}

// board.drawBoard();
var timerForLoadingResult = window.setInterval(drawBoard, 20);
var timerForLoadingResult = window.setInterval(descTime, 300);



window.addEventListener('keydown',check,false);

window.addEventListener("touchstart", downPress, false);


function check(e:any) {
    board.keyPress(e);
}
function downPress(e){
    var xPos = e.touches[0].pageX;
    var yPos = e.touches[0].pageY;
    this.window.width = window.innerWidth;
    var center = Math.floor(window.innerWidth /2);
    if(xPos > center -200 && xPos < center+200){
      
            board.upPress();

    }
    else if(xPos < center -200 ){
        
        board.leftPress();
    }else if(xPos > center +200){
    board.rightPress();
    }
}

window.onresize = function(event) { 
    board.drawBoard();

};