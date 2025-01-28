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

const BulletPoint = ({ children }) => (
    <li className="mb-2 flex items-start">
        <span className="text-gray-600 mr-2">•</span>
        <span>{children}</span>
    </li>
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
                    <div className="space-y-2">
                        <p>You can now store this encrypted content anywhere, knowing it can only be decrypted using your mobile device. For security best practices:</p>
                        <ul className="list-none pl-1 mt-3">
                            <BulletPoint>
                                Back up your encryption key by exporting it as an encrypted QR code
                            </BulletPoint>
                            <BulletPoint>
                                Consider sharing this backup with another trusted mobile device
                            </BulletPoint>
                            <BulletPoint>
                                Use the 'Copy' button to save your encrypted content
                            </BulletPoint>
                        </ul>
                    </div>
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