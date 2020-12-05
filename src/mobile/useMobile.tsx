import React, { useCallback } from 'react';
import styled from 'styled-components';

import * as globalInput from 'global-input-react';////global-input-react////

////main////
import * as storage from './storage';

export * from 'global-input-react';////global-input-react////


const QRCodeContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-center;
        align-items: flex-start;
        margin: 0;
        padding:0;
`;


const ErrorMessage = styled.div`
        color: red;
        font-size: 11;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        max-width:  350px;
        max-height: 100px;
        overflow: scroll;
`;




export const useMobile = (initData: globalInput.InitData | (() => globalInput.InitData), connect: boolean = true, configId?: any) => {
    const connectionSettings = storage.loadConnectionSettings();
    const options: globalInput.ConnectOptions = {
        url: connectionSettings.url,////use your own server"
        apikey: connectionSettings.apikey,
        securityGroup: connectionSettings.securityGroup
    };
    console.log("=======apikey:" + connectionSettings.apikey + ":" + connect);
    const mobile = globalInput.useGlobalInputApp({
        initData, options, codeAES: connectionSettings.codeKey
    }, connect, configId);
    ////dev-test codeData

    const { isError, isConnectionDenied, ConnectQR, errorMessage } = mobile;

    const NewConnectQR = useCallback((props: globalInput.ConnectQRProps) => {
        let message = isConnectionDenied && "You can only use one mobile app per session. Disconnect to start a new session.";
        if (isError) {
            message = errorMessage;
        }
        return (
            <QRCodeContainer>
                <ConnectQR {...props} />
                <ErrorMessage>{message}</ErrorMessage>
            </QRCodeContainer>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, errorMessage, isConnectionDenied, ConnectQR]);
    return { ...mobile, ConnectQR: NewConnectQR };
};
