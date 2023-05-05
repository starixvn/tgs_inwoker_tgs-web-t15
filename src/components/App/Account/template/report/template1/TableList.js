import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import i18n from "../../../../../../utils/i18n";

const CustomTable = styled(Table)`
  white-space: nowrap;
  table-layout: fixed;
  overflow: auto;
  width: ${({ isTransactionReport }) => {
    return isTransactionReport ? "auto" : "100%";
  }};
`;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "5px 20px 5px 20px",
  },
  body: {
    fontSize: 14,
    padding: "5px 20px 5px 20px",
    width: "auto",
    color: "#7b7b7b",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#dde3f6 !important",
      cursor: "pointer",
    },
  },
}))(TableRow);

const CustomWinLose = styled(StyledTableCell)`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;

const InnerWrap = styled.div`
  width: 100%;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  overflow-x: auto;
  user-select: none;
  padding-bottom: 15px;
`;

const TheDepositButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  padding: 0px 10px;
  color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;
const TableList = ({
  page,
  total,
  tableLayout,
  type,
  headerLists,
  getTableList,
  handleChangePage,
}) => {
  return (
    <div style={{ display: "grid" }}>
      <InnerWrap>
        <CustomTable
          aria-label="customized table"
          style={{ tableLayout: tableLayout }}
          isTransactionReport={type === "transactionDetails"}
        >
          <TableHead>
            <TableRow>
              {headerLists[type].map((header, index) => {
                return (
                  <StyledTableCell
                    align={header.align}
                    style={{ width: header.width }}
                  >
                    {i18n.t(header.title)}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{getTableList(StyledTableRow,StyledTableCell,CustomWinLose,TheDepositButton)}</TableBody>
        </CustomTable>
      </InnerWrap>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={total}
        rowsPerPage={20}
        page={page - 1}
        labelRowsPerPage={("asd", "213123", "asdasdasda", "每頁行数")}
        backIconButtonProps={{
          "aria-label": "previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "next page",
        }}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default TableList;
