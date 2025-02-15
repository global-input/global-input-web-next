import { config } from '@/lib/web-config'
import { FormField } from '@/lib/global-input-mobile';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const FIELDS = {
  encryption: {
    id: "mobile-encryption-example",
    type: "button",
    label: "Encryption",
    icon: "encrypt",
    viewId: "row2",
  },
  transferForm: {
    id: "transfer-form-example",
    type: "button",
    label: "Form Data",
    icon: "send",
    viewId: "row2",
  },
  secondScreen: {
    id: "second-screen-example",
    type: "button",
    label: "Second Screen",
    icon: "play",
    viewId: "row2",
  },
  game: {
    id: "game-control-example",
    type: "button",
    label: "Game",
    icon: "play",
    viewId: "row2",
  },

  contentTransfer: {
    id: "content-transfer-example",
    type: "button",
    label: "Simple Transfer",
    icon: "right",
    viewId: "row2",
  },
};

export const onFieldChange = (field:FormField, navigate: { (href: string, options?: NavigateOptions): void; (arg0: string): void; }) => {
  switch (field.id) {
    case FIELDS.encryption.id:
      navigate(config.paths.examples.mobileEncryption.path);
      break;
    case FIELDS.transferForm.id:
      navigate(config.paths.examples.transferForm.path);
      break;
    case FIELDS.secondScreen.id:
      navigate(config.paths.examples.mediaPlayer.path);
      break;
    case FIELDS.game.id:
      navigate(config.paths.examples.gameControl.path);
      break;
    case FIELDS.contentTransfer.id:
      navigate(config.paths.examples.contentTransfer.path);
      break;
    default:
      return false;
  }
  return true;
};
