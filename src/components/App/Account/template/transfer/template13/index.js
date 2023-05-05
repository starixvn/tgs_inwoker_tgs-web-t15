import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import DynamicFont from "react-dynamic-font";
import ChevronRight from "@material-ui/icons/ChevronRight";

import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import Common from "../../../../../../utils/Common";
import Loading from "../../../../Loading";
import Messagebox from "../../../../Messagebox";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #1b1d30;
  width: 100%;
  min-height: 611px;

`;
const Title = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;
  background: #fff;
  mask: url(${process.env.PUBLIC_URL +
    "/assets/images/pcAccountMenu/icon-transfer.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: #27273f;
  padding: 25px 50px;
  position: relative;
  border-radius: 10px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  display: inline-block;
  width: 100%;
  margin: 25px 0 5px 0;
  padding-bottom: 8px;
`;
const QuickTransferContainer = styled.div`
  display: flex;
  align-items: center;
`;
const QuickTransferArrow = styled.div`
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & .MuiSvgIcon-root {
    color: #fff;
  }
`;
const QuickTransferAmount = styled.div`
  display: flex;
  align-items: center;
  width: 285px;
  height: 50px;
  border: 1px solid #b6b6b6;
  border-radius: 25px;
  margin: 8px 0;
  padding: 0 15px;
`;
const QuickTransferLabel = styled.div`
  float: left;

  font-size: 16px;
  margin: 8px 0;
  color: #fff;
`;
const QuickTransferButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding-top: 17px;

  color: #fff;
  font-size: 14px;
  margin-left: 12px;

  width: 118px;
  height: 50px;
  border-radius: 25px;

  ${(props) =>
    props.disabled === false ? " cursor: pointer;" : "pointer-events: none;"}
  ${(props) =>
    props.disabled === true
      ? "background: #b6b6b6;"
      : "background: #cf2029;  filter: drop-shadow(1px 1px 3px #cf2029ba);"}
`;

const GameTranferWallet = styled.div`
  width: 265px;
  height: 98px;
  border-radius: 15px;
  background: #1b1d30;
  margin: 0 10px 10px 0;
  float: left;
`;
const GameTranferLeftWrap = styled.div`
  width: 100px;
  padding: 10px 0;
  float: left;
`;
const GameTranferRightWrap = styled.div`
  width: 150px;
  padding: 5px 5px 0 0;
  float: right;
`;
const GameIcon = styled.div`
  height: 50px;
  width: 50px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
  display: block;
`;
const GameName = styled.div`
  font-size: 14px;
  text-align: center;
  color: #fff;
  margin-top: 5px;
`;
const GameWalletAmount = styled.div`
  font-size: 22px;
  text-align: right;
  color: #fff;
  margin: 20px 5px 0 0px;
  width: 100%;
  display: inline-block;
`;
const GameWalletButton = styled.div`
  font-size: 12px;
  ${(props) => (props.disabled === false ? "" : "pointer-events: none;")}
  ${(props) =>
    props.disabled === true
      ? "background: #b6b6b6;"
      : "background: #27273f;  filter: drop-shadow(1px 2px 3px #00000026);"}

  display:inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;
  float: right;

  min-width: 79px;
  height: 28px;
  border-radius: 14px;

  &:hover {
    cursor: pointer;
    background: #cf2029;
  }
`;

const TransferOutButton = styled(GameWalletButton)`
  width: 100px;
  padding-top: 7px;
  background: #1b1d30;
  filter: none;
  pointer-events: all;
  &:hover {
    background: #cf2029;
    cursor: pointer;
  }
`;
const TransferContainer = styled.div`
  min-height: 91px;
