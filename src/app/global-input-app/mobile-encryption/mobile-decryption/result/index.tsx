'use client'

import React, { useState } from 'react'
import * as onComputer from './mobile-ui/onComputer'
import * as onMobile from './mobile-ui/onMobile'
import {
    AppContainer, DarkButton, Footer,
    Field, TextArea, Label, CopyToClipboardButton,
    Title, Help
} from '../../components'

interface Props {
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
    const [expand, setExpand] = useState('decryptedContent')
    return (
        <AppContainer>
            <Title>Decrypted Content Received</Title>
            <Field>
                <TextArea 
                    id="decryptedContent"  
                    value={content} 
                    placeholder="Empty"
                    onFocus={() => setExpand('decryptedContent')} 
                    readOnly={true}
                />
                <Label htmlFor="decryptedContent">Decrypted Content</Label>
                <CopyToClipboardButton value={content}>Copy</CopyToClipboardButton>
                <Help 
                    expand={expand} 
                    expandId="decryptedContent" 
                    setExpand={setExpand} 
                    position={2}
                >
                    This decrypted content is received from your mobile app as it is.
                </Help>
            </Field>
            <Footer>
                <DarkButton onClick={restart}>Decrypt Another Content</DarkButton>
                <DarkButton onClick={finish}>Finish</DarkButton>
            </Footer>
        </AppContainer>
    )
}

export function ShowResultOnMobile({ content, contentOnComputer, finish, domain }: Props) {
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

interface OnComputerProps extends Props {
    showOnMobile: (content: string) => void
}

export function ShowResultOnComputer({ 
    content, 
    contentOnComputer, 
    showOnMobile, 
    finish, 
    domain 
}: OnComputerProps) {
    const restart = () => contentOnComputer('')
    const onShowOnMobile = () => showOnMobile(content)
    onComputer.useConnectMobile({ restart, onShowOnMobile, finish })
    
    return (
        <RenderContentForm 
            content={content} 
            restart={restart} 
            finish={finish}
        />
    )
}