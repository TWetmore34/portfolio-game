// DECLARE CANVAS VARIABLES
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

// CLASS DECLARATIONS - sprite is for the player, floor the room, and doors the doors.
class Map {
    constructor(){
        this.currentLocation = new Floor({color:"blue", [new Door({})]});
    }
}
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

class Floor {
    constructor({ color, doors }) {
        // will eventually become a sprite of some kind?
        this.color = color
        this.doors = doors || []
    }
    createDoor(position, nextRoom, prevRoom) {
        const newDoor = new Door({room: this, position, nextRoom, prevRoom })
        this.doors.push(newDoor)
    }

    draw(){
        for (let i = 0; i < this.doors.length; i++) {
            this.doors[i].draw()
        }
    }

    handleDoors() {
        for (let door of this.doors){
            console.log(door, player)
            if(player.width + player.position.x >= door.position.x 
                && player.position.x <= door.position.x + door.width
                && player.position.y + player.height >= door.position.y
                && player.position.y <= door.position.y + door.height
                ) {
                    door.travel()
                    return true;
                }
        }
        return false;
    }
}

class Door {
    constructor({ room, position, nextRoom, prevRoom }) {
        // doors will act as linked lists. means we might have to flip doors on interactions?
        this.room = room;
        this.position = position;
        this.nextRoom = new Floor({color: "yellow"}) || null;
        this.prevRoom = prevRoom || null;
        this.width = 100;
        this.height = 150;
        this.color = "yellow";
    }

    travel() {
        let temp = this.room;
        this.room = this.nextRoom;
        testRoom = this.nextRoom;
        this.prevRoom = temp;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// CLASSES INSTANTIATED ==> SHOULD CREATE EXTRA ROOMS AS WELL!
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

let testRoom = new Floor({color: "red"});

testRoom.createDoor({
    x: 450,
    y: canvas.height - 150,
})

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
    c.fillStyle = testRoom.color;
    c.fillRect(0, 0, canvas.width, canvas.height);

    testRoom.draw();
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
        case "Enter":
            if(testRoom.handleDoors()){
                console.log("door found")
            }
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
