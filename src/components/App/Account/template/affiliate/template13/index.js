import React from "react";
import styled from "styled-components";
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
    color: "#fff",
  },
}))(TableCell);

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  width: 100%;
  min-height: 611px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;
  background: #fff;
  mask: url(${process.env.PUBLIC_URL +
    "/assets/images/pcAccountMenu/icon-bonus.svg"})
    no-repeat left center;
  mask-size: 24px 24px;
  float: left;
`;

const InnerWrap = styled.div`
  width: 935px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #27273f;
  padding: 25px 0 50px 0;
  position: relative;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const QRCodeLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 18px;
  color: #fff;
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
  background-color: #ffffff;
  border-radius: 25px;
  padding: 0px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  margin: 12px 0 0 3px;
  float: left;
  color: #313131;
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
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  float: right;
  padding: 7px 20px 0 20px;
  margin-top: 6px;
  width: 80px;
  color: #fff;
  border-radius: 15px;
  background: #cf2029;

  &:hover {
    cursor: pointer;
  }
`;

const RebateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
  color: #fff;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "400px",
    height: "41px",
    marginRight: "5px",
    float: "left",
    padding: 0,
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      paddingLeft: "12px",
      "& fieldset": {
        borderRadius: "25px",
        borderColor: "#fff",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: "#fff",
        marginTop: "1px",
      },
    },
    "& .MuiSelect-select": {
      fontSize: "16px",
      color: "#ffffff",
    },
    "& .MuiSelect-select > option": {
      fontSize: "14px",
      color: "#1b1d30",
    },
    "& .MuiSelect-icon": {
      color: "#ffffff",
    },
  },
}))(FormControl);

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#fff",
  },
}))(Select);

const Template13 = ({ affiliateLink, account, handleCopyLink, general }) => {
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
                native
                className="fix-text-cut"
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

export default Template13;
