import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import LimitPopupPNG from "../../../../../../assets/images/limit-popup.png";
import CustomButton from "../../../../../Share/Button";
import config from "../../../../../../config/config";
import Common from "../../../../../../utils/Common";
import i18n from "../../../../../../utils/i18n";
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "400px",
    height: "47.63px",
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
const TabButton = styled.div`
  height: 86px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  text-align: center;
  float: left;
  margin-right: 8px;
  transition: all 0.3s;
  ${(props) =>
    props.active
      ? ` border: solid 1px ${props.theme.primary};
        color: ${props.theme.primary};`
      : ` border: solid 1px #e1dfdf;
        color: #747474;`};
  &:hover {
    cursor: pointer;
  }
`;

const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #818181;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;

const TunnelButton = styled(TabButton)`
  min-width: 133px;
  height: 41px;
  margin-top: 3px;
  padding: 10px 20px 0 20px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  min-width: 150px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;

const TransferContainer = styled.div`
  color: #747474;
  padding: 5px 0;
  display: flex;
  align-items: center;
`;
const TransferLabel = styled.span`
  float: left;
  //min-width: 100px;
  color: #151a34;
`;
const TransferLabelValue = styled.span`
  float: left;
  margin-left: 10px;
`;

const Remark = styled.div`
  color: ${({ theme }) => theme.primary};
  opacity: 0.75;
`;

const CustomNumberingContainer = styled.div`
  display: flex;
`;

const CopyIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/copy.png`
    }) no-repeat center /
    contain;`;
  }};
  cursor: pointer;
  margin-left: 10px;
`;

const Numbering = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #151a34;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;

const TitleHint = styled.span`
  opacity: 0.5;
  margin-left: 10px;
`;

const GapLeaver = styled.div`
  padding-left: 50px;
`;

const FeeSpot = styled.div`
  color: ${({ theme }) => theme.primary};
  span {
    font-weight: bold;
  }
