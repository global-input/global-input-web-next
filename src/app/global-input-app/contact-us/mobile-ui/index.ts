'use client'

import { useRouter } from 'next/navigation'
import { useMobile } from '@/lib/global-input-mobile'
export * from '@/lib/global-input-mobile'

const FIELDS = {
  companyName: {
    id: "company_name",
    type: "text",
    label: "Company Name",
    value: "Iterative Solution",
  },
  address: {
    id: "address",
    label: "Address",
    type: "text",
    nLines: 5,
    value:
      "Iterative Solution Limited \n Kemp House \n \n 152-160 \n City Road\n London EC1V 2NX",
  },
  phone: {
    id: "phone",
    label: "Phone",
    type: "text",
    value: "020 3290 6278",
  },
  email: {
    id: "email",
    label: "Email",
    type: "text",
    value: "info@iterativesolution.co.uk",
  },
  info: {
    id: "info",
    type: "info",
    value: [
      "You may save our contact info by pressing \"Save\" button. Note that the 'save' button will not be displayed if the identical information already exists in your mobile storage.",
    ],
  },
  back: {
    id: "back-to-website-home",
    type: "button",
    label: "back",
    icon: "back",
    viewId: "footer",
  },
}

const initData = {
  id: "iterative-contact-us",
  form: {
    id: "iterative@contact",
    title: "Contact Us",
    fields: Object.values(FIELDS),
  },
}

export const useConnectToMobile = () => {
  const router = useRouter()
  const mobile = useMobile(initData)
  
  mobile.setOnchange(({ field }) => {
    switch (field.id) {
      case FIELDS.back.id:
        router.push("/")
        break
      default:
        return false
    }
  })
  
  return mobile
}