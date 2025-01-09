interface DeviceImages {
    backIcon: string;
    printIcon: string;
    sendIcon: string;
    signIcon: string;
    playIcon: string;
    pauseIcon: string;
    skipToEnd: string;
    skipToBegin: string;
    ffIcon: string;
    rwIcon: string;
    disconnectIcon: string;
    rightIcon: string;
    leftIcon: string;
    upIcon: string;
    downIcon: string;
    resetIcon: string;
    connectedIcon: string;
    settingsIcon: string;
    radio: {
      checked: string;
      unchecked: string;
    };
    checkbox: {
      checked: string;
      unchecked: string;
    };
    encrypt: string;
    home: string;
  }
  
  interface AppImages {
    icons: {
      connected: string;
    };
    buttons: {
      settings: string;
      sendIcon: string;
    };
  }
  
  interface IconDefinition {
    name: string;
    image: string;
  }
  
  export interface Images {
    logo: string;
    saveWhite: string;
    saveIcon: string;
    qrcode: string;
    qrcodeLight: string;
    clipboardCopy: string;
    clipboardCopyWhite: string;
    clipboardPaste: string;
    addRecord: string;
    back: string;
    home: string;
    doneIcon: string;
    doneIconDark: string;
    scanIcon: string;
    scanIconNotSelected: string;
    manageFormData: string;
    manageFormDataNotSelected: string;
    backup: string;
    backupNotSelected: string;
    restore: string;
    restoreDark: string;
    restoreNotSelected: string;
    help: string;
    helpNotSelected: string;
    revealPassword: string;
    revealPasswordLight: string;
    hidePassword: string;
    hidePasswordLight: string;
    edit: string;
    editLight: string;
    cancelLight: string;
    cancelIcon: string;
    deleteIcon: string;
    deleteIconLight: string;
    addNewField: string;
    addField: string;
    clearField: string;
    search: string;
    selectIcon: string;
    importIcon: string;
    importLightIcon: string;
    exportIcon: string;
    exportLightIcon: string;
    fillForm: string;
    disconnectIcon: string;
    browser: string;
    changePassword: string;
    encryptIcon: string;
    encryptedQR: string;
    encryptedQRSelected: string;
    keyIcon: string;
    keyIconSelected: string;
    serviceData: string;
    userPreference: string;
    randomIcon: string;
    randomIconLight: string;
    foldersIcon: string;
    folder: string;
    folderLight: string;
    note: string;
    key: string;
    logoutIcon: string;
    manageKeyIcon: string;
    resetKeyIcon: string;
    whiteKey: string;
    activeIcon: string;
    activeDarkIcon: string;
    labelIcon: string;
    timestampIcon: string;
    activateIcon: string;
    activateIconWhite: string;
    skipIcon: string;
    okIcon: string;
    moreIcon: string;
    moreIconSelected: string;
    passwordIcon: string;
    continueIcon: string;
    idIcon: string;
    domainSearch: string;
    fieldIcon: string;
    decryptIcon: string;
    decryptIconLight: string;
    matchedIcon: string;
    messsage: string;
    exportText: string;
    discardIcon: string;
    updownIcon: string;
    tickonIcon: string;
    tickoffIcon: string;
    device: DeviceImages;
    app: AppImages;
    icons: IconDefinition[];
    findImageIcon(name: string): string | null;
  }
  