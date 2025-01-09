'use client'

import { useMobile } from '@/lib/global-input-mobile'

export const FIELDS = {
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
    },
    encrypt: {
        id: "startEncrypt",
        label: "Encrypt",
        type: "button",
        viewId: "row1",
        icon: "encrypt"
    },
    show: {
        id: "showOnMobile",
        label: "Show On Mobile",
        icon: "qrcode",
        type: "button",
        viewId: "row1"
    }
}

interface UseConnectMobileProps {
    onShowOnMobile: () => void
    restart: () => void
    finish: () => void
}

export const useConnectMobile = ({ onShowOnMobile, restart, finish }: UseConnectMobileProps) => {
    const mobile = useMobile(initData)
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.back.id:
                restart()
                break
            case FIELDS.show.id:
                onShowOnMobile()
                break
            case FIELDS.encrypt.id:
                restart()
                break
            default:
        }
    })
    return mobile
}

const initData = {
    form: {
        title: "Encrypted Content",
        fields: Object.values(FIELDS)
    }
}