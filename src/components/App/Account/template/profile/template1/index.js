import React from "react";
import styled from "styled-components";
import IconLoginClosePNG from "../../../../../../assets/images/icon-login-close.png";
import IconProfileRedPNG from "../../../../../../assets/images/icon-profile.png";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../../../../../assets/images/login-bg.png";
import Dialog from "@material-ui/core/Dialog";

import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #eaeaea;
  width: 100%;
  min-height: 611px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconProfileRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  height: 610px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  border-radius: 10px;
`;
const ContentWrap = styled.div`
  margin-top: 12px;
  height: 44px;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
`;
const ContentLabel = styled.div`
  color: #747474;
  float: left;
  width: 160px;
  margin-left: 18px;
  margin-top: 10px;
`;
const ContentValue = styled.div`
  color: #16242a;
  float: left;
  margin-top: 10px;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ContentButton = styled.div`
  min-width: 89px;
  padding: 0 10px
  height: 32px;
  border-radius: 3.8px;
  color: #fff;
  float: right;
  margin-right: 5px;
  border-radius: 6px;
  border: solid 1px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  &:hover {
    cursor: pointer;
  }
`;

const ContentButtonLabel = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const VerifiedSpan = styled.span`
  color: ${({ theme }) => theme.primary};
  user-select: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function GetContentWrap(accountInfo, label, attr, func, edit, disable) {
  let attrValue = accountInfo[attr];
  let isMemberName = false;
  let containMemberName = accountInfo["member_name"];
  if (attr === "member_address") {
    if (attrValue !== "") {
      attrValue +=
        " | " +
        accountInfo["member_address_surename"] +
        " | " +
        accountInfo["member_address_phone"];
    }
  }

  const dataHider = (data) => {
    if (attr === data) {
      if (attrValue !== "") {
        attrValue = accountInfo[data]
          ? accountInfo[data].substring(0, 1) + "**"
          : "";
      }
    }
  };

  dataHider("member_fb");
  dataHider("member_telegram");
  dataHider("member_line");
  dataHider("member_viber");
  dataHider("member_whatsapp");
  dataHider("member_wechat");
  dataHider("member_qq");
  dataHider("member_phone");

  if (attr === "member_name") {
    isMemberName = true;

    if (attrValue !== "") {
      attrValue = accountInfo["member_name"] ? accountInfo["member_name"] : "";
    }
  }

  let isDisable = false;
  let buttonValue = i18n.t("profile.edit");
  let requiredVerify =
    attr === "member_name" ||
    attr === "member_phone" ||
    attr === "member_birthday";
  let isVerify = false;
  let hide = false;

  if (requiredVerify) {
    isVerify = !config.features.ICVerification
      ? accountInfo.check_pass_account
      : accountInfo.member_name !== "";
  }
  if (attr === "member_email") {
    isVerify = accountInfo.check_pass_email;
  }
  if (attr === "member_phone") {
    isVerify = accountInfo.check_pass_phone;
    if (config.features.Profile_NotAllowChangePhone && isVerify) {
      hide = true;
    }
  }

  if (attr === "member_question") {
    if (attrValue === 0) {
      attrValue = "";
    } else {
      attrValue = i18n.t("profile.setted");
      buttonValue = i18n.t("profile.edit");
    }
  }
  if (attrValue === "" || attrValue == null) {
    if (requiredVerify) {
      attrValue = i18n.t("profile.notVerify");
      buttonValue = i18n.t("profile.nowVerify");
    } else {
      attrValue = i18n.t("profile.notSet");
      buttonValue = i18n.t("profile.setNow");
    }
    isDisable = true;
  } else {
    if (config.features.Profile_ExistingDetails_ViewOnly) {
      if (attr !== "member_password") {
        buttonValue = i18n.t("profile.details");
      }
    }
  }
  if (attr === "member_password") {
    attrValue = i18n.t("profile.setted");
    buttonValue = i18n.t("profile.edit");
    isDisable = false;
  } else if (attr === "member_safe_password") {
    if (attrValue === "set") {
      attrValue = i18n.t("profile.setted");
      buttonValue = i18n.t("common.reset");
      isDisable = false;
    }
  } else if (requiredVerify) {
    if (isVerify || attr === "member_birthday") {
      buttonValue = "";
    }
    if (attr === "member_name" || attr === "member_phone") {
      if (isVerify === false) {
        buttonValue = i18n.t("profile.nowVerify");
      } else {
        buttonValue = i18n.t("profile.details");
      }
    }
  }

  var currentFormStatus = accountInfo.identityformstatus;
  var hasSubmitted = accountInfo.identityformid ? true : false;
  var status = "";

  if (currentFormStatus === 0 && hasSubmitted === false) {
    //api沒給表單id ，表示可以上傳
    status = "no";
  }
  if (
    (currentFormStatus === 1 && hasSubmitted === true) ||
    currentFormStatus === 1
  ) {
    status = "yes";
  }
  if (
    (currentFormStatus === 2 && hasSubmitted === true) ||
    currentFormStatus === 2
  ) {
    //有給表單id但是狀態是拒絕，也可以上傳
    status = "rejected";
  }
  if (currentFormStatus === 0 && hasSubmitted === true) {
    //有給表單id但狀態沒驗證，不能上傳
    status = "verifying";
  }

  return (
    <ContentWrap>
      <ContentLabel>{label}:</ContentLabel>
      <ContentValue style={isDisable ? { color: "#acacac" } : {}}>
        {attrValue}{" "}
        {
          <VerifiedSpan>
            {isMemberName &&
              containMemberName &&
              "(" + i18n.t("verified." + status) + ")"}
          </VerifiedSpan>
        }
      </ContentValue>
      <ButtonWrapper>
        {(() => {
          if (buttonValue !== "" && hide !== true) {
            return (
              <ContentButton onClick={() => func(attr, !isVerify)}>
                <ContentButtonLabel>{buttonValue}</ContentButtonLabel>
              </ContentButton>
            );
          }
        })()}
        {((status === "verifying" &&
          attr === "member_name" &&
          config.features.Profile_DisplayEditNameButton) ||
          (attr === "member_phone" && isVerify && edit && !disable)) && (
          <ContentButton onClick={() => func(attr, edit)}>
            <ContentButtonLabel>{i18n.t("profile.edit")}</ContentButtonLabel>
          </ContentButton>
        )}
      </ButtonWrapper>
    </ContentWrap>
  );
}
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
  padding: 27px 32px;

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
  account,
  forcedverify,
  openDialog,
  dialogTitle,
  dialogComponent,
  handleButtonClick,
  handleCloseDialog,
  showDialog,
}) => {
  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("profile.title")}
      </Title>
      <InnerWrap>
        {config.features.ICVerification &&
          GetContentWrap(
            account.info,
            i18n.t("profile.nameVerify.title"),
            "member_name",
            handleButtonClick,
            true
          )}
        {GetContentWrap(
          account.info,
          i18n.t("profile.birthdate.title"),
          "member_birthdate",
          handleButtonClick
        )}
        {(config.features.SMSVerification ||
          config.features.PromoRoulette_SMSVerification ||
          config.features.Register_ShowPhone) &&
          GetContentWrap(
            account.info,
            i18n.t("common.phoneNumber"),
            "member_phone",
            handleButtonClick,
            !config.features.Profile_DisableEditPhone,
            config.features.Profile_DisableVerifyPhone
          )}

        {(config.features.EmailVerification ||
          config.features.Register_ShowEmail) &&
          GetContentWrap(
            account.info,
            i18n.t("common.emailAddress"),
            "member_email",
            handleButtonClick
          )}
        {config.features.QQWeChat &&
          GetContentWrap(account.info, "QQ", "member_qq", handleButtonClick)}

        {config.features.QQWeChat &&
          GetContentWrap(
            account.info,
            i18n.t("common.wechatNumber"),
            "member_wechat",
            handleButtonClick
          )}

        {config.features.CustomMessaging &&
          config.features.CustomMessaging.length > 0 &&
          config.features.CustomMessaging.map((platform) => {
            return GetContentWrap(
              account.info,
              i18n.t("common." + platform),
              "member_" + platform,
              handleButtonClick
            );
          })}

        {GetContentWrap(
          account.info,
          i18n.t("profile.password.title"),
          "member_password",
          handleButtonClick
        )}
      </InnerWrap>
      <StyledDialog
        open={openDialog}
        onClose={forcedverify ? "" : handleCloseDialog}
        onEntering={() => showDialog(true)}
        onExited={() => showDialog(false)}
      >
        <DialogHeader>
          <DialogHeadertitle>{dialogTitle}</DialogHeadertitle>
          {!forcedverify && (
            <DialogCloseIconContainer
              onClick={handleCloseDialog}
            ></DialogCloseIconContainer>
          )}
        </DialogHeader>
        <DialogContainer>{dialogComponent}</DialogContainer>
      </StyledDialog>
    </Container>
  );
};

export default Template1;
