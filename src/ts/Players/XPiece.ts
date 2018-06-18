import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';

export class XPiece implements IPlayer{// this is the real t piece

    done:boolean;
    flipped:boolean;
    state:number
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;

    constructor(){
        this.flipped = Math.random() < 0.5;
        this.setcolor();
        this.done = false;
        this.col = Math.floor((Math.random() * 6) + 2);
        this.state = Math.floor((Math.random()*4) +1);
      //  console.log("Creating object: col:"+this.col);

    }
    incrementState(){
        if(this.state <4){
            ++this.state;
        }else{
            this.state = 1;
        }
    }
    drawToPoint(boardmap:Piece[][],x:number,y:number){
        boardmap[x][y].color = this.color;
        boardmap[x][y].empty = false;
    }
    deleteToPoint(boardmap:Piece[][],x:number,y:number){
        boardmap[x][y].color = this.originalColor;
        boardmap[x][y].empty = true;
    }

    drawSelf(boardmap:Piece[][]){
        /*  
        [^]
     [ ][ ][ ]
        */
        this.drawToPoint(boardmap,this.row,this.col+1);
        this.drawToPoint(boardmap,this.row+1,this.col);
        this.drawToPoint(boardmap,this.row+1,this.col+1);
        this.drawToPoint(boardmap,this.row+1,this.col+2);
    }
    deleteSelf(boardmap:Piece[][],modifier:number){
                /*  
        [^]
     [ ][ ][ ]
        */
       this.deleteToPoint(boardmap,this.row- modifier,this.col+1);
       this.deleteToPoint(boardmap,this.row+1 -modifier,this.col);
       this.deleteToPoint(boardmap,this.row+1 -modifier,this.col+1);
       this.deleteToPoint(boardmap,this.row+1 -modifier,this.col+2);
    }
    drawSelfFlipped(boardmap:Piece[][]){
        /*

       [<][^][>]
          [v]

        */

       
       this.drawToPoint(boardmap,this.row+1,this.col);
       this.drawToPoint(boardmap,this.row+1 ,this.col+1);
       this.drawToPoint(boardmap,this.row+1 ,this.col+2);
       this.drawToPoint(boardmap,this.row+2 ,this.col+1);
    }
    deleteSelfFlipped(boardmap:Piece[][],modifier:number){
            /*
       [<][^][>]
          [v]
        */
       this.deleteToPoint(boardmap,this.row+1 - modifier,this.col);
       this.deleteToPoint(boardmap,this.row+1 - modifier,this.col+1);
       this.deleteToPoint(boardmap,this.row+1 - modifier,this.col+2);
       this.deleteToPoint(boardmap,this.row+2 - modifier,this.col+1);
    }
    drawSelfRight(boardmap:Piece[][]){
        /*
        [^]
        [<][>]
        [v]
        */
       this.drawToPoint(boardmap,this.row,this.col+1);
       this.drawToPoint(boardmap,this.row+1,this.col+1);
       this.drawToPoint(boardmap,this.row+1,this.col +2);
       this.drawToPoint(boardmap,this.row+2,this.col+1)

    }

    deleteSelfRight(boardmap:Piece[][],modifier:number){
              /*
        [^]
        [<][>]
        [v]
        */
       this.deleteToPoint(boardmap,this.row - modifier,this.col+1);
       this.deleteToPoint(boardmap,this.row+1 - modifier,this.col+1);
       this.deleteToPoint(boardmap,this.row+1 - modifier,this.col +2);
       this.deleteToPoint(boardmap,this.row+2 - modifier,this.col+1) 
    }

    drawSelfLeft(boardmap:Piece[][]){
        /*
        [^]
     [<][>]
        [v]
        */
       this.drawToPoint(boardmap,this.row,this.col+1);
       this.drawToPoint(boardmap,this.row+1,this.col+1);
       this.drawToPoint(boardmap,this.row+1,this.col);
       this.drawToPoint(boardmap,this.row+2,this.col+1)

    }

