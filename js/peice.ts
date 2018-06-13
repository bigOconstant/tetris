

class Tpiece {

     kind: string;
     color: string;
     speiceList:Speace[];
     started:boolean;
     row:number;
     col:number;
     constructor(){
         //this.kind = kind;
         this.color = "rgb(19, 237, 11)";
         this.started = false;
         this.speiceList = [];
         this.row = 0;
         this.col = Math.floor((Math.random() * 10) + 0);
     }
     initPos(left:number,top:number){
         //start on Left Row
        
       // var peice = new Speace(this.color,left,top);
    
     }
     draw(boardmap:Speace[][],left:number){

     if(boardmap[this.row]
        && boardmap[this.row+1] 
        && boardmap[this.row+2] 
        && boardmap[this.row+3] )
        {

            if(boardmap[this.row-1]){
                boardmap[this.row -1][this.col].color = "rgb(66, 66, 66)";
            }


        boardmap[this.row][this.col].color = this.color;
        boardmap[this.row+1][this.col].color = this.color;
        boardmap[this.row+2][this.col].color = this.color;
        boardmap[this.row+3][this.col].color = this.color;
        }else if(!boardmap[this.row+3]){
            this.row = 0;
            this.col = Math.floor((Math.random() * 10) + 0);
        }
       
     }

     decr(){
         this.row = this.row + 1;
     }

    //  setcolor(){
    //      switch(this.kind){
    //         case "T":
    //             this.color = "rgb(11, 98, 237)";
    //             break;
    //         break;
    //         case "O":
    //             this.color = "rgb(19, 237, 11)";
    //             break;
    //         case "I":
    //             this.color = "rgb(237, 19, 11)";
    //             break;
    //         case "S":
    //             this.color = "rgb(245, 255, 66)";
    //             break;
    //         case "Z":
    //             this.color = "rgb(66, 255, 248)";
    //             break;
    //         case "J":
    //             this.color = "rgb(255, 66, 176)";
    //             break;
    //         case "L":
    //             this.color = "rgb(255, 154, 66)";
    //             break;
    //      }
    //  }



}