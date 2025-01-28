'use client';

export default class GameComponent {    
    type: string;
    score: number;
    width: number;
    height: number;
    speedX: number;
    speedY: number;
    x: number;
    y: number;
    gravity: number;
    moveSpeed: number;
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    color: string;
    text: string = '';
    
    constructor(
        canvas: HTMLCanvasElement,
        canvasContext: CanvasRenderingContext2D,
        width: number,
        height: number,
        color: string,
        x: number,
        y: number,
        type: string
    ) {          
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.moveSpeed = 30;
        this.canvas = canvas;
        this.canvasContext = canvasContext;
        this.color = color;
    }

    update() {
        const ctx = this.canvasContext;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    newPos() {
        this.moveSpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.moveSpeed;
        this.hitBottom();
    }

    moveUp() {
        this.y -= this.moveSpeed;
        if (this.y < 0) {
            this.y = 0;
        }
    }

    moveDown() {
        this.y += this.moveSpeed;
        const rockbottom = this.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }

    moveRight() {
        this.x += this.moveSpeed;
        const rockbottom = this.canvas.width - this.width;
        if (this.x > rockbottom) {
            this.x = rockbottom;
        }
    }

    moveLeft() {
        this.x -= this.moveSpeed;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    hitBottom() {
        const rockbottom = this.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.moveSpeed = 1;
        }
    }

    crashWith(otherobj: GameComponent) {
        const myleft = this.x;
        const myright = this.x + this.width;
        const mytop = this.y;
        const mybottom = this.y + this.height;
        const otherleft = otherobj.x;
        const otherright = otherobj.x + otherobj.width;
        const othertop = otherobj.y;
        const otherbottom = otherobj.y + otherobj.height;
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}