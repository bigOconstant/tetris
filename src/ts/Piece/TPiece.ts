import {Piece} from '../Piece/Piece';
import {Player} from '../Players/Player'
import {Zshape,Ishape,Jshape,Lshape,Sshape,Tshape,OShape} from '../Data';
export class TPiece{
    kind: string;
    color: string;
    speiceList:Piece[];
    started:boolean;
    firstTime:Boolean;
    originalColor:string = "rgb(66, 66, 66)";
    player:Player;
    
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
        var type = Math.floor((Math.random() * 6) + 1);

       switch(type){
           case 1:
           this.kind = "I";
           break;
           case 2:
           this.kind = "0";
           break;
           case 3:
           this.kind = "T";
           break;
           case 4:
           this.kind = "J";
           break;
           case 5:
           this.kind = "L";
           break;
           case 6:
           this.kind = "Z";
           case 7:
           this.kind = "S";

       }
      

     
     if(this.kind === "Z"){
         this.player = new Player(Zshape)
     }
       else if(this.kind === "I"){
           this.player = new Player(Ishape); //new OPiece();
       }else if(this.kind === "0"){
         //  console.log("Creating Opiece");
           this.player = new Player(OShape);
       }else if(this.kind === "T"){
        //  console.log("Creating Opiece");
          this.player = new Player(Tshape);
      }else if(this.kind === "J"){
          this.player = new Player(Jshape);
      }else if(this.kind === "L"){
          this.player = new Player(Lshape);
      }else if(this.kind === "S"){
          this.player = new Player(Sshape);
      }
    }

    draw(boardmap:Piece[][],left:number){
     //   console.log("calling draw");
        if(this.player.done){
            this.player = new Player(Zshape);
        }
      var returnval =  this.player.draw(boardmap,left);
      if(this.player.done){
        this.player = new Player(Zshape);
        this.initP(boardmap);
    }
    return returnval;
    }

    decr(){
        this.player.decr();
        
    }



    checkBoardForRows(boardmap:Piece[][]){
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
                 boardmap[0][j].color = this.originalColor; 
             }
             this.checkBoardForRows(boardmap);

       }

    }
    }

}