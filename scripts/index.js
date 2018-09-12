var cols = 15, rows = 10, bombs = 10;
function startGame() {
    document.body.innerHTML = "";
    var canvas = document.createElement("canvas");
    canvas.width = cols * 8;
    canvas.height = rows * 8;
    var grid = new Grid(canvas.width, canvas.height, 8, 8, rows, cols);
    grid.makeGrid();
}
//# sourceMappingURL=index.js.map