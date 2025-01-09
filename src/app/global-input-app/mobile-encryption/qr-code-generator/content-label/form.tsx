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
            placeholder="Content Received from your mobile will be displayed here."
            onFocus={() => setExpand(CONTENT_ID)}
        />
        <Label htmlFor={CONTENT_ID}>Content</Label>
        <Help expandId={CONTENT_ID} expand={expand} setExpand={setExpand}>
            The encrypted content received from your mobile app will be displayed in the text box above. 
            Note that only your mobile app can decrypt the data. This application uses the encrypted data 
            received to create an encrypted QR code in the next step.
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
            placeholder="Label for the content above."
            onFocus={() => setExpand(LABEL_ID)}
        />
        <Label htmlFor={LABEL_ID}>Label</Label>
        <Help expandId={LABEL_ID} expand={expand} setExpand={setExpand}>
            This will be placed above the QR Code as a label to help you identify it. 
            This is especially useful when printing the encrypted QR codes for filing purposes.
        </Help>
    </Field>
);