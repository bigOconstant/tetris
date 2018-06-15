import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';

export class IPiece implements IPlayer{
    constructor(){
        this.flipped = Math.random() < 0.5;
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
            var noabstruction = true;
            if(this.col >0){
                for(var i = 0; i < 4; ++i){
                    if(boardmap[this.row +i][this.col -1].empty == false){
                        noabstruction = false;
                    }
                }
            }
            if(this.col >0 && noabstruction){
                --this.col; 
            }
         }else{
            for(var i = 0; i < 4; i++){
                boardmap[this.row ][this.col+i].color =   this.originalColor;
                boardmap[this.row ][this.col +i].empty = true;
            }
            if(this.col >0 && boardmap[this.row][this.col-1].empty){
                --this.col; 
            }
         }
        //  if(this.col >0 ){
        //      --this.col; 
        //  }
    }
    rightPress(boardmap:Piece[][],left:number){
        console.log("This.flipped = "+this.flipped);
        if(this.flipped){
            //Delete all elements to right
            if(this.col < 9){
            for(var i = 0; i < 4; i++){
                boardmap[this.row +i ][this.col].color = this.originalColor;
                boardmap[this.row + i  ][this.col].empty = true;
            }
            var noabstruction = true;
            if(this.col <9){
                for(var i = 0; i < 4; ++i){
                    if(boardmap[this.row +i][this.col +1].empty == false){
                        noabstruction = false;
                    }
                }
                if(this.col <9 && noabstruction){
                    ++this.col;; 
                }}
            //++this.col;
         }
         }else{
             
             if(this.col < 6){
            for(var i = 0; i < 4; i++){
                boardmap[this.row ][this.col+i].color =   this.originalColor;
                boardmap[this.row ][this.col +i].empty = true;
            }
            if(this.col < 6 && boardmap[this.row ][this.col +4].empty ){
            ++this.col;
            }
         }
         }
    }
    upPress(boardmap:Piece[][],left:number){
        if(this.flipped){
           // this.flipped = !this.flipped;
            //console.log("Change!");
            //Check if there is room on left
            if(this.col >0 &&  this.col < 8 && this.row < 17){
             //  console.log("Fir check pass!")
                //In range where it's possible now check for obstructions
                if(boardmap[this.row][this.col-1].empty){
                    if(boardmap[this.row][this.col+1].empty && boardmap[this.row][this.col+2].empty){
                      //  console.log("We can transform");
                        for(var i = 0; i <4 ; ++i){

                           
                          //  console.log(boardmap[this.row+i][this.col]);
                            boardmap[this.row+i][this.col].color = this.originalColor;
                            boardmap[this.row+i][this.col].empty = true;
                            // return this.flipped;
                            
                        }
                        this.flipped = !this.flipped;
                        
                          // return this.flipped;
                    }
                }else{
                   // return this.flipped;
                }
            }else{
               // return this.flipped;
            }
            //Check if there is room on right
        }
        else{//horizontal
            console.log("Checking if we can rotate horizontal");
            var canChange  =true;
            console.log("This row:"+this.row);
            for(var i = 0; i < 4; ++i){
                boardmap[this.row][this.col+i].color = this.originalColor;
                boardmap[this.row][this.col+i].empty = true;
            }
            if(this.row >15){
                canChange = false;
            }
            for(var i = 0; i < 4; ++i){
                console.log(boardmap[this.row+i][this.col].empty);
                if(!boardmap[this.row+i][this.col].empty){
                    canChange = false;
                }    
            }
            if(canChange){
                console.log("Horizontal can change!");
                this.flipped = !this.flipped;
                for(var i = 0; i < 4; ++i){
                    boardmap[this.row][this.col+i].color = this.originalColor;
                    boardmap[this.row][this.col+i].empty = true;
                }
                for(var i = 0; i < 4; ++i){
                    boardmap[this.row+i][this.col].color = this.originalColor;
                    boardmap[this.row+i][this.col].empty = true;
                }
            }
           // return this.flipped;
         //   console.log("Change Again");
        }

    }

    draw(boardmap:Piece[][],left:number){
        if(this.flipped){
           return this.drawFlipped(boardmap,left);
        }else{
            return this.drawNotFlipped(boardmap,left);
        }
    }

    drawFlipped(boardmap:Piece[][],left:number){//vertical
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
              
               if(boardmap[this.row + i  ][this.col].empty){
               boardmap[this.row +i ][this.col].color = this.color;
               boardmap[this.row + i  ][this.col].empty = false;
               }
               
           }
          
           if( !boardmap[this.row+4] || !boardmap[this.row+4][this.col].empty) {//Last square
            this.done = true;
       return true;
        }

           if(this.row < 15 && !boardmap[this.row+4][this.col].empty){
            //This here probably doesn't work
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

                    this.done = true;
                    return true;
                }
             }
             return true;
  
            } if(!boardmap[this.row+1]){  
                //this.checkBoardForRows(boardmap);    
               // this.initP();
                console.log("Finishing!");
                this.done = true;
                return true;
            }
    }

    
}