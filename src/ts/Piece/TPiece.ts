import {Piece} from '../Piece/Piece';
import {Player} from '../Players/Player'
import {Zshape,Ishape,Jshape,Lshape,Sshape,Tshape,OShape} from '../Data';
import {GameService} from '../Services/GameService';
import {NextPlayer} from '../Players/NextPlayer'
export class TPiece{
    kind: string;
    color: string;
    speiceList:Piece[];
    started:boolean;
    firstTime:Boolean;
    originalColor:string = "rgb(66, 66, 66)";
    player:Player;
    nPlayer:NextPlayer;
    gameManager:GameService;
    constructor(boardmap:Piece[][]){
        //this.kind = kind;
        this.gameManager = GameService.getInstance();
        this.initP(boardmap);
        this.nPlayer = new NextPlayer(this.findNextTime(),this.gameManager.getColor());
       
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
    findNextTime(){
  
        var typenext = this.gameManager.getNextShape();

        switch (typenext){
            case "Z" :
            return Zshape;
            

            case "I" :
            return Ishape;
            

            case "O" :
            return OShape;
            

            case "T" :
            return Tshape;
            

            case "J" :
            return Jshape;
            

            case "L" :
            return Lshape;
            

            case "S" :
            return Sshape;

            default :
            return OShape;
           
            
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
        var tempKind = "";
       switch(type){
           case 1:
           tempKind = "I";
           break;
           case 2:
           tempKind = "0";
           break;
           case 3:
           tempKind = "T";
           break;
           case 4:
           tempKind = "J";
           break;
           case 5:
           tempKind = "L";
           break;
           case 6:
           tempKind = "Z";
           case 7:
           tempKind = "S";

       }

       var colorswitch = Math.floor((Math.random() * 6) + 1);
        var tempcolor = "";
       switch(colorswitch){
          case 0:
          tempcolor = "rgb(11, 98, 237)";
              break;
          case 1:
          tempcolor = "rgb(19, 237, 11)";
              break;
          case 2:
          tempcolor = "rgb(249, 72, 90)";
              break;
          case 3:
          tempcolor = "rgb(245, 255, 66)";
              break;
          case 4:
          tempcolor = "rgb(66, 255, 248)";
              break;
          case 5:
          tempcolor = "rgb(255, 66, 176)";
              break;
          case 6:
          tempcolor = "rgb(255, 154, 66)";
              break;
       }


       if(this.gameManager.getNextShape() === ""){
           this.gameManager.setNextShape(tempKind);
           this.gameManager.setColor(tempcolor);
           this.generateType();
       }
       this.kind = this.gameManager.getNextShape();
       this.color = this.gameManager.getColor();
       this.gameManager.setColor(tempcolor);
       this.gameManager.setNextShape(tempKind);
       var currentColor = this.color;
       

     
     if(this.kind === "Z"){
         this.player = new Player(Zshape,currentColor)
     }
       else if(this.kind === "I"){
           this.player = new Player(Ishape,currentColor); //new OPiece();
       }else if(this.kind === "0"){
         //  console.log("Creating Opiece");
           this.player = new Player(OShape,currentColor);
       }else if(this.kind === "T"){
        //  console.log("Creating Opiece");
          this.player = new Player(Tshape,currentColor);
      }else if(this.kind === "J"){
          this.player = new Player(Jshape,currentColor);
      }else if(this.kind === "L"){
          this.player = new Player(Lshape,currentColor);
      }else if(this.kind === "S"){
          this.player = new Player(Sshape,currentColor);
      }
    }

    draw(boardmap:Piece[][],left:number){
     //   console.log("calling draw");
   
      var returnval =  this.player.draw(boardmap,left);
      if(this.player.done){
        this.initP(boardmap);
        this.nPlayer = new NextPlayer(this.findNextTime(),this.gameManager.getColor());
    }
    return returnval;
    }
    drawmini(boardmap:Piece[][]){
        this.nPlayer.draw(boardmap);
    }
    deletemini(boardmap:Piece[][]){
        this.nPlayer.deleteCoordinates(boardmap);
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
            this.gameManager.setScore(this.gameManager.getScore()+100);

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