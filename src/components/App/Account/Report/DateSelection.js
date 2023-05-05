import React, { Component } from "react";
import { connect } from "react-redux";
import addDays from "date-fns/addDays";
import { DateSelectionTemplate } from "../template/report";
import config from "../../../../config/config";

var moment = require("moment");
class DateSelection extends Component {
  state = {
    dateFrom: this.props.defaultDateFrom,
    dateTo: this.props.defaultDateTo,
    dateRange: -1,
  };

  callbackDateChange = (from, to) => {
    this.props.onhandleDateChange({
      dateFrom: moment(from).format("YYYY-MM-DD"),
      dateTo: moment(to).format("YYYY-MM-DD"),
    });
  };

  handleDateFromChange = (e) => {
    this.callbackDateChange(e, this.state.dateTo);

    this.setState({
      ...this.state,
      dateFrom: e,
      dateRange: -1,
    });
  };
  handleDateToChange = (e) => {
    this.callbackDateChange(this.state.dateFrom, e);

    this.setState({
      ...this.state,
      dateTo: e,
      dateRange: -1,
    });
  };

  handleTodayClick = (date) => {
    let today = new Date();

    this.setState({
      ...this.state,
      dateFrom: today,
      dateTo: today,
      dateRange: 0,
    });
    this.callbackDateChange(today, today);
  };
  handleWeeklyClick = () => {
    let today = new Date();
    let newdateFrom = addDays(today, -7);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 1,
    });
    this.callbackDateChange(newdateFrom, today);
  };
  handleMontlyClick = () => {
    let today = new Date();
    let newdateFrom = addDays(today, -30);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 2,
    });
    this.callbackDateChange(newdateFrom, today);
  };
  render() {
    return (
      <React.Fragment>
        <DateSelectionTemplate template={config.accountTemplate}
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          dateRange={this.state.dateRange}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          handleDateFromChange={this.handleDateFromChange}
          handleDateToChange={this.handleDateToChange}
          handleTodayClick={this.handleTodayClick}
          handleWeeklyClick={this.handleWeeklyClick}
          handleMontlyClick={this.handleMontlyClick}
        />
      </React.Fragment>
    );
  }
}

export default connect()(DateSelection);
