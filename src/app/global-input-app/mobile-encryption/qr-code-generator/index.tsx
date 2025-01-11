'use client';

import React, { useState } from 'react';
import { ContentLabel } from './content-label';
import { GenerateQRCode } from './generate-qr-code';

const pages = {
    CONTENT_LABEL: "content-label",
    GENERATE: "generate-qr-code"
} as const;

interface Props {
    back: () => void;
}

export const QRCodeGenerator: React.FC<Props> = ({ back }) => {
    const [page, setPage] = useState<{
        id: typeof pages[keyof typeof pages];
        content: string;
        label: string;
    }>({ 
        id: pages.CONTENT_LABEL, 
        content: '', 
        label: '' 
    });

    const gotoGenerateQRCode = (content: string, label: string) => {
        content = content.trim();
        if (content.length) {
            setPage({ id: pages.GENERATE, content, label });
        }
        else {
            back();
        }
    }

    const gotoContentLabel = () => setPage({ 
        id: pages.CONTENT_LABEL, 
        content: '', 
        label: '' 
    });

    switch (page.id) {
        case pages.GENERATE:
            return (
                <GenerateQRCode 
                    back={gotoContentLabel} 
                    content={page.content} 
                    label={page.label} 
                />
            );
        case pages.CONTENT_LABEL:
            return (
                <ContentLabel 
                    back={back} 
                    next={gotoGenerateQRCode} 
                />
            );
        default:
            return null;
    }
};