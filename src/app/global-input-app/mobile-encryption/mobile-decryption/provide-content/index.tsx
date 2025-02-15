'use client';

import React, { useCallback, useState } from 'react';
import * as onComputer from './mobile-ui/onComputer';
import * as onMobile from './mobile-ui/onMobile';
import {
    AppContainer, Title,
    Footer, DarkButton, Field, TextArea, Label, Help
} from '../../components';

interface PROPS {
    initialContent: string;
    startDecrypt: (content: string) => void;
    cancel: () => void;
    domain: string;
}

export const ContentOnMobile: React.FC<PROPS> = ({ initialContent, cancel, startDecrypt, domain }) => {
    const [content, setContent] = useState<string>(initialContent);

    const onDecrypt = () => {
        processDecrypt(mobile, content, startDecrypt, onMobile.FIELDS.info.id);
    };
    const mobile = onMobile.useConnectMobile({ initialContent, cancel, setContent, onDecrypt });
    const { sendValue } = mobile;
    const onContentChanged = useCallback((value: string) => {
        setContent(value);
        sendValue(onMobile.FIELDS.content.id, value);
    }, [sendValue]);
    return (
        <RenderContentForm content={content} onContentChanged={onContentChanged} cancel={cancel} onDecrypt={onDecrypt} />
    );
};

interface PROPSForOnComputer extends PROPS {
    contentOnMobile: (content: string) => void;
}

export const ContentOnComputer: React.FC<PROPSForOnComputer> = ({ initialContent, contentOnMobile, startDecrypt, cancel, domain }) => {
    const [content, setContent] = useState(initialContent);
    const onDecrypt = () => {
        processDecrypt(mobile, content, startDecrypt, onComputer.FIELDS.info.id);
    };
    const onContentOnMobile = () => contentOnMobile(content);

    const mobile = onComputer.useConnectMobile({ cancel, onContentOnMobile, onDecrypt });
    const onContentChanged = useCallback((value: string) => {
        setContent(value);
    }, []);

    return (
        <RenderContentForm content={content} onContentChanged={onContentChanged} cancel={cancel} onDecrypt={onDecrypt} />
    );
};

interface ProcessDecryptProps {
    mobile: any;
    content: string;
    startDecrypt: (content: string) => void;
    infoId: string;
}

const processDecrypt = (mobile: any, content: string, startDecrypt: (content: string) => void, infoId: string) => {
    if (content.trim().length) {
        startDecrypt(content.trim());
    }
    else {
        mobile.sendValue(infoId, {
            content: 'Please provide the content to decrypt using the application connected to your mobile app.',
            style: { color: 'red' }
        });
    }
};

interface RenderContentFormProps {
    content: string;
    onContentChanged: (value: string) => void;
    cancel: () => void;
    onDecrypt: () => void;
}

const RenderContentForm: React.FC<RenderContentFormProps> = ({ content, onContentChanged, cancel, onDecrypt }) => {
    const [expand, setExpand] = useState('contentToDecrypt');
    return (<AppContainer>
        <Title>Content To Decrypt</Title>
        <Field>
            <TextArea
                id="contentToDecrypt"
                onChange={evt => {
                    onContentChanged(evt.target.value);
                }}
                value={content}
                placeholder="Place here the content to decrypt."
                onFocus={() => setExpand('contentToDecrypt')}
            />
            <Label htmlFor="contentToDecrypt">Content to Decrypt</Label>
            <Help expandId='contentToDecrypt' expand={expand} setExpand={setExpand}>
                
            
        How it works: when you enter encrypted content here, it will be sent to your mobile device for decryption. Your mobile app will decrypt the data using your device's secure keys and send the decrypted result back to this application. This ensures your sensitive information remains protected, as only your mobile device can decrypt it.
                
                
            </Help>
        </Field>
        <Footer>
            <DarkButton onClick={cancel}>Cancel</DarkButton>
            <DarkButton onClick={onDecrypt}>Decrypt</DarkButton>
        </Footer>
    </AppContainer>
    );
}