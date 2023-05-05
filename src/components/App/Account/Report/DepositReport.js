import React, { Component } from "react";
import styled from "styled-components";
import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import Select from "@material-ui/core/Select";
import TableList from "./TableList";
import i18n from "../../../../utils/i18n";
import InnerWrap from "./component/innerwrap";
import CustomFormControl from "./component/formcontrol";
import FilterContainer from "./component/filtercontainer";
import Container from "./component/container";
const moment = require("moment");

const Label = styled.span`
  float: left;
  margin: 20px 5px 0 0;
`;

class DepositReport extends Component {
  state = {
    isLoaded: false,
    status: "",
    page: 1,
    dateRange: {
      dateFrom: moment(addDays(new Date(), -7)).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
    },
  };
  onhandleDateChange = (dateRange) => {
    this.props.onhandleGetReportTrigger(
      dateRange.dateFrom,
      dateRange.dateTo,
      this.state.page,
      this.state.status
    );
    this.setState({ ...this.state, dateRange: dateRange });
  };
  onhandleStatusChange = (e) => {
    this.setState({
      ...this.state,
      status: e.target.value,
      page: 1,
    });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      1,
      e.target.value
    );
  };

  componentDidUpdate() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,
        this.state.status
      );
    }
  }
  componentDidMount() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,
        this.state.status
      );
    }
  }
  handleChangePage = (page) => {
    this.setState({ ...this.state, page: page });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      page,

      this.state.status
    );
  };
  render() {
    return (
      <Container>
        <FilterContainer>
          <DateSelection
            onhandleDateChange={this.onhandleDateChange}
            defaultDateFrom={this.state.dateRange.dateFrom}
            defaultDateTo={this.state.dateRange.dateTo}
          ></DateSelection>
          <div className="clear"></div>
          <Label>{i18n.t("report.status")}</Label>
          <CustomFormControl>
            <Select
              native
              value={this.state.status}
              onChange={this.onhandleStatusChange}
              variant="outlined"
            >
              <option value={""}>{i18n.t("report.all")}</option>
              {Object.keys(this.props.depositStatusList).map((key) => {
                return (
                  <option value={key}>
                    {i18n.t(`report.deposit.status${key}`)}
                  </option>
                );
              })}
            </Select>
          </CustomFormControl>
        </FilterContainer>
        <InnerWrap>
          <TableList
            type="depositReport"
            page={this.state.page}
            rows={this.props.depositList.list}
            total={this.props.depositList.count}
            onhandleChangePage={this.handleChangePage}
            depositStatusList={this.props.depositStatusList}
          />
        </InnerWrap>
      </Container>
    );
  }
}

export default DepositReport;
