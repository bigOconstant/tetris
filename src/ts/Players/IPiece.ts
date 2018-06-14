import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';

export class IPiece implements IPlayer{
    constructor(flipped:boolean){
        this.flipped = flipped;
        this.setcolor();
        this.done = false;
    }
    done:boolean;
    flipped:boolean;
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    decr(){
        this.row = this.row + 1;
    }
    setcolor(){
        var color = Math.floor((Math.random() * 6) + 1);
        
         switch(color){
            case 0:
                this.color = "rgb(11, 98, 237)";
                break;
            case 1:
                this.color = "rgb(19, 237, 11)";
                break;
            case 2:
                this.color = "rgb(249, 72, 90)";
                break;
            case 3:
                this.color = "rgb(245, 255, 66)";
                break;
            case 4:
                this.color = "rgb(66, 255, 248)";
                break;
            case 5:
                this.color = "rgb(255, 66, 176)";
                break;
            case 6:
                this.color = "rgb(255, 154, 66)";
                break;
         }
     }
    leftPress(boardmap:Piece[][],left:number){
        if(this.flipped){//Delete all elements to right
            for(var i = 0; i < 4; i++){
                boardmap[this.row +i ][this.col].color = this.originalColor;
                boardmap[this.row + i  ][this.col].empty = true;
            }
         }else{
            for(var i = 0; i < 4; i++){
                boardmap[this.row ][this.col+i].color =   this.originalColor;
                boardmap[this.row ][this.col +i].empty = true;
            }
         }
         if(this.col >0){
             --this.col; 
         }
    }
    rightPress(boardmap:Piece[][],left:number){
        if(this.flipped){
            //Delete all elements to right
            if(this.col < 9){
            for(var i = 0; i < 4; i++){
                boardmap[this.row +i ][this.col].color = this.originalColor;
                boardmap[this.row + i  ][this.col].empty = true;
            }
            ++this.col;
         }
         }else{
             if(this.col < 6){
            for(var i = 0; i < 4; i++){
                boardmap[this.row ][this.col+i].color =   this.originalColor;
                boardmap[this.row ][this.col +i].empty = true;
            }
            ++this.col;
         }
         }
    }
    drawFlipped(boardmap:Piece[][],left:number){
        if(this.row === 0){
               
            for(var i = 0; i < 4; i++){
                if(!boardmap[this.row+i][this.col].empty){
                    for(var j = 0; j < i; ++j){
                       boardmap[this.row + j  ][this.col].color = this.color;
                       boardmap[this.row + j ][this.col].empty = false;
                    }
                    return false;//game over
                }
            }
            
        }
   
       if(boardmap[this.row]
       && boardmap[this.row+1] 
       && boardmap[this.row+2] 
       && boardmap[this.row+3] )
       {
         


           if(boardmap[this.row-1]){
               boardmap[this.row -1][this.col].color = this.originalColor;
               boardmap[this.row -1][this.col].empty = true;
           }

           
          

           for(var i = 0; i < 4; i++){
               boardmap[this.row +i ][this.col].color = this.color;
               boardmap[this.row + i  ][this.col].empty = false;
           }
          


           if(this.row < 15 && !boardmap[this.row+4][this.col].empty){
               // Must check board and clear.
               //this.checkBoardForRows(boardmap); 
               this.done = true;
               return true;
               
           }
           return true;


       }else if(!boardmap[this.row+3]){
           this.row = 0;
           this.col = Math.floor((Math.random() * 10) + 0);

           //We have stopped must calculate if we need to clear.
          // this.checkBoardForRows(boardmap);
           this.done = true;
           return true
       }
    }
    drawNotFlipped(boardmap:Piece[][],left:number){
        if(this.row === 0){
               
            if(!boardmap[this.row][this.col].empty){
              
            }
            for(var i = 0; i < 4; i++){
                if(!boardmap[this.row][this.col+i].empty){
                    for(var j = 0; j < i; ++j){
                        boardmap[this.row  ][this.col+j].color = this.color;
                        boardmap[this.row  ][this.col+j].empty = false;
                    }
                    return false;//game over
                }
            }
            
        }
 
 
     
        if(boardmap[this.row] && boardmap[this.row][this.col]
            && boardmap[this.row][this.col+1] 
            && boardmap[this.row][this.col+2]  
            && boardmap[this.row][this.col+3]  )
            {
 
                if(boardmap[this.row-1]){
 
                    for(var i = 0; i < 4; i++){
                        boardmap[this.row -1][this.col+i].color =   this.originalColor;
                        boardmap[this.row -1][this.col +i].empty = true;
                    }
 
                }
 
    
            for(var i = 0; i < 4; i++){
                boardmap[this.row  ][this.col+i].color = this.color;
                boardmap[this.row  ][this.col+i].empty = false;
            }
 
 
             for(var i = 0; i <4; ++i){
                if(this.row < 19 && !boardmap[this.row+1][this.col + i].empty){
                    this.row = 0;
                this.col = 0;
                //this.checkBoardForRows(boardmap);
                   // this.initP();
                    this.done = true;
                    return true;
                }
             }
             return true;
  
            } if(!boardmap[this.row+1]){  
                //this.checkBoardForRows(boardmap);    
               // this.initP();
                this.done = true;
                return true;
            }
    }

    
}