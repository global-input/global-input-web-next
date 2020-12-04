import { useHistory } from 'react-router-dom';
import { useConnectToMobile } from '../mobile';
import * as pageMenu from './pageMenu';


export const useMobile = () => {
    const history = useHistory();
    const onchange = ({ field }) => {
        onFieldChange(field, history);
    }
    const { MobileConnect } = useConnectToMobile(initData, onchange);
    return MobileConnect;
}

const initData = {
    id: 'privacy-policy',
    form: {
        title: "Privacy Policy",
        fields: [{
            type: "info",
            value: "You can now read our privacy policy on the big screen."
        }, pageMenu.FIELDS.home, pageMenu.FIELDS.contactUs, pageMenu.FIELDS.getItFree]
    }
};
const onFieldChange = (field, history) => {
    if (pageMenu.onFieldChange(field, history)) {
        return true;
    }
    return false;
};
