import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';

// export class coordinate{
//     row:number;
//     col:number;
//     constructor(r:number,c:number){
//         this.row = r;
//         this.col = c;
//     }
// }
export class XPiece implements IPlayer{// this is the real t piece

    done:boolean;
    flipped:boolean;
    state:number
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    coordinates:Coordinate[];
    

    constructor(){
        this.coordinates = [];
        this.flipped = Math.random() < 0.5;
        this.setcolor();
        this.done = false;
        this.col = Math.floor((Math.random() * 6) + 2);
        this.state = 1;//Math.floor((Math.random()*4) +1);
      //  console.log("Creating object: col:"+this.col);

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

    drawSelf(boardmap:Piece[][]){
        /*  
        [^]
     [ ][ ][ ]
        */
        
        this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
        this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+2));
    }

    drawSelfFlipped(boardmap:Piece[][]){
        /*

       [<][^][>]
          [v]

        */

       
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
       this.drawToPoint(boardmap,new Coordinate(this.row+1 ,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1 ,this.col+2));
       this.drawToPoint(boardmap,new Coordinate(this.row+2 ,this.col+1));
    }

    drawSelfRight(boardmap:Piece[][]){
        /*
        [^]
        [<][>]
        [v]
        */
       this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col +2));
       this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+1));

    }

    drawSelfLeft(boardmap:Piece[][]){
        /*
        [^]
     [<][>]
        [v]
        */
       this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
       this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+1));

    }

    leftPress(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
                if(this.col >0){
                    if(!this.checkLeftUp(boardmap,0)){
                        
                    this.deleteCoordinates(boardmap);
                    this.col = --this.col;
                    break;
                    }
                }else{
                    this.deleteCoordinates(boardmap);
                    break;
                }
                this.deleteCoordinates(boardmap);
                break;
            case 2:
            if(this.col >-1){
                if(!this.checkLeftRight(boardmap,0)){
                this.deleteCoordinates(boardmap);
                this.col = --this.col;
                break;
                }
            }
            this.deleteCoordinates(boardmap);
                break;
            case 3:
            if(this.col >0){
                if(!this.checkLeftDown(boardmap,0)){
                this.deleteCoordinates(boardmap);
                this.col = --this.col;
                break;
                }
                this.deleteCoordinates(boardmap);
                break;
            }
            this.deleteCoordinates(boardmap);
                break;
            case 4:
            if(this.col >0){
                if(!this.checkLeftLeft(boardmap,0)){
                this.deleteCoordinates(boardmap);
                this.col = --this.col;
                break;
                }
                this.deleteCoordinates(boardmap);
                break;
            }
            this.deleteCoordinates(boardmap);
                break;
        }

  
    }
    rightPress(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
                if(this.col <7){
                    if(!this.checkRightUp(boardmap,0)){
                        this.deleteCoordinates(boardmap);
                        this.col = ++this.col;
                        break;
                    }
                }
                this.deleteCoordinates(boardmap);
                break;
            case 2:
            if(this.col <7){
                if(!this.checkRightRight(boardmap,0)){
                this.deleteCoordinates(boardmap);
                this.col = ++this.col;
                break;
                }
            }
            this.deleteCoordinates(boardmap);
                break;
            case 3:
            if(this.col <7){
                if(!this.checkRightDown(boardmap,0)){
                
                this.deleteCoordinates(boardmap);
                this.col = ++this.col;
                break;
                }
            }
            this.deleteCoordinates(boardmap);
                break;
            case 4:
            if(this.col <8){
                if(!this.checkRightLeft(boardmap,0)){
                this.deleteCoordinates(boardmap);
                this.col = ++this.col;
                break;
                }
            }
            this.deleteCoordinates(boardmap);
                break;
        }
    }
    upPress(boardmap:Piece[][],left:number){
        
        switch(this.state){
            case 1://up
                //transform to right
                
                this.deleteCoordinates(boardmap);
                if(this.col <8){
                    this.state = 2;
                }
                break;
            case 2: //right
            this.deleteCoordinates(boardmap);
              
                if(this.col > -1){
                this.state = 3;
                }
                break;
            case 3://down
            this.deleteCoordinates(boardmap);
                this.state = 4;
                break;
            case 4://left
            this.deleteCoordinates(boardmap);
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
                    if(!this.checkBelowup(boardmap,1)){
                        this.deleteCoordinates(boardmap);
                        ++this.row;
                    }
                   
                }
                break;
            case 2:
            if(this.row <17){
                if(!this.checkBelowRight(boardmap,1)){
                    this.deleteCoordinates(boardmap);
                ++this.row;
                }

                break;
            }
                break;
            case 3:
            if(this.row <17){
                if(!this.checkBelowDown(boardmap,1)){
                    this.deleteCoordinates(boardmap);
                ++this.row;
                }
            }
                break;
            case 4:
            if(this.row <17){
                if(!this.checkBelowLeft(boardmap,1)){
                    this.deleteCoordinates(boardmap);
                    ++this.row;
                }
               break;
            }
                break;
        }
    }
    checkLeftUp(boardmap:Piece[][],modifier:number){
        var ToLeft = false;
      
        if(!boardmap[this.row+1][this.col-1].empty){
            ToLeft = true;
        }
        if(!boardmap[this.row][this.col].empty){
            ToLeft = true;
        }
        
        return ToLeft;
    }
    checkRightUp(boardmap:Piece[][],modifier:number){
        var toRight = false;

        if(!boardmap[this.row+1][this.col+3].empty){
            toRight = true;
        }
        if(!boardmap[this.row][this.col+2].empty){
            toRight = true;
        }
        return toRight;
    }

    checkRightRight(boardmap:Piece[][],modifier:number){
        // 3 possible points of contact
         /*
        [^] <-  this.row, this.col + 2
        [<][>] <-  this.row+1 , this.col +3
        [v] <-  this.row+2, this.col +2
        */
        var toRight = false;
        if(!boardmap[this.row][this.col+2].empty){
            toRight = true;
        }
        if(!boardmap[this.row +1][this.col+3].empty){
            toRight = true;
        }
        if(!boardmap[this.row + 2][this.col+2].empty){
            toRight = true;
        }
        return toRight;
    }
    checkLeftRight(boardmap:Piece[][],modifier:number){
        var toRight = false;
        // 3 possible points of contact
         /*
       this.row, this.col -> [^] 
       this.row+1,this.col-> [<][>] 
       this.row+2,this.col-> [v]
        */
        if(!boardmap[this.row][this.col].empty){
            toRight = true;
        }
        if(!boardmap[this.row +1][this.col].empty){
            toRight = true;
        }
        if(!boardmap[this.row + 2][this.col].empty){
            toRight = true;
        }
        return toRight;
    }
    checkRightLeft(boardmap:Piece[][],modifier:number){
         /*
        [^] -> this.row, this.col+2
     [<][>] -> this.row+1, this.col+2
        [v] -> this.row+2, this.col+2
        */
       var toRight = false;
       if(!boardmap[this.row][this.col+2].empty){
           toRight = true;
       }
       if(!boardmap[this.row+1][this.col+2]){
           toRight = true;
       }
       if(!boardmap[this.row+2][this.col+2]){
           toRight = true;
       }
       return toRight;
    }
    checkLeftLeft(boardmap:Piece[][],modifier:number){
         /*
      this.row,this.col->     [^]  
     this.row+1,this.col -1[<][>]  
      this.row+2,this.col     [v] 
        */
       var toLeft = false;
       if(!boardmap[this.row][this.col].empty){
           toLeft = true;
       }
       if(!boardmap[this.row+1][this.col-1].empty){
           toLeft = true;
       }
       if(!boardmap[this.row+2][this.col].empty){
           toLeft = true;
       }
       return toLeft;
    }

    checkLeftDown(boardmap:Piece[][],modifier:number){
    /*
        Two Points of Entry
       this.row+1,this.col-1 [<][^][>]
       this.row+2,this.col      [v]
    */
        var toLeft = false;
        if(!boardmap[this.row+1][this.col-1].empty){
            toLeft = true;
        }
        if(!boardmap[this.row+2][this.col].empty){
            toLeft = true;
        }
        return toLeft;
    }
    checkRightDown(boardmap:Piece[][],modifier:number){
       /*
        Two Points of Entry
         [<][^][>] -> this.row+1, this.col+3
            [v]  -> this.row+2, this.col+2
        */
       var toRight = false;
       if(!boardmap[this.row+1][this.col+3].empty){
           toRight = true;
       }
       if(!boardmap[this.row+2][this.col+2].empty){
           toRight = true;
       }
       return toRight;
    }

    checkBelowup(boardmap:Piece[][],modifier:number){
        var below = false;
        if(!boardmap[this.row+1+modifier][this.col].empty){
            below = true;
        }
        if(!boardmap[this.row+1+modifier][this.col+1].empty){
            below = true;
        }
        if(!boardmap[this.row+1+modifier][this.col+2].empty){
            below = true;
        }
        //console.log("below ="+below);
        return below;
    }
    checkBelowDown(boardmap:Piece[][],modifier:number){
        var below = false;
        if(!boardmap[this.row+1+modifier][this.col].empty){
            below = true;
        }
        if(!boardmap[this.row+2+modifier][this.col+1].empty){
            below = true;
        }
        if(!boardmap[this.row+1+modifier][this.col+2].empty){
            below = true;
        }
        return below;

    }
    checkBelowLeft(boardmap:Piece[][],modifier:number){
        var below = false;

        if(!boardmap[this.row+2+modifier][this.col+1].empty){
            below = true;  
        }
        if(!boardmap[this.row+1+modifier][this.col].empty){
            below = true;  
        }
        // if(!boardmap[this.row+3+modifier][this.col+1].empty){
        //     below = true;
        // }
        return below;
    }
    checkBelowRight(boardmap:Piece[][],modifier:number){
        var below = false;

      
        if(!boardmap[this.row+2+modifier][this.col+1].empty){
            below = true;  
        }
        if(!boardmap[this.row+1+modifier][this.col+2].empty){
            below = true;  
        }
        // if(!boardmap[this.row+3+modifier][this.col+1].empty){
        //     below = true;
        // }
        return below;
    }

    draw(boardmap:Piece[][],left:number){
        switch(this.state){
            case 1:
               // this.deleteSelf(boardmap,0);
                if(this.row>18){
                    this.done = true;
                    return true;
                   
                }
                if(this.checkBelowup(boardmap,0)){
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
                this.drawSelf(boardmap);
                break;
            case 2:
                if(this.row>17){
                    this.done = true;
                    return true;
  
                }
                if(this.row <17 && this.checkBelowRight(boardmap,0)){
                    this.done = true;
                    return true;
                }
                if(this.checkBelowRight(boardmap,0)){
                    this.done = true;
                    return true;
                }
                if(this.row > 0){
                    this.deleteCoordinates(boardmap);                }
                this.drawSelfRight(boardmap);
                break;
            case 4:
                if(this.row>17){
                    this.done = true;
                    return true;
                }
                if(this.row <17 && this.checkBelowLeft(boardmap,0)){
                    this.done = true;
                    return true;
                }
                if(this.checkBelowLeft(boardmap,0)){
                    this.done = true;
                    return true;

                }

                if(this.row > 0){
                    this.deleteCoordinates(boardmap);                }
                this.drawSelfLeft(boardmap);
            break;
            case 3:
                if(this.row>17){
                    this.done = true;
                    return true;
                }
                if(this.checkBelowDown(boardmap,0)){
                    this.done = true;
                   // this.deleteSelfFlipped(boardmap,1);
                    return true;
                }
                if(this.row > 0){
                  
                    this.deleteCoordinates(boardmap);                }
                    this.drawSelfFlipped(boardmap);
                break;
           
        }

        return true;
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
}