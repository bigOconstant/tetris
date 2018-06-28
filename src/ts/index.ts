import {Piece} from './Piece/Piece';
import {TPiece} from './Piece/TPiece'; 
import {Board} from './Board/Board'; 
import {GameService} from './Services/GameService'; 

        
var board = new Board();
var GameManager = GameService.getInstance();

function drawBoard(){
    //console.log("Calling draw board")
    board.drawBoard();
};
var time = 1100;

function descTime(){
    board.decrTime();
    time = time - 1;
    // if(time > 0){
    // setTimeout(descTime(),time);
    // }
}

// board.drawBoard();
var timerForLoadingResult1 = window.setInterval(drawBoard, 20);
//var timerForLoadingResult2 = window.setInterval(descTime, 300);


/*

*/
var counter = 700;
window.setInterval(function(){counter = counter -10},60000)

var myFunction = function(){
    clearInterval(interval);
    board.decrTime();
    
    interval = setInterval(myFunction, counter);
}
var interval = setInterval(myFunction, counter);

/*

*/
//window.onload(setTimeout(alert("Setting time out!"),3000));


window.addEventListener('keydown',check,false);

window.addEventListener("touchstart", downPress, false);


function check(e:any) {
    //console.log("Game score:"+GameManager.getScore());
    board.keyPress(e);
}
function downPress(e){
    // console.log("Game score:"+GameManager.getScore());
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