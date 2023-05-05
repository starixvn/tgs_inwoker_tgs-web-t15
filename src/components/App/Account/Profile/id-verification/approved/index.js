import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../../../Share/TextField";
import IconInputReceivePNG from "../../../../../../assets/images/icon-input-receive.png";
import { withSnackbar } from "notistack";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";

function Approved(props) {
  return (
    <div>
      <CustomTextField
        placeholder={
          config.features.Profile_CustomIdentityPageTranslation
            ? i18n.t("piso.profile.enterFullName")
            : i18n.t("profile.nameVerify.msgPlsEnterName")
        }
        adornment={IconInputReceivePNG}
        defaultValue={props.account.info.member_name}
        readOnly={true}
        maxLength={256}
      ></CustomTextField>
    </div>
  );
}

export default connect(null, null)(withSnackbar(Approved));
