/*var bgElemenet = document.getElementById("main-div")
var mainElem = bgElemenet.animate(
    [
        {trnsform: 'translate(100%,0)'},
        {transform: 'translate(-100%,0)'}
    ],{
        duration: 5000,
        iterations: Infinity
        /!*playbackRate: -4*!/
    });*/

var firemenElemenet = document.getElementById("fireman-div")

var firemanInAnimation = firemenElemenet.animate(
    [
        {trnsform: 'translate(0,0)'},
        {trnsform: 'translate(80%,0)'}
    ],{
        duration: 3000,
        iterations: Infinity
});


var myGamePiece;
var myBackground;

function startGame() {
    myGamePiece = new component(300, 100, "cloud.png", 0, 20, "image");
    myBackground = new component(600, 320, "bg1.bmp", 0, 0, "background");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image,
                    this.x + this.width,
                    this.y,
                    this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function move(dir) {
    myGamePiece.image.src = "cloud.png";
    if (dir == "up") {myGamePiece.speedY = -1; }
    if (dir == "down") {myGamePiece.speedY = 1; }
    if (dir == "left") {myGamePiece.speedX = -1; }
    if (dir == "right") {myGamePiece.speedX = 1; }
}

function clearmove() {
    myGamePiece.image.src = "cloud.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}