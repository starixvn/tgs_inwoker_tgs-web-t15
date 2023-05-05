import React from "react";
import styled from "styled-components";
import CustomDatePicker from "../../../Report/CustomDatePicker";
import i18n from "../../../../../../utils/i18n";
import { FormControl, withStyles } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  color: #fff;
  font-size: 14px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const TabButton = styled.div`
  width: 72px;
  height: 30px;
  font-size: 14px;
  border-radius: 15px;
  text-align: center;
  padding-top: 5px;

  float: left;

  margin-left: 8px
  background: #1b1d30;
  transition: all 0.3s;

  ${(props) =>
    props.active
      ? ` 
      background: ${props.theme.primary};`
      : ` `};
  &:hover {
    cursor: pointer;
  }
`;
const DatePicker = styled(CustomDatePicker)`
   .MuiFormControl-root {
    background: none !important;
  }
`;

const Label = styled.span`
  float: left;
  margin: 0 5px 0 0;
  width: 50px;
`;
const LabelDash = styled.span`
  float: left;
  margin: 10px 10px;
`;
const DateSelection = ({
    dateFrom,
    dateTo,
    dateRange,
    minDate,
    handleDateFromChange,
    handleDateToChange,
    handleTodayClick,
    handleWeeklyClick,
    handleMontlyClick,
}) => {
  return (
    <Container>
      <Label>{i18n.t("report.date")}</Label>
      <DatePicker
        onhandleDateChange={handleDateFromChange}
        selectedDate={dateFrom}
        maxDate={dateTo}
        minDate={minDate}
      ></DatePicker>
      <LabelDash>-</LabelDash>
      <DatePicker
        minDate={dateFrom}
        onhandleDateChange={handleDateToChange}
        selectedDate={dateTo}
      ></DatePicker>
      <TabButton
        onClick={handleTodayClick}
        active={dateRange === 0}
      >
        {i18n.t("report.today")}
      </TabButton>
      <TabButton
        onClick={handleWeeklyClick}
        active={dateRange === 1}
      >
        {i18n.t("report.oneWeek")}
      </TabButton>
      <TabButton
        onClick={handleMontlyClick}
        active={dateRange === 2}
      >
        {i18n.t("report.oneMonth")}
      </TabButton>
    </Container>
  );
};

export default DateSelection;
