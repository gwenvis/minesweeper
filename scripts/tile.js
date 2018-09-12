var Tile = /** @class */ (function () {
    function Tile() {
        this.tileType = TileType.Empty;
    }
    Tile.prototype.setType = function (tt) {
        this.tileType = tt;
    };
    Tile.prototype.toggleFlag = function () {
        if (this.tileType == TileType.PressedEmpty || this.tileType == TileType.PressedBomb)
            return;
        this.flagged = !this.flagged;
    };
    return Tile;
}());
var TileType;
(function (TileType) {
    TileType[TileType["Empty"] = 0] = "Empty";
    TileType[TileType["PressedEmpty"] = 1] = "PressedEmpty";
    TileType[TileType["Bomb"] = 2] = "Bomb";
    TileType[TileType["PressedBomb"] = 3] = "PressedBomb";
})(TileType || (TileType = {}));
//# sourceMappingURL=tile.js.map