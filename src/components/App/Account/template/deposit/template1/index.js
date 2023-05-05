import React from "react";
import styled from "styled-components";
import IconDepositRedPNG from "../../../../../../assets/images/icon-deposit.png";
import UnderConstructionPNG from "../../../../../../assets/images/underconstruction.png";
import Loading from "../../../../Loading";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import PopupAnnouncement from "../../../../Home/PopupAnnouncement";

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
  background: url(${IconDepositRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
`;
const TabButtonContainer = styled.div`
  padding: 6px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
`;
const TabButton = styled.div`
  font-size: 14px;
  color: #747474;
  text-align: center;
  width: 104px;
  border-radius: 5px;
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
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const TabLabel = styled.div`
  margin: 10px 5px;
`;
const Wrap = styled.div`
  width: 935px;
  position: relative;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 14px;
  position: relative;
  background-color: #f7f7f7;
  min-height: 630px;
  border-radius: 10px;
`;
const UnderConstructionWrap = styled.div`
  width: 935px;
  height: 100%;
  background: url(${UnderConstructionPNG}) no-repeat center 50px #fff;
  position: absolute;
  top: 0;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
`;

const ButtonAddCard = styled.div`
  width: 40px;
  height: 35px;
  border: 1px solid #d9d9d9;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  &:before {
    content: "+";
    width: 25px;
    height: 25px;
    font-size: 25px;
    line-height: 30px;
  }
`;

const Template1 = ({
  ui,
  wallet,
  selectedPaymentIndex,
  step,
  loading,
  isMaintenance,
  openAnnouncement,
  showTabContainer,
  handleAddCard,
  handleTabClick,
  handleCloseAnnouncement,
  switchStep,
}) => {
  return (
    <Container>
      {(() => {
        if (
          config.features.DepositNotification &&
          ui.deposits &&
          ui.deposits.length > 0
        ) {
          var row = ui.deposits[0];

          return (
            <PopupAnnouncement
              open={openAnnouncement}
              onClose={() => {
                handleCloseAnnouncement();
              }}
              text={
                row.localization !== null && row.localization.content
                  ? row.localization.content
                  : row.content
              }
              header={
                row.localization !== null && row.localization.subject
                  ? row.localization.subject
                  : row.subject
              }
            ></PopupAnnouncement>
          );
        }
      })()}

      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("deposit.title")}
      </Title>
      <Wrap>
        {(() => {
          return (
            <>
              <InnerWrap>
                {config.features.Deposit_AddCard ? (
                  showTabContainer && (
                    <TabButtonContainer>
                      <ButtonAddCard onClick={handleAddCard}></ButtonAddCard>
                    </TabButtonContainer>
                  )
                ) : (
                  <TabButtonContainer>
                    {wallet.depositTypeList
                      .sort(function (a, b) {
                        return a.displayorder - b.displayorder;
                      })
                      .map((item, index) => {
                        return (
                          <TabButton
                            key={index}
                            onClick={() => handleTabClick(item, index)}
                            active={selectedPaymentIndex === index}
                          >
                            <TabLabel> {i18n.t(item.paymentcode)}</TabLabel>
                          </TabButton>
                        );
                      })}
                  </TabButtonContainer>
                )}
                {showTabContainer && <SplitLine></SplitLine>}
                {(() => {
                  if (wallet.depositTypeList.length <= 0) return null;
                  return switchStep(step);
                })()}
              </InnerWrap>
            </>
          );
        })()}

        <Loading show={loading || wallet.depositLoading}></Loading>
        <UnderConstructionWrap
          style={isMaintenance ? { display: "block" } : { display: "none" }}
        >
          <DescLabel>{i18n.t("deposit.msgMaintenance")}</DescLabel>
        </UnderConstructionWrap>
      </Wrap>
      <form id="form" target="_blank" method="post">
        <input type="hidden" name="cid" id="cid"></input>
        <input type="hidden" name="oid" id="oid"></input>
      </form>
    </Container>
  );
};

export default Template1;
