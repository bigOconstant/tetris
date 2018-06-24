import {Piece} from '../Piece/Piece';

export interface IPlayer{
    row:number;
    col:number;
    color:string;
    done:boolean;
    leftPress(boardmap:Piece[][],left:number);
    rightPress(boardmap:Piece[][],left:number);
    upPress(boardmap:Piece[][],left:number);
    downPress(boardmap:Piece[][]);
    draw(boardmap:Piece[][],left:number);

    decr();
    setcolor();

}