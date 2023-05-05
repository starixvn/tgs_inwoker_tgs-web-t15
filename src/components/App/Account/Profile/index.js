import React, { Component } from "react";
import styled from "styled-components";
import IconProfileRedPNG from "../../../../assets/images/icon-profile.png";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import LoginBGPNG from "../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../assets/images/icon-login-close.png";
import { accountAction } from "../../../../api-services/actions/accountAction";
import { SHOWING_DIALOG } from "../../../../api-services/constant/actionType";
import { withStyles } from "@material-ui/core/styles";
import ChangePassword from "./ChangePassword";
import Email from "./Email";
import WithdrawalPassword from "./WithdrawalPassword";
import ChangeWithdrawalPassword from "./ChangeWithdrawalPassword";
import IDVerification from "./id-verification";
import PhoneVerification from "./PhoneVerification";
import QQ from "./QQ";
import Wechat from "./Wechat";
import FacebookMessenger from "./FacebookMessenger";
import Telegram from "./Telegram";
import Line from "./Line";
import Viber from "./Viber";
import Whatsapp from "./Whatsapp";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import Birthdate from "./Birthdate";
import ProfileTemplate from "../template/profile/index";
class Profile extends Component {
  state = {
    openDialog: false,
    dialogTitle: "",
  };
  componentDidMount() {
    if (this.props.popup) {
      if (
        this.props.popup === "member_phone" &&
        config.features.PromoRoulette_SMSVerification
      ) {
        this.handleButtonClick(this.props.popup, true);
      } else {
        this.handleButtonClick(this.props.popup);
      }
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.popup !== this.props.popup) {
      if (
        this.props.popup === "member_phone" &&
        config.features.PromoRoulette_SMSVerification
      ) {
        this.handleButtonClick(this.props.popup, true);
      } else {
        this.handleButtonClick(this.props.popup);
      }
    }
  }

  handlePhoneVerificationClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      dialogTitle: i18n.t("account.phoneVerification"),
      dialogComponent: (
        <PhoneVerification
          handleCloseDialog={this.handleCloseDialog}
          phone={this.props.account.info.member_phone}
          token={this.props.account.token}
          onhandleVerifySuccess={this.handleVerifySuccess}
          isForSecurityQuestion={true}
        ></PhoneVerification>
      ),
    });
  };
  backPhoneVerify = () => {
    this.handleButtonClick("member_safe_password");
  };

  handleVerifySuccess = (isForSecurityQuestion, isForWithdrawalPassword) => {
    if (isForSecurityQuestion) {
    } else if (isForWithdrawalPassword) {
      this.setState({
        ...this.state,
        openDialog: true,
        dialogTitle: i18n.t("profile.phoneVerification"),
        dialogComponent: (
          <ChangeWithdrawalPassword
            phone={this.props.account.info.member_phone}
            handleCloseDialog={this.handleCloseDialog}
            handleChangeTitle={this.handleChangeTitle}
            token={this.props.account.token}
          ></ChangeWithdrawalPassword>
        ),
      });
    }
  };
  handleButtonClick = (type, edit) => {
    let title = "";
    let component = null;

    switch (type) {
      case "member_fb":
        title =
          config.accountTemplate === 13
            ? i18n.t("T13.facebook.fb_title")
            : i18n.t("profile.fb.fbAccount");
        component = (
          <FacebookMessenger
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></FacebookMessenger>
        );
        break;
      case "member_telegram":
        title = i18n.t("profile.telegram.telegramAccount");
        component = (
          <Telegram
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Telegram>
        );
        break;
      case "member_line":
        title = i18n.t("profile.line.lineAccount");
        component = (
          <Line
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Line>
        );
        break;
      case "member_viber":
        title = i18n.t("profile.viber.viberAccount");
        component = (
          <Viber
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Viber>
        );
        break;
      case "member_whatsapp":
        title = i18n.t("profile.whatsapp.whatsappAccount");
        component = (
          <Whatsapp
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Whatsapp>
        );
        break;
      case "member_wechat":
        title = i18n.t("profile.wechat.weChatAccount");
        component = (
          <Wechat
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Wechat>
        );
        break;
      case "member_qq":
        title = i18n.t("profile.qq.qqAccount");
        component = (
          <QQ
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></QQ>
        );
        break;
      case "member_password":
        title =
          config.accountTemplate === 13
            ? i18n.t("T13.password.title")
            : i18n.t("profile.changePassword.title");
        component = (
          <ChangePassword
            handleCloseDialog={this.handleCloseDialog}
            token={this.props.account.token}
          ></ChangePassword>
        );
        break;
      case "member_email":
        title =
          config.accountTemplate === 13
            ? i18n.t("deposit.email")
            : i18n.t("profile.email.bindEmail");
        component = (
          <Email
            handleCloseDialog={this.handleCloseDialog}
            email={this.props.account.info.member_email}
            token={this.props.account.token}
            isForSecurityQuestion={false}
          ></Email>
        );
        break;
      case "member_birthdate":
        title = i18n.t("profile.birthdate.title");
        component = (
          <Birthdate
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Birthdate>
        );
        break;
      case "member_safe_password":
        if (!this.props.account.info.check_pass_email) {
          title = i18n.t("profile.email.bindEmail");
          component = (
            <Email
              handleCloseDialog={this.handleCloseDialog}
              email={this.props.account.info.member_email}
              token={this.props.account.token}
              isForSecurityQuestion={false}
            ></Email>
          );
        } else {
          if (this.props.account.info.member_safe_password !== "set") {
            // first time
            title = i18n.t("profile.withdrawalPassword.title");
            component = (
              <WithdrawalPassword
                value={this.props.account.info.member_safe_password}
                handleCloseDialog={this.handleCloseDialog}
                token={this.props.account.token}
              ></WithdrawalPassword>
            );
          } else {
            // reset
            title = i18n.t("profile.emailVerification");
            component = (
              <ChangeWithdrawalPassword
                email={this.props.account.info.member_email}
                handleCloseDialog={this.handleCloseDialog}
                handleChangeTitle={this.handleChangeTitle}
                token={this.props.account.token}
              ></ChangeWithdrawalPassword>
            );
          }
        }

        break;
      case "member_name":
        title = i18n.t("profile.nameVerify.title");
        component = (
          <IDVerification
            getIDCardNo={this.props.getIDCardNo}
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
            edit={edit}
          ></IDVerification>
        );
        break;
      case "member_phone":
        title = i18n.t("profile.phone.bindMobile");
        component = (
          <PhoneVerification
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            phone={this.props.account.info.member_phone}
            token={this.props.account.token}
            isForSecurityQuestion={false}
            account={this.props.account}
            edit={edit}
          ></PhoneVerification>
        );
        break;
      default:
        component = null;
        break;
    }
    this.setState({
      ...this.state,
      openDialog: true,
      dialogTitle: title,
      dialogComponent: component,
    });
  };
  handleChangeTitle = (title) => {
    this.setState({
      dialogTitle: title,
    });
  };
  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };

  render() {
    const forcedverify =
      (this.props.account.registercompleted === false &&
        config.features.Register_ShowPhone &&
        config.features.ForcedVerification &&
        this.props.popup === "member_phone") ||
      (this.props.account.registercompleted === false &&
        config.features.Register_CustomFlow_IDR &&
        (this.props.popup === "member_phone" ||
          this.props.popup === "member_email"));

    return (
      <React.Fragment>
        <ProfileTemplate
          template={config.accountTemplate}
          account={this.props.account}
          forcedverify={forcedverify}
          openDialog={this.state.openDialog}
          dialogTitle={this.state.dialogTitle}
          dialogComponent={this.state.dialogComponent}
          handleButtonClick={this.handleButtonClick}
          handleCloseDialog={this.handleCloseDialog}
          showDialog={this.props.showDialog}
        />
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};
export default connect(null, mapDispatchToProps)(Profile);
