import React from "react";
import Template1 from "./template1/index";
import Template13 from "./template13/index";
import MainT1 from "./template1/Main";
import MainT13 from "./template13/Main";
import CardManageT1 from "./template1/CardManage";
import CardManageT13 from "./template13/CardManage";
import AddCardT1 from "./template1/AddCard";
import AddCardT13 from "./template13/AddCard";
import AddCardSuccessT1 from "./template1/AddCardSuccess";
import AddCardSuccessT13 from "./template13/AddCardSuccess";
import DisabledT1 from "./template1/Disabled";
import DisabledT13 from "./template13/Disabled";
import SuccessT1 from "./template1/Success";
import SuccessT13 from "./template13/Success";

const Withdrawal = ({
  template,
  openAnnouncement,
  loading,
  handleCloseAnnouncement,
  switchDisplayView,
}) => {
  const commonprops = {
    openAnnouncement: openAnnouncement,
    loading: loading,
    handleCloseAnnouncement: handleCloseAnnouncement,
    switchDisplayView: switchDisplayView,
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

const MainTemplate = ({
  template,
  amount,
  playerNote,
  min,
  max,
  disabled,
  exchangeRate,
  cardList,
  minWithdrawLimit,
  selectedCardIndex,
  handleSelectCardChange,
  getTransferLimit,
  onhandleManageCardClick,
  performWithdrawFromEveryBrand,
  onhandleRefreshClick,
  handleAmountChange,
  handlePlayerNote,
  handleWithdrawalClick,
}) => {
  const commonprops = {
    amount: amount,
    playerNote: playerNote,
    min: min,
    max: max,
    disabled: disabled,
    exchangeRate: exchangeRate,
    cardList: cardList,
    minWithdrawLimit: minWithdrawLimit,
    selectedCardIndex: selectedCardIndex,
    handleSelectCardChange: handleSelectCardChange,
    getTransferLimit: getTransferLimit,
    onhandleManageCardClick: onhandleManageCardClick,
    performWithdrawFromEveryBrand: performWithdrawFromEveryBrand,
    onhandleRefreshClick: onhandleRefreshClick,
    handleAmountChange: handleAmountChange,
    handlePlayerNote: handlePlayerNote,
    handleWithdrawalClick: handleWithdrawalClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <MainT13 {...commonprops} />;
      default:
        return <MainT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

const CardManageTemplate = ({
  template,
  bankCardList,
  onhandleDeleteCardClick,
  onhandleAddCardClick,
  onhandleBackClick,
}) => {
  const commonprops = {
    bankCardList: bankCardList,
    onhandleDeleteCardClick: onhandleDeleteCardClick,
    onhandleAddCardClick: onhandleAddCardClick,
    onhandleBackClick: onhandleBackClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <CardManageT13 {...commonprops} />;
      default:
        return <CardManageT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

const AddCardTemplate = ({
  template,
  isDeposit,
  eWalletCustom,
  eWalletCustomIDR,
  depositList,
  withdrawalList,
  bankList,
  channelList,
  selectedBankType,
  selectedBankTypeIndex,
  selectedChannelIndex,
  bankName,
  disableBankNameInput,
  bankAccountName,
  disableBankAccountNameInput,
  number,
  handleBankTypeChange,
  handleChannelChange,
  handleBankNameChange,
  handleBankBranchChange,
  handleBankAccountNameChange,
  handleNameChange,
  handlePhoneChange,
  handleNumberChange,
  handleNextClick,
  showBack,
  onhandleBackClick,
}) => {
  const commonprops = {
    isDeposit: isDeposit,
    eWalletCustom: eWalletCustom,
    eWalletCustomIDR: eWalletCustomIDR,
    depositList: depositList,
    withdrawalList: withdrawalList,
    bankList: bankList,
    channelList: channelList,
    selectedBankType: selectedBankType,
    selectedBankTypeIndex: selectedBankTypeIndex,
    selectedChannelIndex: selectedChannelIndex,
    bankName: bankName,
    disableBankNameInput: disableBankNameInput,
    bankAccountName: bankAccountName,
    disableBankAccountNameInput: disableBankAccountNameInput,
    number: number,
    handleBankTypeChange: handleBankTypeChange,
    handleChannelChange: handleChannelChange,
    handleBankNameChange: handleBankNameChange,
    handleBankBranchChange: handleBankBranchChange,
    handleBankAccountNameChange: handleBankAccountNameChange,
    handleNameChange: handleNameChange,
    handlePhoneChange: handlePhoneChange,
    handleNumberChange: handleNumberChange,
    handleNextClick: handleNextClick,
    showBack: showBack,
    onhandleBackClick: onhandleBackClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <AddCardT13 {...commonprops} />;
      default:
        return <AddCardT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

const AddCardSuccessTemplate = ({
  template,
  isDeposit,
  bankCardList,
  onhandleBindCardClick,
  onhandleGoWithdrawClick,
  onhandleGoDepositClick,
  onhandleCSClick,
}) => {
  const commonprops = {
    isDeposit: isDeposit,
    bankCardList: bankCardList,
    onhandleBindCardClick: onhandleBindCardClick,
    onhandleGoWithdrawClick: onhandleGoWithdrawClick,
    onhandleGoDepositClick: onhandleGoDepositClick,
    onhandleCSClick: onhandleCSClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <AddCardSuccessT13 {...commonprops} />;
      default:
        return <AddCardSuccessT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

const DisabledTemplate = ({ template, handleCSClick }) => {
  const commonprops = {
    handleCSClick: handleCSClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <DisabledT13 {...commonprops} />;
      default:
        return <DisabledT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

const SuccessTemplate = ({ template, verified, handleConfirmClick, handleVerifyName }) => {
  const commonprops = {
    verified: verified,
    handleConfirmClick: handleConfirmClick,
    handleVerifyName: handleVerifyName,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <SuccessT13 {...commonprops} />;
      default:
        return <SuccessT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export {
  Withdrawal,
  MainTemplate,
  CardManageTemplate,
  AddCardTemplate,
  AddCardSuccessTemplate,
  DisabledTemplate,
  SuccessTemplate,
};
