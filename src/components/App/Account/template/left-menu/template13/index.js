import React from "react";
import styled from "styled-components";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";

const Container = styled.div`
  width: 216px;
  height: 100%;
  float: left;
  padding: 0px 12px;
`;
const MenuTitle = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  margin-top: 20px;
  color: #fff;
`;
const MenuButtonDiv = styled.div`
  width: 190px;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  margin: 10px 0;
  transition: all 0.3s;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
  }
  ${({ active, theme }) => {
    return active
      ? ` background-color: ${theme.primary};
        `
      : `background-color: #27273F;`;
  }}
`;
const MenuButtonSpan = styled.span`
  display: block;
`;
const MenuImgFrame = styled.div`
  height: 41px;
  width: 45px;
  float: left;
  display: block;
  background: #fff;
  mask: url(${({ icon }) => {
      return process.env.PUBLIC_URL+"/assets/images/pcAccountMenu/"+icon+".svg";
    }})
    center;

  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 25px 25px;
`;
const Template13 = ({ game, haveAffiliate, activePage, onhandleClickTab }) => {
  const genMenuButtonDiv = (text, link, icon) => {
    return (
      <MenuButtonDiv
        active={activePage === link}
        onClick={() => onhandleClickTab(link)}
      >
        <MenuImgFrame
          active={activePage === link}
          icon={icon}
        ></MenuImgFrame>
        <MenuButtonSpan>{text}</MenuButtonSpan>
      </MenuButtonDiv>
    );
  };

  return (
    <Container>
      <MenuTitle>{i18n.t("web.account.fund")}</MenuTitle>
      {genMenuButtonDiv(i18n.t("web.account.deposit"), "deposit", "icon-deposit")}
      {genMenuButtonDiv(i18n.t("web.account.withdrawal"), "withdrawal", "icon-withdraw")}
      {game.containTransferWallet &&
        !config.features.NewTransferUI &&
        genMenuButtonDiv(i18n.t("web.account.transfer"), "transfer", "icon-transfer")}
      {genMenuButtonDiv(i18n.t("web.account.report"), "report", "icon-report")}
      <MenuTitle>{i18n.t("web.account.personal")}</MenuTitle>
      {genMenuButtonDiv(i18n.t("web.account.profile"), "profile", "icon-profile")}
      {genMenuButtonDiv(i18n.t("web.account.inbox"), "inbox", "icon-inbox")}
      {genMenuButtonDiv("VIP", "vip", "icon-vip")}
      {haveAffiliate &&
        genMenuButtonDiv(i18n.t("web.account.affiliate"), "affiliate", "icon-bonus")}
    </Container>
  );
};

export default Template13;
