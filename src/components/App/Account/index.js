import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Router, Route, Switch, Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import { AppHistory } from "../../../history/History";
import IconDepositPNG from "../../../assets/images/icon-deposit.png";
import IconWithdrawPNG from "../../../assets/images/icon-withdraw.png";
import IconTransferPNG from "../../../assets/images/icon-transfer.png";
import IconReportPNG from "../../../assets/images/icon-report.png";
import IconProfilePNG from "../../../assets/images/icon-profile.png";
import IconBonusPNG from "../../../assets/images/icon-bonus.png";
import IconInboxPNG from "../../../assets/images/icon-inbox.png";
import IconVIPPNG from "../../../assets/images/icon-vip.png";
import Header from "./template/header/index";
import LeftMenu from "./template/left-menu";
import Profile from "./Profile/index";
import Inbox from "./Inbox/index";
import Report from "./Report/index";
import Transfer from "./Transfer/index";
import Deposit from "./Deposit/index";
import { walletAction } from "../../../api-services/actions/walletAction";
import Withdrawal from "./Withdrawal/index";
import i18n from "../../../utils/i18n";
import BGJPG from "../../../assets/images/bg.jpg";
import Common from "../../../utils/Common";
import Affiliate from "./Affiliate";
import config from "../../../config/config";
import VIP from "./Vip/index.js";
const baseRouteUrl = Common.baseRouteUrl;
const Container = styled.div`
  width: 100%;
`;
const Container1 = styled(Container)`
  background: url(${BGJPG});
`;
const InnerContainer = styled.div`
  margin: 35px auto;
  width: 1280px;
`;
const InnerContainer1 = styled(InnerContainer)`
  width: 1230px;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: none;
  padding-bottom: 15px;
`;

const Main = styled.div`
  height: 100%;
  width: 1280px;
`;

const Main1 = styled(Main)`
  margin-left: 12px;
  width: 1206px;
  border-radius: 10px;
  background-color: #d9d9d9;
`;

const RightContent = styled.div`
  width: 990px;
  height: 100%;
  float: right;
`;
const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;

  margin-top: 20px;

  color: ${({ theme }) => theme.secondary};
`;
const MenuButtonDiv = styled.div`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #7f7f7f;
  color: ${({ theme }) => theme.secondary};
  border-radius: 3px;
  margin: 5px;
  transition: all 0.3s;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
  ${({ active, theme }) => {
    return active
      ? ` background-color: ${theme.primary};
          color:${config.features.UseAccentColor ? theme.accent : " #fff"}
        `
      : `background-color: #ededed;`;
  }}
`;
const MenuButtonSpan = styled.span`
  float: right;
  width: 122px;
  display: block;
  margin-top: 10px;
`;
const MenuImgFrame = styled.div`
  height: 41px;
  width: 45px;
  float: left;
  display: block;

  ${({ active, theme }) => {
    return active
      ? config.features.UseAccentColor
        ? `background: ${theme.accent};`
        : " background:#fff;"
      : `background: ${theme.secondary};`;
  }};
  mask: url(${({ icon }) => {
      return icon;
    }})
    center;

  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 25px 25px;
