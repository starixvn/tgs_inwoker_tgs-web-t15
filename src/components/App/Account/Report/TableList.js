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
import i18n from "../../../../utils/i18n";

import { useSnackbar } from "notistack";
import { AppHistory } from "../../../../history/History";
import config from "../../../../config/config";
import { utility } from "../../../../utils/utility";
import { TableListTemplate } from "../template/report";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import Common from "../../../../utils/Common";
const moment = require("moment");

const headerLists = {
  transactionDetails: [
    {
      title: `report.betDateTime`,
    },
    {
      title: `report.betid`,
      width: "20rem",
    },
    {
      title: `report.platformgamename`,
    },
    {
      align: "right",
      title: `report.totalBet`,
      width: "4rem",
    },
    {
      align: "right",
      title: `report.validBet`,
      width: "4rem",
    },
    {
      align: "right",
      title: `report.winloss`,
      width: "4rem",
    },
  ],
  depositReport: [
    {
      title: `report.submitDate`,
    },
    {
      title: `report.NewOrderNumber`,
    },
    {
      title: `report.status`,
    },
    {
      align: "right",
      title: `common.amount`,
    },
  ],
  joinedPromo: [
    {
      title: `report.dateTime`,
      widthT13: "8rem"
    },
    {
      title: `report.joinedPromo.promoName`,
    },
  ],
  transfer: [
    {
      title: `report.dateTime`,
    },
    {
      title: `report.transfer.table.from`,
    },
    {
      title: `report.transfer.table.to`,
    },
    {
      title: `report.amount`,
    },
  ],
  withdrawal: [
    {
      align: "",
      title: `report.RequestDate`,
    },
    {
      align: "",
      title: `report.NewOrderNumber`,
    },
    {
      align: "",
      title: `report.status`,
    },
    {
      align: "right",
      title: `common.amount`,
    },
  ],
  account: [
    {
      title: `report.submitDate`,
    },
    {
      title: `report.status`,
    },
    {
      title: `report.transferOut`,
    },
    {
      title: `report.transferIn`,
    },
    {
      align: "right",
      title: `report.amount`,
    },
  ],
  rebate: [
    {
      title: `report.rebate.sn`,
    },
    {
      title: `report.rebate.cycleDate`,
    },
    {
      title: `report.status`,
    },
    {
      align: "right",
      title: `report.rebate.validBet`,
    },
    {
      align: "right",
      title: `report.rebate.amount`,
    },
  ],
  balanceChanges: [
    {
      title: `report.dateTime`
    },
    {
      title: `report.balanceChanges.type`
    },
    {
      title: `report.balanceChanges.amount`
    }
  ]
};

