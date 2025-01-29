import { FormField } from "@/lib/global-input-mobile"
export const home = {
    id: 'back-to-website-home',
    type: 'button',
    label: 'Back to Home',
    viewId: "row10",
    icon: 'home',
    style: {
        backgroundColor: 'rgb(220,220,220)'
    }
}

export const add = (inputFields: Record<string, any>) => {
    inputFields.backToHome = home
}

export const onFieldChange = (field: FormField, navigate: (path: string) => void) => {
    switch (field.id) {
        case home.id:
            navigate('/')
            break
        default:
            return false
    }
    return true
}