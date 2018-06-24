import {IPlayer} from './IPlayer';
import {Piece} from '../Piece/Piece';
import {Coordinate} from './Coordinate';

export class LPiece implements IPlayer{
   
    done:boolean;
    row:number;
    col:number;
    originalColor:string = "rgb(66, 66, 66)";
    color:string;
    coordinates:Coordinate[];
    state:number;
    matrixOne:number[][];
    matrixTwo:number[][];
    matrixThree:number[][];
    matrixFour:number[][];


    constructor(){   
        this.coordinates = [];
        this.setcolor();
        this.done = false;
        this.col = Math.floor((Math.random() * 6) + 2);
        this.state = 3;//Math.floor((Math.random()*4) +1);


        this.matrixOne =  
        [
                [0,1,0],
                [0,1,0],
                [0,1,1]
                
        ]   

        
        this.matrixTwo =  
        [
               [0,0,0],
               [1,1,1],
               [1,0,0]
              
           ]   
        
        this.matrixThree =  
        [
               [1,1,0],
               [0,1,0],
               [0,1,0]
               
           ] 
           this.matrixFour =  
           [
                  [0,0,0],
                  [0,0,1],
                  [1,1,1]
                 
              ] 
           
        };


    leftPress(boardmap:Piece[][],left:number){
        console.log("LeftPress");
    }
    rightPress(boardmap:Piece[][],left:number){
        console.log("Right Press");
    }
    upPress(boardmap:Piece[][],left:number){
        console.log("Up Press");
    }

    downPress(boardmap:Piece[][]){
        console.log("Down Press");
    }
    draw(boardmap:Piece[][],left:number){
        if(this.row >17){
            this.done = true;
            return true;
        }else{
            if(!this.checkBelowWrapper(boardmap)){
                this.done = true;
                if(this.row === 0){
                    return false;
                }else return true;
            }else{
                this.deleteCoordinates(boardmap);
                this.drawMatrixWrapper(boardmap);
                return true;


            }
        }
    }
    checkBelowWrapper(boardmap:Piece[][]){
        switch(this.state){
            case 1:
            return this.checkBelow(boardmap,this.matrixOne);
            break;

            case 2:
            return this.checkBelow(boardmap,this.matrixTwo);
            break;

            case 3:
            return this.checkBelow(boardmap,this.matrixTwo);
            break;

            case 4:
            return this.checkBelow(boardmap,this.matrixThree);
            break;

        }
    }

    drawMatrix(boardmap:Piece[][],matrix:number[][]){
        for(var i = 0; i < 3; ++i){
            for(var j = 0; j < 3; ++j){
                if(matrix[i][j] === 1){
                this.drawToPoint(boardmap,new Coordinate(this.row+i, this.col +j))
                }
            }
        }
    }
    drawMatrixWrapper(boardmap:Piece[][]){
        switch(this.state){
            case 1:
             this.drawMatrix(boardmap,this.matrixOne);
            break;

            case 2:
             this.drawMatrix(boardmap,this.matrixTwo);
            break;

            case 3:
             this.drawMatrix(boardmap,this.matrixTwo);
            break;

            case 4:
             this.drawMatrix(boardmap,this.matrixThree);
            break;

        }
    }
    checkBelow(boardmap:Piece[][],matrix:number[][]){

        var deletedPoints = this.deleteCoordinates(boardmap);
        if(this.checkIfFits(this.row,this.col,boardmap,matrix)){
            return true;
        }else{
            deletedPoints.forEach(point => {
                this.drawToPoint(boardmap,point)
            });
            return false;
        }

    }
    checkIfFits(row:number,col:number,boardmap:Piece[][],matrix:number[][]){
        for(var i = 0; i <matrix.length; ++i){
            for(var j = 0; j < matrix[i].length; ++j){
                if(matrix[i][j] === 1){
                    if(!boardmap[row+i] || !boardmap[this.row+i][col+j]){
                        return false;
                    }
                    if(!boardmap[row+i][col+j].empty){
                        return false;
                    }
                }
            }
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
        var temp:Coordinate[] = [];
        while (this.coordinates.length >0){
            var current = this.coordinates.pop();
            temp.push(current);
            this.deleteToPoint(boardmap,current.row,current.col);
        }
        return temp;
    }

     incrementState(){
        if(this.state <4){
            ++this.state;
        }else{
            this.state = 1;
        }
    }


}