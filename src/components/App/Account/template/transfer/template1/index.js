import React from "react";
import styled, { keyframes } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import DynamicFont from "react-dynamic-font";
import IconTransferRedPNG from "../../../../../../assets/images/icon-transfer.png";
import TransferMWalletPNG from "../../../../../../assets/images/transfer-mwallet.png";
import TransferTWalletPNG from "../../../../../../assets/images/transfer-twallet.png";
import TransferTotalPNG from "../../../../../../assets/images/transfer-total.png";
import IconRefreshPNG from "../../../../../../assets/images/icon-refresh.png";
import ArrowRightPNG from "../../../../../../assets/images/arrow-right.png";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import Common from "../../../../../../utils/Common";
import Loading from "../../../../Loading";
import Messagebox from "../../../../Messagebox";

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box

  width: 100%;
  min-height: 611px;

`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconTransferRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px 20px;
  position: relative;
  border-radius: 10px;
`;
const WalletFrame = styled.div`
  width: 297px;
  height: 133px;
  float: left;
`;
const MainWallet = styled(WalletFrame)`
  background: url(${TransferMWalletPNG}) no-repeat center;
`;
const TransferWallet = styled(WalletFrame)`
  background: url(${TransferTWalletPNG}) no-repeat center;
`;
const TotalWallet = styled(WalletFrame)`
  background: url(${TransferTotalPNG}) no-repeat center;
`;
const WalletTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 14px 0 0 14px;
  color: ${({ theme }) => theme.secondary};
  float: left;
`;
const RefreshButton = styled.div`
  width: 28px;
  height: 29px;
  border-radius: 4.7px;

  float: right;
  margin: 13px 17px 0 15px;
  ${({ theme }) => {
    return config.features.UseAccentColor
      ? `background: ${theme.accent};`
      : ` background-image: linear-gradient(
      to top,
      ${theme.primaryGradient},
      ${theme.primary}
    )`;
  }};
  &:hover {
    cursor: pointer;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  background: url(${IconRefreshPNG}) no-repeat center;
  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const WalletAmount = styled.div`
  font-family: Arial;
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  float: right;
  margin: 45px 10px 0 0;
  width: 230px;
  text-align: right;
  overflow: hidden;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  border-bottom: #e0e0e0 1px solid;
  display: inline-block;
  width: 100%;
  margin: 25px 0 5px 0;
  padding-bottom: 8px;
`;
const QuickTransferContainer = styled.div`
  float: left;
  margin: 30px 0 0 40px;
`;
const QuickTransferArrow = styled.div`
  width: 23px;
  height: 18px;
  float: left;
  background: url(${ArrowRightPNG}) no-repeat;
  margin: 10px 10px 0 8px;
`;
const QuickTransferLabel = styled.div`
  float: left;

  font-size: 16px;
  margin: 8px 10px 0 18px;
  color: #818181;
`;
const QuickTransferButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 10px;

  color: #fff;
  font-size: 14px;
  margin-left: 12px;

  width: 118px;
  max-height: 39px;
  border-radius: 6px;
  ${(props) => (props.disabled === false ? " " : "pointer-events: none;")}
  ${(props) =>
    props.disabled === true
      ? "background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : "background-image: linear-gradient(to top, " +
        props.theme.primaryGradient +
        ", " +
        props.theme.primary +
        ");"}
  &:hover {
    ${(props) =>
      props.disabled === true
        ? " "
        : "cursor: pointer;box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;

const GameTranferWallet = styled.div`
  width: 280px;
  height: 98px;
  border-radius: 4px;
  border: solid 1px #dddedf;
  background-image: linear-gradient(to top, #f4f4f4, #ffffff);
  margin: 0 10px 10px 0;
  float: left;
`;
const GameTranferLeftWrap = styled.div`
  width: 100px;
  padding: 10px 0;
  float: left;
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
  color: #aeaeae;
  margin-top: 5px;
`;
const GameWalletAmount = styled.div`
  font-family: Arial;
  font-size: 22px;
  text-align: right;
  color: #29356c;
  margin: 21px 0 0 0px;
  width: 170px;
  display: inline-block;
`;
const GameWalletButton = styled.div`
  font-size: 12px;
  ${(props) =>
    props.disabled
      ? "    background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : "background-color: " + props.theme.primary + ";"}

  display:inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;
  float: right;

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
const TransferContainer = styled.div`
  min-height: 91px;
`;

const CurrencyTextFieldReplacement = styled.input`
  height: 35px;
  width: 154px;
  border-radius: 4px;
  border: solid 1px #b6b6b6;
  padding: 0px 10px;

  ::placeholder {
    color: #818181;
  }

  :focus {
    outline: none;
  }
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "193px",
    height: "38px",

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
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft: 8,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
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
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
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
`;

const Template1 = ({
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
        <MainWallet>
          <WalletTitle>{i18n.t("transfer.mainAccount")}</WalletTitle>
          <RefreshButton
            onClick={() => {
              getAllGameBalance();
              getBalanceList();
            }}
          >
            <RefreshButtonIcon></RefreshButtonIcon>
          </RefreshButton>
          <div className="clear"></div>

          <WalletAmount style={{ margin: "39px 10px 0 0" }}>
            <DynamicFont
              content={Common.formatNumberWithThousand(wallet.mainBalance)}
            />
          </WalletAmount>
        </MainWallet>
        {game.containTransferWallet && (
          <TransferWallet>
            <WalletTitle>{i18n.t("transfer.transferWallet")}</WalletTitle>

            <WalletAmount>
              <DynamicFont
                content={Common.formatNumberWithThousand(
                  game.providerList.reduce(
                    (total, item) =>
                      item.transferwallet === true
                        ? (total += item.balance)
                        : (total += 0),
                    0
                  )
                )}
              />
            </WalletAmount>
          </TransferWallet>
        )}
        <TotalWallet>
          <WalletTitle>{i18n.t("transfer.totalFund")}</WalletTitle>

          <WalletAmount>
            <DynamicFont
              content={Common.formatNumberWithThousand(
                game.providerList.reduce(
                  (total, item) =>
                    item.transferwallet === true
                      ? (total += item.balance)
                      : (total += 0),
                  0
                ) + wallet.mainBalance
              )}
            />
          </WalletAmount>
        </TotalWallet>
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

          <QuickTransferArrow></QuickTransferArrow>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              value={transferTo}
              displayEmpty
              onChange={handleTransferToChange}
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
          <QuickTransferButton
            disabled={transferFrom === "" || transferTo === "" || disabled}
            onClick={handleTranferClick}
          >
            {i18n.t("transfer.transfer")}
          </QuickTransferButton>
        </QuickTransferContainer>
        <SubTitle>{i18n.t("transfer.transferWallet")}</SubTitle>{" "}
        <CustomSwitchContainer>
          <div>
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
          <GameWalletButton
            style={{ marginTop: 0, marginLeft: 10 }}
            onClick={() => {
              performWithdrawFromEveryBrand();
            }}
          >
            {i18n.t("transfer.oneKeyTransferOut")}
          </GameWalletButton>
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
                </GameTranferWallet>
              );
            })}
        </TransferContainer>
        <Loading
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

export default Template1;
