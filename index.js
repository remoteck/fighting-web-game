const canvas = document.querySelector('canvas');
const contextCanvas = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

contextCanvas.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    draw() {
        contextCanvas.fillStyle = 'red';
        contextCanvas.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
});

const enemy = new Sprite({
    position: {
        x: 974,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

function animate() {
    window.requestAnimationFrame(animate);
    contextCanvas.fillStyle = '#000';
    contextCanvas.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x = 0;

    if (keys.a.pressed) {
        player.velocity.x = -1;
    } else if (keys.d.pressed) {
        player.velocity.x = 1;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
    }
    console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
    console.log(event.key);
});
