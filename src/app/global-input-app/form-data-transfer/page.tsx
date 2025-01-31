'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApplicationTopContainer } from '@/components/containers';  
import * as storage from './storage';
import {
    useConnectMobile,
    getNextVisibilityValue,
    sendVisibility,
    buildFormFields,
    FIELDS
} from './mobile-ui';
import type { FormField } from './mobile-ui';
import { ConnectWidget } from './mobile-ui';

import { loadFormFromQueryString } from './url-query';
import {
    AppContainer,
    Form,
    Input,
    Label,
    Footer,
    DarkButton,
    Help,
    ConnectContainer,
    DomainField
} from './components';

import { DisplayInputField, AddNewField } from './forms';

// Separate the form content into its own component
function FormContent() {
    const searchParams = useSearchParams();
    const [domain, setDomain] = useState(loadDomain);
    const [configId, setConfigId] = useState(0);
    const [selectedFields, setSelectedFields] = useState<FormField[]>([]);
    const [formFields, setFormFields] = useState(() => buildFormFields(domain));
    const [visibility, setVisibility] = useState(FIELDS.visibility.options[0]);
    const [expand, setExpand] = useState('');

    const onFormModified = (formFields: FormField[], isStructureChanged: boolean) => {
        if (isStructureChanged) {
            storage.saveFormFields(domain, formFields);
            setConfigId(configId => configId + 1);
        }
        setSelectedFields([]);
        setFormFields(formFields);
    };

    const changeDomain = (newDomain: string) => {
        setDomain(newDomain);
        storage.setDomain(newDomain);
        onFormModified(buildFormFields(newDomain), true);
    };

    const canDelete = !!selectedFields.length;
    const onDeleteSelected = () => {
        const newFormFields = formFields.filter(f => selectedFields.indexOf(f) === -1);
        onFormModified(newFormFields, true);
    };

    const mobile = useConnectMobile({
        domain,
        formFields,
        configId,
        visibility,
        setVisibility,
        onFormModified
    });

    useEffect(() => {
        if (searchParams.size > 0) {
            const location = {
                search: `?${searchParams.toString()}`
            };
            loadFormFromQueryString(setDomain, onFormModified, location);
        }
    }, [searchParams]);

    return (
        <AppContainer>
            <DomainField>
                <Input
                    id='changeDomain'
                    type="text"
                    value={domain}
                    placeholder="Domain"
                    onChange={(evt) => changeDomain(evt.target.value)}
                />
                <Label htmlFor="changeDomain">Domain</Label>
                <Help expand={expand} setExpand={setExpand} expandId="changeDomain">
                    This value is used when locating data in your mobile secure storage.
                    It is also used to identify the form structure you have created in this application.
                </Help>
            </DomainField>

            <Form>
                {formFields.map((formField, index) => (
                    <DisplayInputField
                        key={formField.id}
                        formField={formField}
                        onChange={(evt) => {
                            const newFormFields = formFields.map(f => {
                                if (f === formField) {
                                    return { ...f, value: evt.target.value };
                                }
                                return f;
                            });
                            onFormModified(newFormFields, false);
                            mobile.sendValue(formField.id as string, evt.target.value, index);
                        }}
                        visibility={visibility}
                        selectedFields={selectedFields}
                        setSelectedFields={setSelectedFields}
                    />
                ))}
            </Form>

            <Footer>
                {canDelete && (
                    <DarkButton onClick={onDeleteSelected}>Delete Selected</DarkButton>
                )}
                <DarkButton onClick={() => {
                    const vis = getNextVisibilityValue(visibility);
                    setVisibility(vis);
                    sendVisibility(mobile, vis);
                }}>{visibility.label}</DarkButton>
                {mobile.isConnected && (
                    <DarkButton onClick={() => mobile.restart()}>Disconnect</DarkButton>
                )}
            </Footer>

            <AddNewField formFields={formFields} onFormModified={onFormModified} />

            <ConnectContainer>
                <ConnectWidget mobile={mobile} />
            </ConnectContainer>
        </AppContainer>
    );
}

// Loading fallback component
function FormLoadingState() {
    return (
        <AppContainer>
            <div>Loading form data...</div>
        </AppContainer>
    );
}

const loadDomain = () => {
    const domain = storage.getDomain();
    return domain ? domain : "globalinput.co.uk";
};

// Main page component with Suspense boundary
export default function FormDataTransfer() {
    return (
        <Suspense fallback={<FormLoadingState />}>
            <ApplicationTopContainer>
                <FormContent />                            
            </ApplicationTopContainer>
        </Suspense>
    );
}