'use client';

import { useRouter } from "next/navigation";
import { useMobile, ConnectWidget } from '@/lib/global-input-mobile';
import * as mobileUI from '@/lib/micro-apps/mobile-ui';

export { ConnectWidget };

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

const FIELDS = {
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

mobileUI.add(FIELDS);

const initData = {
    id: 'content-transfer-example',
    form: {
        title: "Content Transfer",
        fields: Object.values(FIELDS)
    }
};

interface UseConnectMobileProps {
    setContent: (content: string) => void;
}

export const useConnectMobile = ({ setContent }: UseConnectMobileProps) => {
    const router = useRouter();
    const mobile = useMobile(initData, true);

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.contentField.id:
                setContent(field.value as string);
                break;
            default:
                        if (field.id) {
                            mobileUI.onFieldChange(field, (path) => {
                                return router.push(path);
                            });
                
                }
        }
    });

    const onContentChanged = (content: string) => {
        mobile.sendValue(FIELDS.contentField.id, content);
    };

    return { mobile, onContentChanged };
};