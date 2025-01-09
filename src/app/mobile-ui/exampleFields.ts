import { config } from '@/lib/web-config'

export const FIELDS = {
  contentTransfer: {
    id: "content-transfer",
    type: "button",
    label: "Content Transfer",
    viewId: "row2",
    style: {
      backgroundColor: "rgb(225, 235, 245)",
    },
  },
  gameControl: {
    id: "game-example",
    type: "button",
    label: "Game Control",
    viewId: "row2",
    style: {
      backgroundColor: "rgb(225, 235, 245)",
    },
  },
  mediaPlayer: {
    id: "media-player-example",
    type: "button",
    label: "Media Player",
    viewId: "row2",
    style: {
      backgroundColor: "rgb(225, 235, 245)",
    },
  },
  sendMessage: {
    id: "send-message-example",
    type: "button",
    label: "Send Message",
    viewId: "row2",
    style: {
      backgroundColor: "rgb(225, 235, 245)",
    },
  },
  transferForm: {
    id: "transfer-form-data-example",
    type: "button",
    label: "Form Transfer",
    viewId: "row2",
    style: {
      backgroundColor: "rgb(225, 235, 245)",
    },
  },
  mobileEncryption: {
    id: "mobile-encryption-example",
    type: "button",
    label: "Mobile Encryption",
    viewId: "row2",
    style: {
      backgroundColor: "rgb(225, 235, 245)",
    },
  },
}

export const onFieldChange = (field: { id: string }, navigate: (path: string) => void) => {
  switch (field.id) {
    case FIELDS.contentTransfer.id:
      navigate(config.paths.examples.contentTransfer.path)
      break
    case FIELDS.gameControl.id:
      navigate(config.paths.examples.gameControl.path)
      break
    case FIELDS.mediaPlayer.id:
      navigate(config.paths.examples.mediaPlayer.path)
      break
    case FIELDS.sendMessage.id:
      navigate(config.paths.examples.sendMessage.path)
      break
    case FIELDS.transferForm.id:
      navigate(config.paths.examples.transferForm.path)
      break
    case FIELDS.mobileEncryption.id:
      navigate(config.paths.examples.mobileEncryption.path)
      break
    default:
      return false
  }
  return true
}