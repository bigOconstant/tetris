import {Piece} from '../Piece/Piece';
import {IPlayer} from '../Players/IPlayer';
import {IPiece} from '../Players/IPiece';
import { OPiece } from '../Players/OPiece';
import { XPiece } from '../Players/XPiece';
export class TPiece{
    kind: string;
    color: string;
    speiceList:Piece[];
    started:boolean;
    firstTime:Boolean;
    originalColor:string = "rgb(66, 66, 66)";
    player:IPlayer;
    
    constructor(boardmap:Piece[][]){
        //this.kind = kind;
       this.initP(boardmap);
       
    }

    printBoard(boardmap:Piece[][]){
        for(var i = 0; i <20; ++i){
            var string = "";
            for (var j = 0; j <10; ++j){
                if(boardmap[i][j].empty){
                    string = string+"x";
                }else{
                    string = string +"o";
                }
            }
            console.log(string);
            //console.log("_");
        }

    }

    initP(boardmap:Piece[][]){
       this.started = false;
       this.speiceList = [];
       this.generateType();
       this.player.row = -1;
       this.firstTime = true;

      
       //this.player.col = Math.floor((Math.random() * 6) + 0);
     
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
        
      //  this.printBoard(boardmap);
     //   console.log("Attempting transformation");
        this.player.upPress(boardmap,left);
        
        this.draw(boardmap,left);
       // this.printBoard(boardmap);

    }
    downPress(boardmap:Piece[][],left){
        this.player.downPress(boardmap);
        this.draw(boardmap,left);
    }


    generateType(){
        var type = Math.floor((Math.random() * 3) + 1);
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
     //  console.log("type here = "+type);
       switch(type){
           case 1:
           this.kind = "I";
           break;
           case 2:
           this.kind = "0";
           break;
           case 3:
           this.kind = "X";
           break;

       }
      // this.kind = "I";
      // this.kind = "X";
     //  console.log("About to do next kind:"+this.kind);
       if(this.kind === "I"){
           this.player = new IPiece(); //new OPiece();
       }else if(this.kind === "0"){
         //  console.log("Creating Opiece");
           this.player = new OPiece();
       }else if(this.kind === "X"){
        //  console.log("Creating Opiece");
          this.player = new XPiece();
      }
    }

    draw(boardmap:Piece[][],left:number){
     //   console.log("calling draw");
        if(this.player.done){
            this.player = new IPiece();
        }
      var returnval =  this.player.draw(boardmap,left);
      if(this.player.done){
        this.player = new IPiece();
        this.initP(boardmap);
    }
    return returnval;
    }

    // drawIFlipped(boardmap:Piece[][],left:number){//verticle
    //      var valtoreturn = this.player.drawFlipped(boardmap,left);
    //      if (this.player.done){
    //         this.initP(boardmap);
    //      }
    //      return valtoreturn;
    // }

    // drawINotFlipped(boardmap:Piece[][],left:number){ //horizontal
    //     var valtoreturn = this.player.drawNotFlipped(boardmap,left);
    //     if(this.player.done){
    //         this.initP(boardmap);
    //     }
    //     return valtoreturn;
      
    // }
    decr(){
        this.player.decr();
        
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