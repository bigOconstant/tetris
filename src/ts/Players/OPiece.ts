// import {IPlayer} from './IPlayer';
// import {Piece} from '../Piece/Piece';
// export class OPiece implements IPlayer{
//     constructor(){
//         this.flipped = Math.random() < 0.5;
//         this.setcolor();
//         this.done = false;
    
//     }
//     done:boolean;
//     flipped:boolean;
//     row:number;
//     col:number;
//     originalColor:string = "rgb(66, 66, 66)";
//     color:string;

//     draw(boardmap:Piece[][],left:number){
//         if(boardmap[this.row][this.col){
            
//         }

//     }
//     drawFlipped(boardmap:Piece[][],left:number){
//         console.log("Don't need this method :(")
//     }
//     drawNotFlipped(boardmap:Piece[][],left:number){
//         console.log("Also don't need this method ;")
//     }
//     decr(){
//         this.row = this.row + 1;
//     }
//     setcolor(){
//         var color = Math.floor((Math.random() * 6) + 1);
        
//          switch(color){
//             case 0:
//                 this.color = "rgb(11, 98, 237)";
//                 break;
//             case 1:
//                 this.color = "rgb(19, 237, 11)";
//                 break;
//             case 2:
//                 this.color = "rgb(249, 72, 90)";
//                 break;
//             case 3:
//                 this.color = "rgb(245, 255, 66)";
//                 break;
//             case 4:
//                 this.color = "rgb(66, 255, 248)";
//                 break;
//             case 5:
//                 this.color = "rgb(255, 66, 176)";
//                 break;
//             case 6:
//                 this.color = "rgb(255, 154, 66)";
//                 break;
//          }
//      }
// }