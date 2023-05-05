import React from "react";
import styled from "styled-components";
import { Select, FormControl, withStyles } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import CustomTextField from "../../../../../Share/TextField";
import Button from "../../../../../Share/Button";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";

const SubmitButtonWrapper = styled.div`
  & #shared-custom-button {
    color: #fff;
    border-radius: 25px;
    ${(props) =>
      props.disabled
        ? ``
        : `background: #cf2029;filter: 
           drop-shadow(1px 1px 6px #cf2029ba);
    `}
    border: none;
    cursor: pointer;
    padding-top: 4px;
    &:hover {
      box-shadow: none;
    }
  }
`;

const BackButtonWrapper = styled(SubmitButtonWrapper)`
  & #shared-custom-button {
    background: #747474;
    filter: none;
  }
`;

const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: justify;
  color: #fff;
  margin-top: 0px;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: left;
  color: #fff;
  margin: 10px 0 0 0;
`;
const TextFieldContainer = styled.div`
  display: table;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#fff",
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
      paddingLeft: "12px",
      "& fieldset": {
        borderRadius: "25px",
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
    "& .MuiSelect-select": {
      fontSize: "16px",
      color: "#ffffff",
    },
    "& .MuiSelect-select > option": {
      fontSize: "14px",
      color: "#1b1d30",
    },
    "& .MuiSelect-icon": {
      color: "#ffffff",
    },
  },
}))(FormControl);

const TextFieldFormControl = withStyles((theme) => ({
    root: {
      border: "none",
      "& .MuiTextField-root": {
        border: "none",
        marginBottom: "10px",
        background: "none"
      },
      "& .MuiInputBase-root": {
        color: "#fff",
      },
      "& .MuiInputBase-input::-webkit-input-placeholder": {
        opacity: "1",
        color: "#747474",
      },
      "& .MuiOutlinedInput-root.Mui-disabled":{
        "& .MuiOutlinedInput-input": {
            color: "#747474",
        },
        "& fieldset": {
            borderColor: "#747474",
          },
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderRadius: "20px",
          borderColor: "#747474",
          marginTop: "1px",
        },
        "&:hover fieldset": {
          borderColor: "#747474",
          marginTop: "1px",
        },
        "&.Mui-focused fieldset": {
          borderWidth: "1px",
          color: "#fff",
          borderColor: "#fff",
          marginTop: "1px",
        },
      },
    },
  }))(FormControl);

const AddCard = ({
  isDeposit,
  eWalletCustom,
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
                IconComponent={KeyboardArrowDown}
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
                IconComponent={KeyboardArrowDown}
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
                              IconComponent={KeyboardArrowDown}
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
                          <TextFieldFormControl>
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
                          </TextFieldFormControl>
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
                            <TextFieldFormControl>
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
                            </TextFieldFormControl>
                          </TextFieldContainer>
                        </React.Fragment>
                      );
                    }
                  })()}
                </>
              )}

              <TextFieldLabel>
                {eWalletCustom
                  ? i18n.t("card.addCard.eWalletAccount")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.card.addCard.BankAccountName")
                  : i18n.t("card.addCard.BankAccountName")}
              </TextFieldLabel>
              <TextFieldContainer>
                <TextFieldFormControl>
                  <CustomTextField
                    marginTop={10}
                    placeholder={
                      eWalletCustom
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
                </TextFieldFormControl>
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
            {eWalletCustom
              ? i18n.t("card.addCard.eWalletAccount")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.card.addCard.BankAccountName")
              : i18n.t("card.addCard.BankAccountName")}
          </TextFieldLabel>
          <TextFieldContainer>
            <TextFieldFormControl>
              <CustomTextField
                marginTop={10}
                placeholder={
                  eWalletCustom
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
            </TextFieldFormControl>
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
            <TextFieldFormControl>
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
            </TextFieldFormControl>
          </TextFieldContainer>
          <TextFieldLabel>
            {config.features.AddCard_InputAddFPS
              ? i18n.t("custom.addcard.phoneNumber")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("bet28.phoneNumber")
              : i18n.t("common.phoneNumber")}
          </TextFieldLabel>
          <TextFieldContainer>
            <TextFieldFormControl>
              <CustomTextField
                marginTop={10}
                placeholder={
                  config.features.AddCard_InputAddFPS
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
            </TextFieldFormControl>
          </TextFieldContainer>
        </div>
      ) : (
        <div>
          <TextFieldLabel>
            {eWalletCustom || selectedBankType("Pulsa")
              ? i18n.t("card.addCard.phone")
              : config.features.AddCard_DisplayGCash
              ? i18n.t("piso.withdrawalNumber")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.withdrawalNumber")
              : config.features.AddCard_Bank_Custom_IDR
              ? i18n.t("idr.withdrawalNumber")
              : i18n.t("common.withdrawalNumber")}
          </TextFieldLabel>
          <TextFieldContainer>
            <TextFieldFormControl>
              <CustomTextField
                marginTop={10}
                placeholder={
                  eWalletCustom || selectedBankType("Pulsa")
                    ? i18n.t("card.addCard.msgEnterPhone")
                    : config.features.AddCard_DisplayGCash
                    ? i18n.t("piso.msgEnterWithdrawalNumber")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.msgEnterWithdrawalNumber")
                    : config.features.AddCard_Bank_Custom_IDR
                    ? i18n.t("idr.msgEnterWithdrawalNumber")
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
            </TextFieldFormControl>
          </TextFieldContainer>
        </div>
      )}

      <ButtonContainer>
        {(() => {
          if (showBack === true) {
            return (
              <BackButtonWrapper>
                <Button
                  grayMode={true}
                  name={i18n.t("common.back")}
                  width={257}
                  marginRight={20}
                  handleClick={onhandleBackClick}
                ></Button>
              </BackButtonWrapper>
            );
          } else {
            return null;
          }
        })()}

        <SubmitButtonWrapper>
          <Button
            name={
              config.features.Register_CustomFlow_IDR && !isDeposit
                ? i18n.t("web.register.btn")
                : i18n.t("common.nextStep")
            }
            width={255}
            handleClick={handleNextClick}
          ></Button>
        </SubmitButtonWrapper>
      </ButtonContainer>
    </Container>
  );
};

export default AddCard;
