import React from "react";
import Template1 from "./template1";
import Template13 from "./template13";

const Profile = ({
  template,
  account,
  forcedverify,
  openDialog,
  dialogTitle,
  dialogComponent,
  handleButtonClick,
  handleCloseDialog,
  showDialog,
}) => {
  const commonprops = {
    account: account,
    forcedverify: forcedverify,
    openDialog: openDialog,
    dialogTitle: dialogTitle,
    dialogComponent: dialogComponent,
    handleButtonClick: handleButtonClick,
    handleCloseDialog: handleCloseDialog,
    showDialog: showDialog,
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

export default Profile;
