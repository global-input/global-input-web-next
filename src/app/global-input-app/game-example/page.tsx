'use client';

import { useConnectMobile, ConnectWindow, ConnectButton } from './mobile-ui';
import { AppContainer, DisplayCanvas } from './components/pageElements';
import { ApplicationTopContainer } from '@/components/containers'  
import * as game from "./game";

export default function GameExample() {
    const { mobile, listeners } = useConnectMobile();

    const onCanvas = (canvas: HTMLCanvasElement) => {
        game.initGame(canvas, listeners);
    };

    return (
        <ApplicationTopContainer>
        <AppContainer>
            <ConnectButton mobile={mobile} />
            <ConnectWindow mobile={mobile} />
            <DisplayCanvas onCanvas={onCanvas} />
        </AppContainer>
        </ApplicationTopContainer>
    );
}