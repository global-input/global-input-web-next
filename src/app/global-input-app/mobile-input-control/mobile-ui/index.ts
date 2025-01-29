'use client';

import { useRouter } from 'next/navigation';
import { useMobile } from "@/lib/global-input-mobile";
import { config } from "@/lib/web-config";
export * from "@/lib/global-input-mobile";

export const useConnectToMobile = () => {
  const router = useRouter();
  const mobile = useMobile(initData);
  
  mobile.setOnchange(({ field }) => {
    switch (field.id) {
      case FIELDS.home.id:
        router.push('/');
        break;
      case FIELDS.game.id:
        router.push(config.paths.examples.gameControl.path);
        break;
      default:
    }
  });
  return mobile;
};

const FIELDS = {
  game: {
    id: "game-control-example",
    type: "button",
    label: "Connect Mobile",
    icon: "play",
    viewId: "row2",
  },
  home: {
    id: "back-to-website-home",
    type: "button",
    label: "Home",
    viewId: "row1",
    icon: "home",
  },
};

const initData = {
  id: "about-mobile-input-control",
  form: {
    title: "Mobile Input Control",
    views: {
      viewIds: {
        row1: {
          style: {
            borderWidth: 2,
            borderColor: "#EEEEEE",
            marginBottom: 50,
            width: "98%",
            backgroundColor: "rgb(225, 235, 245)",
          },
        },
      },
    },
    fields: Object.values(FIELDS),
  },
};