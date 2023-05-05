import React, { Component } from "react";
import styled from "styled-components";
import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import Select from "@material-ui/core/Select";
import i18n from "../../../../utils/i18n";
import TableList from "./TableList";
import CustomFormControl from "./component/formcontrol";
import FilterContainer from "./component/filtercontainer";
import Container from "./component/container";
const moment = require("moment");

const Label = styled.span`
  float: left;
  margin: 20px 5px 0 0;
`;

class AccountDetails extends Component {
  state = {
    isLoaded: false,
    type: 0,
    status: 0,
    pageSize: 15,
    page: 1,
    dateRange: {
      dateFrom: moment(addDays(new Date(), -3)).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
    },
  };
  onhandleDateChange = (dateRange) => {
    this.setState({ ...this.state, dateRange: dateRange, page: 1 });
    this.props.onhandleGetReportTrigger(
      dateRange.dateFrom,
      dateRange.dateTo,
      1,
      this.state.type
    );
  };

  onhandleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      1,
      e.target.value
    );
  };
  onhandleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      1,
      this.state.type
    );
  };
  componentDidUpdate() {
    if (this.state.isLoaded === false && this.props.token != null) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,

        this.state.type
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

        this.state.type
      );
    }
  }
  handleChangePage = (page) => {
    this.setState({ ...this.state, page: page + 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      page + 1,

      this.state.type
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
          <Label>{i18n.t("report.platform")}</Label>
          <CustomFormControl>
            <Select
              native
              value={this.state.type}
              onChange={this.onhandleTypeChange}
              variant="outlined"
            >
              <option value={0}>{i18n.t("report.all")}</option>

              {(() => {
                return this.props.gameList.map((row) => {
                  return (
                    <option value={row.id} key={row.id}>
                      {row.name}
                    </option>
                  );
                });
              })()}
            </Select>
          </CustomFormControl>
        </FilterContainer>
        <TableList
          type="account"
          page={this.state.page}
          rows={this.props.accountList.list}
          total={this.props.accountList.count}
          onhandleChangePage={this.handleChangePage}
        />
      </Container>
    );
  }
}

export default AccountDetails;
