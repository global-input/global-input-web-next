import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { formDataUtil } from '../../store';
import images from '../../configs/images';
import menusConfig from '../../configs/menusConfig';
import renderFormFields from './renderFormFields';
import ViewWithTabMenu from '../../components/menu/ViewWithTabMenu';
import DisplayBlockText from '../../components/display-text/DisplayBlockText';

const FormLabel = ({ formData }) => {
  if (formData.label) {
    return (
      <div style={styles.formEditField}>
        <img src={images.folder} style={styles.labelIcon} alt="" />
        <div style={styles.itemRecord}>
          <span style={styles.valueText}>{formData.label}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const MyComponent = ({ formData, menuItems, title, content1, content2 }) => {
  const [action, setAction] = useState({ show: false, modal: null });

  useEffect(() => {
    setAction({ show: false, modal: null });
  }, [formData]);

  const onShow = () => setAction({ ...action, show: true });
  const onHide = () => setAction({ ...action, show: false });

  const appmenus = action.show
    ? [{ menu: menusConfig.hideSecret.menu, onPress: onHide }]
    : [{ menu: menusConfig.showSecret.menu, onPress: onShow }];

  let formid = '';
  if (formData && formData.id) {
    formid = formDataUtil.getFormIdFromTemplateAndFields(formData.id, formData.fields);
  }

  return (
    <ViewWithTabMenu menuItems={[...menuItems, ...appmenus]} title={title}>
      <div style={styles.content}>
        <DisplayBlockText content={content1} />
        <div style={styles.formEditField}>
          <img src={images.idIcon} style={styles.labelIcon} alt="" />
          <div style={styles.itemRecord}>
            <span style={styles.valueText}>{formid}</span>
          </div>
        </div>
        <FormLabel formData={formData} />
        {renderFormFields({ action, formData })}
      </div>
      <div style={styles.content}>
        <DisplayBlockText content={content2} />
      </div>
    </ViewWithTabMenu>
  );
};

export default MyComponent;