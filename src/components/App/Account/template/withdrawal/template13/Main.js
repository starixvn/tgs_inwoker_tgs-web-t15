import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import IconEditPNG from "../../../../../../assets/images/icon-edit.png";
import IconBankDisablePNG from "../../../../../../assets/images/icon-bank-disable.png";
import CustomButton from "../../../../../Share/Button";
import CustomTextField from "../../../../../Share/TextField";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
import Common from "../../../../../../utils/Common";

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

const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #141933;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #fff;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 30px;
  color: #fff;
`;

const FlexSelectionContainer = styled(SelectionContainer)`
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
`;
const BankCardButton = styled(Grid)`
  width: auto;
  text-align: left;

  height: 41px;
  font-size: 14px;
  color: #fff;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  border-radius: 20px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #cf2029;
      `
      : ` border: solid 1px #fff;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const BankCardButtonIcon = styled(Grid)`
  width: 40px;
  height: 40px;
  mask: url(${IconBankDisablePNG}) no-repeat 15px center;
  background: #fff;
`;
const BankCardButtonLabel = styled.div`
  width: 86px;
  display: inline-block;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
  margin-right: 2px;
`;
const BankCardButtonCardNoHL = styled(BankCardButtonCardNo)`
  font-weight: bold;
`;
const ManageCardButton = styled(Grid)`
  height: 41px;
  width: auto;
  font-size: 14px;
  background-color: #cf2029;
  color: #fff;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const ManageCardButtonIcon = styled(Grid)`
  width: 40px;
  height: 40px;
  mask: url(${IconEditPNG}) no-repeat 15px center;
  background: #fff;
`;

const LimitPopupContainer = styled.div`
background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcAccountMenu/limit-popup.png"})
    no-repeat;
  background-size: 100% 37px;
  font-size: 14px;
  color: #ffffff;
  padding: 7px 10px 10px 25px;
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
  margin: 10px 0 0 20px;
