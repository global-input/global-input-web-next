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
        id: "backToContent",
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
    content: string
    restart: () => void
    finish: () => void
}

export const useConnectMobile = ({ content, restart, finish }: UseConnectMobileProps) => {
    const mobile = useMobile(() => ({
        form: {
            title: "Encrypted Content",
            fields: [
                { ...FIELDS.content, value: content },
                FIELDS.info,
                FIELDS.back,
                FIELDS.encrypt
            ]
        }
    }))

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.back.id:
                restart()
                break
            case FIELDS.encrypt.id:
                restart()
                break
            default:
        }
    })
    return mobile
}