import React from "react";
import Template1 from "./template1/index";
import Template13 from "./template13/index";
import NewStep1 from "./template1/NewStep1";
import NewStep1T13 from "./template13/NewStep1";

const Deposit = ({
  template,
  ui,
  wallet,
  selectedPaymentIndex,
  step,
  loading,
  isMaintenance,
  openAnnouncement,
  showTabContainer,
  handleAddCard,
  handleTabClick,
  handleCloseAnnouncement,
  switchStep,
}) => {
  const commonprops = {
    ui: ui,
    wallet: wallet,
    selectedPaymentIndex: selectedPaymentIndex,
    step: step,
    loading: loading,
    isMaintenance: isMaintenance,
    openAnnouncement: openAnnouncement,
    showTabContainer: showTabContainer,
    handleAddCard: handleAddCard,
    handleTabClick: handleTabClick,
    handleCloseAnnouncement: handleCloseAnnouncement,
    switchStep: switchStep,
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

const NewStep1Template = ({
  template,
  accountList,
  bankCardList,
  methodList,
  promotionList,
  displaysequence,
  selectedBankCard,
  handleBankCardChange,
  amount,
  onAmountChange,
  name,
  onNameChange,
  account,
  onAccountChange,
  handleSelectAccountChange,
  selectedMethodIndex,
  onMethodChange,
  selectedChannelIndex,
  onChannelChange,
  depositPromotion,
  handleDepositPromotionChange,
  paymentType,
  onNextClick,
  exchangeRate,
  files,
  onFileChange,
  playerNote,
  onPlayerNoteChange,
  paymentCode,
  alteredPaymentCode,
  method,
  formatBankCardDetail,
  performCopy,
  SubHeaderContainer,
}) => {
  const commonprops = {
    accountList: accountList,
    bankCardList: bankCardList,
    methodList: methodList,
    promotionList: promotionList,
    displaysequence: displaysequence,
    selectedBankCard: selectedBankCard,
    handleBankCardChange: handleBankCardChange,
    amount: amount,
    onAmountChange: onAmountChange,
    name: name,
    onNameChange: onNameChange,
    account: account,
    onAccountChange: onAccountChange,
    handleSelectAccountChange: handleSelectAccountChange,
    selectedMethodIndex: selectedMethodIndex,
    onMethodChange: onMethodChange,
    selectedChannelIndex: selectedChannelIndex,
    onChannelChange: onChannelChange,
    depositPromotion: depositPromotion,
    handleDepositPromotionChange: handleDepositPromotionChange,
    paymentType: paymentType,
    onNextClick: onNextClick,
    exchangeRate: exchangeRate,
    files: files,
    onFileChange: onFileChange,
    playerNote: playerNote,
    onPlayerNoteChange: onPlayerNoteChange,
    paymentCode: paymentCode,
    alteredPaymentCode: alteredPaymentCode,
    method: method,
    formatBankCardDetail: formatBankCardDetail,
    performCopy: performCopy,
    SubHeaderContainer: SubHeaderContainer,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <NewStep1T13 {...commonprops} />;
      default:
        return <NewStep1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export { Deposit, NewStep1Template };
