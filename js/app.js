const grid ={
    width: 101,
    height: 83,
    row_min: 0,
    row_max: 5,
    col_count: 5,
    col_min: 0,
    col_max: 4
};
const playerInitPos = {
    x: 2,
    y: 5
};
// Enemies our player must avoid
class Char{
    constructor(imageURL, initX, initY) {
        this.sprite = imageURL;
        this.x = initX;
        this.y = initY;
    }

    updateImage(imageURL) {
        this.sprite = imageURL;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x*grid.width, this.y*grid.height);
    }
};

class Enemy extends Char{
    constructor(x, y, speed) {
        super('images/enemy-bug.png', x, y);
        this.speed = speed;
    }

    update(dt) {
        this.x = (this.x + this.speed * dt) % grid.col_count;
    }
};

class Player extends Char{
    constructor() {
        super('images/char-boy.png', playerInitPos.x, playerInitPos.y);
    }
    update(dt) {
    }
    handleInput(keycode) {
        if (keycode == 'left') {
            if (this.x > grid.col_min) {
                this.x--;
            }
        } else if (keycode == 'right') {
            if (this.x < grid.col_max) {
                this.x++;
            }
        } else if (keycode == 'up') {
            if (this.y > grid.row_min) {
                this.y--;
            }
        } else {
            if (this.y < grid.row_max) {
                this.y++;
            }
        }
        console.log(keycode);
    }
}
/*
var Char = function(imageURL) {
    this.sprite = imageURL;
};

Char.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Char.call(this,'images/enemy-bug.png');
};

Enemy.prototype = Object.create(Char.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Char.call(this,'images/char-boy.png');
};

Player.prototype = Object.create(Char.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Player.prototype.handleInput = function(keycode) {
    console.log(keycode);
};
*/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (count=0; count < 3; count++) {
    var speed = Math.random() * 2 + 0.5;
    var x = Math.random() * grid.col_count;
    allEnemies.push(new Enemy(x, count + 1, speed));
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

updateCharacter = function() {
    var doc = document.getElementById("charselect");
    console.log(doc.options[doc.selectedIndex].value);
    player.updateImage(doc.options[doc.selectedIndex].value);
    doc.blur();
}