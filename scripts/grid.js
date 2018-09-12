var Grid = /** @class */ (function () {
    function Grid(width, height, tileWidth, tileHeight, rows, cols) {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.rows = rows;
        this.cols = cols;
    }
    Grid.prototype.makeGrid = function () {
        for (var i = 0; i < this.cols * this.rows; i++) {
            this.tiles[i] = new Tile();
        }
    };
    Grid.prototype.addBombs = function (bombAmount) {
        var bombsLeft = bombAmount;
        while (bombsLeft > 0) {
        }
    };
    Grid.prototype.getTile = function (x, y) {
        var index = x / this.cols + y / this.rows * this.cols;
        return this.tiles[index];
    };
    return Grid;
}());
//# sourceMappingURL=grid.js.map