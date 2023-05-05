import React from "react";
import Template1 from "./template1";
import Template13 from "./template13";

const LeftMenu = ({ template, game, haveAffiliate, activePage, onhandleClickTab }) => {
  const commonprops = {
    template: template,
    game:game,
    haveAffiliate: haveAffiliate,
    activePage: activePage,
    onhandleClickTab: onhandleClickTab,
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

export default LeftMenu;
