import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import { withSnackbar } from "notistack";
import IconTransferRedPNG from "../../../../assets/images/icon-transfer.png";
import TransferMWalletPNG from "../../../../assets/images/transfer-mwallet.png";
import TransferTWalletPNG from "../../../../assets/images/transfer-twallet.png";
import TransferTotalPNG from "../../../../assets/images/transfer-total.png";
import ArrowRightPNG from "../../../../assets/images/arrow-right.png";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { RESET_WALLETRESULT } from "../../../../api-services/constant/actionType";
import IconRefreshPNG from "../../../../assets/images/icon-refresh.png";
import Loading from "../../Loading";
import Common from "../../../../utils/Common";
import Messagebox from "../../Messagebox";
import i18n from "../../../../utils/i18n";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import config from "../../../../config/config";
import TransferTemplate from "../template/transfer/index";

class Transfer extends Component {
  state = {
    mainWalletAmount: "0.00",
    transferWalletAmount: "0.00",
    totalAmount: "0.00",
    singleWalletGameName: "",
    loading: false,
    transferFrom: "",
    transferTo: 0,
    transferAmount: "",
    showMessagebox: false,
    messageboxText: "",
    mainAccountId: "0",
    disabled: false,
  };

  componentDidUpdate(preProps) {
    if (
      preProps.wallet.transferResult !== this.props.wallet.transferResult &&
      this.props.wallet.transferResult !== null
    ) {
      if (this.props.wallet.transferResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.getAllGameBalance();
        this.setState({
          ...this.state,
          fromWallet: "",
          toWallet: "",
          loading: false,
          open: false,
          disabled: false,
        });
        // AppHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(this.props.wallet.transferResult.info),
          {
            variant: "error",
          }
        );
        this.setState({
          ...this.state,
          disabled: false,
        });
      }
    }

    if (
      preProps.wallet.withdrawalAllResult !==
        this.props.wallet.withdrawalAllResult &&
      this.props.wallet.withdrawalAllResult !== null
    ) {
      if (this.props.wallet.withdrawalAllResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "0.00",
          fromWallet: "",
          toWallet: "",
          loading: false,
          open: false,
        });
        // AppHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.withdrawalAllResult.info
          ),
          {
            variant: "error",
          }
        );
      }
    }
  }

  handleTransferFromChange = (e) => {
    const fromWallet = e.target.value;
    if (fromWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        transferFrom: fromWallet,
        transferTo: this.state.mainAccountId,
      });
    } else {
      this.setState({
        ...this.state,
        transferFrom: fromWallet,
        transferTo: "",
      });
    }
  };
  handleTransferToChange = (e) => {
    const toWallet = e.target.value;
    if (toWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        transferFrom: this.state.mainAccountId,
        transferTo: toWallet,
      });
    } else {
      this.setState({
        ...this.state,
        transferFrom: "",
        transferTo: toWallet,
      });
    }
  };
  handleTransferAmountChange = (e) => {
    this.setState({
      ...this.state,
      transferAmount: e.target.value,
    });
  };
  handleTranferClick = (e) => {
    this.setState({ ...this.state, disabled: true });
    const transferFrom = this.state.transferFrom;
    const transferTo = this.state.transferTo;
    const transferAmount = parseFloat(
      this.state.transferAmount.replace(/,/g, "")
    );
    const balance = this.props.wallet.mainBalance;
    if (parseFloat(transferAmount) <= 0) {
      this.props.enqueueSnackbar(i18n.t("transfer.invalidAmount"), {
        variant: "error",
      });
      this.setState({ ...this.state, disabled: false });
      return;
    }
    if (
      parseFloat(transferAmount) > parseFloat(balance) &&
      transferFrom === this.state.mainAccountId
    ) {
      if (parseFloat(transferAmount) <= 0) {
        this.props.enqueueSnackbar(i18n.t("transfer.invalidAmount"), {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(i18n.t("transfer.insufficient"), {
          variant: "error",
        });
      }
      this.setState({ ...this.state, disabled: false });
    } else {
      if (transferFrom === this.state.mainAccountId)
        this.props.doTransfer(transferTo, transferAmount);
      else this.props.doWithdrawalFromGame(transferFrom, transferAmount);
    }
  };
  transfer = (transferFrom, transferTo, transferAmount) => {
    this.props.doTransfer(
      transferAmount,
      this.state.mainAccountId,
      transferTo === this.state.mainAccountId ? transferFrom : transferTo,
      transferFrom === this.state.mainAccountId ? 1 : 2
    );
  };
  handleWithdrawAllClick = (e) => {
    this.props.doWithdrawAll();
  };
  handleTranferIn = (gpcode) => {
    this.props.doTransfer(gpcode, this.props.wallet.mainBalance);
  };

  handleSwitchAutoTransfer = () => {
    this.props.updateAutoTransferStatus().then(() => {});
  };
  handleCloseDialog = () => {
    this.setState({ ...this.state, showMessagebox: false });
  };
  render() {
    return (
      <React.Fragment>
        <TransferTemplate
          template={config.accountTemplate}
          wallet={this.props.wallet}
          game={this.props.game}
          transferFrom={this.state.transferFrom}
          transferTo={this.state.transferTo}
          transferAmount={this.state.transferAmount}
          mainAccountId={this.state.mainAccountId}
          disabled={this.state.disabled}
          loading={this.state.loading}
          showMessagebox={this.state.showMessagebox}
          messageboxText={this.state.messageboxText}
          handleTransferFromChange={this.handleTransferFromChange}
          handleTransferToChange={this.handleTransferToChange}
          handleTransferAmountChange={this.handleTransferAmountChange}
          handleTranferClick={this.handleTranferClick}
          handleSwitchAutoTransfer={this.handleSwitchAutoTransfer}
          performWithdrawFromEveryBrand={
            this.props.performWithdrawFromEveryBrand
          }
          handleTranferIn={this.handleTranferIn}
          handleCloseDialog={this.handleCloseDialog}
          getAllGameBalance={this.props.getAllGameBalance}
          getBalanceList={this.props.getBalanceList}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doTransfer: (gpcode, amount) =>
      dispatch(walletAction.doTransfer(gpcode, amount)),
    doWithdrawalFromGame: (gpcode, amount) =>
      dispatch(walletAction.doWithdrawalFromGame(gpcode, amount)),
    doWithdrawAll: () => dispatch(walletAction.doWithdrawAll()),
    updateAutoTransferStatus: () =>
      dispatch(walletAction.updateAutoTransferStatus()),
    performWithdrawFromEveryBrand: () =>
      dispatch(walletAction.performWithdrawFromEveryBrand()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Transfer));
