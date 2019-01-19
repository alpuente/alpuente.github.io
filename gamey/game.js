// following this awesome tutorial
//http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 680;
document.body.appendChild(canvas);

var boardNum = 2; // keep track of what background image is being used
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundReady = true;
}
backgroundImage.src = "gamey/board2.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
};
heroImage.src = "gamey/cat1.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
    monsterReady = true;
}
monsterImage.src = "gamey/cat2.png";

// game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0, 
    y: 0 
};

var monster = {
    x: 0,
    y: 0
};

var monstersCaught = 0;

// handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false); 

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// reset the game when the player catches a kitty
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // throw the kitty somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 264));
};

// update game objects
var update = function (modifier) {
    if (38 in keysDown) { // player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // player holding right
        hero.x += hero.speed * modifier;
    }
    
    // are they touching
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
    
    if (isKittyOutOfRange()) {
        changeBoardSrc();    
        updateKittyLocation();
    }
};

// draw the stuff!
var render = function () {
    if (backgroundReady) {
        ctx.drawImage(backgroundImage, 0, 0);
    }
    
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    
    // score
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseAlign = "top";
    // draw white rectangle for the score box
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 480, 512, 200);
    // set color for score words
    if (boardNum == 1) {	
        ctx.fillStyle = "rgb(75, 0, 130)";
    } else if (boardNum == 2) {
        ctx.fillStyle = "rgb(255, 127, 80)";
    }
    ctx.fillText("Kitties caught: " + monstersCaught, 165, 510);
};

// is the hero kitty within the bounds of the board?
var isKittyOutOfRange = function () {
    if (hero.x <= 0 || hero.x >= 512) {
        return true;
    } else if (hero.y <= 0 || hero.y >= 480) {
        return true;
    } else {
        return false;
    }
}

// checks what the current board is and switches it
// to a different one
var changeBoardSrc = function () {
    if (boardNum == 1) {
        console.log("board");
        backgroundImage.src = "gamey/board2.png";
        boardNum = 2;
    } else if (boardNum == 2) {
        console.log("board2");
        backgroundImage.src = "gamey/board.png";
        boardNum = 1;
    }
}

// move hero kitty to opposite position in board
var updateKittyLocation = function () {
    if (hero.x <= 0) {
        hero.x = (hero.x + 512) - 32;
    } else if (hero.x >= 512) {
        hero.x = (hero.x - 512) + 32;
    } else if (hero.y <= 0) {
        hero.y = (hero.y + 480) - 32;
    } else if (hero.y >= 480) {
        hero.y = (hero.y - 480) + 32;
    }
}

// main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    
    update(delta / 1000);
    render();
    
    then = now;
    
    // request to do this again ASAP
    requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
