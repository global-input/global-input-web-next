'use client'

import { useMobile } from '@/lib/global-input-mobile'

export const FIELDS = {
    info: {
        id: "info",
        type: "info",
        value: "Please provide the content to be encrypted on the computer.",
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
    },
    mobile: {
        id: "contentOnMobile",
        label: "Content On Mobile",
        type: "button",
        viewId: "row1",
        icon: "mobile"
    }
}

interface UseConnectMobileProps {
    cancel: () => void
    onContentOnMobile: () => void
    onEncrypt: () => void
}

export const useConnectMobile = ({ cancel, onContentOnMobile, onEncrypt }: UseConnectMobileProps) => {
    const mobile = useMobile(() => ({
        form: {
            title: "Content To Encrypt",
            fields: Object.values(FIELDS)
        }
    }))

    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.back.id:
                cancel()
                break
            case FIELDS.mobile.id:
                onContentOnMobile()
                break
            case FIELDS.encrypt.id:
                onEncrypt()
                break
            default:
        }
    })
    return mobile
}