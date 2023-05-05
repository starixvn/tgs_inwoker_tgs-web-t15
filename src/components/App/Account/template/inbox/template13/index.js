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
    "/assets/images/pcAccountMenu/icon-inbox.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 14px;
  position: relative;
  background-color: #27273f;
  min-height: 630px;
  border-radius: 10px;

  & .MuiTableCell-root {
    color: #fff;
    background-color: #27273f;
    border-bottom-color: #ffffff26;
    font-family: 'Montserrat';
  }

  & .MuiTableBody-root {
    .MuiTableCell-root {
      padding: 10px 0 10px 10px;
    }
  }
  & .MuiTablePagination-root {
    color: #fff;

    .MuiIconButton-root.Mui-disabled {
      color: #ffffff26;
    }
  }
`;
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  paper: {
    background: `#27273F`,
    backgroundSize: "cover",
    borderRadius: "15px",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 0px 32px 30px 32px;

  display: table;

  & input,
  & div {
    text-align: center;
    background: none;
    color: #fff;
    border: none;
  }
  & div {
    text-align: justify;
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #1b1d30;
      border-radius: 14px;
    }
  }
  & .MuiTextField-root:nth-child(1) {
    .MuiOutlinedInput-input {
      font-size: 28px;
      font-weight: bold;
      font-style: italic;
    }
  }
  & .MuiTextField-root:nth-child(2) {
    margin-top: 0;
    height: 20px;
    .MuiOutlinedInput-input {
      font-size: 15px;
    }
  }
  & .MuiOutlinedInput-input {
    color: #fff !important;
  }

  & .MuiOutlinedInput-root fieldset {
    border: none;
  }
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
  color: #fff;
  width: 320px;
`;
const Template13 = ({
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

export default Template13;