`;

const NewStep1 = ({
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
  const CopyFeature = ({ copyContent }) => {
    return (
      <CopyIcon
        onClick={() => {
          performCopy(copyContent);
        }}
      />
    );
  };
  const DepositDetails = ({ title, data }) => {
    return (
      <TransferContainer>
        <TransferLabel>{i18n.exists("extended." + title) ? i18n.t("extended." + title) : title}:</TransferLabel>
        {data && (
          <>
            <TransferLabelValue>{data}</TransferLabelValue>
            <CopyFeature copyContent={data} />
          </>
        )}
      </TransferContainer>
    );
  };
  const generateDisplayContent = (content) => {
    // for every child in channelExtend object, map it to a DepositDetails component if the child is not empty
    // if the data is int format, ignore it
    // if the data returned is an URL, render it as an image
    // otherwise return as DepositDetails

    return Object.keys(content)
      .sort((a, b) => {
        return displaysequence.indexOf(a) - displaysequence.indexOf(b);
      })
      .map((key, index) => {
        if (content[key] !== "" && content[key]) {
          if (typeof content[key] === "number") {
            return <></>;
          } else if (content[key].includes("http")) {
            return <img src={content[key]} alt={content[key]} key={index} />;
          } else {
            return (
              <DepositDetails title={key} data={content[key]} key={index} />
            );
          }
        }
      });
  };

  return (
    <>
      {!config.features.Deposit_AddCard ? (
        <>
          <SubHeaderContainer>
            <SubTitle>
              {i18n.t("deposit.msgPlsSelectPayment")}

              <TitleHint>
                {methodList &&
                  paymentCode("ZeroNineNinePay") &&
                  "(" + i18n.t("hint._099") + ")"}
              </TitleHint>
            </SubTitle>
          </SubHeaderContainer>
          <SelectionContainer>
            {methodList.map((item, index) => {
              return (
                <TunnelButton
                  key={index}
                  onClick={() => onMethodChange(index)}
                  active={selectedMethodIndex === index}
                >
                  {i18n.t(item.methodcode)}
                </TunnelButton>
              );
            })}
          </SelectionContainer>
        </>
      ) : (
        <>
          <SubHeaderContainer>
            <SubTitle>{i18n.t("idr1.pleaseEnterAccountName")}</SubTitle>
          </SubHeaderContainer>
          <SelectionContainer>
            <CustomFormControl>
              <CustomSelect
                variant="outlined"
                value={selectedBankCard}
                displayEmpty
                onChange={handleBankCardChange}
                native
              >
                <option value="" disabled>
                  {i18n.t("idr1.msgPlsSelectAccount")}
                </option>
                {bankCardList.map((data, key) => {
                  return (
                    <option value={data.id} key={key}>
                      {formatBankCardDetail(data)}
                    </option>
                  );
                })}
              </CustomSelect>
            </CustomFormControl>
          </SelectionContainer>
        </>
      )}

      <SplitLine></SplitLine>
      {(() => {
        if (methodList.length > 0 && selectedMethodIndex !== -1) {
          return (
            <>
              {!(
                config.features.Deposit_HideDepositChannel ||
                config.features.Deposit_AddCard
              ) && (
                <>
                  <SubHeaderContainer>
                    <SubTitle>{i18n.t("deposit.msgPlsSelectMethod")}</SubTitle>
                  </SubHeaderContainer>
                  <SelectionContainer>
                    {methodList[selectedMethodIndex].channel.map(
                      (item, index) => {
                        return (
                          <TunnelButton
                            key={index}
                            onClick={() => onChannelChange(index)}
                            active={selectedChannelIndex === index}
                          >
                            {item.channelname}
                          </TunnelButton>
                        );
                      }
                    )}
                  </SelectionContainer>
                  <SplitLine></SplitLine>
                </>
              )}
              {(() => {
                if (
                  config.features.Deposit_AddCard &&
                  selectedBankCard !== ""
                ) {
                  var channel =
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ];
                  var channelExtend =
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].extended;

                  if (
                    !method("banktransfer") &&
                    !method("ewallet") &&
                    !method("pulsa") &&
                    !method("usdt")
                  )
                    return <></>;
                  return (
                    <>
                      <SubHeaderContainer>
                        <SubTitle>{i18n.t("deposit.transferAccount")}</SubTitle>
                      </SubHeaderContainer>
                      <SelectionContainer>
                        {method("banktransfer") && (
                          <>
                            <DepositDetails
                              title={i18n.t("deposit.details.bank")}
                              data={channel.channelname}
                            />
                            <DepositDetails
                              title={i18n.t("deposit.accName")}
                              data={channelExtend.name}
                            />
                            <DepositDetails
                              title={i18n.t("deposit.cardNum")}
                              data={channelExtend.bankAccount}
                            />
                          </>
                        )}

                        {(method("ewallet") || method("pulsa")) && (
                          <DepositDetails
                            title={i18n.t("deposit.phone")}
                            data={channelExtend.phone}
                          />
                        )}
                        {method("ewallet") && (
                          <DepositDetails
                            title={i18n.t("deposit.eWalletAccount")}
                            data={channelExtend.eMoneyName}
                          />
                        )}
                      </SelectionContainer>
                      <SplitLine></SplitLine>
                    </>
                  );
                }
              })()}
              {(() => {
                if (
                  (paymentCode("manual") ||
                    paymentCode("usdt") ||
                    alteredPaymentCode("usdt") ||
                    alteredPaymentCode("manual")) &&
                  !config.features.Deposit_AddCard
                ) {
                  var channelExtend =
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].extended;

                  //TODO: Remove checking condition if thirdparty checking no longer required.
                  if (method("thirdparty")) {
                    return (
                      <>
                        <SubHeaderContainer>
                          <SubTitle>
                            {i18n.t("deposit.transferAccount")}
                          </SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          <img
                            src={channelExtend.qrCode}
                            alt={channelExtend.qrCode}
                          />
                        </SelectionContainer>
                        <SplitLine></SplitLine>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <SubHeaderContainer>
                          <SubTitle>
                            {i18n.t("deposit.transferAccount")}
                          </SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          {generateDisplayContent(channelExtend)}
                        </SelectionContainer>
                        <SplitLine></SplitLine>
                      </>
                    );
                  }
                }
              })()}

              {(() => {
                if (
                  (paymentCode("manual") ||
                    paymentCode("applepay") ||
                    alteredPaymentCode("manual")) &&
                  !config.features.Deposit_ManualApplePayHideBankAcc
                ) {
                  return (
                    <>
                      {!(
                        config.features.Deposit_RemoveAccount ||
                        method("usdt") ||
                        config.features.Deposit_AddCard
                      ) && (
                        <>
                          <SubHeaderContainer>
                            <SubTitle>
                              {config.features.Deposit_OriginAccount
                                ? i18n.t("idr1.pleaseEnterAccountName")
                                : i18n.t("common.pleaseEnterAccountName")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            {accountList.length > 1 &&
                            !config.features.Deposit_AccountNameManualInput ? (
                              <CustomFormControl>
                                <CustomSelect
                                  variant="outlined"
                                  value={selectedBankCard}
                                  displayEmpty
                                  onChange={handleSelectAccountChange}
                                  native
                                >
                                  <option value="">
                                    {config.features.Deposit_OriginAccount
                                      ? i18n.t("idr1.pleaseEnterAccountName")
                                      : i18n.t("common.pleaseEnterAccountName")}
                                  </option>
                                  {accountList.map((data, key) => {
                                    var detail = data.detail;
                                    return (
                                      <option value={data.id} key={key}>
                                        {detail.bankAccount ||
                                          detail.address ||
                                          detail.phone}{" "}
                                        ({data.banktype})
                                      </option>
                                    );
                                  })}
                                </CustomSelect>
                              </CustomFormControl>
                            ) : (
                              <TextField
                                style={{
                                  height: "38px",
                                  width: "258px",
                                  float: "left",
                                  marginRight: "5px",
                                  padding: 0,
                                }}
                                placeholder={
                                  config.features.Deposit_OriginAccount
                                    ? i18n.t("idr1.pleaseEnterAccountName")
                                    : i18n.t("common.pleaseEnterAccountName")
                                }
                                onChange={onAccountChange}
                                outputFormat="string"
                                variant="outlined"
                                autoComplete="off"
                                disabled={
                                  !config.features
                                    .Deposit_AccountNameManualInput &&
                                  config.features.Deposit_AutofillFirstCard &&
                                  accountList.length > 1
                                }
                                value={account}
                              ></TextField>
                            )}
                          </SelectionContainer>
                          {config.features.Deposit_AddTips && (
                            <div style={{ marginLeft: 30, marginTop: 8 }}>
                              <Remark>
                                {" "}
                                {i18n.t("mgm.accountDepositTips")}
                              </Remark>
                            </div>
                          )}
                          <SplitLine></SplitLine>
                        </>
                      )}
                      {(!(
                        config.features.Deposit_RemoveName || method("FPS")
                      ) ||
                        config.features.Deposit_FPSWithName) && (
                        <>
                          <SubHeaderContainer>
                            <SubTitle>
                              {config.features.Deposit_CustomBankNameTranslation
                                ? i18n.t("mgm.msgPlsEnterAccount")
                                : config.features.Deposit_EnglishName
                                ? i18n.t("bet28.BankAccountName")
                                : i18n.t("deposit.msgPlsEnterAccount")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            <TextField
                              style={{
                                height: "38px",
                                width: "258px",
                                float: "left",
                                marginRight: "5px",
                                padding: 0,
                              }}
                              placeholder={
                                config.features
                                  .Deposit_CustomBankNameTranslation
                                  ? i18n.t("mgm.msgPlsEnterAccount")
                                  : config.features.Deposit_EnglishName
                                  ? i18n.t("bet28.msgEnterBankAccountName")
                                  : i18n.t("deposit.msgPlsEnterAccount")
                              }
                              onChange={onNameChange}
                              outputFormat="string"
                              variant="outlined"
                              autoComplete="off"
                              value={name}
                            ></TextField>
                          </SelectionContainer>
                          {config.features.Deposit_AddTips && (
                            <div style={{ marginLeft: 30, marginTop: 8 }}>
                              <Remark> {i18n.t("mgm.nameDepositTips")}</Remark>
                            </div>
                          )}
                          <SplitLine></SplitLine>
                        </>
                      )}
                    </>
                  );
                }
              })()}

              <SubHeaderContainer
                custom={
                  methodList[selectedMethodIndex].channel[selectedChannelIndex]
                    .fees > 0 && (
                    <FeeSpot>
                      {i18n.t("fees.deposit")}:{" "}
                      <span>
                        {
                          methodList[selectedMethodIndex].channel[
                            selectedChannelIndex
                          ].fees
                        }
                        %
                      </span>
                    </FeeSpot>
                  )
                }
              >
                <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
              </SubHeaderContainer>
              <SelectionContainer>
                <TextField
                  style={{
                    height: "38px",
                    width: "220px",
                    float: "left",
                    marginRight: "5px",
                    padding: 0,
                  }}
                  placeholder={
                    method("usdt")
                      ? i18n.t("deposit.plsEnterUSDTAmount")
                      : i18n.t("deposit.plsEnterDepositAmount")
                  }
                  onChange={onAmountChange}
                  outputFormat="string"
                  variant="outlined"
                  autoComplete="off"
                  value={amount}
                  pattern="[0-9]*"
                  type={"number"}
                ></TextField>

                <LimitPopupContainer>
                  <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                  <LimitAmount>
                    {Common.formatNumberWithThousand(
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.from
                    )}{" "}
                    -{" "}
                    {Common.formatNumberWithThousand(
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.to
                    )}
                  </LimitAmount>
                </LimitPopupContainer>
                {(() => {
                  if (
                    method("usdt") &&
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].extended.rate !== undefined
                  ) {
                    var usdtRate =
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].extended.rate;
                    if (
                      paymentCode("manual") ||
                      paymentCode("usdt") ||
                      alteredPaymentCode("usdt") ||
                      alteredPaymentCode("manual")
                    ) {
                      return (
                        <div style={{ marginTop: "4px" }}>
                          <LimitLabel>
                            {i18n.t("deposit.exchangeRate")} 1{" "}
                            {`${config.currency}`} :{" "}
                          </LimitLabel>
                          <LimitAmount>{` ${usdtRate} `}</LimitAmount>
                          <LimitLabel>USDT</LimitLabel>
                          <div class="clear"></div>
                          <LimitLabel>
                            {i18n.t("deposit.totalAmount")}
                          </LimitLabel>
                          {" : "}
                          <LimitAmount>{` ${
                            isNaN(amount) === false
                              ? Common.formatNumberWithCommasNoRounding(
                                  amount / usdtRate
                                )
                              : 0
                          }`}</LimitAmount>
                        </div>
                      );
                    }
                  }
                })()}
                {(() => {
                  if (method("crypto")) {
                    if (paymentCode("leepay")) {
                      return (
                        <div style={{ marginTop: "4px" }}>
                          <LimitLabel>
                            {i18n.t("deposit.exchangeRate")}:{" "}
                          </LimitLabel>
                          <LimitAmount>{` ${exchangeRate.buyprice}`}</LimitAmount>
                          <LimitLabel style={{ marginLeft: "26px" }}>
                            {i18n.t("deposit.expectedPayment")}
                          </LimitLabel>{" "}
                          <LimitAmount>{` ${
                            isNaN(amount) === false
                              ? (amount / exchangeRate.buyprice).toFixed(2)
                              : 0
                          }`}</LimitAmount>
                        </div>
                      );
                    } else {
                      return Object.keys(exchangeRate).map((key) => {
                        return Object.keys(exchangeRate[key]).map((key2) => {
                          if (key2 === "HKD") {
                            return (
                              <div style={{ marginTop: "4px" }}>
                                <LimitLabel>
                                  {i18n.t("deposit.exchangeRate")}:{" "}
                                </LimitLabel>
                                <LimitAmount>{` ${exchangeRate[key][key2].rate}`}</LimitAmount>
                                <LimitLabel style={{ marginLeft: "26px" }}>
                                  {i18n.t("deposit.expectedPayment")}
                                </LimitLabel>{" "}
                                <LimitAmount>{` ${
                                  isNaN(amount) === false
                                    ? (
                                        amount / exchangeRate[key][key2].rate
                                      ).toFixed(2)
                                    : 0
                                }`}</LimitAmount>
                              </div>
                            );
                          }
                        });
                      });
                    }
                  }
                })()}
                {paymentCode("umpay") && (
                  <Remark>{i18n.t("deposit.ppRemark")}</Remark>
                )}
              </SelectionContainer>
              <SplitLine></SplitLine>
              <SubHeaderContainer>
                <SubTitle>{i18n.t("deposit.promotion")}</SubTitle>
              </SubHeaderContainer>
              <SelectionContainer>
                <CustomFormControl>
                  <CustomSelect
                    variant="outlined"
                    value={depositPromotion}
                    displayEmpty
                    onChange={handleDepositPromotionChange}
                    native
                  >
                    <option value="">
                      {i18n.t("deposit.msgPlsSelectPromotion")}
                    </option>
                    {promotionList.map((data, key) => {
                      return (
                        <option value={data.id} key={key}>
                          {data.name}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectionContainer>

              {(() => {
                if (
                  paymentCode("manual") ||
                  alteredPaymentCode("USDT") ||
                  alteredPaymentCode("manual")
                ) {
                  return (
                    <React.Fragment>
                      <SplitLine></SplitLine>
                      <SubHeaderContainer>
                        <SubTitle>{i18n.t("deposit.uploadReceipt")}</SubTitle>
                      </SubHeaderContainer>
                      <SelectionContainer>
                        <button
                          onClick={() => {
                            document.getElementById("getFile").click();
                          }}
                          style={{ marginRight: 10 }}
                        >
                          {i18n.t("common.upload")}
                        </button>
                        <input
                          type="file"
                          id="getFile"
                          onChange={onFileChange}
                          accept="image/jpg, image/jpeg, image/png, image/tiff"
                          style={{ display: "none" }}
                        />
                        {files[0] ? files[0].name : ""}
                        <Remark>
                          {i18n.t(
                            config.features.Deposit_UploadRequired
                              ? "deposit.msgPlsUploadProof"
                              : "deposit.msgNotMustUploadProof"
                          )}
                        </Remark>
                      </SelectionContainer>
                    </React.Fragment>
                  );
                }
              })()}

              {config.features.Deposit_Withdrawal_PlayerNote &&
                (method("ewallet") ||
                  method("pulsa") ||
                  method("BANKTRANSFER")) && (
                  <React.Fragment>
                    <SplitLine></SplitLine>
                    <SubHeaderContainer>
                      <SubTitle>{i18n.t("deposit.playerNote")}</SubTitle>
                    </SubHeaderContainer>
                    <SelectionContainer>
                      <TextField
                        style={{
                          height: "38px",
                          width: "220px",
                          float: "left",
                          marginRight: "5px",
                          padding: 0,
                        }}
                        placeholder={i18n.t("deposit.plsEnterPlayerNote")}
                        onChange={onPlayerNoteChange}
                        outputFormat="string"
                        variant="outlined"
                        autoComplete="off"
                        value={playerNote}
                        maxLength={50}
                      ></TextField>
                    </SelectionContainer>
                  </React.Fragment>
                )}

              <SplitLine></SplitLine>
              <CustomButton
                name={i18n.t("common.submit")}
                width={257}
                marginTop={0}
                float={"none"}
                marginLeft={290}
                handleClick={() => {
                  onNextClick();
                }}
                disabled={
                  amount <
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].transferlimit.from ||
                  amount >
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].transferlimit.to ||
                  (config.features.Deposit_UploadRequired &&
                    (paymentCode("manual") || alteredPaymentCode("manual")) &&
                    files.length <= 0) ||
                  (config.features.Deposit_AddCard && selectedBankCard === "")
                }
              ></CustomButton>
            </>
          );
        }
      })()}
    </>
  );
};

export default NewStep1;
