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
    originalColor:string = "rgb(66, 66, 66)";
    player:IPlayer;
    
    constructor(boardmap:Piece[][]){
        //this.kind = kind;
       this.initP(boardmap);
    }

    initP(boardmap:Piece[][]){
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
       this.checkBoardForRows(boardmap);
    }

    leftPress(boardmap:Piece[][],left:number){
        this.player.leftPress(boardmap,left);
        this.draw(boardmap,left);
    }
    rightPress(boardmap:Piece[][],left:number){
        this.player.rightPress(boardmap,left);
        this.draw(boardmap,left);
    }
    upPress(boardmap:Piece[][],left:number){
        this.player.upPress(boardmap,left);
        this.flipped = !this.flipped;
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
        var returnval = false;
       if(this.kind === "I"){
           if(this.flipped){
            returnval =  this.drawIFlipped(boardmap,left);
           }else if(!this.flipped){
            returnval =  this.drawINotFlipped(boardmap,left);
           }
       }
       
       return returnval;
       
    }

    drawIFlipped(boardmap:Piece[][],left:number){//verticle
         var valtoreturn = this.player.drawFlipped(boardmap,left);
         if (this.player.done){
            this.initP(boardmap);
         }
         return valtoreturn;
    }

    drawINotFlipped(boardmap:Piece[][],left:number){ //horizontal
        var valtoreturn = this.player.drawNotFlipped(boardmap,left);
        if(this.player.done){
            this.initP(boardmap);
        }
        return valtoreturn;
      
    }
    decr(){
        this.player.decr();
    }

    transform(){
        if(this.flipped){
            console.log("Do stuff here");
        }else{
            console.log("Do other stuff here");
        }
    }

    checkBoardForRows(boardmap:Piece[][]){
       // console.log("Calling draw");
      

       var height = 20;
       var width = 10;


       for(var i = height-1; i > -1; i--){
        var NeedToDelete = true;
           for(var j = width-1; j > -1; j--){
            if(boardmap[i][j].empty){
                NeedToDelete = false;
            }
           }
           if(NeedToDelete){


            for(var k = i; k >1;--k){
                for(var l = 0; l < width; ++l){
                 boardmap[k][l].empty = boardmap[k-1][l].empty;   
                 boardmap[k][l].color = boardmap[k-1][l].color; 
                }
            }
             for(var j = 0; j < width; j++){
                 boardmap[0][j].empty = true;
                 boardmap[0][j].color = this.originalColor;    // }
             }
             this.checkBoardForRows(boardmap);

       }

    }
    }

}