import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { generalAction } from "../../../../api-services/actions/generalAction";
import config from "../../../../config/config";
import VipTemplateSwitcher from "../template/vip/index";

const VIP = (props) => {
  const { getVIP } = props;
  const [vipBenefit, setVipBenefits] = useState([]);
  useEffect(() => {
    if (vipBenefit.length === 0) {
      getVIP().then((result) => {
        if (result.IsSuccess) {
          setVipBenefits(result.data);
        }
      });
    }
  }, []);

  var vipBenefitList =
    vipBenefit.items &&
    vipBenefit.items.sort((a, b) => {
      return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
    });

  return (
    <VipTemplateSwitcher
      template={config.accountTemplate}
      vipBenefit={vipBenefit}
      vipBenefitList={vipBenefitList}
    />
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getVIP: () => dispatch(generalAction.getVIP()),
  };
};
const mapStateToProps = (state) => {
  return "";
};
export default connect(mapStateToProps, mapDispatchToProps)(VIP);
