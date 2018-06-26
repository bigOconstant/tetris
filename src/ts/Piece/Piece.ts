export class Piece{
      color:string;
      left:number;
      top:number;
      empty:boolean;
      IsMainBoard:boolean;
      constructor(color:string,left:number,top:number,IsMainBoard:boolean){
          this.color = color;
          this.left = left;
          this.top = top;
          this.IsMainBoard = IsMainBoard;
      }

      draw(ctx:any,offset:number){
        var top = 140;  
        if(this.IsMainBoard){
              top = 60;
        }
         // this.left = offset;
         ctx.fillStyle = this.color;
         ctx.fillRect(this.left +2 + offset, this.top+2 + top, 38, 38);
      }
}
