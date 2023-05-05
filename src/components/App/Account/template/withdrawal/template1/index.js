import React from "react";
import styled from "styled-components";
import IconWithdrawRedPNG from "../../../../../../assets/images/icon-withdraw.png";
import PopupAnnouncement from "../../../../Home/PopupAnnouncement";
import Loading from "../../../../Loading";
import i18n from "../../../../../../utils/i18n";

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

  background: url(${IconWithdrawRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

const Template1 = ({
  openAnnouncement,
  loading,
  handleCloseAnnouncement,
  switchDisplayView,
}) => {
  return (
    <Container>
      <PopupAnnouncement
        open={openAnnouncement}
        onClose={() => {
          handleCloseAnnouncement();
        }}
        text={i18n.t("card.toEdit")}
      ></PopupAnnouncement>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("withdrawal.title")}
      </Title>
      <InnerWrap>
        {switchDisplayView()}
        <Loading show={loading}></Loading>
      </InnerWrap>
    </Container>
  );
};

export default Template1;
