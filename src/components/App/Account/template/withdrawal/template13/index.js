import React from "react";
import styled from "styled-components";
import PopupAnnouncement from "../../../../Home/PopupAnnouncement";
import Loading from "../../../../Loading";
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
    "/assets/images/pcAccountMenu/icon-withdraw.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #27273f;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

const Template13 = ({
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
        <Loading withLoading={false} withLogo={true} show={loading}></Loading>
      </InnerWrap>
    </Container>
  );
};

export default Template13;
