import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';
import {MatrixSet} from "../MatrixSet"
export class NextPlayer {
    constructor(set:MatrixSet,color:string){
        this.coordinates = [];
        this.row = 0;
        this.col = 0;
        this.color = color;
        this.matrix = set;
    }
    coordinates:Coordinate[];
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    matrix:MatrixSet;

    draw(boardmap:Piece[][]){
        this.drawMatrix(boardmap,this.matrix.matrix1);
    }

    drawMatrix(boardmap:Piece[][],matrix:number[][]){
        for(var i = 0; i < matrix.length; ++i){
            for(var j = 0; j < matrix[i].length; ++j){
                if(matrix[i][j] === 1){
                this.drawToPoint(boardmap,new Coordinate(this.row+i, this.col +j))
                }
            }
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
        } else{
            console.log("Trying to delete something that doesn't exists at boardmap["+x+"]["+y+"]");
        }
    }
    deleteCoordinates(boardmap){
        var temp:Coordinate[] = [];
        while (this.coordinates.length >0){
            var current = this.coordinates.pop();
            temp.push(current);
            this.deleteToPoint(boardmap,current.row,current.col);
        }
        return temp;
    }

}