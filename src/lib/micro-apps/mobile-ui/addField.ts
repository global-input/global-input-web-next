export const home = {
    id: 'back-to-website-home',
    type: 'button',
    label: 'Home',
    icon: 'home',
    viewId: "row9"
}

export const add = (inputFields: Record<string, any>) => {
    inputFields.backToHome = home
}

export const getFields = () => [home]

export const onFieldChange = (field: { id: string }, navigate: (path: string) => void) => {
    switch (field.id) {
        case home.id:
            navigate('/')
            break
        default:
            return false
    }
    return true
}