import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import IconInboxRedPNG from "../../../../../../assets/images/icon-inbox.png";
import LoginBGPNG from "../../../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../../../assets/images/icon-login-close.png";
import i18n from "../../../../../../utils/i18n";
import List from "../../../Inbox/List";
import Details from "../../../Inbox/Details";

const Container = styled.div` 
padding: 20px 28px;
box-sizing: border-box
width: 100%;
min-height: 611px;`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;
  background: url(${IconInboxRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
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
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  paper: {
    background: `url(${LoginBGPNG}) no-repeat transparent`,
    backgroundSize: "cover",
    borderRadius: "15px",
    border: "solid 1px #ffffff",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 0px 32px 30px 32px;

  display: table;
`;
const DialogCloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat center;
  width: 50px;
  height: 100%;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const DialogHeader = styled.div`
  height: 50px;
`;
const DialogHeadertitle = styled.div`
  text-align: center;
  margin-left: 45px;
  padding-top: 12px;
  float: left;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  width: 320px;
`;
const Template1 = ({
  inbox,
  page,
  selected,
  openDialog,
  selectedRecord,
  handleChangePage,
  handleRowClick,
  handleSelectedChange,
  handleCloseDialog,
  showDialog,
}) => {
  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("inbox.title")}
      </Title>
      <InnerWrap>
        <List
          inbox={inbox}
          page={page}
          rows={inbox}
          total={inbox}
          selected={selected}
          onhandleChangePage={handleChangePage}
          onhandleRowClick={handleRowClick}
          onhandleSelectedChange={handleSelectedChange}
        ></List>
      </InnerWrap>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onEntering={() => showDialog(true)}
        onExited={() => showDialog(false)}
      >
        <DialogHeader>
          <DialogHeadertitle>{i18n.t("inbox.title")}</DialogHeadertitle>
          <DialogCloseIconContainer
            onClick={handleCloseDialog}
          ></DialogCloseIconContainer>
        </DialogHeader>
        <DialogContainer>
          <Details inbox={selectedRecord}></Details>
        </DialogContainer>
      </StyledDialog>
    </Container>
  );
};

export default Template1;
