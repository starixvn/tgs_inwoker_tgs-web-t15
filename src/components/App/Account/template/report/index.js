import React from "react";
import Template1 from "./template1";
import Template13 from "./template13";
import DateSelectionT1 from "./template1/DateSelection";
import DateSelectionT13 from "./template13/DateSelection";
import TableListT1 from "./template1/TableList";
import TableListT13 from "./template13/TableList";

const Report = ({
  template,
  transferwallet,
  tab,
  handleTabClick,
  switchTab,
}) => {
  const commonprops = {
    transferwallet: transferwallet,
    tab: tab,
    handleTabClick: handleTabClick,
    switchTab: switchTab,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <Template13 {...commonprops} />;
      default:
        return <Template1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};
const DateSelectionTemplate = ({
  template,
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
  const commonprops = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    dateRange: dateRange,
    minDate: minDate,
    maxDate: maxDate,
    handleDateFromChange: handleDateFromChange,
    handleDateToChange: handleDateToChange,
    handleTodayClick: handleTodayClick,
    handleWeeklyClick: handleWeeklyClick,
    handleMontlyClick: handleMontlyClick,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <DateSelectionT13 {...commonprops} />;
      default:
        return <DateSelectionT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

const TableListTemplate = ({
  template,
  page,
  total,
  tableLayout,
  type,
  headerLists,
  getTableList,
  handleChangePage,
}) => {
  const commonprops = {
    page:page,
    total:total,
    tableLayout:tableLayout,
    type:type,
    headerLists:headerLists,
    getTableList:getTableList,
    handleChangePage:handleChangePage,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <TableListT13 {...commonprops} />;
      default:
        return <TableListT1 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export { Report, DateSelectionTemplate, TableListTemplate };
