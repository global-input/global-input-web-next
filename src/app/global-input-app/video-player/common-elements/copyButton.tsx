'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ShowProps {
    show: boolean;
    position?: number;
}

const CopyContainer1 = styled.div<ShowProps>`
    display: inline-flex;
    flex-direction: row;
    position: relative;
    align-self: flex-end;
    align-items: center;
    top: -16px;
    background-color: ${props => props.show ? 'white' : ''};
    z-Index: 5;
    padding-left: 5px;
    border: ${props => props.show ? '1px dotted #4040bf' : ''};
`;

const CopyContainer2 = styled(CopyContainer1)`
    top: -28px;
`;

const CopyContainer3 = styled.div<ShowProps>`
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: flex-start;
    background-color: ${props => props.show ? 'white' : ''};
    z-Index: 5;
`;

interface CopyContainerProps {
    position?: number;
    children: React.ReactNode;
    show: boolean;
}

const CopyContainer: React.FC<CopyContainerProps> = ({ position = 1, children, show }) => {
    if (position === 2) {
        return <CopyContainer2 show={show}>{children}</CopyContainer2>;
    }
    else if (position === 3) {
        return <CopyContainer3 show={show}>{children}</CopyContainer3>;
    }
    return <CopyContainer1 show={show}>{children}</CopyContainer1>;
};

const CopyContent = styled.div<ShowProps>`
    font-family: Avenir;
    color: #4040bf;
    white-space: wrap;
    font-size: 12px;
    padding-right: 10px;
    display: ${props => props.show ? 'block' : 'none'};
`;

const Button = styled.button<ShowProps>`
    text-decoration: none;
    font-size: 10px;
    border-radius: 8px;
    color: #4281BD;
    background-color: white;
    white-space: nowrap;
    padding: 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-color: #EEEEEE;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 50px #ffff;
    }
    display: flex;
    visibility: ${props => props.show ? 'visible' : 'hidden'};
`;

interface CopyToClipboardButtonProps {
    children: React.ReactNode;
    value: string;
    position?: number;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ 
    children, 
    value, 
    position = 1 
}) => {
    const [copying, setCopying] = useState(false);
    const timerHandler = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerHandler.current) {
                clearTimeout(timerHandler.current);
                timerHandler.current = null;
            }
        };
    }, []);

    const onCopy = async () => {
        if (!navigator?.clipboard) return;
        
        try {
            setCopying(true);
            await navigator.clipboard.writeText(value);
            
            if (timerHandler.current) {
                clearTimeout(timerHandler.current);
            }
            
            timerHandler.current = setTimeout(() => {
                timerHandler.current = null;
                setCopying(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            setCopying(false);
        }
    };

    const canCopy = !!navigator?.clipboard && !!value;

    return (
        <CopyContainer show={copying} position={position}>
            <CopyContent show={copying}>
                copied into your clipboard
            </CopyContent>
            <Button 
                onClick={onCopy} 
                show={!copying && canCopy}
                type="button"
                aria-label="Copy to clipboard"
            >
                {children}
            </Button>
        </CopyContainer>
    );
};