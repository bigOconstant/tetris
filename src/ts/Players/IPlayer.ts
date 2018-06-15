import {Piece} from '../Piece/Piece';

export interface IPlayer{
    flipped:boolean;
    row:number;
    col:number;
    color:string;
    done:boolean;
    leftPress(boardmap:Piece[][],left:number);
    rightPress(boardmap:Piece[][],left:number);
    upPress(boardmap:Piece[][],left:number);
    draw(boardmap:Piece[][],left:number);
    drawFlipped(boardmap:Piece[][],left:number);//Verticle
    drawNotFlipped(boardmap:Piece[][],left:number); //horizontal
    decr();
    setcolor();

}