'use client';

import GameComponent from './GameComponent';

let myGamePiece: GameComponent | null = null;
let myObstacles: GameComponent[] = [];
let interval: NodeJS.Timer | null = null;
let canvas: HTMLCanvasElement | null = null;
let canvasContext: CanvasRenderingContext2D | null = null;
let frameNo: number = 0;
let eventListeners: any = {};
let lastFrameUpdate: number | null = null;
let previewTimeout: NodeJS.Timeout | null = null;

const initGameState = () => {
    if (!canvas || !canvasContext) return;
    myGamePiece = new GameComponent(canvas, canvasContext, 30, 30, "red", 10, 120, 'rect');
    myGamePiece.gravity = 0.05;
    frameNo = 0;
    myObstacles = [];
    updateGameArea();
};

export const initGame = (targetCanvas: HTMLCanvasElement, listeners: any) => {
    canvas = targetCanvas;
    eventListeners = listeners;
    canvasContext = canvas?.getContext("2d");
    initGameState();
    
    // Start a preview animation for 2 seconds
    startGame();
    previewTimeout = setTimeout(() => {
        pauseGame();
        if (eventListeners.onGameInitialized) {
            eventListeners.onGameInitialized();
        }
    }, 2000);
};

const isGameStarted = () => {
    return interval;
};

const runGame = () => {
    if (!updateGameArea()) {
        stopGame();
    }
};

const startThread = () => {
    interval = setInterval(runGame, 20);
};

const stopThread = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    if (previewTimeout) {
        clearTimeout(previewTimeout);
        previewTimeout = null;
    }
};

export const stopGame = () => {
    stopThread();
    if (eventListeners.onGameStopped) {
        eventListeners.onGameStopped();
    }
};

export const pauseGame = () => {
    stopThread();
    if (eventListeners.onGamePaused) {
        eventListeners.onGamePaused();
    }
};

export const startGame = () => {
    stopThread();
    initGameState();
    startThread();
    if (eventListeners.onGameRunning) {
        eventListeners.onGameRunning();
    }
};

export const resumeGame = () => {
    stopThread();
    startThread();
    if (eventListeners.onGameRunning) {
        eventListeners.onGameRunning();
    }
};

const clearGame = () => {
    if (canvas && canvasContext) {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
};

const shouldUpdate = (period: number) => {
    const now = new Date().getTime();
    if (lastFrameUpdate === null || (now - lastFrameUpdate) > period) {
        lastFrameUpdate = now;
        return true;
    }
    return false;
};

const everyinterval = (n: number) => {
    return (frameNo / n) % 1 === 0;
};

const updateGameArea = () => {
    if (!canvas || !canvasContext || !myGamePiece) {
        return false;
    }

    for (let i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return false;
        }
    }

    clearGame();
    frameNo += 1;

    if (frameNo === 1 || everyinterval(150)) {
        const x = canvas.width;
        const minHeight = 20;
        const maxHeight = 200;
        const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        const minGap = 50;
        const maxGap = 200;
        const gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        
        myObstacles.push(new GameComponent(canvas, canvasContext, 10, height, "green", x, 0, "rect"));
        myObstacles.push(new GameComponent(canvas, canvasContext, 10, x - height - gap, "green", x, height + gap, "rect"));
    }

    for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    if (shouldUpdate(500)) {
        eventListeners.onFrameNo(frameNo);
    }

    myGamePiece.update();
    return true;
};

export const speedUp = () => {
    if (myGamePiece) {
        myGamePiece.moveSpeed++;
        if (eventListeners.onSpeedChanges) {
            eventListeners.onSpeedChanges(myGamePiece.moveSpeed);
        }
    }
};

export const speedDown = () => {
    if (myGamePiece) {
        myGamePiece.moveSpeed--;
        if (eventListeners.onSpeedChanges) {
            eventListeners.onSpeedChanges(myGamePiece.moveSpeed);
        }
    }
};

export const accelerate = (n: number) => {
    if (myGamePiece) {
        myGamePiece.gravity = n;
    }
};

export const onUpButtonPressed = () => {
    if (myGamePiece) {
        myGamePiece.moveUp();
        if (!isGameStarted()) {
            updateGameArea();
        }
    }
};

export const onDownButtonPressed = () => {
    if (myGamePiece) {
        myGamePiece.moveDown();
        if (!isGameStarted()) {
            updateGameArea();
        }
    }
};

export const onRightButtonPressed = () => {
    if (myGamePiece) {
        myGamePiece.moveRight();
        if (!isGameStarted()) {
            updateGameArea();
        }
    }
};

export const onLeftButtonPressed = () => {
    if (myGamePiece) {
        myGamePiece.moveLeft();
        if (!isGameStarted()) {
            updateGameArea();
        }
    }
};