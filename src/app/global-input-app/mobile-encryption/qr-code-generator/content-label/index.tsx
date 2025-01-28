'use client';

import React, { useState } from 'react';
import { useMobile, ConnectWidget, WhenConnected } from '@/lib/global-input-mobile';
import { GeneralTips, FirstTip } from './tips';
import {
    AppContainer,
    Title,
    MoreInfo,
    Footer,
    DarkButton,
    Form
} from '../../components';
import { ContentInput, LabelInput, CONTENT_ID, LABEL_ID } from './form';

interface Props {
    back: () => void;
    next: (content: string, label: string) => void;
}

const FIELDS = {
    content: {
        id: CONTENT_ID,
        label: "Content for the QR Code",
        value: ""
    },
    label: {
        id: LABEL_ID,
        label: "Label for the QR Code",
        value: ""
    },
    back: {
        id: "back",
        label: "Back",
        type: "button",
        icon: "back",
        viewId: "foot"
    },
    next: {
        id: "next",
        label: "Next",
        type: "button",
        icon: "continue",
        viewId: "foot"
    }
};

export const ContentLabel: React.FC<Props> = ({ back, next }) => {
    const [content, setContent] = useState('');
    const [label, setLabel] = useState('');
    const [expand, setExpand] = useState('');

    const initData = {
        dataType: "qrcode",
        form: {
            title: "Creating an Encrypted QR Code",
            fields: Object.values(FIELDS)
        }
    };

    const mobile = useMobile(initData, true);

    const onLabelChanged = (label: string) => {
        setLabel(label);
        mobile.sendValue(FIELDS.label.id, label);
    };

    const onContentChanged = (content: string) => {
        setContent(content);
        mobile.sendValue(FIELDS.content.id, content);
    };

    const onNext = () => {
        if((!content) || (!content.trim().length)) {
            mobile.sendValue(FIELDS.content.id, "Content is required" );
            return;
        }
        if (content.trim().length) {
            next(content, label);
        }
    };

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.content.id:
                setContent(field.value as string);
                setExpand(CONTENT_ID);
                break;
            case FIELDS.label.id:
                setLabel(field.value as string);
                setExpand(LABEL_ID);
                break;
            case FIELDS.back.id:
                back();
                break;
            case FIELDS.next.id:
                onNext();
                break;
            default:
                break;
        }
    });

    return (
        <AppContainer>
            <Title>Creating an Encrypted QR Code</Title>
            <ConnectWidget mobile={mobile} />
            <FirstTip mobile={mobile} />
            <Form>
                <WhenConnected mobile={mobile}>
                    <ContentInput 
                        content={content} 
                        onContentChanged={onContentChanged} 
                        expand={expand} 
                        setExpand={setExpand}
                    />
                    <LabelInput 
                        label={label} 
                        onLabelChanged={onLabelChanged} 
                        expand={expand} 
                        setExpand={setExpand}
                    />
                    <MoreInfo>
                    Descriptive label will be placed above the QR Code to help you identify it. 
                    </MoreInfo>
                </WhenConnected>
                <Footer>
                    <DarkButton onClick={back}>Back</DarkButton>
                    <WhenConnected mobile={mobile}>
                        <DarkButton onClick={onNext}>Next</DarkButton>
                    </WhenConnected>
                </Footer>
                <GeneralTips />
            </Form>
        </AppContainer>
    );
};