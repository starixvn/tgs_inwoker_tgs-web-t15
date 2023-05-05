import React from "react";
import Template1 from "./template1";
import Template13 from "./template13";

const Inbox = ({
  template,
  inbox,
  page,
  selected,
  openDialog,
  selectedRecord,
  handleChangePage,
  handleRowClick,
  handleSelectedChange,
  handleCloseDialog,
  showDialog,
}) => {
  const commonprops = {
    inbox:inbox,
    page:page,
    selected:selected,
    openDialog,
    selectedRecord,
    handleChangePage,
    handleRowClick,
    handleSelectedChange,
    handleCloseDialog,
    showDialog,
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

export default Inbox;