`;

const Turnover = styled.div`
  span {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  margin: 0 0 0 0;
  display: flex;
`;

const GameWalletButton = styled.div`
  font-size: 12px;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  width: fit-content;

  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;

  min-width: 79px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #ffffff;

  &:hover {
    cursor: pointer;
    background-blend-mode: screen, normal;
    ${(props) =>
      props.disabled
        ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
        : " box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;

const CustomFormControl = withStyles((theme) => ({
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


const Main = ({
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
    handleWithdrawalClick
  }) => {
    return (
      <React.Fragment>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>
          <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
        </SubHeaderContainer>
        <FlexSelectionContainer>
          {cardList.map((item, index) => {
            return (
              <BankCardButton
                key={index}
                active={index === selectedCardIndex}
                onClick={() => {
                  handleSelectCardChange(index);
                  getTransferLimit(item.paymentchannelid);
                }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <BankCardButtonIcon items></BankCardButtonIcon>
                <BankCardButtonLabel items>
                  {i18n.t("withdrawal.bankCard")}
                </BankCardButtonLabel>
                <BankCardButtonCardNoHL items>
                  {(() => {
                    if (
                      item.banktype === "ThirdParty" ||
                      item.banktype === "FPS"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else if (
                      item.banktype === "Pulsa" ||
                      item.banktype === "EWallet"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else {
                      if (item.detail.bankAccount) {
                        return item.detail.bankAccount.substring(
                          item.detail.bankAccount.length - 4,
                          item.detail.bankAccount.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    }
                  })()}
                </BankCardButtonCardNoHL>
                <BankCardButtonCardNo items>
                  {i18n.t("withdrawal.tail")}
                </BankCardButtonCardNo>
              </BankCardButton>
            );
          })}
          <ManageCardButton
            onClick={onhandleManageCardClick}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <ManageCardButtonIcon items></ManageCardButtonIcon>
            <Grid items> {i18n.t("withdrawal.manageBank")}</Grid>
          </ManageCardButton>
        </FlexSelectionContainer>
        {config.features.NewTransferUI && (
          <>
            <SubHeaderContainer>
              <NumberContainer>2</NumberContainer>
              <SubTitle>
                {i18n.t("transfer.msgTransferOutFromGP")}
              </SubTitle>{" "}
              <ButtonWrapper>
                <GameWalletButton
                  style={{ marginTop: 0, marginLeft: 10 }}
                  onClick={() => {
                    performWithdrawFromEveryBrand().then((e) => {
                      if (e.IsSuccess) {
                        onhandleRefreshClick();
                      }
                    });
                  }}
                >
                  {i18n.t("transfer.oneKeyTransferAll")}
                </GameWalletButton>
              </ButtonWrapper>
            </SubHeaderContainer>
          </>
        )}

        <SubHeaderContainer>
          <NumberContainer>
            {config.features.NewTransferUI ? 3 : 2}
          </NumberContainer>

          <SubTitle>{i18n.t("withdrawal.enterAmount")}</SubTitle>
          {
            //    <GapLeaver>
            //    <FeeSpot>
            //      {i18n.t("fees.withdraw")}: <span>{fee}%</span>
            //    </FeeSpot>
            //  </GapLeaver>
          }

          {/* {(() => {
            if (
              props.cardList[selectedCardIndex] &&
              props.cardList[selectedCardIndex].banktype === "Usdt"
            ) {
              return (
                <ExchangeRateContainer
                  style={{
                    paddingTop: "1px",
                    paddingLeft: "20px",
                    whiteSpace: "break-spaces",
                  }}
                >
                  <LimitLabel>{i18n.t("deposit.exchangeRate")} : </LimitLabel>
                  <LimitAmount>1</LimitAmount>
                  <LimitLabel> {"\t"} USDT : </LimitLabel>
                  <LimitAmount>{` ${exchangeRate}`}</LimitAmount>
                </ExchangeRateContainer>
              );
            }
          })()} */}
        </SubHeaderContainer>
        <SelectionContainer>
          <CustomFormControl>
            <CustomTextField
              width={250}
              height={38}
              placeholder={i18n.t("withdrawal.enterAmount")}
              handleTextFieldChange={handleAmountChange}
              variant="outlined"
              autoComplete="off"
              value={amount}
              pattern="[0-9]*"
              type={"number"}
              maxLength={12}
            ></CustomTextField>
          </CustomFormControl>
          <LimitPopupContainer>
            {Common.formatNumberWithThousand(min)} -{" "}
            {Common.formatNumberWithThousand(max)}
          </LimitPopupContainer>
          {(() => {
            if (
              cardList[selectedCardIndex] &&
              cardList[selectedCardIndex].banktype === "Usdt"
            ) {
              return (
                <React.Fragment>
                  <div class="clear"></div>
                  <SubHeaderContainer>
                    <SubTitle style={{ margin: "0px" }}>
                      {i18n.t("withdrawal.usdtAmount")}
                    </SubTitle>
                  </SubHeaderContainer>
                  <CustomFormControl>
                    <CustomTextField
                      width={250}
                      height={38}
                      variant="outlined"
                      autoComplete="off"
                      value={
                        isNaN(amount) === false
                          ? (amount * exchangeRate).toFixed(2)
                          : 0
                      }
                      pattern="[0-9]*"
                      type={"number"}
                      disabled={true}
                    ></CustomTextField>
                  </CustomFormControl>
                </React.Fragment>
              );
            }
          })()}
          <div class="clear"></div>
          <Turnover>
            {i18n.t("withdrawal.turnover")}
            <span>{Common.formatNumberWithThousand(minWithdrawLimit)}</span>
          </Turnover>
        </SelectionContainer>
        {config.features.Deposit_Withdrawal_PlayerNote &&
          cardList[selectedCardIndex] &&
          (cardList[selectedCardIndex].banktype.toUpperCase() === "BANK" ||
            cardList[selectedCardIndex].banktype.toUpperCase() === "EWALLET" ||
            cardList[selectedCardIndex].banktype.toUpperCase() === "PULSA") && (
            <React.Fragment>
              <SubHeaderContainer>
                <NumberContainer>3</NumberContainer>
                <SubTitle>{i18n.t("withdrawal.playerNote")}</SubTitle>
              </SubHeaderContainer>
              <SelectionContainer>
                <CustomTextField
                  width={250}
                  height={38}
                  placeholder={i18n.t("withdrawal.plsEnterPlayerNote")}
                  handleTextFieldChange={handlePlayerNote}
                  variant="outlined"
                  autoComplete="off"
                  value={playerNote}
                  maxLength={50}
                ></CustomTextField>
              </SelectionContainer>
            </React.Fragment>
          )}
        <SubmitButtonWrapper
          disabled={
            isNaN(parseFloat(amount)) ||
            parseFloat(amount) < min ||
            parseFloat(amount) > max ||
            disabled
          }
        >
          <CustomButton
            disabled={
              isNaN(parseFloat(amount)) ||
              parseFloat(amount) < min ||
              parseFloat(amount) > max ||
              disabled
            }
            name={i18n.t("common.nextStep")}
            width={255}
            marginTop={0}
            float={"none"}
            marginLeft={290}
            handleClick={handleWithdrawalClick}
          ></CustomButton>
        </SubmitButtonWrapper>
      </React.Fragment>
    );
  };
  
  export default Main;
  