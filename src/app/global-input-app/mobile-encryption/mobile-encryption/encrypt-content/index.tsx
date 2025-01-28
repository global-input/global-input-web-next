import React, { useState } from 'react'
import Image from 'next/image'
import { useMobile, ConnectWidget } from '@/lib/global-input-mobile'
import { 
    AppContainer, Error, Footer, DarkButton, 
    Title
} from '../../components'

const FIELDS = {
    content: {
        id: "encryptContent",
        label: "Content",
        type: 'encrypt',
        value: ''
    },
    info: {
        id: "info",
        type: "info",
        value: "",
    },
    back: {
        id: "backToContent",
        label: "Back",
        type: "button",
        viewId: "row1"
    }
}

interface Props {
    content: string
    contentOnComputer: (content: string) => void
    showOnComputer: (content: string) => void
    domain: string
}

interface InstructionStepProps {
    number?: number
    children: React.ReactNode
}
const InstructionStep: React.FC<InstructionStepProps> = ({ number, children }) => (
    <div className="flex items-start space-x-2 mb-3">
        {number!==undefined && <span className="text-blue-600 font-semibold">{number}.</span>}
        <div className="flex items-center space-x-2 flex-wrap">
            {children}
        </div>
    </div>
)

const IconImage = ({ src, alt }) => (
    <Image 
        src={src} 
        alt={alt} 
        width={24} 
        height={24} 
        className="inline-block mx-1"
    />
)

export function EncryptContent({ domain, content, contentOnComputer, showOnComputer }: Props) {
    const [errorMessage, setErrorMessage] = useState('')

    const initData = () => ({
        form: {
            title: "Mobile Encryption",
            fields: [{ ...FIELDS.content, value: content }, FIELDS.info, FIELDS.back]
        }
    })

    const mobile = useMobile(initData, true)
    const back = () => contentOnComputer(content)

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.content.id:
                if (field.value) {
                    showOnComputer(field.value as string)
                } else {
                    setErrorMessage("Failed to encrypt!")
                    mobile.sendValue(FIELDS.info.id, { 
                        style: { color: "red" }, 
                        content: "Failed to encrypt!" 
                    })
                }
                break
            case FIELDS.back.id:
                back()
                break
        }
    })

    return (
        <AppContainer>
            <ConnectWidget mobile={mobile} />
            <Title>Encrypting Content On your Mobile</Title>
            
            {errorMessage && <Error>{errorMessage}</Error>}
            
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-6 mt-4">
                <p className="text-gray-700 mb-6">
                    Your content has been securely sent to your mobile device. Complete the encryption process with these steps:
                </p>
                
                <div className="space-y-4">
                    <InstructionStep>
                        Press <IconImage src="/images/show-icon.png" alt="Show" />
                        to review your original content
                    </InstructionStep>
                    
                    <InstructionStep>
                        Press <IconImage src="/images/encrypt-icon.png" alt="Encrypt" />
                        to encrypt securely using your device's keys
                    </InstructionStep>
                    
                    <InstructionStep>
                        Press <IconImage src="/images/show-icon.png" alt="Show" />
                        on the next screen to verify the encrypted data
                    </InstructionStep>
                    
                    <InstructionStep>
                        Press <IconImage src="/images/send-icon.png" alt="Send" />
                        to securely transfer the encrypted content back
                    </InstructionStep>
                </div>
                
                <p className="text-gray-600 mt-6 text-sm">
                    Once received, this application will store your encrypted content, which can only be decrypted using your mobile device.
                </p>
            </div>

            <Footer>
                <DarkButton onClick={back}>Back</DarkButton>
            </Footer>
        </AppContainer>
    )
}