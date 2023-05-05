import React from "react";
import Template1 from "./template1";
import Template11 from "./template11";

const LoginTemplateSwitcher = ({
    template,
    logoImg,
    handleChangeSelection,
    isUpdate,
    selected,
    username,
    password,
    hidePassword,
    rememberMe,
    hideConfirmPassword,
    confirmPassword,
    areaCode,
    phone,
    email,
    fromCustomDomain,
    promoteType,
    promoId,
    upper,
    prefill,
    tnc,
    code,
    countdown,
    handleToggleShow,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleForgotpasswordClick,
    handleLoginClick,
    handleBackToHomeClick,
    handleChangeLanguage,
    handleGoDownloadPage,
    handleToggleConfirmPasswordShow,
    handleConfirmPasswordChange,
    handleAreaCodeChange,
    handlePhoneChange,
    handleEmailChange,
    handlePromoCodeChange,
    handleUpperChange,
    handleSwitchType,
    handleTncClick,
    handleRegisterClick,
    handleCodeChange,
    handleGetCodeClick,
    handleActivationClick,
    brandLanguage,
    haveAffiliate
}) => {
  const commonprops = {
    template: template,
    logoImg: logoImg,
    handleChangeSelection: handleChangeSelection,
    isUpdate: isUpdate,
    selected: selected,
    username: username,
    password: password,
    hidePassword: hidePassword,
    rememberMe: rememberMe,
    hideConfirmPassword: hideConfirmPassword,
    confirmPassword: confirmPassword,
    areaCode: areaCode,
    phone: phone,
    email: email,
    fromCustomDomain: fromCustomDomain,
    promoteType: promoteType,
    promoId: promoId,
    upper: upper,
    prefill: prefill,
    tnc: tnc,
    code: code,
    countdown: countdown,
    handleToggleShow: handleToggleShow,
    handleUsernameChange: handleUsernameChange,
    handlePasswordChange: handlePasswordChange,
    handleRememberMeChange: handleRememberMeChange,
    handleForgotpasswordClick: handleForgotpasswordClick,
    handleLoginClick: handleLoginClick,
    handleBackToHomeClick: handleBackToHomeClick,
    handleChangeLanguage: handleChangeLanguage,
    handleGoDownloadPage: handleGoDownloadPage,
    handleToggleConfirmPasswordShow: handleToggleConfirmPasswordShow,
    handleConfirmPasswordChange: handleConfirmPasswordChange,
    handleAreaCodeChange: handleAreaCodeChange,
    handlePhoneChange: handlePhoneChange,
    handleEmailChange: handleEmailChange,
    handlePromoCodeChange: handlePromoCodeChange,
    handleUpperChange: handleUpperChange,
    handleSwitchType: handleSwitchType,
    handleTncClick: handleTncClick,
    handleRegisterClick: handleRegisterClick,
    handleCodeChange: handleCodeChange,
    handleGetCodeClick: handleGetCodeClick,
    handleActivationClick: handleActivationClick,
    brandLanguage: brandLanguage,
    haveAffiliate: haveAffiliate
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 2:
      case "2":
      case 3:
      case "3":
      case 4:
      case "4":
      case 5:
      case "5":
      case 6:
      case "6":
      case 7:
      case "7":
      case 8:
      case "8":
      case 9:
      case "9":
      case 10:
      case "10":
        return <Template1 {...commonprops} />;
      case 11:
        return <Template11 {...commonprops} />;
      default:
        <Template1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default LoginTemplateSwitcher;
