'use client'

import { useRouter } from 'next/navigation'
import { useMobile } from '@/lib/global-input-mobile'

const FIELDS = {
  info: {
    type: "info",
    value: "Free and open-source mobile app to seamlessly operate and control multi-device environments.",
  },
  home: {
    id: "back-to-website-home",
    type: "button",
    label: "Home",
    viewId: "row1",
    icon: "home",
  },
}

const initData = {
  form: {
    title: "Get Global Input App Software",
    fields: Object.values(FIELDS),
  },
}

export const useConnectToMobile = () => {
  const router = useRouter()
  const mobile = useMobile(initData)
  
  mobile.setOnchange(({ field }) => {
    switch (field.id) {
      case FIELDS.home.id:
        router.push("/")
        break
      default:
    }
  })
  
  return mobile
}