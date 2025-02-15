import { useMobile } from '@/lib/global-input-mobile';

interface Field {
    id: string;
    type: string;
    value?: string[] | string;
    viewId: string;
    label?: string;
    icon?: string;
    style?: Record<string, any>;
}

export const FIELDS: Record<string, Field> = {
    info: {
        id: "info",
        type: 'info',
        value: ['Waiting for content from the connected application.'],
        viewId: 'info'
    },
    cancel: {
        id: "cancel",
        type: "button",
        label: "Cancel",
        viewId: "row1",
        icon: 'cancel'
    },
    contentOnMobile: {
        id: "contentOnMobile",
        type: "button",
        label: "Press here to use your mobile to input content",
        viewId: "row2",
        style: {
            maxWidth: 200,
            padding: 20,
            backgroundColor: '#EEEEEE'
        },
    },
    startDecrypt: {
        id: "startDecrypt",
        type: "button",
        icon: 'decrypt',
        label: "Decrypt",
        viewId: "row1"
    }
};

const initData = {
    form: {
        title: "Mobile Decryption",
        views: {
            viewIds: {
                info: {
                    style: {
                        marginBottom: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }
                },
                row1: {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }
                }
            }
        },
        fields: Object.values(FIELDS)
    }
};

interface ConnectMobileProps {
    cancel: () => void;
    onContentOnMobile: () => void;
    onDecrypt: () => void;
}

export const useConnectMobile = ({ cancel, onContentOnMobile, onDecrypt }: ConnectMobileProps) => {
    const mobile = useMobile(initData, true);
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.cancel.id:
                cancel();
                break;
            case FIELDS.contentOnMobile.id:
                onContentOnMobile();
                break;
            case FIELDS.startDecrypt.id:
                onDecrypt();
                break;
            default:
        }
    });
    return mobile;
}