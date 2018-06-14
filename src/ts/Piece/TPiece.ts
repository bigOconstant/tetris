import {Piece} from '../Piece/Piece';
import {IPlayer} from '../Players/IPlayer';
import {IPiece} from '../Players/IPiece';
export class TPiece{
    kind: string;
    color: string;
    speiceList:Piece[];
    started:boolean;
    flipped:boolean;
    firstTime:Boolean;
    originalColor:string;
    player:IPlayer;
    
    constructor(){
        //this.kind = kind;
       this.initP();
    }

    initP(){
       this.flipped = Math.random() >= 0.5;
       this.started = false;
       this.speiceList = [];
       this.generateType(this.flipped);
       this.player.row = -1;
       this.firstTime = true;

       if(this.kind === "I" && !this.flipped){
       this.player.col = Math.floor((Math.random() * 6) + 0);
       }else {
          this.player.col = Math.floor((Math.random() * 6) + 0);
       }
    }

    leftPress(boardmap:Piece[][],left:number){
        this.player.leftPress(boardmap,left);
        this.draw(boardmap,left);
    }
    rightPress(boardmap:Piece[][],left:number){
        this.player.rightPress(boardmap,left);
        this.draw(boardmap,left);
    }


    generateType(flipped:boolean){
        var type = Math.floor((Math.random() * 7) + 1);
       //  switch(type){
       //      case 0:
       //          this.kind = "0";
       //          break;
       //      case 1:
       //          this.kind = "T";
       //          break;
       //      case 2:
       //          this.kind = "I";
       //          break;
       //      case 3:
       //          this.kind = "S";
       //          break;
       //      case 4:
       //          this.kind = "Z";
       //          break;
       //      case 5:
       //          this.kind = "J";
       //          break;
       //      case 6:
       //          this.kind = "L";
       //          break;
       //  }
       this.kind = "I";
       if(this.kind === "I"){
           this.player = new IPiece(flipped);
       }
    }

    draw(boardmap:Piece[][],left:number){

       if(this.kind === "I"){
           if(this.flipped){
             return  this.drawIFlipped(boardmap,left);
           }else if(!this.flipped){
              return  this.drawINotFlipped(boardmap,left);
           }
       }
    }

    drawIFlipped(boardmap:Piece[][],left:number){//verticle
         var valtoreturn = this.player.drawFlipped(boardmap,left);
         if (this.player.done){
            this.initP();
         }
         return valtoreturn;
    }

    drawINotFlipped(boardmap:Piece[][],left:number){ //horizontal
        var valtoreturn = this.player.drawNotFlipped(boardmap,left);
        if(this.player.done){
            this.initP();
        }
        return valtoreturn;
      
    }
    decr(){
        this.player.decr();
    }

    checkBoardForRows(boardmap:Piece[][]){

       boardmap.forEach(element => {
           var NeedToDelete = true;;
           element.forEach(elementChild => {
               if(elementChild.empty){
                   NeedToDelete = false;
               }
           });
           if(NeedToDelete){
               console.log("Need to delete this row");
           }
       });

    }


}