const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.jumping = true;
        this.lastKey
    }

    draw() {
        c.fillStyle = "blue";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity

    }

    jump() {
        if (!this.jumping) {
            this.jumping = true
            this.velocity.y = -20;
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.height, canvas.width);
    player.update();

    if(Math.floor(player.position.y + player.height) === canvas.height) {
        player.jumping = false
    }

    if(keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -10;
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 10;
    } else {
        player.velocity.x = 0;
    }

}

animate()

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "a":
            keys.a.pressed = true;
            return player.lastKey = "a";
        case "s":
            keys.a.pressed = true;
            return player.lastKey = "s";
        case "d":
            keys.d.pressed = true;
            return player.lastKey = "d";
        case "w":
            player.jump()
            break;
    }
})

window.addEventListener("keyup", (e) => {
    switch(e.key) {
        case "d":
            keys.d.pressed = false;
            return player.lastKey = "a";
        case "a":
            keys.a.pressed = false;
            return player.lastKey = "d"
    }
})