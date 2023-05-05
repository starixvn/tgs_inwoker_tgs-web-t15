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
    "/assets/images/pcAccountMenu/icon-profile.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  margin-top: 18px;
  background-color: #27273f;
  box-sizing: border-box;
  padding: 25px 50px;
  border-radius: 10px;
`;
const ContentWrap = styled.div`
  margin: 18px 0 12px 0;
  height: 60px;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #ffffff26;
`;
const ContentLabel = styled.div`
  color: #fff;
  float: left;
  width: 160px;
  margin-top: 10px;
`;
const ContentValue = styled.div`
  color: #acacac;
  float: left;
  margin-top: 10px;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ContentButton = styled.div`
  width: 170px;
  padding: 5px 0 10px 0;
  height: 40px;
  float: right;
  margin-right: 5px;
  border-radius: 20px;
  border: solid 1px #fff;
  color: #fff;
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
    "& .MuiFormControl-root": {
      background: "none",
      width: "210px",
      height: "50px",
    },
    "& .MuiInputBase-root": {
      color: "#b6b6b6 !important",
      WebkitTextFillColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "16px",
    },
    "& .MuiInputBase-input::-webkit-input-placeholder": {
      fontSize: "16px",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        borderWidth: "1px",
      },
    },
    "& .MuiInputAdornment-root": {
      width: "36px !important",
    },
    "& .MuiInputAdornment-positionEnd .MuiButtonBase-root": {
      padding: "0px !important",
    },
    "& .PrivateNotchedOutline-root-19": {
      top: "-4px",
    },
    "& .MuiSvgIcon-root": {
      color: "#b6b6b6 !important",
    },
    "& .MuiSelect-root": {
      background: "none !important",
    },
  },
  paper: {
    background: `#27273F`,
    backgroundSize: "cover",
    borderRadius: "15px",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 25px 32px;

  display: table;
  & div {
    color: #fff;
  }
  & #shared-custom-button,
  & #verify-button {
    color: #fff;
    border-radius: 25px;
    background: #cf2029;
    border: none;
    filter: drop-shadow(1px 1px 6px #cf2029ba);
    &:hover {
      box-shadow: none;
    }

    & span {
      margin-top: 12px;
    }
  }

  & #shared-custom-button {
    font-size: 26px;
    & span {
      margin-top: 7px;
    }
  }

  & #inputWrapper {
    background: none;
    height: 46px;
    padding: 7px !important;
    border-radius: 15px;
    & button {
      color: #fff;
      border-radius: 25px;
      border: none;
      cursor: pointer;
      background: #cf2029;
    }
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
  height: 55px;
`;
const DialogHeadertitle = styled.div`
  text-align: center;
  margin-left: 50px;
  padding-top: 25px;
  float: left;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  width: 320px;
`;
const Template13 = ({
  account,
  forcedverify,
  openDialog,
  dialogTitle,
  dialogComponent,
  handleButtonClick,
  handleCloseDialog,
  showDialog,
}) => {
  const getCustomMessagingTranslation = (platform) => {
    switch (platform) {
      case "fb":
        return i18n.t("T13.facebook.fb_title");
      case "telegram":
        return i18n.t("T13.telegram.tg_title");
      case "viber":
        return i18n.t("T13.viber.vb_title");
      default:
        return i18n.t("common." + platform);
    }
  };

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
            i18n.t("deposit.email"),
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
              getCustomMessagingTranslation(platform),
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

export default Template13;
