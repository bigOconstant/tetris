import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';
export class OPiece implements IPlayer{
    constructor(){
        this.flipped = Math.random() < 0.5;
        this.setcolor();
        this.done = false;
        this.coordinates = [];
        this.col = Math.floor((Math.random() * 3) + 2);
      //  console.log("Creating object: col:"+this.col);

    }
    done:boolean;
    coordinates:Coordinate[];
    flipped:boolean;
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    drawToPoint(boardmap:Piece[][],Cord:Coordinate){

        
        if(boardmap[Cord.row] && boardmap[Cord.row][Cord.col]){
        boardmap[Cord.row][Cord.col].color = this.color;
        boardmap[Cord.row][Cord.col].empty = false;
        this.coordinates.push(new Coordinate(Cord.row,Cord.col));
        }else{
            console.log("Trying to draw something that doesn't exists at boardmap["+Cord.row+"]["+Cord.col+"]");
        }
    }
    deleteToPoint(boardmap:Piece[][],x:number,y:number){
        if(boardmap[x] && boardmap[x][y]){
           boardmap[x][y].color = this.originalColor;
           boardmap[x][y].empty = true;
        }else{
            console.log("Trying to delete something that doesn't exists at boardmap["+x+"]["+y+"]");
        }
    }
    deleteCoordinates(boardmap){
        while (this.coordinates.length >0){
            var current = this.coordinates.pop();
            this.deleteToPoint(boardmap,current.row,current.col);
        }
    }
    draw(boardmap:Piece[][],left:number){
        //handle if row zero and if peice is already there return false you lose
        if(this.row == 19){
            this.done = true;
            return  true;
        }else if(this.row ===-1){
            this.drawFirstSelf(boardmap);

        }
        else if(this.row === 0){
            //this.drawFirstSelf(boardmap);



           // this.deleteFirstSelf(boardmap);
            this.drawSelf(boardmap);
            return true;

        }else if(this.row === 1){
           //console console.log("Deleting first self");
           this.deleteCoordinates(boardmap);
           // this.deletePrevSelf(boardmap);
            //this.deletePrevSelf(boardmap);
            this.drawSelf(boardmap);
            return true;
        }else{  
            

                    // if(!boardmap[this.row+1][this.col].empty ||!boardmap[this.row+1][+this.col].empty ){
                    //     this.done = true;
                    //     return true;
                    // }
                    if(this.checkBelow(boardmap,-1)){
                        this.done = true;
                        return true 
                    }else{
                    this.deleteCoordinates(boardmap);
                   this.drawSelf(boardmap);
                  return true;
                    }
        }
                  
    
        
       // console.log("Calling Draw")
    }
    drawFlipped(boardmap:Piece[][],left:number){
        console.log("Don't need this method :")
    }
    drawNotFlipped(boardmap:Piece[][],left:number){
        console.log("Also don't need this method ;")
    }
    decr(){
       // console.log("This.row = "+this.row);
       // console.log("Calling descr");
        this.row = this.row + 1;
    }

    drawSelf(boardmap:Piece[][]){
      
        this.drawToPoint(boardmap,new Coordinate(this.row,this.col));
        //boardmap[this.row][this.col].color = this.color;
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
        //boardmap[this.row+1][this.col].color = this.color;
        this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));
       // boardmap[this.row][this.col+1].color = this.color;
        //boardmap[this.row+1][this.col+1].color = this.color;
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));

       

    }
    checkBelow(boardmap:Piece[][],modifier:number){
        /*[*][*]
          [*][*]
        */
       if(!boardmap[this.row+2+modifier][this.col].empty){
           return true;
       }
       if(!boardmap[this.row+2+modifier][this.col+1].empty){
           return true;
       }
       return false;
    }
    drawFirstSelf(boardmap:Piece[][]){

        this.drawToPoint(boardmap,new Coordinate(this.row,this.col));
        this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));

        //boardmap[this.row][this.col].color = this.color;
        //boardmap[this.row][this.col].empty = false;
      //  boardmap[this.row][this.col+1].color = this.color;
       // boardmap[this.row][this.col+1].empty = false;
    }
    downPress(boardmap:Piece[][]){
       // console.log("Calling down press@")
        
        if(this.row < 18){
            if(boardmap[this.row+2][this.col].empty){
                if(boardmap[this.row+2][this.col+1].empty){
                    this.deleteCoordinates(boardmap);
                    ++this.row;
                }
                this.deleteCoordinates(boardmap);
            }
            this.deleteCoordinates(boardmap);
        }
        this.deleteCoordinates(boardmap);
    }


    leftPress(boardmap:Piece[][],left:number){
        if(this.col === 0){
            //do nothing
            this.deleteCoordinates(boardmap);
            return;
        }
        if(this.col > 0){
            if(boardmap[this.row][this.col-1].empty){
                if(this.row <19){
                    if(boardmap[this.row +1][this.col -1].empty){
                        this.deleteCoordinates(boardmap);

                        --this.col;
                    }else{this.deleteCoordinates(boardmap);;}
                }
            }
        }
        this.deleteCoordinates(boardmap);
        return;
    }
    rightPress(boardmap:Piece[][],left:number){
        if(this.col === 9){
            //do nothing
            return;
        }
        if(this.col <9 ){
            if(boardmap[this.row][this.col+2].empty){
                if(this.row <19){
                    if(boardmap[this.row +1][this.col +2].empty){
                        this.deleteCoordinates(boardmap);

                        ++this.col;
                        
                    }
                }else{
                    this.deleteCoordinates(boardmap);
                    ;}
            }
        }
        this.deleteCoordinates(boardmap);
        return;
    }
    upPress(boardmap:Piece[][],left:number){
        this.deleteCoordinates(boardmap);
       // this.draw(boardmap,left);

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