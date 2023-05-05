import React from "react";
import styled from "styled-components";
import IconReportRedPNG from "../../../../../../assets/images/icon-report.png";
import i18n from "../../../../../../utils/i18n";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;
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
    "/assets/images/pcAccountMenu/icon-report.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: #27273f;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;
const TabButton = styled.div`
  width: 161px;
  height: 50px;
  font-size: 16px;
  border-radius: 25px;
  color: #fff;
  background-color: #1b1d30;
  text-align: center;
  padding-top: 16px;
  box-sizing: border-box;
  float: left;
  margin-right: 8px;
  margin-bottom: 20px;
  transition: all 0.3s;

  ${(props) =>
    props.active
      ? ` 
      background-color: #cf2029;`
      : ` `};
  &:hover {
    cursor: pointer;
  }
`;
const BalanceChangesTabButton = styled(TabButton)`
  ${() =>
    i18n.language !== "zh-CN" && i18n.language !== "zh-TW"
      ? `padding-top: 5px`
      : ``}
`;

const Template13 = ({ transferwallet, tab, handleTabClick, switchTab }) => {
  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("report.title")}
      </Title>

      <InnerWrap>
        <TabButton active={tab === 2} onClick={() => handleTabClick(2)}>
          {i18n.t("report.bettingDetails")}
        </TabButton>
        <TabButton active={tab === 3} onClick={() => handleTabClick(3)}>
          {i18n.t("report.withdrawalDetails")}
        </TabButton>
        <TabButton active={tab === 4} onClick={() => handleTabClick(4)}>
          {i18n.t("report.depositDetails")}
        </TabButton>
        {transferwallet && (
          <TabButton active={tab === 6} onClick={() => handleTabClick(6)}>
            {i18n.t("T13.report.transfer.title")}
          </TabButton>
        )}
        <BalanceChangesTabButton active={tab === 8} onClick={() => handleTabClick(8)}>
          {i18n.t("report.balanceChanges.title")}
        </BalanceChangesTabButton>
        <TabButton active={tab === 7} onClick={() => handleTabClick(7)}>
          {i18n.t("T13.report.joinedPromo.title")}
        </TabButton>
        {switchTab()}
      </InnerWrap>
    </Container>
  );
};

export default Template13;
