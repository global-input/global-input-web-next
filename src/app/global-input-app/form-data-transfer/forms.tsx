'use client';

import React, { useState } from 'react';
import {
    Field,
    Input,
    TextArea,
    Label,
    CopyToClipboardButton,
    InputGroup,
    CheckBox,
    Form,
    Form2,
    Title,
    Select,
    Option,
    DarkButton,
    Footer2
} from './components';

interface FormField {
    id: string;
    label: string;
    value: string;
    type?: string;
    nLines?: number;
}

interface DisplayInputFieldProps {
    formField: FormField;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    visibility: { value: number };
    selectedFields: FormField[];
    setSelectedFields: (fields: FormField[]) => void;
}

const isFieldChecked = (formField: FormField, selectedFields: FormField[]): boolean => 
    selectedFields.some(s => s === formField);

export const DisplayInputField: React.FC<DisplayInputFieldProps> = ({
    formField,
    onChange,
    visibility,
    selectedFields,
    setSelectedFields
}) => {
    const [focused, setFocused] = useState(false);
    const checked = isFieldChecked(formField, selectedFields);
    const showCheckbox = (!focused) && (!formField.value);
    const type = visibility.value === 0 ? 'password' : 'text';

    const setChecked = () => {
        setSelectedFields([...selectedFields, formField]);
    };

    const setUnchecked = () => {
        setSelectedFields(selectedFields.filter(s => s !== formField));
    };

    const toggleSelect = () => {
        if (checked) {
            setUnchecked();
        } else {
            setChecked();
        }
    };

    const onFocus = () => {
        setFocused(true);
        setUnchecked();
    };

    const onBlur = () => {
        setFocused(false);
    };

    if (visibility.value === 0 || (!formField.nLines) || formField.nLines <= 1) {
        return (
            <InputGroup>
                {showCheckbox && (
                    <CheckBox
                        label=""
                        checked={checked}
                        onChange={toggleSelect}
                    />
                )}
                <Field>
                    <Input
                        id={formField.id}
                        type={type}
                        value={formField.value}
                        placeholder={formField.label}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    <Label htmlFor={formField.id}>{formField.label}</Label>
                </Field>
                <CopyToClipboardButton value={formField.value} position={3}>
                    Copy
                </CopyToClipboardButton>
            </InputGroup>
        );
    }

    return (
        <InputGroup>
            {showCheckbox && (
                <CheckBox checked={checked} onChange={toggleSelect} />
            )}
            <Field>
                <TextArea
                    id={formField.id}
                    value={formField.value}
                    placeholder={formField.label}
                    onChange={onChange}
                />
                <Label htmlFor={formField.id}>{formField.label}</Label>
            </Field>
            <CopyToClipboardButton value={formField.value} position={3}>
                Copy
            </CopyToClipboardButton>
        </InputGroup>
    );
};

const FIELD_TYPES = [
    { value: 'single-line', label: 'Single Line Field' },
    { value: 'multi-line', label: 'Multi Line Field' },
    { value: 'password', label: 'Password Field' }
];

interface AddNewFieldProps {
    formFields: FormField[];
    onFormModified: (fields: FormField[], isStructureChanged: boolean) => void;
}

export const AddNewField: React.FC<AddNewFieldProps> = ({ formFields, onFormModified }) => {
    const [label, setLabel] = useState('');
    const [fieldType, setFieldType] = useState(FIELD_TYPES[0]);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(evt.target.value);
    };

    const onAddNewField = () => {
        const fieldName = label.trim();
        if (!fieldName) {
            return;
        }

        const nLines = fieldType.value === 'multi-line' ? 5 : 1;
        const id = label.replace(' ', "_").toLowerCase();
        
        if (formFields.some(f => f.id === id)) {
            return;
        }

        const type = fieldType.value === 'password' ? 'secret' : 'text';
        const newFormFields = [...formFields, { 
            id, 
            label: fieldName, 
            type, 
            value: '', 
            nLines 
        }];
        
        onFormModified(newFormFields, true);
        setLabel('');
    };

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const matched = FIELD_TYPES.find(f => f.value === evt.target.value);
        if (matched) {
            setFieldType(matched);
        }
    };

    return (
        <Form>
            <Form2>
                <Title>Add new field</Title>
                <Field>
                    <Input 
                        id="addFieldLabel" 
                        type="text"
                        value={label}
                        placeholder="Field Name"
                        onChange={onChange}
                    />
                    <Label htmlFor="addFieldLabel">Field Name</Label>
                </Field>
                <Select value={fieldType.value} onChange={onSelectChange}>
                    {FIELD_TYPES.map(f => (
                        <Option key={f.value} value={f.value}>
                            {f.label}
                        </Option>
                    ))}
                </Select>
                <Footer2>
                    <DarkButton onClick={onAddNewField}>Add</DarkButton>
                </Footer2>
            </Form2>
        </Form>
    );
};