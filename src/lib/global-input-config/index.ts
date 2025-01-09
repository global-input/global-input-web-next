'use client'

const integratedDevelopment = true

const globalInputAppLaunchBaseURL = "https://globalinput.co.uk/global-input-app/mobile-app?launchType=qr"

const testAppLaunchHost = 'tnode2.globalinput.co.uk'

const testGlobalInputAppLaunchBaseURL = `https://${testAppLaunchHost}/global-input-app/mobile-app?launchType=qr`

const localhost = 'localhost'

export const getGlobalInputAppLaunchBaseURL = (): string => {
    if (typeof window === 'undefined') {
        return globalInputAppLaunchBaseURL
    }

    if (!integratedDevelopment) {
        return globalInputAppLaunchBaseURL
    }

    if (window.location.hostname === testAppLaunchHost || window.location.hostname === localhost) {
        return testGlobalInputAppLaunchBaseURL
    }

    return globalInputAppLaunchBaseURL
}

// Determine environment
let environment: 'development' | 'production'

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    environment = 'development'
} else {
    environment = process.env.NODE_ENV === 'development' ? 'development' : 'production'
}

export const isDevelopment = environment === 'development'

export const developmentScanDelayDuration = 500