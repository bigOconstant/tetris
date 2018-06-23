import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';
export class JPiece implements IPlayer{

    done:boolean;
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    coordinates:Coordinate[];
    state:number;

    constructor(){
        this.coordinates = [];
        this.setcolor();
        this.done = false;
        this.col = Math.floor((Math.random() * 6) + 2);
        this.state = 4;//Math.floor((Math.random()*4) +1);
        
    }

    draw(boardmap:Piece[][],left:number){
        console.log("Drawing");
        /*   2          3           4           1
         [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
         [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
         [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
         [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]
      
         */
        switch(this.state){
            case 1:
            console.log("Drawing 1");
                if(this.row > 18){
                    this.done = true;
                    return true;
                }
                if(this.checkBelow(boardmap,0)){
                    this.done = true;
                    if(this.row === 0){
                        return false;
                    }
                    return true;
                }

                if(this.row > 0)
                {
                    
                        this.deleteCoordinates(boardmap);
                    
                    
                }
                this.drawCurrent(boardmap,left);
                return true;
                break;



            break;

            case 2:

            if(this.row > 18){
                this.done = true;
                return true;
            }
            if(this.checkBelow(boardmap,0)){
                this.done = true;
                if(this.row === 0){
                    return false;
                }
                return true;
            }

            if(this.row > 0)
            {
                
                    this.deleteCoordinates(boardmap);
                
                
            }
            this.drawCurrent(boardmap,left);
            return true;
            break;

            case 3:

            if(this.row > 18){
                this.done = true;
                return true;
            }
            if(this.checkBelow(boardmap,0)){
                this.done = true;
                if(this.row === 0){
                    return false;
                }
                return true;
            }

            if(this.row > 0)
            {
                
                    this.deleteCoordinates(boardmap);
                
                
            }
            this.drawCurrent(boardmap,left);
            return true;
            break;
            break;

            case 4:
            if(this.row > 18){
                this.done = true;
                return true;
            }
            if(this.checkBelow(boardmap,0)){
                this.done = true;
                if(this.row === 0){
                    return false;
                }
                return true;
            }

            if(this.row > 0)
            {
                
                    this.deleteCoordinates(boardmap);
                
                
            }
            this.drawCurrent(boardmap,left);
            return true;
            break;
        }
    }
    drawCurrent(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
              this.drawOne(boardmap,left);
            break;

            case 2:
            this.drawTwo(boardmap,left);
            break;

            case 3:
            this.drawThree(boardmap,left);
            break;

            case 4:
            this.drawFour(boardmap,left);
            break;
        }
    }

    drawFour(boardmap:Piece[][],left:number){
        /*   2          3           4           1
         [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
         [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
         [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
         [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]
      
         */
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+2));
        this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+2));

    }

    drawThree(boardmap:Piece[][],left:number){
  /*   2          3           4           1
   [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
   [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
   [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
   [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

   */
    this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));
    this.drawToPoint(boardmap,new Coordinate(this.row,this.col+2));
    this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
    this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+1)); 
   }

    drawTwo(boardmap:Piece[][],left:number){
    /*   2          3           4           1
   [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
   [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
   [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
   [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

   */
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
        this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col));
        this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+1));
        this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+2));

    }

    drawOne(boardmap:Piece[][],left:number){
             /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

        */
       this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col));
       this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));

    }


    checkRight(boardmap:Piece[][],modifier:number){
        /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

        */
       
        var returnVal = false;

        switch(this.state){
            case 1:
            returnVal = this.checkRightOne(boardmap,modifier);
            break;
            case 2:
            returnVal = this.checkRightTwo(boardmap,modifier);
            break;
            case 3:
            returnVal = this.checkRightThree(boardmap,modifier);
            break;
            case 4:
            returnVal = this.checkRightFour(boardmap,modifier);
            break;
        }
        return returnVal;
    }
    checkRightFour(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row+1][this.col+3].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col+3].empty){
            blocked = true;
        }
        return blocked;
    }
    checkRightThree(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row][this.col+3].empty){
            blocked = true;
        }
        if(!boardmap[this.row+1][this.col+2].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col+2].empty){
            blocked = true;
        }
        return blocked;
    }
    checkRightTwo(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row+1][this.col+1].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col+3].empty){
            blocked = true;
        }
        return blocked;
    }

    checkRightOne(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row][this.col+2].empty){
            blocked = true;
        }
        if(!blocked[this.row+2][this.col+2].empty){
            blocked = true;
        }
        if(!blocked[this.row+3][this.col+2].empty){
            blocked = true;
        }
        return blocked;
    }

    checkLeft(boardmap:Piece[][],modifier:number){
        /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

        */
       var returnVal = false;
       switch(this.state){
           case 1:
           returnVal = this.checkLeftOne(boardmap,modifier);
           break;
           case 2:
           returnVal = this.checkLeftTwo(boardmap,modifier);
           break;
           case 3:
           returnVal = this.checkLeftThree(boardmap,modifier);
           break;
           case 4:
           this.checkLeftFour(boardmap,modifier);
           break;
       }
       return returnVal;

    }
    checkLeftFour(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row+1][this.col-1].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col+1].empty){
            blocked = true;
        }
        return blocked;
    }

    checkLeftThree(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+1][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col].empty){
            blocked = true;
        }
        return blocked;

    }
    checkLeftTwo(boardmap:Piece[][],modifier:number){
        var blocked = false;

        if(!boardmap[this.row+1][this.col-1].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col-1].empty){
            blocked = true;
        }
        return blocked;
    }
    checkLeftOne(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+1][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col-1].empty){
            blocked = true;
        }
        return blocked;
    }

    checkBelow(boardmap:Piece[][],modifier:number){
        /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [ ][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [*][*][ ]

        */
       var returnVal = false;
       switch(this.state){
           case 1:
           returnVal = this.checkBelowOne(boardmap,modifier);
           break;
           case 2:
           returnVal = this.checkBelowTwo(boardmap,modifier);
           break;
           case 3:
           returnVal = this.checkBelowThree(boardmap,modifier);
           break;
           case 4:
           returnVal = this.checkBelowFour(boardmap,modifier);
           break;

       }
       return returnVal;
    }

    checkBelowFour(boardmap:Piece[][],modifier:number){
            /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

        */
        var blocked = false;
        if(!boardmap[this.row+1][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+1][this.col+1].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2][this.col+2].empty){
            blocked = true;
        }
        return blocked;
    }

    checkBelowThree(boardmap:Piece[][],modifier:number){
        /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [*][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ]

        */
        var blocked = false;
        if(!boardmap[this.row+2][this.col+1].empty){
            blocked = true;
        }
        if(!boardmap[this.row][this.col+2].empty){
            blocked = true;
        }
        return blocked;
    }
    checkBelowOne(boardmap:Piece[][],modifier:number){
     /*   2          3           4           1
        [ ][ ][ ] = [ ][*][*] = [ ][ ][ ] = [ ][*][ ]
        [*][ ][ ] = [ ][*][ ] = [*][*][*] = [ ][*][ ]
        [*][*][*] = [ ][*][ ] = [ ][ ][*] = [ ][*][ ]
        [ ][ ][ ] = [ ][ ][ ] = [ ][ ][ ] = [*][*][ ]

        */
        var blocked = false;
        if(!boardmap[this.row +2 + modifier][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2 + modifier][this.col+1].empty){
            blocked = true;
        }
        return blocked;
    }
    checkBelowTwo(boardmap:Piece[][],modifier:number){
        var blocked = false;
        if(!boardmap[this.row+2+modifier][this.col].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2+modifier][this.col+1].empty){
            blocked = true;
        }
        if(!boardmap[this.row+2+modifier][this.col+2].empty){
            blocked = true;
        }
        return blocked;

    }



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

    incrementState(){
        if(this.state <4){
            ++this.state;
        }else{
            this.state = 1;
        }
    }

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
    leftPress(boardmap:Piece[][],left:number){
        console.log("Left Press");
    }
    rightPress(boardmap:Piece[][],left:number){
        console.log("right Press");
    }
    upPress(boardmap:Piece[][],left:number){
        console.log("Up Press");
    }
    downPress(boardmap:Piece[][]){
        console.log("Down Press");
    }
}