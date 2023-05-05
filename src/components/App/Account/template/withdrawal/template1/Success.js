import React from "react";

import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import CustomButton from "../../../../../Share/Button";
import SuccessPNG from "../../../../../../assets/images/success.png";

const Container = styled.div`
  padding-top: 50px;
`;
const ImgSuccess = styled.img`
  margin: 0 auto;
  display: block;
  width: 100px;
`;
const SuccessMessage = styled.div`
  font-size: 20px;
  color: #818181;
  text-align: center;
  margin-top: 20px;
`;

const SameLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Success = ({ verified, handleConfirmClick, handleVerifyName }) => {
  return (
    <Container>
      <ImgSuccess src={SuccessPNG}></ImgSuccess>
      <SuccessMessage>{i18n.t("withdrawal.msgSuccess")}</SuccessMessage>
      <SameLine>
        <CustomButton
          name={i18n.t("common.confirm")}
          width={257}
          handleClick={handleConfirmClick}
        ></CustomButton>
        {!verified && (
          <CustomButton
            name={i18n.t("verified.goVerify")}
            width={257}
            grayMode
            float={"none"}
            marginLeft={10}
            handleClick={handleVerifyName}
          ></CustomButton>
        )}
      </SameLine>
    </Container>
  );
};

export default Success;
