export interface UserLoginText {
    app: {
      title: string;
    };
    errorMessages: {
      setup: {
        missingPassword: string;
        missingRepeatedPassword: string;
        repeatedPasswordNotMatch: string;
        failedToSetup: string;
      };
      login: {
        missingPassword: string;
        incorrectPassword: string;
      };
      changePassword: {
        missing: {
          originalPassword: string;
          newPassword: string;
          repeatedPassword: string;
        };
        notLoggedIn: string;
        passwordNotMatch: string;
        repeatedPasswordNotMatch: string;
        failedToChangePassword: string;
      };
    };
    setup: {
      title: string;
      password: {
        placeHolder: string;
      };
      repeatedPassword: {
        placeHolder: string;
      };
      buttonText: string;
    };
    login: {
      title: string;
      content: string;
      password: {
        placeHolder: string;
      };
      buttonText: string;
    };
    resetApp: {
      buttonText: string;
      title: string;
      content: string;
      confirmText: string;
      cancelText: string;
    };
    changePassword: {
      title: string;
      labels: {
        originalPassword: string;
        newPassword: string;
        repeatedPassword: string;
        cancelButton: string;
        confirmButton: string;
      };
      errors: {
        missing: {
          originalPassword: string;
          newPassword: string;
          repeatedPassword: string;
        };
        notLoggedIn: string;
        passwordNotMatch: string;
        repeatedPasswordNotMatch: string;
        failedToChangePassword: string;
      };
    };
  }