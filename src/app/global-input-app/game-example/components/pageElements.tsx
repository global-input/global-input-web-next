'use client';

import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const SourceLinkElement=styled.a`
    color: #153E85;
    font-weight: 100;
    font-family: Georgia, Times, Serif;
    font-size: 8px;
    float:right;

    @media screen and (min-height:150px){
        font-size:12px;
    }
    @media screen and (min-height:400px){
        font-size:16px;
    }
   @media print{
       display:none;
   }
    `;

    export const AppTitle=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    color: #445566;
    font-family: Georgia, Times, Serif;


    @media screen and (min-height:150px){
        font-size:26px;
    }

    @media screen and (min-height:400px){
        font-size:32px;
        margin-bottom:10px;
    }
    @media print{
        display:none;
    }
},`;

export const AppContent=styled.div`
    width:95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px;
    flex:1;
`;
export const AppBody=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:10px;
    flex:1;
`;

 const AppContainerElement =styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    min-height:100vh;
    width:100%;
    backgroundColor: rgb(219,240,240);
`;

export const AppTitleSection=styled.div`
   display:block;
   padding-top:0;
   @media screen and (min-height:340px){
    padding-top:10px;
   }
   @media screen and (min-height:500px){
    padding-top:40px;
   }
`;


const SourceLink = styled(SourceLinkElement).attrs({
    href: 'https://github.com/global-input/',
    rel: 'noreferrer noopener',
    target: '_blank'
})``;

interface ChildrenProps {
    children: React.ReactNode;
}

export const AppContainer = ({ children }: ChildrenProps) => (
    <AppContainerElement>
        <AppTitleSection>
            <AppTitle>Mobile Control Example</AppTitle>
            <SourceLink>Source Code</SourceLink>
        </AppTitleSection>
        <AppBody>
            <AppContent>
                {children}
            </AppContent>
        </AppBody>
    </AppContainerElement>
);

const Canvas = styled.canvas`
    background-color: #FFFFFF;
    border-radius: 25px;
    
`;

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
};

interface DisplayCanvasProps {
    onCanvas: (canvas: HTMLCanvasElement) => void;
}

export const DisplayCanvas = ({ onCanvas }: DisplayCanvasProps) => {
    const canvasHolder = useRef<HTMLCanvasElement | null>(null);
    const [width, height] = useWindowSize();

    const canvasWidth = width * 0.95;
    const canvasHeight = height * 0.95;

    const setCanvas = (ref: HTMLCanvasElement | null) => {
        if (ref && canvasHolder.current !== ref) {
            canvasHolder.current = ref;
            onCanvas(ref);
        }
    };

    return (
        <Canvas ref={setCanvas} width={canvasWidth} height={canvasHeight} />
    );
};