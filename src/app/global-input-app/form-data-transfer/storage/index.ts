'use client';

import type { FormField } from '@/lib/global-input-mobile';

const CACHE_FIELDS = 'extension.content.cacheFields.';
const CACHE_TIME = 'extension.content.cachedTime.';
const PAGE_CONTROL = "extension.control.";
const FORM_DATA_FIELDS = "extension.forms.fields.";
const DOMAIN = "iterative.globalInputApp.domain";
const cacheTTL = 60000;

export const clearCacheFields = (domain?: string): void => {
    try {
        if (typeof window === 'undefined') return;
        
        if (domain) {
            localStorage.removeItem(CACHE_FIELDS + domain);
            localStorage.removeItem(CACHE_TIME + domain);
            return;
        }
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key.startsWith(CACHE_FIELDS) || key.startsWith(CACHE_TIME)) {
                localStorage.removeItem(key);
            }
        }
    } catch (error) {
        console.error("Failed to clear the cache:", error);
    }
};

export const setCacheFields = (domain: string, encryptedContent: string): void => {
    if (typeof window === 'undefined') return;
    
    const now = Date.now();
    localStorage.setItem(CACHE_TIME + domain, now.toString());
    localStorage.setItem(CACHE_FIELDS + domain, encryptedContent);
};

export const getCacheFields = (domain: string): string => {
    if (typeof window === 'undefined') return '';
    
    const cachedTime = localStorage.getItem(CACHE_TIME + domain);
    if (!cachedTime) {
        clearCacheFields();
        return '';
    }
    
    const now = Date.now();
    if ((now - parseInt(cachedTime)) > cacheTTL) {
        clearCacheFields();
        return '';
    }
    
    const content = localStorage.getItem(CACHE_FIELDS + domain);
    if (!content) {
        clearCacheFields();
        return '';
    }
    return content;
};

export const removePageControlRule = (domain: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(PAGE_CONTROL + domain);
};

export const getPageControlRule = (domain: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(PAGE_CONTROL + domain);
};

export const savePageControlRule = (domain: string, pageControlRule: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PAGE_CONTROL + domain, pageControlRule);
};

const getVarForFormFields = (domain: string): string => {
    const domainPart = domain || 'default';
    return FORM_DATA_FIELDS + domainPart;
};

export const loadSavedFormFields = (domain: string): FormField[] | null => {
    if (typeof window === 'undefined') return null;
    
    const fieldString = localStorage.getItem(getVarForFormFields(domain));
    if (!fieldString) return null;
    
    try {
        const fields = JSON.parse(fieldString);
        return Array.isArray(fields) && fields.length > 0 ? fields : null;
    } catch (error) {
        console.error("Failed to parse the fieldstring:", error);
        return null;
    }
};

export const saveFormFields = (domain: string, formFields: FormField[]): void => {
    if (typeof window === 'undefined') return;
    
    if (formFields.length) {
        const formsFieldsToSave = formFields.map(f => ({ ...f, value: undefined }));
        const fieldString = JSON.stringify(formsFieldsToSave);
        localStorage.setItem(getVarForFormFields(domain), fieldString);
    } else {
        localStorage.removeItem(getVarForFormFields(domain));
    }
};

export const getDomain = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(DOMAIN);
};

export const setDomain = (domain: string | null | undefined): void => {
    if (typeof window === 'undefined') return;
    
    const trimmedDomain = domain?.trim();
    if (trimmedDomain) {
        localStorage.setItem(DOMAIN, trimmedDomain);
    } else {
        localStorage.removeItem(DOMAIN);
    }
};