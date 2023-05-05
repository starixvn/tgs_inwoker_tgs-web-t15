import React from "react";
import styled from "styled-components";
import { Select, FormControl, withStyles } from "@material-ui/core";
import CustomTextField from "../../../../../Share/TextField";
import Button from "../../../../../Share/Button";

import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 0px;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;
  color: #818181;
  margin: 10px 0 0 0;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: table;
`;

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
    "&.MuiSelect-outlined.MuiSelect-outlined": {
      paddingRight: 44,
    },
  },
}))(Select);
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "395px",
    height: "38px",
    marginTop: "12px",
    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);

const AddCard = ({
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
  return (
    <Container>
      <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>
      {!config.features.AddCard_HideCertainField && (
        <>
          <TextFieldLabel>{i18n.t("common.withdrawalBankType")}</TextFieldLabel>
          <TextFieldContainer>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                displayEmpty
                value={selectedBankTypeIndex}
                onChange={handleBankTypeChange}
              >
                {isDeposit
                  ? depositList.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {item.banktype}
                        </option>
                      );
                    })
                  : withdrawalList.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {item.banktype}
                        </option>
                      );
                    })}
              </CustomSelect>
            </CustomFormControl>
          </TextFieldContainer>
        </>
      )}

      {!config.features.AddCard_HideChannel && (
        <>
          <TextFieldLabel>
            {config.features.AddCard_Bank_Custom_IDR &&
            ((!isDeposit &&
              withdrawalList.length > 0 &&
              withdrawalList[selectedBankTypeIndex].banktype === "Bank") ||
              (isDeposit &&
                depositList.length > 0 &&
                depositList[selectedBankTypeIndex].banktype === "Bank"))
              ? i18n.t("card.addCard.BankName")
              : i18n.t("common.withdrawalChannel")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                displayEmpty
                value={selectedChannelIndex}
                onChange={handleChannelChange}
              >
                {isDeposit
                  ? depositList.length > 0 &&
                    channelList.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {i18n.t(item.channelname)}
                        </option>
                      );
                    })
                  : withdrawalList.length > 0 &&
                    channelList.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {i18n.t(item.channelname)}
                        </option>
                      );
                    })}
              </CustomSelect>
            </CustomFormControl>
          </TextFieldContainer>
        </>
      )}
      {(() => {
        if (
          (!isDeposit &&
            withdrawalList.length > 0 &&
            withdrawalList[selectedBankTypeIndex].banktype === "Bank") ||
          (isDeposit &&
            depositList.length > 0 &&
            depositList[selectedBankTypeIndex].banktype === "Bank")
        ) {
          return (
            <>
              {!(
                config.features.AddCard_HideCertainField ||
                config.features.AddCard_Bank_Custom_IDR
              ) && (
                <>
                  {!eWalletCustom && (
                    <>
                      <TextFieldLabel>
                        {config.features.AddCard_DisplayFPS
                          ? i18n.t("hk28.card.addCard.BankName")
                          : i18n.t("card.addCard.BankName")}
                      </TextFieldLabel>
                      <TextFieldContainer>
                        {config.features.AddCard_BankDropdown ? (
                          <CustomFormControl>
                            <CustomSelect
                              native
                              variant="outlined"
                              displayEmpty
                              value={bankName}
                              name="bankName"
                              onChange={handleBankNameChange}
                            >
                              <option value="" selected disabled>
                                {config.features.AddCard_DisplayFPS
                                  ? i18n.t("hk28.card.addCard.msgEnterBankName")
                                  : i18n.t("card.addCard.msgEnterBankName")}
                              </option>
                              {bankList.length > 0 &&
                                bankList.map((item, index) => {
                                  return (
                                    <option value={item} key={index}>
                                      {item}
                                    </option>
                                  );
                                })}
                            </CustomSelect>
                          </CustomFormControl>
                        ) : (
                          <CustomTextField
                            marginTop={10}
                            placeholder={
                              config.features.AddCard_DisplayFPS
                                ? i18n.t("hk28.card.addCard.msgEnterBankName")
                                : i18n.t("card.addCard.msgEnterBankName")
                            }
                            width={395}
                            height={38}
                            float={"none"}
                            maxLength={255}
                            disabled={disableBankNameInput}
                            value={bankName}
                            name="bankName"
                            handleTextFieldChange={handleBankNameChange}
                          ></CustomTextField>
                        )}
                      </TextFieldContainer>
                    </>
                  )}
                  {(() => {
                    if (config.features.AddCard_BankBranch && !eWalletCustom) {
                      return (
                        <React.Fragment>
                          <TextFieldLabel>
                            {i18n.t("card.addCard.branch")}
                          </TextFieldLabel>
                          <TextFieldContainer>
                            <CustomTextField
                              marginTop={10}
                              placeholder={i18n.t(
                                "card.addCard.branchPlaceHolder"
                              )}
                              width={395}
                              height={38}
                              float={"none"}
                              maxLength={255}
                              name="bankBranch"
                              handleTextFieldChange={handleBankBranchChange}
                            ></CustomTextField>
                          </TextFieldContainer>
                        </React.Fragment>
                      );
                    }
                  })()}
                </>
              )}

              <TextFieldLabel>
                {eWalletCustomIDR
                  ? i18n.t("idr1.eWalletAccount")
                  : eWalletCustom
                  ? i18n.t("card.addCard.eWalletAccount")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.card.addCard.BankAccountName")
                  : i18n.t("card.addCard.BankAccountName")}
              </TextFieldLabel>
              <TextFieldContainer>
                <CustomTextField
                  marginTop={10}
                  placeholder={
                    eWalletCustomIDR
                      ? i18n.t("idr1.eWalletAccount")
                      : eWalletCustom
                      ? i18n.t("card.addCard.msgEnterEwalletAccount")
                      : config.features.AddCard_DisplayFPS
                      ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                      : i18n.t("card.addCard.msgEnterBankAccountName")
                  }
                  width={395}
                  height={38}
                  float={"none"}
                  maxLength={255}
                  handleTextFieldChange={handleBankAccountNameChange}
                  name="bankAccountName"
                  value={bankAccountName}
                  disabled={disableBankAccountNameInput}
                ></CustomTextField>
              </TextFieldContainer>
            </>
          );
        } else {
          return null;
        }
      })()}
      {((!isDeposit &&
        withdrawalList.length > 0 &&
        withdrawalList[selectedBankTypeIndex].banktype === "EWallet") ||
        (isDeposit &&
          depositList.length > 0 &&
          depositList[selectedBankTypeIndex].banktype === "EWallet")) && (
        <React.Fragment>
          <TextFieldLabel>
            {eWalletCustomIDR
              ? i18n.t("idr1.eWalletAccount")
              : eWalletCustom
              ? i18n.t("card.addCard.eWalletAccount")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.card.addCard.BankAccountName")
              : i18n.t("card.addCard.BankAccountName")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
              marginTop={10}
              placeholder={
                eWalletCustomIDR
                  ? i18n.t("idr1.eWalletAccount")
                  : eWalletCustom
                  ? i18n.t("card.addCard.msgEnterEwalletAccount")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                  : i18n.t("card.addCard.msgEnterBankAccountName")
              }
              width={395}
              height={38}
              float={"none"}
              maxLength={255}
              name="bankAccountName"
              handleTextFieldChange={handleBankAccountNameChange}
              value={bankAccountName}
              disabled={disableBankAccountNameInput}
            ></CustomTextField>
          </TextFieldContainer>
        </React.Fragment>
      )}
      {(!isDeposit &&
        withdrawalList.length > 0 &&
        (withdrawalList[selectedBankTypeIndex].banktype === "ThirdParty" ||
          withdrawalList[selectedBankTypeIndex].banktype === "FPS")) ||
      (isDeposit &&
        depositList.length > 0 &&
        (depositList[selectedBankTypeIndex].banktype === "ThirdParty" ||
          depositList[selectedBankTypeIndex].banktype === "FPS")) ? (
        <div>
          <TextFieldLabel>
            {config.features.AddCard_InputAddFPS
              ? i18n.t("custom.addcard.name")
              : i18n.t("profile.nameVerify.title")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
              marginTop={10}
              placeholder={
                config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.msgPlsEnterName")
                  : i18n.t("profile.nameVerify.msgPlsEnterName")
              }
              width={395}
              height={38}
              maxLength={50}
              float={"none"}
              handleTextFieldChange={handleNameChange}
              name="name"
            ></CustomTextField>
          </TextFieldContainer>
          <TextFieldLabel>
            {eWalletCustomIDR
              ? i18n.t("idr1.phone")
              : config.features.AddCard_InputAddFPS
              ? i18n.t("custom.addcard.phoneNumber")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("bet28.phoneNumber")
              : i18n.t("common.phoneNumber")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
              marginTop={10}
              placeholder={
                eWalletCustomIDR
                  ? i18n.t("idr1.phone")
                  : config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.msgEnterPhone")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("bet28.msgEnterPhone")
                  : i18n.t("common.msgEnterPhone")
              }
              width={395}
              height={38}
              maxLength={config.features.MAX_PHONE_LENGTH || 10}
              float={"none"}
              name="phone"
              handleTextFieldChange={handlePhoneChange}
            ></CustomTextField>
          </TextFieldContainer>
        </div>
      ) : (
        <div>
          <TextFieldLabel>
            {eWalletCustomIDR
              ? i18n.t("idr1.phone")
              : eWalletCustom || selectedBankType("Pulsa")
              ? i18n.t("card.addCard.phone")
              : config.features.AddCard_DisplayGCash
              ? i18n.t("piso.withdrawalNumber")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.withdrawalNumber")
              : i18n.t("common.withdrawalNumber")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
              marginTop={10}
              placeholder={
                eWalletCustomIDR
                  ? i18n.t("idr1.phone")
                  : eWalletCustom || selectedBankType("Pulsa")
                  ? i18n.t("card.addCard.msgEnterPhone")
                  : config.features.AddCard_DisplayGCash
                  ? i18n.t("piso.msgEnterWithdrawalNumber")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.msgEnterWithdrawalNumber")
                  : i18n.t("common.msgEnterWithdrawalNumber")
              }
              width={395}
              maxLength={
                (selectedBankType("ThirdParty") ||
                  selectedBankType("Pulsa") ||
                  selectedBankType("FPS")) &&
                config.features.MAX_PHONE_LENGTH
              }
              height={38}
              float={"none"}
              name="number"
              handleTextFieldChange={handleNumberChange}
              value={number}
            ></CustomTextField>
          </TextFieldContainer>
        </div>
      )}

      <TextFieldContainer>
        {(() => {
          if (showBack === true) {
            return (
              <Button
                grayMode={true}
                name={i18n.t("common.back")}
                width={257}
                marginRight={20}
                handleClick={onhandleBackClick}
              ></Button>
            );
          } else {
            return null;
          }
        })()}

        <Button
          name={
            config.features.Register_CustomFlow_IDR && !isDeposit
              ? i18n.t("web.register.btn")
              : i18n.t("common.nextStep")
          }
          width={255}
          handleClick={handleNextClick}
        ></Button>
      </TextFieldContainer>
    </Container>
  );
};

export default AddCard;
