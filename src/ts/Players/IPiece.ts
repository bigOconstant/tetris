import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';
export class IPiece implements IPlayer{
    constructor(){
        this.flipped = true;//Math.random() < 0.5;
        this.coordinates = [];
        this.setcolor();
        this.done = false;
        this.col = Math.floor((Math.random() * 6) + 0);
    
    }
    done:boolean;
    flipped:boolean;
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    coordinates:Coordinate[];
    decr(){
        this.row = this.row + 1;
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
        if(this.flipped){
            if(this.col >= -1){
                if(!this.checkLeftVertical(boardmap)){
                this.deleteCoordinates(boardmap);
                --this.col;
                }else{this.deleteCoordinates(boardmap);}
            }
            this.deleteCoordinates(boardmap);
            //this.drawVertical(boardmap,left);
        }else{
            if(this.col >= 0){
                if(!this.checkLeftHorizontal(boardmap)){
                this.deleteCoordinates(boardmap);
                --this.col;
                }
            }
            this.deleteCoordinates(boardmap);
            //this.drawHorizontal(boardmap,left);
        }
    }
    rightPress(boardmap:Piece[][],left:number){
                 /*
        [ ][*][ ][ ]     [ ][ ][ ][ ]
        [ ][*][ ][ ]     [*][*][*][*]
        [ ][*][ ][ ]     [ ][ ][ ][ ]
        [ ][*][ ][ ]     [ ][ ][ ][ ]

        */
       if(this.flipped){
        if(this.col < 11){
            if(!this.checkRightVertical(boardmap)){
                this.deleteCoordinates(boardmap);
                ++this.col;
            }else{
                this.deleteCoordinates(boardmap);
            }
            
        }else{
            this.deleteCoordinates(boardmap);
        }
       }else{
        if(this.col <6){
            if(!this.checkRightHorizontal(boardmap)){
            this.deleteCoordinates(boardmap);
            ++this.col;
            }else{
                this.deleteCoordinates(boardmap);
            }
        }else{
            this.deleteCoordinates(boardmap);
        }
       }
    }
    upPress(boardmap:Piece[][],left:number){

         /*
        [ ][*][ ][ ]     [ ][ ][ ][ ]
        [ ][*][ ][ ] ->  [*][*][*][*]
        [ ][*][ ][ ]     [ ][ ][ ][ ]
        [ ][*][ ][ ]     [ ][ ][ ][ ]

        */
        if(this.flipped){
            //console.log("Not implemented")
            if(!this.checkVerticalToHorizontal(boardmap)){
                this.deleteCoordinates(boardmap);
                this.flipped = !this.flipped;
            }else{
                this.deleteCoordinates(boardmap);
            }
        }
          /*
        [ ][ ][ ][ ]    [ ][*][ ][ ]
        [*][*][*][*] -> [ ][*][ ][ ]
        [ ][ ][ ][ ]    [ ][*][ ][ ]
        [ ][ ][ ][ ]    [ ][*][ ][ ]
        */
        else{//horizontal
          if(!this.checkHorizontalToVertical(boardmap)){
              this.deleteCoordinates(boardmap);
              this.flipped = !this.flipped;
          }else{
              this.deleteCoordinates(boardmap);
          }
           // return this.flipped;
         //   console.log("Change Again");
        }

    }
    checkVerticalToHorizontal(boardmap){
           /*
        [ ][*][ ][ ]     [ ][ ][ ][ ]
        [ ][*][ ][ ] ->  [*][*][*][*]
        [ ][*][ ][ ]     [ ][ ][ ][ ]
        [ ][*][ ][ ]     [ ][ ][ ][ ]

        */
       var notempty = false;
       if(this.col >6){
           return true;
       }
        if(this.col === -1){
            return true;
        }
        if(!boardmap[this.row+1][this.col].empty){
            return true;
        }
        if(!boardmap[this.row+1][this.col+2].empty){
            return true;
        }
        if(!boardmap[this.row+1][this.col+3].empty){
            return true;
        }
        return notempty;

    }
    checkHorizontalToVertical(boardmap){
          /*
        [ ][ ][ ][ ]    [ ][*][ ][ ]
        [*][*][*][*] -> [ ][*][ ][ ]
        [ ][ ][ ][ ]    [ ][*][ ][ ]
        [ ][ ][ ][ ]    [ ][*][ ][ ]
        */
       var notempty = false;
       if(this.row > 17){
           return true;
       }
       if(!boardmap[this.row][this.col+1].empty){
           return true;
       }
       if(!boardmap[this.row+2][this.col+1].empty){
           return true;
       }
       if(!boardmap[this.row+3][this.col+1].empty){
           return true;
       }
       return notempty;
    }

