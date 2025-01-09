'use client'

import { useMobile } from '@/lib/global-input-mobile'

export const FIELDS = {
    info: {
        id: "info",
        type: "info",
        value: "",
    },
    content: {
        id: "contentFromMobile",
        type: "text",
        label: "Content",
        value: ""
    },
    back: {
        id: "backToHome",
        label: "Back",
        type: "button",
        viewId: "row1"
    },
    encrypt: {
        id: "startEncrypt",
        label: "Encrypt",
        type: "button",
        viewId: "row1",
        icon: "encrypt"
    }
}

interface UseConnectMobileProps {
    initialContent: string
    cancel: () => void
    setContent: (content: string) => void
    onEncrypt: () => void
}

export const useConnectMobile = ({ 
    initialContent, 
    cancel, 
    setContent, 
    onEncrypt 
}: UseConnectMobileProps) => {
    const mobile = useMobile(() => ({
        form: {
            title: "Content To Encrypt",
            fields: [
                { ...FIELDS.content, value: initialContent },
                FIELDS.info,
                FIELDS.back,
                FIELDS.encrypt
            ]
        }
    }))

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.back.id:
                cancel()
                break
            case FIELDS.content.id:
                if (typeof field.value === 'string') {
                    setContent(field.value)
                }
                break
            case FIELDS.encrypt.id:
                onEncrypt()
                break
            default:
        }
    })
    return mobile
}