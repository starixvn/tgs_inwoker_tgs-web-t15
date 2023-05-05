import React from "react";
import Template1 from "./template1";
import Template13 from "./template13";

const Transfer = ({
  template,
  wallet,
  game,
  transferFrom,
  transferTo,
  transferAmount,
  mainAccountId,
  disabled,
  loading,
  showMessagebox,
  messageboxText,
  handleTransferFromChange,
  handleTransferToChange,
  handleTransferAmountChange,
  handleTranferClick,
  handleSwitchAutoTransfer,
  performWithdrawFromEveryBrand,
  handleTranferIn,
  handleCloseDialog,
  getAllGameBalance,
  getBalanceList,
}) => {
  const commonprops = {
    wallet: wallet,
    game: game,
    transferFrom: transferFrom,
    transferTo: transferTo,
    transferAmount: transferAmount,
    mainAccountId: mainAccountId,
    disabled: disabled,
    loading: loading,
    showMessagebox: showMessagebox,
    messageboxText: messageboxText,
    handleTransferFromChange: handleTransferFromChange,
    handleTransferToChange: handleTransferToChange,
    handleTransferAmountChange: handleTransferAmountChange,
    handleTranferClick: handleTranferClick,
    handleSwitchAutoTransfer: handleSwitchAutoTransfer,
    performWithdrawFromEveryBrand: performWithdrawFromEveryBrand,
    handleTranferIn: handleTranferIn,
    handleCloseDialog: handleCloseDialog,
    getAllGameBalance: getAllGameBalance,
    getBalanceList: getBalanceList,
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

export default Transfer;
