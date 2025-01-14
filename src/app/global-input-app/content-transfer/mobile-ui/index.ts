'use client';

import { useRouter } from "next/navigation";
import { useMobile, ConnectWidget } from '@/lib/global-input-mobile';
import * as mobileUI from '@/lib/micro-apps/mobile-ui';
import type {FormField} from '@/lib/global-input-mobile';

export { ConnectWidget };

// Improved type definitions
interface ContentField {
    id: string;
    label: string;
    value: string;
    nLines: number;
}

interface InfoField {
    id: string;
    type: string;
    value: string;
}


interface FormData {
    id: string;
    form: {
        title: string;
        fields: Array<ContentField | InfoField>;
    };
}

// Constants in a separate object for better organization
const FORM_CONFIG = {
    id: 'content-transfer-example',
    title: 'Content Transfer',
} as const;

export const FIELDS = {
    contentField: {
        id: "content",
        label: "Content",
        value: "",
        nLines: 10
    } as ContentField,
    info: {
        id: "info",
        type: "info",
        value: "You may paste content in the text box above to transfer it into the connected application."
    } as InfoField
};

// Register fields with mobileUI
mobileUI.add(FIELDS);

// Build initial data with type safety
const buildInitData = (): FormData => ({
    id: FORM_CONFIG.id,
    form: {
        title: FORM_CONFIG.title,
        fields: Object.values(FIELDS)
    }
});

interface UseConnectMobileProps {
    setContent: (content: string) => void;
}

interface UseConnectMobileResult {
    mobile: ReturnType<typeof useMobile>;
    onContentChanged: (content: string) => void;
}

export const useConnectMobile = ({ setContent }: UseConnectMobileProps): UseConnectMobileResult => {
    const router = useRouter();
    const mobile = useMobile(buildInitData, true);

    const handleFieldChange = (field: FormField) => {
        try {
            switch (field.id) {
                case FIELDS.contentField.id:
                    if (typeof field.value === 'string') {
                        setContent(field.value);
                    }
                    break;
                default:
                    if (field.id) {
                        mobileUI.onFieldChange(field, (path: string) => {
                            try {
                                router.push(path);
                                return true;
                            } catch (error) {
                                console.error('Navigation error:', error);
                                return false;
                            }
                        });
                    }
            }
        } catch (error) {
            console.error('Error handling field change:', error);
            // You could add error handling UI feedback here
        }
    };

    mobile.setOnchange(({ field }) => handleFieldChange(field));

    const onContentChanged = (content: string): void => {
        try {
            mobile.sendValue(FIELDS.contentField.id, content);
        } catch (error) {
            console.error('Error sending content value:', error);
            // You could add error handling UI feedback here
        }
    };

    return { mobile, onContentChanged };
};