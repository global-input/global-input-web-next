import { useNavigate } from "react-router-dom";
import { useMobile } from "../../mobile";
import { config } from "../../mobile-app/configs";
export * from "../../mobile";
export const useConnectToMobile = () => {
  const navigate = useNavigate();
  const mobile = useMobile(initData);
  mobile.setOnchange(({ field }) => {
    switch (field.id) {
      case FIELDS.home.id:
        navigate("/");
        break;
      case FIELDS.transferForm.id:
        navigate(config.paths.examples.transferForm.path);
        break;
      default:
    }
  });
  return mobile;
};

const FIELDS = {
  transferForm: {
    id: "transfer-form-example",
    type: "button",
    label: "See It In Action",
    icon: "save",
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
  id: "about-mobile-secure-storage",
  form: {
    title: "Mobile Secure Storage",
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
