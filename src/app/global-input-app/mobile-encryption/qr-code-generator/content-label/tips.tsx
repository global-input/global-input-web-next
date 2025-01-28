'use client';

import React from 'react';
import styled from 'styled-components';
import { Tips, TipTitle, Tip, TipContent, ConnectedInstruction } from '../../components';

// Update the image imports to use Next.js public directory
const encryptOnMobileImage = '/images/mobile-encryption/encrypt-on-mobile.png';
const keysOnMobileImage = '/images/mobile-encryption/keys-on-mobile.png';
const settingsOnMobileImage = '/images/mobile-encryption/settings-on-mobile.png';

const EncryptOnMobileIcon = () => (
    <img 
        src={encryptOnMobileImage} 
        alt="Encrypt" 
        className="inline-block align-middle mx-1" // This makes it flow with text
    />
);
const BackupKeysIcon = styled.img.attrs({
    src: keysOnMobileImage,
    alt: 'Backup Keys'
})``;

const BackupSettingsIcon = styled.img.attrs({
    src: settingsOnMobileImage,
    alt: 'Backup Settings'
})``;

export const GeneralTips = () => (
    <Tips>
        <TipTitle>
        Available Mobile Actions:
        </TipTitle>
        <Tip>
            <EncryptOnMobileIcon />
            <TipContent>
            This can be be used for disaster recovery backup by creating an encrypted QR code containing your disaster recovery password. You can securely store this QR code and decrypt it with your mobile device when needed. 
            
            </TipContent>
        </Tip>

        <Tip>
            <BackupKeysIcon />
            <TipContent>
            This can be used for exporting encryption keys from your mobile app. You can create an encrypted QR code containing one of your encryption keys. The QR code will be protected with a passphrase of your choice. You can later import this key by scanning the QR code and providing the passphrase.

            </TipContent>
        </Tip>

        <Tip>
            <BackupSettingsIcon />
            <TipContent>
            this can be used for exporting connection settings of your mobile app. This is useful if you have different applications with different connection settings.
            
            </TipContent>
        </Tip>
    </Tips>
);

interface FirstTipProps {
    mobile: any; // Replace with proper type from your mobile library
}

export const FirstTip: React.FC<FirstTipProps> = ({ mobile }) => (
    <ConnectedInstruction mobile={mobile}>
        Press the <EncryptOnMobileIcon/> button on your mobile device to begin encrypting a short content, and the encrypted content will be sent to the text box below.
    </ConnectedInstruction>
);