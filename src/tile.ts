import { Position } from "./position";

export class Tile 
{
    tileType: TileType;
    display: string;
    flagged: boolean;

    surroundedBombs:number;

    constructor()
    {
        this.tileType = TileType.Empty; 
    }

    public setType(tt:TileType)
    {
        this.tileType = tt;
    }

    public setSurroundedBombs(bombs:number)
    {
        this.surroundedBombs = bombs;
    }

    public getRegion() : Position {
        const regions = new Map<Number, Position>([
            [TileType.Empty, new Position(2,53)],
            [TileType.PressedEmpty, new Position(19,53)],
            [TileType.Bomb, new Position(87,53)],
            [TileType.PressedBomb, new Position(104,53)],
            [Graphics.Flag, new Position(36,53)],
            [Graphics.N1, new Position(2, 70)],
            [Graphics.N2, new Position(19, 70)],
            [Graphics.N3, new Position(36, 70)],
            [Graphics.N4, new Position(53, 70)],
            [Graphics.N5, new Position(70, 70)],
            [Graphics.N6, new Position(87, 70)],
            [Graphics.N7, new Position(104, 70)],
            [Graphics.N8, new Position(121, 70)],

        ]) ;

        switch(this.tileType)
        {
            case TileType.PressedEmpty:
                if(this.surroundedBombs == 0) return regions.get(TileType.PressedEmpty);
                return regions.get(Graphics.N1 + (1 * this.surroundedBombs - 1));
            case TileType.ExposedBomb:
                return regions.get(TileType.PressedBomb);
            default:
                if(this.flagged) return regions.get(Graphics.Flag);
                return regions.get(TileType.Empty);
        }
    }

    public draw(canvas:CanvasRenderingContext2D, spritesheet:HTMLImageElement, 
        x:number,y:number)
    {
        let region = this.getRegion();

        canvas.drawImage(spritesheet, region.x,region.y,16,16,x,y,16,16);

    }

    public toggleFlag() 
    {
        if(this.tileType == TileType.PressedEmpty || this.tileType == TileType.PressedBomb
            || this.tileType == TileType.ExposedBomb) return;

        this.flagged = !this.flagged;
    }
}

export enum TileType {
    Empty = 0,
    PressedEmpty,
    ExposedBomb,
    Bomb,
    PressedBomb,
}

enum Graphics {
    Flag = 999,
    N1, N2, N3, N4, N5, N6, N7, N8,
}