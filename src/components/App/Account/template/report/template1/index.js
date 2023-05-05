import React from "react";
import styled from "styled-components";
import IconReportRedPNG from "../../../../../../assets/images/icon-report.png";
import i18n from "../../../../../../utils/i18n";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;

  width: 100%;
  min-height: 611px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconReportRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;
const TabButton = styled.div`
  width: 161px;
  height: 50px;
  font-size: 16px;

  color: #747474;
  background-color: #f7f7f7;
  text-align: center;
  padding-top: 14px;
  box-sizing: border-box;
  float: left;
  margin-right: 8px;
  margin-bottom: 20px;
  border: solid 1px #e4eaff;
  transition: all 0.3s;

  ${(props) =>
    props.active
      ? ` 
      border: solid 1px ${props.theme.primary};
      color: ${props.theme.primary};`
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
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const Template1 = ({ transferwallet, tab, handleTabClick, switchTab }) => {
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
            {i18n.t("report.transfer.title")}
          </TabButton>
        )}

        <BalanceChangesTabButton active={tab === 8} onClick={() => handleTabClick(8)}>
          {i18n.t("report.balanceChanges.title")}
        </BalanceChangesTabButton>
        <TabButton active={tab === 7} onClick={() => handleTabClick(7)}>
          {i18n.t("report.joinedPromo.title")}
        </TabButton>
        <SplitLine></SplitLine>
        {switchTab()}
      </InnerWrap>
    </Container>
  );
};

export default Template1;