`;

const CurrencyTextFieldReplacement = styled.input`
  height: 35px;
  width: 154px;
  border-radius: 4px;
  border: none;
  background: none;
  padding: 0px 10px;
  text-align: right;
  font-size: 16px;
  color: #fff;
  font-family: "Montserrat";
  letter-spacing: 3px;

  ::placeholder {
    color: #818181;
    font-size: 16px;
  }

  :focus {
    outline: none;
  }
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "193px",
    height: "50px",
    marginRight: "5px",
    float: "left",
    padding: 0,
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
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#fff",
  },
}))(Select);

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 60,
    height: 28,
    padding: 0,
    margin: "0 10px",
    overflow: "visible",
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(30px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 28 / 2,
    backgroundColor: "#aaaaaa",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SubtitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-bottom: 10px;
  color: #fff;
  font-size: 14px;
  height: 50px;
`;

const Template13 = ({
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
  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("transfer.title")}
      </Title>
      <InnerWrap>
        <SubTitle>
          <SubtitleContent>
            <div>{i18n.t("transfer.quickTransfer")}</div>
          </SubtitleContent>
        </SubTitle>
        <QuickTransferContainer>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              value={transferFrom}
              displayEmpty
              onChange={handleTransferFromChange}
              IconComponent={KeyboardArrowDown}
            >
              <option value={mainAccountId}>
                {i18n.t("transfer.mainAccount")}
              </option>
              {game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .filter((e) => {
                  if (config.features.MergeEVORTNT) {
                    if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF" || e.gpcode === "BTG" || e.gpcode === "NLC")) {
                      return e;
                    }
                  } else {
                    return e;
                  }
                })
                .map((item, index) => (
                  <option value={item.gpcode} key={index}>
                    {item.name}
                  </option>
                ))}
            </CustomSelect>
          </CustomFormControl>

          <QuickTransferArrow>
            <ChevronRight />
          </QuickTransferArrow>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              value={transferTo}
              displayEmpty
              onChange={handleTransferToChange}
              IconComponent={KeyboardArrowDown}
            >
              <option value={mainAccountId}>
                {i18n.t("transfer.mainAccount")}
              </option>
              {game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .filter((e) => {
                  if (config.features.MergeEVORTNT) {
                    if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF" || e.gpcode === "BTG" || e.gpcode === "NLC")) {
                      return e;
                    }
                  } else {
                    return e;
                  }
                })
                .map((item, index) => (
                  <option value={item.gpcode} key={index}>
                    {item.name}
                  </option>
                ))}
            </CustomSelect>
          </CustomFormControl>
          <QuickTransferAmount>
            <QuickTransferLabel>{i18n.t("common.amount")}</QuickTransferLabel>
            <CurrencyTextFieldReplacement
              value={transferAmount}
              placeholder="0.00"
              onChange={handleTransferAmountChange}
              autoComplete="off"
              minimumValue="0"
              inputProps={{
                maxLength: 15,
              }}
            ></CurrencyTextFieldReplacement>
          </QuickTransferAmount>
          <QuickTransferButton
            disabled={transferFrom === "" || transferTo === "" || disabled}
            onClick={handleTranferClick}
          >
            {i18n.t("transfer.transfer")}
          </QuickTransferButton>
        </QuickTransferContainer>
        <SubTitle>{i18n.t("transfer.transferWallet")}</SubTitle>{" "}
        <CustomSwitchContainer>
          <div style={{ width: "550px" }}>
            {i18n.t("transfer.autoTransfer")} (
            {wallet.autotransfer === true
              ? i18n.t("transfer.on")
              : i18n.t("transfer.off")}
            )
          </div>
          <CustomSwitch
            checked={wallet.autotransfer === true}
            onChange={handleSwitchAutoTransfer}
          />
          <TransferOutButton
            style={{ marginTop: 0, marginLeft: 10 }}
            onClick={() => {
              performWithdrawFromEveryBrand();
            }}
          >
            {i18n.t("transfer.oneKeyTransferOut")}
          </TransferOutButton>
        </CustomSwitchContainer>
        <TransferContainer>
          {game.providerList
            .filter((item) => item.status === 0 && item.transferwallet === true)
            .filter((e) => {
              if (config.features.MergeEVORTNT) {
                if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF" || e.gpcode === "BTG" || e.gpcode === "NLC")) {
                  return e;
                }
              } else {
                return e;
              }
            })
            .map((item, key) => {
              const displayLogo = () => {
                if (
                  item.gpcode.toLowerCase() === "evotf" &&
                  config.features.MergeEVORTNT
                ) {
                  return "evontrt";
                } else {
                  return item.abbreviation.toLowerCase();
                }
              };

              return (
                <GameTranferWallet key={item.id}>
                  <GameTranferLeftWrap>
                    <GameIcon
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/provider/transfer/${displayLogo()}.png`
                      }
                    ></GameIcon>
                    <GameName>
                      <DynamicFont content={item.name}></DynamicFont>
                    </GameName>
                  </GameTranferLeftWrap>
                  <GameTranferRightWrap>
                    <GameWalletButton
                      disabled={item.maintenance === 1}
                      onClick={() => handleTranferIn(item.gpcode)}
                    >
                      {i18n.t("transfer.oneKeyTransferIn")}
                    </GameWalletButton>
                    <GameWalletAmount>
                      {item.maintenance === 1
                        ? i18n.t("transfer.maintenance")
                        : "$" + Common.formatNumberWithCommas(item.balance)}
                    </GameWalletAmount>
                  </GameTranferRightWrap>
                </GameTranferWallet>
              );
            })}
        </TransferContainer>
        <Loading
          withLoading={false} 
          withLogo={true}
          show={
            loading || wallet.transferLoading || wallet.updateBalanceloading
          }
        ></Loading>
      </InnerWrap>
      <Messagebox
        open={showMessagebox}
        message={messageboxText}
        onhandleCloseDialog={handleCloseDialog}
      ></Messagebox>
    </Container>
  );
};

export default Template13;
