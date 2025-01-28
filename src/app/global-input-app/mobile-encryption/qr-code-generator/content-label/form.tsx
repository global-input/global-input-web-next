'use client';

import React from 'react';
import { Field, TextArea, Label, Help, Input } from '../../components';

export const CONTENT_ID = 'content';
export const LABEL_ID = 'label';

interface ContentInputProps {
    content?: string;
    onContentChanged: (value: string) => void;
    expand: string;
    setExpand: (id: string) => void;
}

export const ContentInput: React.FC<ContentInputProps> = ({ 
    content = '', 
    onContentChanged, 
    expand, 
    setExpand 
}) => (
    <Field>
        <TextArea
            id={CONTENT_ID}
            onChange={(evt) => {
                onContentChanged(evt.target.value);
            }}
            value={content}
            placeholder="Content Received from your mobile will appear here."
            onFocus={() => setExpand(CONTENT_ID)}
        />
        <Label htmlFor={CONTENT_ID}>Content</Label>
        <Help expandId={CONTENT_ID} expand={expand} setExpand={setExpand}>

        The encrypted content from your mobile device will be displayed here once received. This content remains securely encrypted - only your mobile device holds the keys can decrypt it. In the next step, this encrypted data will be converted into a QR code that you can safely store or share.


            
        </Help>
    </Field>
);

interface LabelInputProps {
    label?: string;
    onLabelChanged: (value: string) => void;
    expand: string;
    setExpand: (id: string) => void;
}

export const LabelInput: React.FC<LabelInputProps> = ({ 
    label = '', 
    onLabelChanged, 
    expand, 
    setExpand 
}) => (
    <Field>
        <Input
            id={LABEL_ID}
            onChange={(evt) => {
                onLabelChanged(evt.target.value);
            }}
            value={label}
            placeholder="Enter a descriptive label for your encrypted content."
            onFocus={() => setExpand(LABEL_ID)}
        />
        <Label htmlFor={LABEL_ID}>Label</Label>
        <Help expandId={LABEL_ID} expand={expand} setExpand={setExpand}>
            This will be placed above the QR Code as a label to help you identify it. 
            This is especially useful when printing the encrypted QR codes for filing purposes.
        </Help>
    </Field>
);