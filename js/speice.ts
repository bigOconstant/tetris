class Speace {
    // ctx:any;
    color:string;
    left:number;
    top:number;
    empty:boolean;
    constructor(color:string,left:number,top:number){
        this.color = color;
        this.left = left;
        this.top = top;
    }
    draw(ctx:any,offset:number){
       // this.left = offset;
       ctx.fillStyle = this.color;
       ctx.fillRect(this.left +2 + offset, this.top+2 + 60, 38, 38);
    }
}