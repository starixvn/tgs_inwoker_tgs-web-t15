import React from "react";
import Template1 from "./template1";
import Template13 from "./template13";

const Header = ({
  template,
  info,
  vip,
  wallet,
  game,
  onhandleClickTab,
  onhandleRefreshClick,
  onhandleMoreBenefitClick,
  onIDVerifyClick,
  onPhoneVerifyClick,
  onEmailVerifyClick,
}) => {
  const commonprops = {
    template: template,
    info: info,
    vip: vip,
    wallet: wallet,
    game: game,
    onhandleClickTab: onhandleClickTab,
    onhandleRefreshClick: onhandleRefreshClick,
    onhandleMoreBenefitClick: onhandleMoreBenefitClick,
    onIDVerifyClick: onIDVerifyClick,
    onPhoneVerifyClick: onPhoneVerifyClick,
    onEmailVerifyClick: onEmailVerifyClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <Template13 {...commonprops} />;
      default:
        return <Template1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default Header;
