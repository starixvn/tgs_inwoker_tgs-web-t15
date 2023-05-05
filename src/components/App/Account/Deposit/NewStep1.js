import React from "react";
import styled from "styled-components";
import { TextField, Select, FormControl, withStyles } from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import Common from "../../../../utils/Common";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
import { utility } from "../../../../utils/utility";
import { NewStep1Template } from "../template/deposit";

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
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
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

const NewStepOne = (props) => {
  const {
    amount,
    onAmountChange,
    name,
    onNameChange,
    account,
    onAccountChange,
    selectedMethodIndex,
    onMethodChange,
    selectedChannelIndex,
    onChannelChange,
    paymentType,
    onNextClick,
    exchangeRate,
    files,
    playerNote,
    onPlayerNoteChange,
  } = props;

  if (paymentType === null) return <></>;

  const methodList = paymentType.method;
  var methodIndex = methodList[selectedMethodIndex].methodcode.toUpperCase();
  var paymentTypeCode = paymentType.paymentcode.toUpperCase();
  const paymentCode = (type) => {
    var convertUppercase = type.toUpperCase();
    return paymentTypeCode === convertUppercase;
  };

  const alteredPaymentCode = (payment) => {
    return paymentType.alteredpaymentcode
      ? paymentType.alteredpaymentcode.toUpperCase() === payment.toUpperCase()
      : false;
  };

  const method = (index) => {
    var convertUppercase = index.toUpperCase();
    return methodIndex === convertUppercase;
  };

  var numberingCount = 0;
  const SubHeaderContainer = ({ children, custom }) => {
    numberingCount++;
    return (
      <CustomNumberingContainer className="numbering">
        <div>
          <Numbering>{numberingCount}</Numbering> {children}
        </div>
        {custom && <GapLeaver>{custom}</GapLeaver>}
      </CustomNumberingContainer>
    );
  };

  const performCopy = (content) => {
    props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(content);
  };

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
        <TransferLabel>{i18n.t("extended." + title)}:</TransferLabel>
        {data && (
          <>
            <TransferLabelValue>{data}</TransferLabelValue>
            <CopyFeature copyContent={data} />
          </>
        )}
      </TransferContainer>
    );
  };
  const formatBankCardDetail = (data) => {
    var detail = "";
    switch (data.banktype.toUpperCase()) {
      case "BANK":
        detail = `${data.detail.bankName || ""} - ${data.detail.name || ""} - ${
          data.detail.bankAccount || ""
        }`;
        break;
      case "EWALLET":
      case "E-WALLET":
        detail = `${data.detail.phone || ""} - ${data.detail.eMoneyName || ""}`;
        break;
      case "PULSA":
        detail = `${data.detail.phone || ""}`;
        break;
      default:
        detail = `${
          data.detail.bankAccount || data.detail.address || data.detail.phone
        }`;
        break;
    }
    return detail;
  };

  var displaysequence = [
    "name",
    "address",
    "bankAccount",
    "eMoneyName",
    "phone",
  ];

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
    <React.Fragment>
      <NewStep1Template
        template={config.accountTemplate}
        accountList={props.accountList}
        bankCardList={props.bankCardList}
        methodList={methodList}
        promotionList={props.promotionList}
        displaysequence={displaysequence}
        selectedBankCard={props.selectedBankCard}
        handleBankCardChange={props.handleBankCardChange}
        amount={amount}
        onAmountChange={onAmountChange}
        name={name}
        onNameChange={onNameChange}
        account={account}
        onAccountChange={onAccountChange}
        handleSelectAccountChange={props.handleSelectAccountChange}
        selectedMethodIndex={selectedMethodIndex}
        onMethodChange={onMethodChange}
        selectedChannelIndex={selectedChannelIndex}
        onChannelChange={onChannelChange}
        depositPromotion={props.depositPromotion}
        handleDepositPromotionChange={props.handleDepositPromotionChange}
        paymentType={paymentType}
        onNextClick={onNextClick}
        exchangeRate={exchangeRate}
        files={files}
        onFileChange={props.onFileChange}
        playerNote={playerNote}
        onPlayerNoteChange={onPlayerNoteChange}
        paymentCode={paymentCode}
        alteredPaymentCode={alteredPaymentCode}
        method={method}
        formatBankCardDetail={formatBankCardDetail}
        performCopy={performCopy}
        SubHeaderContainer={SubHeaderContainer}
      ></NewStep1Template>
    </React.Fragment>
  );
};

export default withSnackbar(NewStepOne);
