import { Grid, spritesheet } from "./grid";

const cols = 25, rows = 15, bombs = 70, tileWidth = 16,tileHeight=16;
let context:CanvasRenderingContext2D, grid:Grid, canvas;
let offsetLeft, offsetTop;

function startGame() {
    let d = document.getElementById("game");
    d.innerHTML = "";

    canvas = document.createElement("canvas");
    canvas.width = cols * tileWidth;
    canvas.height = rows * tileHeight;
    canvas.id = "balls";

    let x = <HTMLElement>d.appendChild(canvas);

    let rect = x.getBoundingClientRect();
    offsetLeft = rect.left;
    offsetTop = rect.top;

    x.onclick = click;
    x.onmousemove = mouseMove;
    x.oncontextmenu = function(ev) {
        let e = <MouseEvent> ev;
        click(e);
        return false;
    }

    grid = new Grid(canvas.width, canvas.height, tileWidth, tileHeight, rows, cols);

    grid.makeGrid();
    grid.addBombs(bombs);
    context = (<HTMLCanvasElement>document.getElementById("balls")).getContext("2d");
    draw();
}

function click(ev:MouseEvent)
{
    let isRightMouse:boolean = false;
    isRightMouse = ev.which == 3;

    console.log(ev.which);
    
    grid.click(ev.clientX, ev.clientY, offsetTop, offsetLeft, isRightMouse);
    draw();

    ev.cancelBubble = true;
    return false;
}

function mouseMove(ev:MouseEvent)
{
    // do nothing yet
}

function draw()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    grid.drawGrid(context);
}


document.getElementById("close").onclick = close;
function close() {
    document.body.innerHTML = "";
}

spritesheet.onload = function () {
    startGame();
}

// handle thingy

let handle = document.getElementById("handle");
let window98 = <HTMLElement>document.querySelector(".window");
let windowpos = {x:5,y:5};
window98.style.left = windowpos.x + "px";
window98.style.top = windowpos.y + "px";

let moving:boolean = false;

let lastMousePosition = {x: 0, y:0};

handle.onmousedown = function() {
    moving = true;
    return true;
}

window.onmousemove = function(ev) {

    if(!moving) {
        lastMousePosition = {
            x: ev.clientX,
            y: ev.clientY
        };
        return true;
    }
    let mousedelta = {x: ev.clientX - lastMousePosition.x,
    y: ev.clientY - lastMousePosition.y};

    console.log(mousedelta);

    lastMousePosition = {x:ev.clientX, y:ev.clientY};

    windowpos.x += mousedelta.x;
    windowpos.y += mousedelta.y;

    offsetLeft += mousedelta.x;
    offsetTop += mousedelta.y;

    window98.style.left = windowpos.x + "px";
    window98.style.top = windowpos.y + "px";
}

window.onmouseup = function() {
    moving = false;
    return true;
}