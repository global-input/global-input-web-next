'use client';

import { useRouter } from 'next/navigation';
import { useMobile } from '@/lib/global-input-mobile';
import type { InitData } from '@/lib/global-input-mobile';
import * as storage from '../storage';
import * as microAppsUI from '@/lib/micro-apps/mobile-ui';

export * from '@/lib/global-input-mobile';

const userWithDomainAsFormId = (initData: InitData) => {
    if (initData?.form?.domain && initData?.form?.fields?.length) {
        const textFields = initData.form.fields.filter(f => {
            if ((!f.type) || f.type === 'text') {
                if (f.nLines && f.nLines > 1) {
                    return false;
                }
                return true;
            }
            return false;
        });
        if (!textFields.length) {
            return null;
        }
        initData.form.id = `###${textFields[0].id}###@${initData.form.domain}`;
    }
};

export const FIELDS = {
    visibility: {
        id: "fieldValueVisibility",
        type: 'button',
        viewId: "row1",
        options: [{ value: 0, label: 'Show' }, { value: 1, label: 'Hide' }],
        value: 0
    }
};

microAppsUI.add(FIELDS);

interface ConnectMobileProps {
    domain: string;
    formFields: any[];
    configId: number;
    visibility: any;
    setVisibility: (visibility: any) => void;
    onFormModified: (fields: any[], isStructureChanged: boolean) => void;
}

export const useConnectMobile = ({
    domain,
    formFields,
    configId,
    visibility,
    setVisibility,
    onFormModified
}: ConnectMobileProps) => {
    const router = useRouter();

    const initData = () => ({
        id: 'transfer-form',
        form: {
            title: domain,
            domain: domain,
            label: domain,
            fields: [...formFields, ...Object.values(FIELDS)]
        }
    });

    const mobile = useMobile(initData, true, configId);
    
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.visibility.id:
                const vis = getNextVisibilityValue(visibility);
                setVisibility(vis);
                sendVisibility(mobile, vis);
                break;
            default:
                let fieldModified = false;
                const newFormFields = formFields.map(f => {
                    if (f.id === field.id) {
                        fieldModified = true;
                        return { ...f, value: field.value };
                    }
                    return f;
                });
                if (fieldModified) {
                    onFormModified(newFormFields, false);
                }
                if (!fieldModified) {
                    microAppsUI.onFieldChange(field, router.push);
                }
        }
    });
    return mobile;
};

export const getNextVisibilityValue = (visibility: any) => {
    return visibility === FIELDS.visibility.options[0] 
        ? FIELDS.visibility.options[1] 
        : FIELDS.visibility.options[0];
};

export const sendVisibility = (mobile: any, visibility: any) => {
    mobile.sendValue(FIELDS.visibility.id, visibility.value);
};

const defaultFormFields = [{
    id: "username",
    label: "Username",
    value: ''
}, {
    id: "password",
    label: "Password",
    type: "secret",
    value: ''
}, {
    id: "note",
    label: "Note",
    nLines: 5,
    value: ''
}];

export const buildFormFields = (domain: string) => {
    let fields = storage.loadSavedFormFields(domain);
    if (!fields) {
        fields = defaultFormFields;
    }
    return fields;
};