const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth - 1;
    canvas.height = window.innerHeight - 100;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Paddle {
    constructor() {
        this.h = 40;
        this.w = 200;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - this.h;
        this.vector = 0;
        this.maxSpeed = 200;
        this.acceleration = 5;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    changeDirection(e) {
        if (e.repeat) return;
        if (e.code == "Space") {
            start = true;
        }
        if (e.type == "keyup") keys = [];
        else if (e.key == "ArrowLeft" || e.key == "ArrowRight") {
            keys.push(e.key);
        }
    }

    move(dt) {
        if (keys.length > 0) {
            if (keys[keys.length - 1] == "ArrowLeft") this.vector = Math.max(-this.maxSpeed, this.vector - this.acceleration);
            if (keys[keys.length - 1] == "ArrowRight") this.vector = Math.min(this.maxSpeed, this.vector + this.acceleration);
        } else {
            if (this.vector > 0) this.vector = Math.max(this.vector - this.acceleration, 0);
            else if (this.vector < 0) this.vector = Math.min(this.vector + this.acceleration, 0);
        }
        if (this.vector == 0) return;
        this.x += this.vector * dt;

        this.checkColisions();
    }

    checkColisions() {
        if (this.x + this.w >= canvas.width) {
            this.vector = 0;
            this.x = canvas.width - this.w;
        }
        else if (this.x <= 0) {
            this.vector = 0;
            this.x = 0;
        }

        //play sound
    }
}

class Ball {
    constructor() {
        this.r = 15;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2 - 50;
        this.vector = [0, 0];
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    move(dt) {
        this.x += this.vector[0] * dt;
        this.y += this.vector[1] * dt;

        this.checkColisions();
    }

    checkColisions() {
        if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
            this.vector[0] = - this.vector[0];
            wallSound.play();
        }
        if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
            this.vector = [0, 0];
            if (this.x > canvas.width / 2 - 150 + 1 - 400 && this.x < canvas.width / 2 + 150 + 1 - 400) {
                window.location.href = document.querySelector("header a:nth-of-type(1)").getAttribute("href");
            } else if (this.x > canvas.width / 2 - 150 + 1 && this.x < canvas.width / 2 + 150 + 1) {
                window.location.href = document.querySelector("header a:nth-of-type(2)").getAttribute("href");
            } else if (this.x > canvas.width / 2 - 150 + 1 + 400 && this.x < canvas.width / 2 + 150 + 1 + 400) {
                window.location.href = document.querySelector("header a:nth-of-type(3)").getAttribute("href");
            } else {
                setTimeout(() => {
                    this.x = canvas.width / 2;
                    this.y = canvas.height / 2 - 50;

                    setTimeout(() => { // make it go
                        this.vector[1] = 100;
                    }, 1000);
                }, 500)
            }
        }

        if (this.y + this.r >= paddle.y && this.x >= paddle.x && this.x <= paddle.x + paddle.w) {
            let relativeIntersect = -((paddle.x + (paddle.w / 2)) - this.x) / (paddle.w / 2);
            let bounceAngle = relativeIntersect * (Math.PI / 2);
            let speed = Math.sqrt(this.vector[0] ** 2 + this.vector[1] ** 2);

            this.vector[0] = speed * Math.sin(bounceAngle);
            this.vector[1] = - (speed * Math.cos(bounceAngle));
            this.y = paddle.y - this.r;
            paddleSound.play();
        }

        //play sound
    }
}

let start = false;
let startTextVisible = true;

let interval = setInterval(() => {
    startTextVisible = !startTextVisible;
}, 700);

let paddleSound = new Audio("./assets/paddle.mp3");
let wallSound = new Audio("./assets/wall.mp3");

let keys = [];
const paddle = new Paddle();
const ball = new Ball();
let oldTimeStamp = 0;
const textString = "PONG";
ctx.textAlign = "center";

window.addEventListener("keydown", paddle.changeDirection);
window.addEventListener("keyup", paddle.changeDirection);

let startLoopId = window.requestAnimationFrame(startLoop);

function startLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (startTextVisible) {
        ctx.fillStyle = "#FFF";
        ctx.font = `30px Retro`;
        ctx.fillText("Pro hru stiskni mezerník", canvas.width / 2, canvas.height / 2 + 200);
    }
    drawPONG();

    if (start) {
        window.cancelAnimationFrame(startLoopId);
        window.requestAnimationFrame(gameLoop);

        setTimeout(() => { // make it go
            ball.vector[1] = 100;
        }, 1000)
        return;
    }

    window.requestAnimationFrame(startLoop);
}

function gameLoop(timeStamp) {
    let dt = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    paddle.move(dt);
    ball.move(dt);
    draw();

    window.requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPONG();
    paddle.draw();
    ball.draw();
}

function drawPONG() {
    let size = 440;
    while (true) {
        ctx.font = `${size}px Retro`;
        let textWidth = ctx.measureText(textString).width;
        if (textWidth <= canvas.width) break;
        else size *= 0.8;
    }

    ctx.fillStyle = "#FFFFFF08";
    ctx.fillText("PONG", canvas.width / 2, canvas.height / 2 + 130);
}