    deleteSelfLeft(boardmap:Piece[][],xmodifier:number,ymodifier:number){
              /*
        [^]
     [<][>]
        [v]
        */
       this.deleteToPoint(boardmap,this.row - xmodifier,this.col+1 - ymodifier);
       this.deleteToPoint(boardmap,this.row+1 - xmodifier,this.col+1 - ymodifier);
       this.deleteToPoint(boardmap,this.row+1 - xmodifier,this.col - ymodifier);
       this.deleteToPoint(boardmap,this.row+2 - xmodifier,this.col+1 - ymodifier)
    }

    leftPress(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
                if(this.col >0){
                    this.deleteSelf(boardmap,0);
                    this.col = --this.col;
                }
                break;
            case 2:
            if(this.col >-1){
                this.deleteSelfRight(boardmap,0);
                this.col = --this.col;
            }
                break;
            case 3:
            if(this.col >0){
                this.deleteSelfFlipped(boardmap,0);
                this.col = --this.col;
            }
                break;
            case 4:
            if(this.col >0){
                this.deleteSelfLeft(boardmap,0,0);
                this.col = --this.col;
            }
                break;
        }
      //  this.deleteSelfLeft(boardmap,0,0);
        //this.col = --this.col;
  
    }
    rightPress(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
                if(this.col <7){
                    this.deleteSelf(boardmap,0);
                    this.col = ++this.col;
                }
                break;
            case 2:
            if(this.col <7){
                this.deleteSelfRight(boardmap,0);
                this.col = ++this.col;
            }
                break;
            case 3:
            if(this.col <7){
                this.deleteSelfFlipped(boardmap,0);
                this.col = ++this.col;
            }
                break;
            case 4:
            if(this.col <8){
                this.deleteSelfLeft(boardmap,0,0);
                this.col = ++this.col;
            }
                break;
        }
    }
    upPress(boardmap:Piece[][],left:number){
        
        switch(this.state){
            case 1://up
                //transform to right
                
                this.deleteSelf(boardmap,0);
                if(this.col <8){
                    this.state = 2;
                }
                break;
            case 2: //right
                this.deleteSelfRight(boardmap,0);
              
                if(this.col > -1){
                this.state = 3;
                }
                break;
            case 3://down
                this.deleteSelfFlipped(boardmap,0);
                this.state = 4;
                break;
            case 4://left
                this.deleteSelfLeft(boardmap,0,0);
                if(this.col <8){
                    this.state = 1;
                }
                break;
        }
    }
    downPress(boardmap:Piece[][]){
        switch(this.state){
            case 1:
                if(this.row <18){
                    this.deleteSelf(boardmap,0);
                    ++this.row;
                   
                }
                break;
            case 2:
            if(this.row <17){
                this.deleteSelfRight(boardmap,0);
                ++this.row;
            }
                break;
            case 3:
            if(this.row <17){
                this.deleteSelfFlipped(boardmap,0);
                ++this.row;
            }
                break;
            case 4:
            if(this.row <17){
                this.deleteSelfLeft(boardmap,0,0);
                ++this.row;
            }
                break;
        }
    }

    draw(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
                
                if(this.row>18){
                    this.done = true;
                    return true;
                    break;
                }
                if(this.row > 0){
                    this.deleteSelf(boardmap,1);
                }
                this.drawSelf(boardmap);
                break;
            case 2:
                console.log("Drawing right");
                if(this.row>17){
                    this.done = true;
                    return true;
                    break;
                }
                if(this.row > 0){
                    this.deleteSelfRight(boardmap,1);
                }
                this.drawSelfRight(boardmap);
                break;
            case 3:
                if(this.row>17){
                    this.done = true;
                    return true;
                    break;
                }
                if(this.row > 0){
                    this.deleteSelfFlipped(boardmap,1);
                }
                this.drawSelfFlipped(boardmap);
                break;
            case 4:
                if(this.row>17){
                    this.done = true;
                    return true;
                    break;
                }

                if(this.row > 0){
                    this.deleteSelfLeft(boardmap,1,0);
                }
                this.drawSelfLeft(boardmap);
            break;
        }

        return true;
    }

    drawFlipped(boardmap:Piece[][],left:number){
        console.log("Drawing");
    }
    drawNotFlipped(boardmap:Piece[][],left:number){
        console.log("Drawing");
    }

    decr(){
        // console.log("This.row = "+this.row);
        // console.log("Calling descr");
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
}