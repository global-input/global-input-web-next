'use client';

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useMobile } from '@/lib/global-input-mobile';
import * as game from "../game";

export * from '@/lib/global-input-mobile';

const FIELDS = {
    status: {
        id: "gameStatus",
        type: "info",
        value: " ",
    },
    score: {
        id: "score",
        type: "info",
        value: " ",
    },
    up: {
        id: "upButton",
        type: "button",
        icon: "up",
        viewId: "row1",
        operations: { onInput: game.onUpButtonPressed }
    },
    left: {
        id: "leftButton",
        type: "button",
        icon: "left",
        viewId: "row2",
        operations: { onInput: game.onLeftButtonPressed }
    },
    right: {
        id: "rightButton",
        type: "button",
        icon: "right",
        viewId: "row2",
        operations: { onInput: game.onRightButtonPressed }
    },
    down: {
        id: "downButton",
        type: "button",
        icon: "down",
        viewId: "row3",
        operations: { onInput: game.onDownButtonPressed }
    },
    speed: {
        id: "speedDown",
        type: "button",
        label: "Speed Down",
        iconText: {
            content: "-",
            style: { fontSize: 36 },
        },
        style: {
            borderColor: "green",
            paddingRight: 10
        },
        viewId: "row4",
        operations: { onInput: game.speedDown }
    },
    speedText: {
        id: "speed-text",
        type: "info",
        value: { type: "text", content: "30" },
        viewId: "row4",
    },
    speedUp: {
        id: "speedUp",
        type: "button",
        label: "Speed Up",
        style: { borderColor: "green" },
        iconText: {
            content: "+",
            style: {
                fontSize: 36,
            }
        },
        viewId: "row4",
        operations: { onInput: game.speedUp }
    },
    startPause: {
        id: "startPauseButton",
        type: "button",
        value: 0,
        label: "row5",
        options: [
            { value: 0, label: "Start", icon: "play" },
            { value: 1, label: "Pause", icon: "pause" },
            { value: 2, label: "Resume", icon: "play" }
        ],
        viewId: "footer",
        operations: {
            onInput: value => {
                switch (value) {
                    case 0: game.startGame(); break;
                    case 1: game.pauseGame(); break;
                    case 2: game.resumeGame(); break;
                }
            }
        }
    },
    home:{
        id: 'back-to-website-home',
        type: 'button',
        label: 'Back to Home',
        viewId: "row5",
        icon: 'home',
        style: {
            backgroundColor: 'rgb(220,220,220)'
        },
        operations: {
            onInput: () => {    
                console.log('back to home');
            }
        }
    }
};

const initData = {
    id: 'game-controller',
    form: {
        title: "Mobile Control Example",
        views: {
            viewIds: {
                row2: {
                    style: {
                        justifyContent: "space-between",
                        width: "100%",
                        maxWidth: 300,
                    }
                },
                row4: {
                    style: {
                        justifyContent: "space-between",
                        width: "100%",
                        maxWidth: 300,
                    }
                },
                row5: {
                    style: {
                        justifyContent: "center",
                        width: "100%",
                    }
                }
            }
        },
        fields: Object.values(FIELDS)
    }
    
    
};

export const useConnectMobile = () => {
    const router = useRouter();    
    const [score, setScore] = useState(0);
    const mobile = useMobile(initData, true);

    const setMoveSpeed = (speed: number) => {
        const speedValue = {
            type: "text",
            content: speed
        };
        mobile.sendValue(FIELDS.speedText.id, speedValue);
    };

    const homeField = initData.form.fields.find(field => field.id === FIELDS.home.id);
    if(homeField && 'operations' in homeField) {
        homeField.operations.onInput = () => {
            router.push('/');
        };
    }

    const setGameStatus = (message: string) => {
        const statusValue = {
            type: "view",
            style: {
                color: 'red'
            },
            content: message
        };
        mobile.sendValue(FIELDS.status.id, statusValue);
    };

    const onGameRunning = () => {
        mobile.sendValue(FIELDS.startPause.id, FIELDS.startPause.options[1].value);
        setGameStatus('Game Started');
    };

    const onGameStopped = () => {
        mobile.sendValue(FIELDS.startPause.id, FIELDS.startPause.options[0].value);
        setGameStatus('Game Over');
    };

    const onGamePaused = () => {
        mobile.sendValue(FIELDS.startPause.id, FIELDS.startPause.options[2].value);
        setGameStatus('Game Paused');
    };

    const onGameInitialized = () => {
        setGameStatus('Ready to Play');
    };

    const onSpeedChanges = (moveSpeed: number) => {
        setMoveSpeed(moveSpeed);
    };

    const onFrameNo = (frameNo: number) => {
        setScore(frameNo);
        mobile.sendValue(FIELDS.score.id, `Score:${frameNo}`);
    };

    const listeners = {
        onGameRunning,
        onGameStopped,
        onGamePaused,
        onGameInitialized,
        onSpeedChanges,
        onFrameNo
    };

    return { mobile, listeners };
};