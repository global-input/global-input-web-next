import React, { useState } from 'react'
import * as onComputer from './mobile-ui/onComputer'
import * as onMobile from './mobile-ui/onMobile'
import {
    AppContainer, DarkButton, Footer,
    Field, TextArea, Label, CopyToClipboardButton,
    Title, Help
} from '../../components'

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

const SecurityTip = ({ children }) => (
    <div className="flex items-start mb-2 last:mb-0">
        <span className="text-[rgb(53,116,230)] mr-2 font-['Avenir']">•</span>
        <span className="text-[rgb(53,116,230)] font-['Avenir'] flex-1">{children}</span>
    </div>
)

const SecurityGuidance = () => (
    <div className="space-y-3">
        <p className="text-[rgb(53,116,230)] font-['Avenir']">
            You can now store this encrypted content anywhere, knowing it can only be decrypted using your mobile device. For security best practices:
        </p>
        <div className="ml-1">
            <SecurityTip>
                Back up your encryption key by exporting it as an encrypted QR code
            </SecurityTip>
            <SecurityTip>
                Consider sharing this backup with another trusted mobile device
            </SecurityTip>
            <SecurityTip>
                Use the 'Copy' button to save your encrypted content
            </SecurityTip>
        </div>
    </div>
)

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
                    <SecurityGuidance />
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