// following this awesome tutorial
//http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function() {
    backgroundReady = true;
}
backgroundImage.src = "gamey/board.png";

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

// reset the game when the player catches a monster
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
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
    //ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseAlign = "top";
    ctx.fillText("Monster cats caught: " + monstersCaught, 32, 32);
};

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
