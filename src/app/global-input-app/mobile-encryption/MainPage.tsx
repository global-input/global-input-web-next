'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useMobile, ConnectWidget, DisconnectButton } from '@/lib/global-input-mobile'
import { AppContainer, ConnectedInstruction, TipsOnButton } from './components'
import * as mobileUI from '@/lib/common-mobile-uis/mobile-ui'

interface Props {
    domain: string
    encryption: () => void
    decryption: () => void
    qrCodeGenerator: () => void
}

const FIELDS = {
    qrCodeGenerator: {
        id: 'qr-code-generator',
        type: "button",
        label: "Encrypted QR Code",
        icon: "qrcode",
        viewId: "row1",
    },
    encryption: {
        id: 'mobile-encryption',
        type: 'button',
        label: 'Encryption',
        icon: "encrypt",
        viewId: "row2"
    },
    decryption: {
        id: 'mobile-decryption',
        type: 'button',
        icon: "decrypt",
        label: 'Decryption',
        viewId: "row2"
    }
}

mobileUI.add(FIELDS)

const initData = {
    id: "mobile-encryption-main",
    form: {
        title: "Mobile Encryption",
        views: {
            viewIds: {
                row1: {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }
                },
                row2: {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 20,
                        width: '100%',
                    }
                }
            }
        },
        fields: Object.values(FIELDS)
    }
}

export const MainPage: React.FC<Props> = ({ 
    domain, 
    encryption, 
    decryption, 
    qrCodeGenerator 
}) => {
    const router = useRouter()
    const mobile = useMobile(initData, true)

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.encryption.id:
                encryption()
                break
            case FIELDS.decryption.id:
                decryption()
                break
            case FIELDS.qrCodeGenerator.id:
                qrCodeGenerator()
                break
            default:
                mobileUI.onFieldChange(field, router.push)
        }
    })

    return (
        <AppContainer>
            <ConnectWidget mobile={mobile} />
            <ConnectedInstruction mobile={mobile} center={true}>
                <TipsOnButton />
            </ConnectedInstruction>
            <DisconnectButton mobile={mobile} />
        </AppContainer>
    )
}