'use client'

const URL = "iterative.globalInputApp.url"
const getURL = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(URL)
  }
  return null
}
const setURL = (url: string | null | undefined) => {
  if (typeof window === 'undefined') return
  
  url = url?.trim()
  if (url) {
    localStorage.setItem(URL, url)
  } else {
    localStorage.removeItem(URL)
  }
}

const API_KEY = "iterative.globalInputApp.apikey"
const getAPIKey = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(API_KEY)
  }
  return null
}
const setAPIKey = (apiKey: string | null | undefined) => {
  if (typeof window === 'undefined') return

  apiKey = apiKey?.trim()
  if (apiKey) {
    localStorage.setItem(API_KEY, apiKey)
  } else {
    localStorage.removeItem(API_KEY)
  }
}

const SECURITY_GROUP = "iterative.globalInputApp.securityGroup"
const getSecurityGroup = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(SECURITY_GROUP)
  }
  return null
}
const setSecurityGroup = (securityGroup: string | null | undefined) => {
  if (typeof window === 'undefined') return false

  let modified = false
  securityGroup = securityGroup?.trim()
  if (securityGroup) {
    if (securityGroup !== getSecurityGroup()) {
      localStorage.setItem(SECURITY_GROUP, securityGroup)
      modified = true
    }
  } else if (getSecurityGroup()) {
    localStorage.removeItem(SECURITY_GROUP)
    modified = true
  }

  return modified
}

const CODE_KEY = "iterative.globalInputApp.codeKey"
const getCodeKey = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(CODE_KEY)
  }
  return null
}
const setCodeKey = (codeKey: string | null | undefined) => {
  if (typeof window === 'undefined') return false

  let modified = false
  codeKey = codeKey?.trim()
  if (codeKey) {
    if (codeKey !== getCodeKey()) {
      localStorage.setItem(CODE_KEY, codeKey)
      modified = true
    }
  } else if (getCodeKey()) {
    modified = true
    localStorage.removeItem(CODE_KEY)
  }
  return modified
}

export interface ConnectionSettings {
  url?: string
  apikey?: string
  securityGroup?: string
  codeKey?: string
}

export const saveConnectionSettings = (settings: ConnectionSettings) => {
  setURL(settings.url)
  setAPIKey(settings.apikey)
  const needsToPair1 = setSecurityGroup(settings.securityGroup)
  const needsToPair2 = setCodeKey(settings.codeKey)
  return needsToPair1 || needsToPair2
}

export const loadConnectionSettings = (): ConnectionSettings => {
  const url = getURL()
  const apikey = getAPIKey()
  const securityGroup = getSecurityGroup()
  const codeKey = getCodeKey()
  return {
    url: url ? url : undefined,
    apikey: apikey ? apikey : undefined,
    securityGroup: securityGroup ? securityGroup : undefined,
    codeKey: codeKey ? codeKey : undefined,
  }
}