    downPress(boardmap:Piece[][]){
         //vertical
        /*
        [ ][ ][ ][ ]  [ ][*][ ][ ]
        [*][*][*][*]  [ ][*][ ][ ]
        [ ][ ][ ][ ]  [ ][*][ ][ ]
        [ ][ ][ ][ ]  [ ][*][ ][ ]
        */
        if(this.flipped){
            if(this.row < 16){
                if(!this.checkBelowVertical(boardmap,1)){
                    this.deleteCoordinates(boardmap);
                    this.row++;
                   // this.drawVertical(boardmap,0);
                   // this.draw(boardmap,0)
                }}
        }else{//horizontal
            if(this.row < 18){
                if(!this.checkBelowHorizontal(boardmap,0)){
                   
                    this.deleteCoordinates(boardmap);
                    this.row++;
                    //this.drawHorizontal(boardmap,0);
                    //return this.draw(boardmap,0);
                }else{
                    // this.deleteCoordinates(boardmap);
                    // this.draw(boardmap,0)
                }
               // this.deleteCoordinates(boardmap);
            }
            //this.deleteCoordinates(boardmap);
        }
    }
    draw(boardmap:Piece[][],left:number){
        if(this.flipped){
            var returnval = this.drawFlipped(boardmap,left);
           return returnval;
        }else{
            return this.drawNotFlipped(boardmap,left);
        }
    }

    drawVertical(boardmap:Piece[][],left:number){
       /*
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        this.row, this.col+1
        this.row+1, this.col+1
        this.row+2, this.col+1
        this.row+3, this.col+1
        */
       this.drawToPoint(boardmap,new Coordinate(this.row,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+2,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+3,this.col+1));

    }
    drawHorizontal(boardmap:Piece[][],left:number){


         /*
        [ ][ ][ ][ ]
        [*][*][*][*]
        [ ][ ][ ][ ]
        [ ][ ][ ][ ]
        this.row+1, this.col
        this.row+1, this.col+1
        this.row+1, this.col+2
        this.row+1, this.col+3
        */
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+1));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+2));
       this.drawToPoint(boardmap,new Coordinate(this.row+1,this.col+3));

    }
    checkLeftVertical(boardmap:Piece[][]){
          /*
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        */
       var blocked = false;
       if(this.col <0){
           return true;
       }
       for(var i = this.row; i < this.row+4;++i){
           if(!boardmap[i][this.col].empty){
               blocked = true;
           }
       }
       return blocked;
    }
    checkRightVertical(boardmap:Piece[][]){
          /*
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        */
       var blocked = false;
       if(this.col > 7){
           return true;
       }
       for(var i = this.row; i < this.row+4;++i){
           if(!boardmap[i][this.col+2].empty){
               blocked = true;
           }
       }
       return blocked;

    }
    checkRightHorizontal(boardmap:Piece[][]){
  /*
        [ ][ ][ ][ ]
        [*][*][*][*]
        [ ][ ][ ][ ]
        [ ][ ][ ][ ]
        */
       
       return !boardmap[this.row+1][this.col+4].empty
   

    }
    checkLeftHorizontal(boardmap:Piece[][]){
          /*
        [ ][ ][ ][ ]
        [*][*][*][*]
        [ ][ ][ ][ ]
        [ ][ ][ ][ ]
        */
       if(this.col === 0){
           return true;
       }
       return !boardmap[this.row+1][this.col-1].empty
    }
    checkBelowHorizontal(boardmap:Piece[][],modifier:number){
                /*
        [ ][ ][ ][ ]
        [*][*][*][*]
        [ ][ ][ ][ ]
        [ ][ ][ ][ ]
        */
       var blocked = false;
       if(this.row+2+modifier === 20){
        //doesn't exist return
        blocked = true;
       }else{
       for(var i = this.col; i < this.col+4;++i){
           if(!boardmap[this.row+2+modifier][i].empty){
               blocked = true;
           }
       }}
       return blocked;
    }

    checkBelowVertical(boardmap:Piece[][],modifier:number){
                  /*
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        */
       if(this.row+3 === 20){
           return true;
       }
  
        return !boardmap[this.row + 3 + modifier][this.col+1].empty
    }
    


    drawFlipped(boardmap:Piece[][],left:number){//vertical

        /*
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
        [ ][*][ ][ ]
    */
      if(this.row === 0){
          if(this.checkBelowVertical(boardmap,1)){
            this.done = true;
            return false//game is done;
          }else{
              this.drawVertical(boardmap,left);
              return true;
          }
      }else{//not 0
        if(this.row < 17){
           
            if(!this.checkBelowVertical(boardmap,0)){
                this.deleteCoordinates(boardmap);
                this.drawVertical(boardmap,left);
                return true;
            }else{
                this.done = true;
                return true;
            }
            
        }else{
            this.done = true;
            return true;
        }
      }
    }
    drawNotFlipped(boardmap:Piece[][],left:number){//Horizontal
     /*
        [ ][ ][ ][ ]
        [*][*][*][*]
        [ ][ ][ ][ ]
        [ ][ ][ ][ ]
    */
        if(this.row === 0){// Really shouldn't have to worry about this case, I think it should span vertical everytime.
            if(this.checkBelowHorizontal(boardmap,-1)){
                this.done = true;
                return false;
            }else{
                this.deleteCoordinates(boardmap);
                this.drawHorizontal(boardmap,left);
                return true;
            }   
        }
        if(this.row <21){
            if(!this.checkBelowHorizontal(boardmap,-1)){
                this.deleteCoordinates(boardmap);
                this.drawHorizontal(boardmap,left);
                return true;
            }else{
                this.done = true;
                return true;
            }
        }else{
            this.done = true;
            return true;
        }
    
    }

    
}