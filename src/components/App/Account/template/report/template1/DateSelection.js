import React from "react";
import styled from "styled-components";
import CustomDatePicker from "../../../Report/CustomDatePicker";
import i18n from "../../../../../../utils/i18n";

const Container = styled.div`
  width: 100%;
  color: #7b7b7b;
  font-size: 14px;
`;

const TabButton = styled.div`
  width: 72px;
  height: 39px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #f7f7f7;
  text-align: center;
  padding-top: 8px;

  float: left;

  margin-left: 8px
  border-radius: 5px;
  border: solid 1px #e4eaff;
  transition: all 0.3s;

  ${(props) =>
    props.active
      ? ` 
      border: solid 1px ${props.theme.primary};
      color: ${props.theme.primary};`
      : ` `};
  &:hover {
    cursor: pointer;
  }
`;
const DatePicker = styled(CustomDatePicker)``;
const Label = styled.span`
  float: left;
  margin: 10px 5px 0 0;
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
    maxDate,
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
        maxDate={maxDate}
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