function TableList(props) {
  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleDoubleClick = (id) => {
    enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(id);
  };

  const handleManualDeposit = (id) => {
    AppHistory.push({
      pathname: "/" + i18n.language + "/account/manual/" + id,
    });
  };

  const getTableList = (StyledTableRow,StyledTableCell,CustomWinLose,TheDepositButton) => {
    switch (props.type) {
      case "transactionDetails":
        return (
          <>
            {config.features.Report_ShowRoundsTotal && (
              <StyledTableRow id="show-total-rounds" style={{ pointerEvents: "none" }}>
                <StyledTableCell
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {i18n.t("report.total")}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="right">
                  {props.roundTotal && props.roundTotal.betAmount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {props.roundTotal && props.roundTotal.validBetAmount}
                </StyledTableCell>
                <CustomWinLose
                  value={props.roundTotal && props.roundTotal.winLoss}
                  align="right"
                >
                  {props.roundTotal && props.roundTotal.winLoss}
                </CustomWinLose>
              </StyledTableRow>
            )}
            {props.rows &&
              props.rows.map((row, index) => {
                const date = moment(row.createdOn).format("YYYY-MM-DD hh:mm a");
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={(e) => {
                      handleDoubleClick(row.id);
                    }}
                  >
                    <StyledTableCell>{date}</StyledTableCell>
                    <StyledTableCell>{Common.truncateString(row.id,10)}</StyledTableCell>
                    <StyledTableCell>
                      {row.gameProviderName
                        ? config.currency === "PHP" &&
                          row.gameProviderName.includes("BTI")
                          ? row.gameProviderName.replace("BTI", "PHSB")
                          : row.gameProviderName
                        : ""}
                      -{row.gameName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.betAmount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.validBetAmount}
                    </StyledTableCell>
                    <CustomWinLose value={row.winLoss} align="right">
                      {row.winLoss}
                    </CustomWinLose>
                  </StyledTableRow>
                );
              })}
          </>
        );
      case "depositReport":
        return props.rows.map((row, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>
                {moment(row.createdon).format("YYYY-MM-DD hh:mm a")}
              </StyledTableCell>

              <StyledTableCell>{row.orderno}</StyledTableCell>
              <StyledTableCell>
                {i18n.t(`report.deposit.status${row.status}`)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell>
                {row.status === 1 && row.canuploadcerts === true && (
                  <TheDepositButton
                    onClick={() => {
                      handleManualDeposit(row.id);
                    }}
                  >
                    {i18n.t("deposit.uploadReceipt")}
                  </TheDepositButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      case "joinedPromo":
        return props.rows.map((row, index) => {
          const date = moment(row.joinedOn).format("YYYY-MM-DD hh:mm a");
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{date}</StyledTableCell>
              <StyledTableCell>{row.promotionName}</StyledTableCell>
            </StyledTableRow>
          );
        });
      case "transfer":
        return props.rows.map((row, index) => {
          const date = moment(row.balancetime).format("YYYY-MM-DD hh:mm a");
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{date}</StyledTableCell>
              <StyledTableCell>
                {row.from
                  ? config.currency === "PHP" && row.from.includes("BTI")
                    ? row.from.replace("BTI", "PHSB")
                    : row.from
                  : ""}
              </StyledTableCell>
              <StyledTableCell>
                {row.to
                  ? config.currency === "PHP" && row.to.includes("BTI")
                    ? row.to.replace("BTI", "PHSB")
                    : row.to
                  : ""}
              </StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
            </StyledTableRow>
          );
        });
      case "withdrawal":
        return props.rows.map((row, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>
                {moment(row.createdon).format("YYYY-MM-DD hh:mm a")}
              </StyledTableCell>
              <StyledTableCell>{row.orderno}</StyledTableCell>
              <StyledTableCell>
                {i18n.t(`report.withdrawal.status${row.status}`)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
            </StyledTableRow>
          );
        });
      case "account":
        return props.rows.map((row, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{row.create_time_text}</StyledTableCell>
              <StyledTableCell>{row.status_text}</StyledTableCell>
              <StyledTableCell>{row.transform_out}</StyledTableCell>
              <StyledTableCell>{row.transform_in}</StyledTableCell>
              <StyledTableCell align="right" style={{ paddingRight: "20px" }}>
                {row.amount_text}
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      case "rebate":
        return props.rows.map((row, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{row.sn}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.status_text}</StyledTableCell>
              <StyledTableCell align="right">
                {row.bet_valid_text}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.rebate_amount_text}
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      case "balanceChanges":
        return props.rows.map((row, index) => {
          const date = moment(row.recordedon).format("YYYY/MM/DD hh:mm:ss");
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{date}</StyledTableCell>
              <StyledTableCell>{ErrorSwitcher.getTranslation(row.type)}</StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
            </StyledTableRow>
          );
        });
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      <TableListTemplate
        template={config.accountTemplate}
        page={props.page}
        total={props.total}
        tableLayout={props.tableLayout}
        type={props.type}
        headerLists={headerLists}
        getTableList={getTableList}
        handleChangePage={handleChangePage}
      />
      {/* <div style={{ display: "grid" }}>
        <InnerWrap>
          <CustomTable
            aria-label="customized table"
            style={{ tableLayout: props.tableLayout }}
            isTransactionReport={props.type === "transactionDetails"}
          >
            <TableHead>
              <TableRow>
                {headerLists[props.type].map((header, index) => {
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
            <TableBody>{getTableList()}</TableBody>
          </CustomTable>
        </InnerWrap>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={props.total}
          rowsPerPage={20}
          page={props.page - 1}
          labelRowsPerPage={("asd", "213123", "asdasdasda", "每頁行数")}
          backIconButtonProps={{
            "aria-label": "previous page",
          }}
          nextIconButtonProps={{
            "aria-label": "next page",
          }}
          onPageChange={handleChangePage}
        />
      </div> */}
    </React.Fragment>
  );
}
export default TableList;
