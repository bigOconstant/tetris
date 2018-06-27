export class GameService {
    private static _instance:GameService = new GameService();

    private _score:number = 0;
    private _NextShape:string = "";
    private _NextColor:string = "";

    constructor(){
        if(GameService._instance){
            throw new Error("Error: Instantiation failed: Use GameService.getInstance() instaed of new.")
        }
        GameService._instance = this;
    }
    public static getInstance():GameService
    {
        return GameService._instance;
    }
    
    public setScore(value:number):void
    {
        this._score = value;
    }

    public getScore():number{
        return this._score;
    }
    
    public setNextShape(value:string):void
    {
        this._NextShape = value;
    }

    public getNextShape():string
    {
        return this._NextShape;
    }

    public getColor():string
    {
        return this._NextColor;
    }

    public setColor(value:string):void
    {
        this._NextColor = value;
    }

}