'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useMobile, ConnectWidget } from '@/lib/global-input-mobile'
import { 
    AppContainer, Error, Footer, DarkButton, 
    Title, ConnectedInstruction 
} from '../../components'

interface Props {
    content: string
    contentOnComputer: (content: string) => void
    showOnComputer: (content: string) => void
    domain: string
}

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
            <ConnectedInstruction mobile={mobile}>
                The content is now sent to your mobile app for encryption.
                On your mobile, you can press <Image src="/images/show-icon.png" alt="Show" width={24} height={24} className="inline" />
                to inspect the content received. Then, press <Image src="/images/encrypt-icon.png" alt="Encrypt" width={24} height={24} className="inline" /> to start encrypting it.
                In the next screen on your mobile, you will be presented with the encrypted content,
                you can press <Image src="/images/show-icon.png" alt="Show" width={24} height={24} className="inline" /> to inspect the encrypted content before pressing <Image src="/images/send-icon.png" alt="Send" width={24} height={24} className="inline" /> to send it to this application.
            </ConnectedInstruction>

            <Footer>
                <DarkButton onClick={back}>Back</DarkButton>
            </Footer>
        </AppContainer>
    )
}