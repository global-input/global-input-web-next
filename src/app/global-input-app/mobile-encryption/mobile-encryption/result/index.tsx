'use client'

import React, { useState } from 'react'
import * as onComputer from './mobile-ui/onComputer'
import * as onMobile from './mobile-ui/onMobile'
import {
    AppContainer, DarkButton, Footer,
    Field, TextArea, Label, CopyToClipboardButton,
    Title, Help
} from '../../components';

interface ResultProps {
    domain: string
    content: string
    contentOnComputer: (content: string) => void
    finish: () => void
}

interface RenderContentFormProps {
    content: string
    restart: () => void
    finish: () => void
}

const RenderContentForm = ({ content, restart, finish }: RenderContentFormProps) => {
    const [expand, setExpand] = useState('encryptedContent')
    
    return (
        <AppContainer>
            <Title>Encrypted Content Received</Title>
            <Field>
                <TextArea 
                    id="encryptedContent"  
                    value={content} 
                    placeholder="Empty"
                    onFocus={() => setExpand('encryptedContent')} 
                    readOnly={true}
                />
                <Label htmlFor="encryptedContent">Encrypted Content</Label>
                <CopyToClipboardButton value={content}>Copy</CopyToClipboardButton>
                <Help 
                    expandId='encryptedContent' 
                    expand={expand} 
                    setExpand={setExpand} 
                    position={2}
                >
                    You can now store this encrypted content into a storage you prefer with the confidence that only you can decrypt using your mobile.
                    Note that considering you may loose your phone, you should export the encryption key used in the encryption as an encrypted QR code.
                    Alternatively, you can use another mobile to scan the encryption key to have a backup.
                </Help>
            </Field>
            <Footer>
                <DarkButton onClick={restart}>Encrypt Another Content</DarkButton>
                <DarkButton onClick={finish}>Finish</DarkButton>
            </Footer>
        </AppContainer>
    )
}

export function ShowResultOnMobile({ content, contentOnComputer, finish, domain }: ResultProps) {
    const restart = () => contentOnComputer('')
    onMobile.useConnectMobile({ content, restart, finish })
    
    return (
        <RenderContentForm 
            content={content} 
            restart={restart} 
            finish={finish}
        />
    )
}

interface OnComputerProps extends ResultProps {
    showOnMobile: (content: string) => void
}

export function ShowResultOnComputer({ content, contentOnComputer, showOnMobile, finish, domain }: OnComputerProps) {
    const restart = () => contentOnComputer('')
    const onShowOnMobile = () => showOnMobile(content)
    
    onComputer.useConnectMobile({ 
        restart, 
        onShowOnMobile, 
        finish 
    })
    
    return (
        <RenderContentForm 
            content={content} 
            restart={restart} 
            finish={finish}
        />
    )
}