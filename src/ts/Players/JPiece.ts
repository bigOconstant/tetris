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
        
    }

    
    draw(boardmap:Piece[][],left:number){
        console.log("Drawing");
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