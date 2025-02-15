import type { Images, UserLoginText } from '@/types'
import images from '@/lib/configs/images'
import userLoginText from '@/lib/configs/userLoginText'

const config = {

  paths: {
    examples: {
      contentTransfer: {
        path: "/global-input-app/content-transfer",
        linkText: "Content Transfer",
      },
      gameControl: {
        path: "/global-input-app/game-example",
        linkText: "Game Control",
      },
      mediaPlayer: {
        path: "/global-input-app/video-player",
        linkText: "Media Player Control",
      },
      sendMessage: {
        path: "/global-input-app/send-message",
        linkText: "Send Message",
      },
      transferForm: {
        path: "/global-input-app/form-data-transfer",
        linkText: "Transfer Form Data",
      },
      mobileEncryption: {
        path: "/global-input-app/mobile-encryption",
        linkText: "Mobile Encryption",
        oldPath: "/global-input-app/qr-printing",
      },
    },
    contactUs: { path: "/global-input-app/contact-us", linkText: "Contact Us" },
    getAppScreen: {
      path: "/global-input-app/get-app",
      linkText: "GET IT FREE",
    },
    home: { path: "/", linkText: "Home" },
    learnMore: {
      path: "/global-input-app/documentation",
      linkText: "Learn More",
    },
    secondScreen: { path: "/global-input-app/second-screen-experience" },
    mobileControl: { path: "/global-input-app/mobile-input-control" },
    mobileAuthentication: { path: "/global-input-app/mobile-authentication" },
    mobilePersonalStorage: {
      path: "/global-input-app/mobile-personal-storage",
    },
    privacy: { path: "/global-input-app/privacy", linkText: "Privacy" },
    aboutContentEncryption: {
      path: "/global-input-app/mobile-content-encryption",
    },
    mobileContentTransfer: {
      path: "/global-input-app/mobile-content-transfer",
    },
  },
  links: {
    websocket: {
      url: "https://github.com/global-input/global-input-node",
    },
    chromeExtension: {
      url: "https://chrome.google.com/webstore/detail/global-input-app/hcklienddlealndjnakkagefaelhnjkp"      
    },
    firefox: {
      url: "https://addons.mozilla.org/en-GB/firefox/addon/global-input-app/",
    },
    jsExtension: {
      url: "https://github.com/global-input/",
    },
    reactJSExtension: {
      url: "https://github.com/global-input/global-input-react",
    },
    tutorialP1: {
      url: "https://www.youtube.com/watch?v=7-vavraSj-s",
    },
    wordpressPlugin: {
      url: "https://en-gb.wordpress.org/plugins/wp-globalinput-login/",
    },
    authenticationDemo: { url: "https://www.youtube.com/watch?v=jLIIrlEoQXM" },
    introductionVideo: { url: "https://www.youtube.com/watch?v=HzeTY1TA4V8" },
    TransferFormGigHub: {
      url: "https://github.com/global-input/",
    },
    appdownload: {
      appStore:
        "https://itunes.apple.com/us/app/global-input-app/id1269541616?mt=8&ign-mpt=uo%3D4",
      playStore:
        "https://play.google.com/store/apps/details?id=uk.co.globalinput2",
    },
    
  },
} as const;

export { config, images, userLoginText }