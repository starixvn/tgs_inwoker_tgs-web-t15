import React from "react";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";
import Password1IconPNG from "../../../../assets/images/password1-icon.png";
import Password2IconPNG from "../../../../assets/images/password2-icon.png";
import IconInputNewpassPNG from "../../../../assets/images/icon-input-newpass.png";
import { AccountService } from "../../../../api-services/services/AccountService";
import { withSnackbar } from "notistack";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
let local_props = {
  old_password: "",
  password: "",
  rpassword: "",
};

const onhandleOldPassChange = (e) => {
  local_props.old_password = e.target.value;
};
const onhandlePass1Change = (e) => {
  local_props.password = e.target.value;
};
const onhandlePass2Change = (e) => {
  local_props.rpassword = e.target.value;
};

function ChangePassword(props) {
  const onhandleClick = () => {
    var expr = /^.{6,20}$/;
    if (!expr.test(local_props.password)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "warning",
      });
      return;
    }
    if (local_props.rpassword !== local_props.password) {
      props.enqueueSnackbar(i18n.t("common.msgInvalidConfirmPass"), {
        variant: "error",
      });
      return;
    }
    AccountService.UpdatePassword(
      local_props.old_password,
      local_props.password
    ).then((response) => {
      if (response.IsSuccess) {
        props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
          variant: "success",
        });
        props.handleCloseDialog();
      } else {
        props.enqueueSnackbar(i18n.t("common.msgInvalidOldPass"), {
          variant: "error",
        });
      }
    });
  };
  return (
    <div>
      <CustomTextField
        placeholder={
          config.accountTemplate
            ? i18n.t("T13.password.cp")
            : i18n.t("web.resetPassword.oldPassword")
        }
        adornment={Password1IconPNG}
        handleTextFieldChange={onhandleOldPassChange}
        type="password"
      ></CustomTextField>
      <CustomTextField
        placeholder={i18n.t("web.resetPassword.newPassword")}
        adornment={IconInputNewpassPNG}
        handleTextFieldChange={onhandlePass1Change}
        type="password"
      ></CustomTextField>
      <CustomTextField
        placeholder={
          config.accountTemplate
            ? i18n.t("T13.password.re_np")
            : i18n.t("web.resetPassword.confirmNewPassword")
        }
        adornment={Password2IconPNG}
        handleTextFieldChange={onhandlePass2Change}
        type="password"
      ></CustomTextField>
      <CustomButton
        name={i18n.t("common.submit")}
        handleClick={onhandleClick}
      ></CustomButton>
    </div>
  );
}

export default withSnackbar(ChangePassword);