`;

const WrapperSwitcher = (props) => {
  switch (props.template) {
    case 1:
    case "1":
    default:
      return (
        <Container1>
          <InnerContainer1>{props.children}</InnerContainer1>
        </Container1>
      );
    case 13:
    case "13":
      return (
        <Container>
          <InnerContainer>{props.children}</InnerContainer>
        </Container>
      );
  }
}

const MainSwitcher = (props) => {
  switch (props.template) {
    case 1:
      case "1":
      default:
        return (
          <Main1>
            {props.children}
          </Main1>
        );
      case 13:
      case "13":
        return (
          <Main>
            {props.children}
          </Main>
        );
    }
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.match.params.tab,
    };
  }
  async componentDidMount() {
    if (this.props.account.token === null) {
      await this.timeout(1000);
      if (this.props.account.token === null) {
        AppHistory.replace(`/${i18n.language}/`);
      }
      this.getAllGameBalance();
    }
  }
  componentDidUpdate(preProps) {
    if (
      this.props.game.providerList.length !==
        preProps.game.providerList.length &&
      this.props.game.providerList.length > 0
    ) {
      this.getAllGameBalance();
    }

    if (
      preProps.account.token !== this.props.account.token &&
      this.props.account.token === null
    ) {
      AppHistory.replace(`/${i18n.language}/`);
    }
    if (preProps.match.params.tab !== this.props.match.params.tab) {
      this.setState({ ...this.state, activePage: this.props.match.params.tab });
    }
  }
  getAllGameBalance = () => {
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => {
        return this.props.getGameBalance(a.gpcode);
      });
  };
  handleRefreshClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.updateBalanceList();
    this.getAllGameBalance();
  };
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  handleClickTab = (link) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/" + i18n.language + "/account/" + link);
  };
  handleMoreBenefitClick = (viptitle) => {
    this.props.history.push("/" + i18n.language + "/vip");
  };
  handleIDVerifyClick = () => {
    this.props.history.push(
      "/" + i18n.language + "/account/profile/member_name"
    );
  };
  handlePhoneVerifyClick = () => {
    this.props.history.push(
      "/" + i18n.language + "/account/profile/member_phone"
    );
  };
  handleEmailVerifyClick = () => {
    this.props.history.push(
      "/" + i18n.language + "/account/profile/member_email"
    );
  };
  genImgComponent = (link) => {
    switch (link) {
      case "deposit":
        return IconDepositPNG;
      case "withdrawal":
        return IconWithdrawPNG;
      case "transfer":
        return IconTransferPNG;
      case "report":
        return IconReportPNG;
      case "profile":
        return IconProfilePNG;
      case "affiliate":
        return IconBonusPNG;
      case "inbox":
        return IconInboxPNG;
      case "vip":
        return IconVIPPNG;
      default:
        return <></>;
    }
  };
  genMenuButtonDiv = (text, link) => {
    return (
      <MenuButtonDiv
        active={this.state.activePage === link}
        onClick={() => this.handleClickTab(link)}
      >
        <MenuImgFrame
          active={this.state.activePage === link}
          icon={this.genImgComponent(link)}
        ></MenuImgFrame>
        <MenuButtonSpan>{text}</MenuButtonSpan>
      </MenuButtonDiv>
    );
  };

  setActivePage = (page) => {
    this.setState({
      ...this.state,
      activePage: page,
    });
  };

  render() {
    return (
      <WrapperSwitcher template={config.accountTemplate}>
        <Header
          template={config.accountTemplate}
          info={this.props.account.info}
          vip={this.props.account.vip}
          wallet={this.props.wallet}
          game={this.props.game}
          onhandleClickTab={this.handleClickTab}
          onhandleRefreshClick={this.handleRefreshClick}
          onhandleMoreBenefitClick={this.handleMoreBenefitClick}
          onIDVerifyClick={this.handleIDVerifyClick}
          onPhoneVerifyClick={this.handlePhoneVerifyClick}
          onEmailVerifyClick={this.handleEmailVerifyClick}
        ></Header>

        <MainSwitcher template={config.accountTemplate}>
          <LeftMenu
            template={config.accountTemplate}
            game={this.props.game}
            activePage={this.state.activePage}
            onhandleClickTab={this.handleClickTab}
            haveAffiliate={this.props.general.haveAffiliate}
          />
          <RightContent>
            <Router history={AppHistory}>
              <Switch>
                <Route
                  exact
                  path={baseRouteUrl + "/account/deposit/:promotionid?"}
                  render={(props) => (
                    <Deposit
                      token={this.props.account.token}
                      account={this.props.account}
                    />
                  )}
                />
                <Route
                  exact
                  path={baseRouteUrl + "/account/manual/:paymentId"}
                  render={(props) => (
                    <Deposit
                      setActivePage={this.setActivePage}
                      token={this.props.account.token}
                      account={this.props.account}
                    />
                  )}
                />
                <Route
                  exact
                  path={baseRouteUrl + "/account/withdrawal"}
                  render={(props) => (
                    <Withdrawal
                      token={this.props.account.token}
                      onhandleClickTab={this.handleClickTab}
                      onhandleCSClick={this.props.onhandleCSClick}
                      onhandleRefreshClick={this.handleRefreshClick}
                      account={this.props.account}
                    />
                  )}
                />

                <Route
                  exact
                  path={baseRouteUrl + "/account/inbox"}
                  render={(props) => <Inbox token={this.props.account.token} />}
                />
                <Route
                  exact
                  path={baseRouteUrl + "/account/vip"}
                  render={(props) => <VIP token={this.props.account.token} />}
                />
                <Route
                  exact
                  path={baseRouteUrl + "/account/report"}
                  render={(props) => (
                    <Report
                      token={this.props.account.token}
                      transferwallet={this.props.game.containTransferWallet}
                    />
                  )}
                />
                {this.props.game.containTransferWallet &&
                  !config.features.NewTransferUI && (
                    <Route
                      exact
                      path={baseRouteUrl + "/account/transfer"}
                      render={(props) => (
                        <Transfer
                          token={this.props.account.token}
                          getAllGameBalance={this.getAllGameBalance}
                        />
                      )}
                    />
                  )}

                <Route
                  exact
                  path={baseRouteUrl + "/account/profile/:popup?"}
                  render={(props) => (
                    <Profile
                      account={this.props.account}
                      onhandleCSClick={this.props.onhandleCSClick}
                      popup={this.props.match.params.popup}
                    />
                  )}
                />
                {this.props.general.haveAffiliate && (
                  <Route
                    exact
                    path={baseRouteUrl + "/account/affiliate"}
                    render={(props) => (
                      <Affiliate
                        token={this.props.account.token}
                        account={this.props.account}
                        onhandleCSClick={this.props.onhandleCSClick}
                        popup={this.props.match.params.popup}
                      />
                    )}
                  />
                )}

                <Redirect
                  to={"/" + i18n.language + "/account/profile"}
                ></Redirect>
              </Switch>
            </Router>
          </RightContent>
        </MainSwitcher>
      </WrapperSwitcher>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
    general: state.general
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateBalanceList: () => dispatch(walletAction.updateBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
