import React, { Component } from "react";
import styled from "styled-components";
import IconBonusRedPNG from "../../../../assets/images/icon-bonus.png";
import { connect } from "react-redux";
import i18n from "../../../../utils/i18n";
import { withSnackbar } from "notistack";
import { AppHistory } from "../../../../history/History";
import { utility } from "../../../../utils/utility";
import config from "../../../../config/config";
import AffiliateTemplate from "../template/affiliate/index";
import { generalAction } from "../../../../api-services/actions/generalAction";

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
  background: url(${IconBonusRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
`;

const InnerWrap = styled.div`
  width: 935px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

class Affiliate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      copyTooltips: false,
    };
  }
  componentDidMount() {
    if (this.props.general.rebates.length === 0) {
      this.props.getBrandAllAgent();
    }
  }

  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleCopyLink = () => {
    this.props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(
      `${window.location.hostname}/${i18n.language}/p/${this.props.account.info.playercode}?do=register`
    );
  };
  handleClickAway = () => {
    this.setState({ ...this.state, copyTooltips: false });
  };

  render() {
    var affiliateLink = `https://${window.location.hostname}/${i18n.language}/p/${this.props.account.info.playercode}?do=register`;
    return (
      <React.Fragment>
        <AffiliateTemplate
          template={config.accountTemplate}
          account={this.props.account}
          affiliateLink={affiliateLink}
          handleBackClick={this.handleBackClick}
          handleCopyLink={this.handleCopyLink}
          handleClickAway={this.handleClickAway}
          general={this.props.general}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBrandAllAgent: () => dispatch(generalAction.getBrandAllAgent()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Affiliate));
