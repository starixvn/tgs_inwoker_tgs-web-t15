import React from "react";
import styled from "styled-components";
import UnderConstructionPNG from "../../../../../../assets/images/underconstruction.png";
import Loading from "../../../../Loading";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import PopupAnnouncement from "../../../../Home/PopupAnnouncement";
import Success from "../../../Deposit/Success";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #1b1d30;
  width: 100%;
  min-height: 611px;

    & #deposit-success #shared-custom-button, 
    & #deposit-step2form #shared-custom-button
     {
        color: #fff;
        border-radius: 25px;
        background: #cf2029;
        filter: drop-shadow(1px 1px 6px #cf2029ba);
        border: none;
        cursor: pointer;
        padding-top: 4px;
        &:hover {
        box-shadow: none;
        }
    }

    & #deposit-step2form {
        table {
            td {
                color: #fff;
                background: none;
            }
        }
    }
    

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
    "/assets/images/pcAccountMenu/icon-deposit.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
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
  border-radius: 20px;
  border: solid 1px #747474;
  transition: all 0.3s;
  ${(props) =>
    props.active
      ? ` 
      border: solid 1px #e4eaff;
      color: #fff;
      `
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
  background-color: #27273f;
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
  text-align: center;
  border-radius: 5px;
  background-color: #cf2029;
  cursor: pointer;
  &:before {
    content: "+";
    width: 25px;
    height: 25px;
    font-size: 25px;
    line-height: 30px;
  }
`;

const Template13 = ({
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
                {(() => {
                  if (wallet.depositTypeList.length <= 0) return null;
                  return switchStep(step);
                })()}
              </InnerWrap>
            </>
          );
        })()}

        <Loading withLoading={false} withLogo={true} show={loading || wallet.depositLoading}></Loading>
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

export default Template13;
