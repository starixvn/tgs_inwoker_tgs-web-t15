import React from "react";
import styled from "styled-components";
import IconDepositPNG from "../../../../../../assets/images/icon-deposit.png";
import IconWithdrawPNG from "../../../../../../assets/images/icon-withdraw.png";
import IconTransferPNG from "../../../../../../assets/images/icon-transfer.png";
import IconReportPNG from "../../../../../../assets/images/icon-report.png";
import IconProfilePNG from "../../../../../../assets/images/icon-profile.png";
import IconBonusPNG from "../../../../../../assets/images/icon-bonus.png";
import IconInboxPNG from "../../../../../../assets/images/icon-inbox.png";
import IconVIPPNG from "../../../../../../assets/images/icon-vip.png";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";

const Container = styled.div`
  background-color: #d9d9d9;
  width: 216px;
  height: 100%;
  float: left;
  padding: 0px 12px;
`;
const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;

  margin-top: 20px;

  color: ${({ theme }) => theme.secondary};
`;
const MenuButtonDiv = styled.div`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #7f7f7f;
  color: ${({ theme }) => theme.secondary};
  border-radius: 3px;
  margin: 5px;
  transition: all 0.3s;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
  ${({ active, theme }) => {
    return active
      ? ` background-color: ${theme.primary};
          color:${config.features.UseAccentColor ? theme.accent : " #fff"}
        `
      : `background-color: #ededed;`;
  }}
`;
const MenuButtonSpan = styled.span`
  float: right;
  width: 122px;
  display: block;
  margin-top: 10px;
`;
const MenuImgFrame = styled.div`
  height: 41px;
  width: 45px;
  float: left;
  display: block;

  ${({ active, theme }) => {
    return active
      ? config.features.UseAccentColor
        ? `background: ${theme.accent};`
        : " background:#fff;"
      : `background: ${theme.secondary};`;
  }};
  mask: url(${({ icon }) => {
      return icon;
    }})
    center;

  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 25px 25px;
`;
const Template1 = ({ game, haveAffiliate, activePage, onhandleClickTab }) => {
  const genImgComponent = (link) => {
    switch (link) {
      case "deposit":
        return IconDepositPNG;
      case "withdrawal":
        return IconWithdrawPNG;
      case "transfer":
        return IconTransferPNG;
      case "report":
        return IconReportPNG;
      case "profile":
        return IconProfilePNG;
      case "affiliate":
        return IconBonusPNG;
      case "inbox":
        return IconInboxPNG;
      case "vip":
        return IconVIPPNG;
      default:
        return <></>;
    }
  };
  const genMenuButtonDiv = (text, link) => {
    return (
      <MenuButtonDiv
        active={activePage === link}
        onClick={() => onhandleClickTab(link)}
      >
        <MenuImgFrame
          active={activePage === link}
          icon={genImgComponent(link)}
        ></MenuImgFrame>
        <MenuButtonSpan>{text}</MenuButtonSpan>
      </MenuButtonDiv>
    );
  };

  return (
    <Container>
      <MenuTitle>{i18n.t("web.account.fund")}</MenuTitle>
      {genMenuButtonDiv(i18n.t("web.account.deposit"), "deposit")}
      {genMenuButtonDiv(i18n.t("web.account.withdrawal"), "withdrawal")}
      {game.containTransferWallet &&
        !config.features.NewTransferUI &&
        genMenuButtonDiv(i18n.t("web.account.transfer"), "transfer")}
      {genMenuButtonDiv(i18n.t("web.account.report"), "report")}
      <MenuTitle>{i18n.t("web.account.personal")}</MenuTitle>
      {genMenuButtonDiv(i18n.t("web.account.profile"), "profile")}
      {genMenuButtonDiv(i18n.t("web.account.inbox"), "inbox")}{" "}
      {genMenuButtonDiv("VIP", "vip")}
      {haveAffiliate &&
        genMenuButtonDiv(i18n.t("web.account.affiliate"), "affiliate")}
    </Container>
  );
};

export default Template1;
