'use client';

import { decrypt } from 'global-input-react';
import type { FormField } from '@/lib/global-input-mobile';

const encryptionKey = 'TDwtv0dV6u';

interface Location {
    search: string;
}

interface FormData {
    id?: string;
    fields?: FormField[];
}

const loadFormFromQuery = (location: Location): FormData | null => {
    const formDataString = getQueryParam(location.search, "formData");
    if (!formDataString) {
        return null;
    }
    try {
        const formFromQuery = JSON.parse(decrypt(formDataString, encryptionKey));
        if (formFromQuery) {
            return formFromQuery;
        }
    }
    catch (e) {
        console.error("Error while processing the formDataString:", e);
        return null;
    }
    return null;
};

const getQueryParam = (query: string, variable: string): string | null => {
    if (!query) {
        return null;
    }
    query = query.substring(1);
    const vars = query.split('&');
    for (let pair of vars) {
        const [key, value] = pair.split('=');
        if (decodeURIComponent(key) === variable) {
            return decodeURIComponent(value);
        }
    }
    return null;
};

export const loadFormFromQueryString = (
    setDomain: (domain: string) => void,
    onFormModified: (formFields: FormField[], isStructureChanged: boolean) => void,
    location?: Location
): void => {
    if (!location?.search) {
        return;
    }

    const formData = loadFormFromQuery(location);
    if (!formData) {
        return;
    }

    if (formData.id) {
        const parts = formData.id.split('@');
        const domain = parts && parts.length > 0 ? parts[parts.length - 1] : null;
        if (domain) {
            setDomain(domain);
        } else {
            setDomain(formData.id.replace('@', ''));
        }
    }

    if (formData.fields) {
        onFormModified(formData.fields, true);
    }
};