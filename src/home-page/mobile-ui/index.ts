import { useNavigate } from "react-router-dom";
import { useMobile } from "../../global-input-mobile";
import * as exampleFields from "./exampleFields";
import * as pageMenu from "./pageMenu";
export * from "../../global-input-mobile";
export const useConnectToMobile = () => {
  const navigate = useNavigate();
  const mobile = useMobile(initData);
  mobile.setOnchange(({ field }) => {
    if (exampleFields.onFieldChange(field, navigate)) {
      return true;
    }
    if (pageMenu.onFieldChange(field, navigate)) {
      return true;
    }
  });
  return mobile;
};

const initData = {
  id: "website-home",
  form: {
    title: "Global Input App",
    views: {
      viewIds: {
        row1: {
          style: {
            borderWidth: 2,
            borderColor: "#EEEEEE",
            marginBottom: 20,
            width: "98%",
            backgroundColor: "rgb(225, 235, 245)",
            justifyContent: "space-between",
          },
        },
        row2: {
          style: {
            borderWidth: 2,
            borderColor: "#EEEEEE",
            marginBottom: 20,
            width: "98%",
            backgroundColor: "rgb(225, 235, 245)",
            justifyContent: "space-between",
          },
        },
      },
    },
    fields: [
      {
        type: "info",
        viewId: "row2",
        value: {
          type: "view",
          style: {
            width: "100%",
            display: "flex",
            fontSize: 20,
            color: "white",
            flexDirection: "row",
            backgroundColor: "rgb(74, 113, 205)",
          },
          content: "Example Mobile Controls",
        },
      },
      {
        type: "info",
        viewId: "row1",
        value: {
          type: "view",
          style: {
            width: "100%",
            display: "flex",
            fontSize: 20,
            color: "white",
            flexDirection: "row",
            backgroundColor: "rgb(74, 113, 205)",
          },
          content: "Page Navigation",
        },
      },
      ...Object.values(exampleFields.FIELDS),
      ...Object.values(pageMenu.FIELDS).filter(
        (f) => f.id !== pageMenu.FIELDS.home.id
      ),
    ],
  },
};
