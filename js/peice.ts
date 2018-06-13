

class Tpiece {

     kind: string;
     color: string;
     speiceList:Speace[];
     started:boolean;
     row:number;
     col:number;
     flipped:boolean;
     constructor(){
         //this.kind = kind;
        this.initP();
     }
     initP(){
        this.color = "rgb(19, 237, 11)";
        this.flipped = Math.random() >= 0.5;
        this.started = false;
        this.speiceList = [];
        this.row = 0;
        
        this.generateType();
        this.setcolor();
        if(this.kind === "I" && !this.flipped){
        this.col = Math.floor((Math.random() * 6) + 0);
        }else {
           this.col = Math.floor((Math.random() * 6) + 0);
        }
     }
     initPos(left:number,top:number){
         //start on Left Row
        
       // var peice = new Speace(this.color,left,top);
    
     }

     generateType(){
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
     }

     draw(boardmap:Speace[][],left:number){
       // console.log(this.flipped);
            //Handle case stick
        if(this.kind === "I"){
            if(this.flipped){
              return  this.drawIFlipped(boardmap,left);
            }else if(!this.flipped){
               return  this.drawINotFlipped(boardmap,left);
            }
        }
     }

     drawIFlipped(boardmap:Speace[][],left:number){
            
            console.log("Draw flipped");
        
        
            if(boardmap[this.row]
            && boardmap[this.row+1] 
            && boardmap[this.row+2] 
            && boardmap[this.row+3] )
            {
              
                if(!boardmap[this.row  ][this.col].empty || !boardmap[this.row+1][this.col].empty
                    || !boardmap[this.row+2][this.col].empty || !boardmap[this.row+3][this.col].empty)//You lose{
                    {
                        console.log("I believe we have found a collision in the start");
                        // this.initP();
                        // return false;
                    }
    
                if(boardmap[this.row-1]){
                    boardmap[this.row -1][this.col].color = "rgb(66, 66, 66)";
                    boardmap[this.row -1][this.col].empty = true;
                }

                
               
    
            
                boardmap[this.row  ][this.col].color = this.color;
                boardmap[this.row  ][this.col].empty = false;

                boardmap[this.row+1][this.col].color = this.color;
                boardmap[this.row+1][this.col].empty = false;

                boardmap[this.row+2][this.col].color = this.color;
                boardmap[this.row+2][this.col].empty = false;
            
                boardmap[this.row+3][this.col].color = this.color;
                boardmap[this.row+3][this.col].empty = false;


                if(this.row < 15 && !boardmap[this.row+4][this.col].empty){
                    this.initP();
                    return true;
                    
                }
                return true;


            }else if(!boardmap[this.row+3]){
                this.row = 0;
                this.col = Math.floor((Math.random() * 10) + 0);
                this.initP();
                return true
            }
     }

     drawINotFlipped(boardmap:Speace[][],left:number){
       console.log("this.row:"+this.row," This.col:"+this.col);
       console.log(boardmap);

         

        if(boardmap[this.row][this.col]
            && boardmap[this.row][this.col+1] 
            && boardmap[this.row][this.col+2]  
            && boardmap[this.row][this.col+3]  )
            {
                if(!boardmap[this.row  ][this.col].empty || !boardmap[this.row][this.col+1].empty ||
                    !boardmap[this.row][this.col+2].empty || !boardmap[this.row][this.col+3].empty){
                        console.log("I believe we have found a collision in the start");
                        // this.initP();
                        // return false;
                    }
              
                if(boardmap[this.row-1]){
                    boardmap[this.row -1][this.col].color =   "rgb(66, 66, 66)";
                    boardmap[this.row -1][this.col].empty = true;

                    boardmap[this.row -1][this.col+1].color = "rgb(66, 66, 66)";
                    boardmap[this.row -1][this.col+1].empty = true;

                    boardmap[this.row -1][this.col+2].color = "rgb(66, 66, 66)";
                    boardmap[this.row -1][this.col+2].empty = true;
                    
                    
                    boardmap[this.row -1][this.col+3].color = "rgb(66, 66, 66)";
                    boardmap[this.row -1][this.col+3].empty = true;
                }


    
    
            boardmap[this.row  ][this.col].color = this.color;
            boardmap[this.row  ][this.col].empty = false;

            boardmap[this.row][this.col+1].color = this.color;
            boardmap[this.row][this.col+1].empty = false;
            
            boardmap[this.row][this.col+2].color = this.color;
            boardmap[this.row][this.col+2].empty = false;

            boardmap[this.row][this.col+3].color = this.color;
            boardmap[this.row][this.col+3].empty = false;


             for(var i = 0; i <4; ++i){
                if(this.row < 19 && !boardmap[this.row+1][this.col + i].empty){
                    this.row = 0;
                this.col = 0;
                    this.initP();
                    return true;
                }
             }
             return true;
  
            } if(!boardmap[this.row+1]){
               
                this.row = 0;
                this.col = 0;
                this.initP();
                return true;
            }
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
                this.color = "rgb(237, 19, 11)";
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



}