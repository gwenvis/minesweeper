import {Tile, TileType} from "./tile";
import {RandomGenerator} from "./random";

export const spritesheet = <HTMLImageElement>document.getElementById("spritesheet");

export class Grid 
{
    rows: number;
    cols: number;

    width: number;
    height: number;

    tileWidth: number;
    tileHeight: number;

    tiles : Tile[];

    gameRunning : boolean;

    constructor(width: number, height: number, tileWidth: number, tileHeight: number, rows:number, cols:number) 
    {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.rows = rows;
        this.cols = cols;

        this.gameRunning = true;
    }

    public makeGrid() 
    {
        this.tiles = [];

        for(let i = 0; i < this.cols * this.rows; i++)
        {
            this.tiles[i] = new Tile();
        }
    }

    lose(i:number) {
        this.tiles[i].setType(TileType.ExposedBomb);

        for(let j = 0; j < this.tiles.length; j++)
        {
            if(this.tiles[j].tileType == TileType.Bomb)
                this.tiles[j].setType(TileType.ExposedBomb);
        }

        this.gameRunning = false;
    }

    flag(which:number) 
    {
        this.tiles[which].toggleFlag();
    }

    public click(x:number, y:number, offsetTop:number, offsetLeft:number, isRightMouse:boolean)
    {
        if(!this.gameRunning) return;

        y = y - offsetTop;
        x = x - offsetLeft;
        
        y = Math.floor(y/this.tileHeight);
        x = Math.floor(x/this.tileWidth);

        let i = x + y*this.cols;

        if(isRightMouse)
        {
            this.flag(i);
            return;
        }

        if(this.tiles[i].tileType == TileType.Bomb) {
            this.lose(i);
            return;
        }

        if(this.tiles[i].flagged) return;

        this.floodFill(x,y);
    }

    public floodFill(i:number, j:number)
    {
        if(i < 0 || i >= this.cols || j < 0 || j >= this.rows) return;

        let o = i + j*this.cols;

        let tileType = this.tiles[o].tileType;
        switch(tileType)
        {
            case TileType.Bomb:
            case TileType.PressedBomb:
            case TileType.PressedEmpty:
            return;
        }

        this.tiles[o].setType(TileType.PressedEmpty);

        let bombs = this.neighborBombs(i,j, true);
        this.tiles[o].setSurroundedBombs(this.neighborBombs(i,j));

        if(bombs != 0) return;

        const neighbors = [
            [-1,-1], [0, -1], [1, -1],
            [-1, 0],          [1, 0 ],
            [-1, 1], [0, 1 ], [1, 1 ],
        ];

        for(let index = 0; index < neighbors.length; index++)
        {
            this.floodFill(i+neighbors[index][0], j+neighbors[index][1]);
        }
    }

    neighborBombs(i:number, j:number, eightdirections:boolean = true):number
    {
        let neighbors = [
            [0, -1], 
            [-1, 0],          [1, 0 ],
             [0, 1 ], 
        ];

        if(eightdirections)
        {
            const otherdirections = [
                [-1,-1], [1, -1],
                          
                [-1, 1], [1, 1 ],
            ];

            neighbors = neighbors.concat(otherdirections);
        }
        
        let bombs:number = 0;

        for(let x = 0; x < neighbors.length; x++)
        {
            let _i = i - neighbors[x][0],
                _j = j - neighbors[x][1];

            if(_i < 0 || _i >= this.cols || _j < 0 || _j >= this.rows) continue;

            let xx = _i + _j*this.cols;

            if(this.tiles[xx].tileType == TileType.Bomb) 
                bombs++;
        }

        return bombs;
    }

    neighborBombsIndex(i: number)
    {
        let x = i % this.rows;
        let y = Math.floor(i / this.rows);

        return this.neighborBombs(x,y);
    }

    public addBombs(bombAmount:number) 
    {   
        let bombsLeft:number = bombAmount;

        while(bombsLeft > 0)
        {
            let random = RandomGenerator.RangeInt(0,this.tiles.length-1);
            if(this.tiles[random].tileType == TileType.Bomb) continue;

            // if a bomb is next to it, 50/50 chance for it to try a different location.
            if(this.neighborBombsIndex(random) != 0 && RandomGenerator.RangeInt(0,1) == 1)
                continue;

            this.tiles[random].setType(TileType.Bomb);
            bombsLeft--;
        }
    }

    public drawGrid(context:CanvasRenderingContext2D)
    {
        for(let i = 0; i < this.tiles.length; i++)
        {
            let x = i % this.cols;
            let y = Math.floor(i / this.cols);

            this.tiles[i].draw(context,spritesheet,x*this.tileWidth,y*this.tileHeight);
        }
    }

    public getTile(x:number, y:number)
    {
        let index = x/this.cols + y/this.rows * this.cols;
        return this.tiles[index];
    }
}