import React from "react";
import styled from "styled-components";
import IconBonusRedPNG from "../../../../../../assets/images/icon-bonus.png";
import i18n from "../../../../../../utils/i18n";
import QRCode from "react-qr-code";

import { FormControl, Select } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useState } from "react";
import { generalAction } from "../../../../../../api-services/actions/generalAction";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const CustomTable = styled(Table)`
  white-space: nowrap;
  table-layout: fixed;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: auto;
  width: ${({ isTransactionReport }) => {
    return isTransactionReport ? "auto" : "100%";
  }};
`;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "5px 20px 5px 20px",
  },
  body: {
    fontSize: 14,
    padding: "5px 20px 5px 20px",
    width: "auto",
    color: "#7b7b7b",
  },
}))(TableCell);

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  width: 100%;
  min-height: 611px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;
  background: url(${IconBonusRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
`;

const InnerWrap = styled.div`
  width: 935px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const QRCodeLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 18px;
`;
const QRCodeContainer = styled.div`
  padding: 10px;
  margin: 0 auto;
  display: table;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 400px;
  font-size: 14px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-weight: 600;
  margin: 12px 0 0 3px;
  float: left;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  margin: 12px 0 12px 10px;
  font-weight: 500;
  border: 0;
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #000;
    opacity: 1;
  }
`;
const Button = styled.div`
  height: 30px;
  border: solid 1px #000;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: #000;
  float: right;
  padding: 5px 20px 0 20px;
  margin-top: 6px;
  width: 80px;
  color: #fff;
  border-radius: 6px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;

const RebateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "400px",
    height: "47.63px",
    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);

const Template1 = ({ affiliateLink, account, handleCopyLink, general }) => {
  const type = [
    { value: 1, title: "sport" },
    { value: 2, title: "virtualsports" },
    { value: 5, title: "live" },
    { value: 7, title: "chess" },
    { value: 13, title: "lottery" },
    { value: 15, title: "electron" },
  ];

  const [rebates, setRebates] = useState([]);
  const [rebateType, setRebateType] = useState(1);

  const getRebates = () => {
    generalAction.getBrandAllAgentRebates().then((res) => {
      if (res.isSuccess) {
        setRebates(res.data);
      }
    });
  };

  useEffect(() => {
    if (general.rebates) {
      setRebates(general.rebates);
    } else if (rebates.length > 0) {
      getRebates();
    }
  }, [general.rebates]);

  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("affiliate.title")}
      </Title>
      <InnerWrap>
        <div>
          <QRCodeLabel>{i18n.t("affiliate.qrCode")}</QRCodeLabel>
          <QRCodeContainer>
            <QRCode size={128} value={affiliateLink}></QRCode>
          </QRCodeContainer>
          <CustomText>
            <CustomLabel>{i18n.t("affiliate.promoId")}</CustomLabel>
            <CustomInput
              type={"text"}
              value={account.info.playercode}
              readOnly={true}
            ></CustomInput>
          </CustomText>
          <CustomText>
            <CustomLabel>{i18n.t("affiliate.promoLink")}</CustomLabel>
            <CustomInput
              type={"text"}
              value={affiliateLink}
              readOnly={true}
            ></CustomInput>
            <Button onClick={handleCopyLink}>{i18n.t("common.copy")}</Button>
          </CustomText>
        </div>
        <RebateContent>
          <div>{i18n.t("rebateRate.title")}</div>
          <div>
            <CustomFormControl>
              <CustomSelect
                variant="outlined"
                displayEmpty
                className="fix-text-cut"
                native
                value={rebateType}
                onChange={(e) => {
                  setRebateType(e.target.value);
                }}
              >
                {type.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {i18n.t(`common.${item.title}`)}
                    </option>
                  );
                })}
              </CustomSelect>
            </CustomFormControl>
          </div>
          <div>
            <CustomTable
              aria-label="customized table"
              isTransactionReport={type === "transactionDetails"}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    {i18n.t("rebateRate.players")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {i18n.t("rebateRate.turnover")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {i18n.t("rebateRate.rebates")} (%)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rebates
                  .filter((item) => {
                    if (rebateType === 0) {
                      return true;
                    } else {
                      return (
                        item.allagentgametype.toString() ===
                        rebateType.toString()
                      );
                    }
                  })
                  .map((data, index) => {
                    return (
                      <TableRow>
                        <StyledTableCell>{data.activenumber}</StyledTableCell>{" "}
                        <StyledTableCell>{data.turnover}</StyledTableCell>{" "}
                        <StyledTableCell>
                          {data.rebatepercentage}
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </CustomTable>
          </div>
        </RebateContent>
      </InnerWrap>
    </Container>
  );
};

export default Template1;
