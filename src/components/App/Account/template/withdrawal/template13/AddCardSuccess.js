import React from "react";

import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import Button from "../../../../../Share/Button";

const Container = styled.div`
  width: 100%;
  & #shared-custom-button {
    color: #fff;
    border-radius: 25px;
    ${(props) =>
      props.disabled
        ? ``
        : `background: #cf2029;filter: 
           drop-shadow(1px 1px 6px #cf2029ba);
    `}
    border: none;
    cursor: pointer;
    padding-top: 4px;
    margin-bottom: 10px;
    &:hover {
      box-shadow: none;
    }
  }
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: justify;
  color: #fff;
`;
const SubTitleDesc = styled.div`
  text-align: justify;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #fff;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: table;
  width: 540px;
  display: flex;
  justify-content: space-around;
`;

const AddCardSuccess = ({
  isDeposit,
  bankCardList,
  onhandleBindCardClick,
  onhandleGoWithdrawClick,
  onhandleGoDepositClick,
  onhandleCSClick,
}) => {
  return (
    <Container>
      <SubTitle>{i18n.t("card.success.title")}</SubTitle>
      {!(
        config.features.ChangesNotAllowed ||
        config.features.AddCard_NotAllowedEditDelete ||
        bankCardList.length >= config.features.AddCard_MaximumCardAllowed
      ) ? (
        <SubTitleDesc>
          {i18n.t("card.success.successDesc")}
          <br></br>
          {i18n.t("card.success.bindDesc")}
        </SubTitleDesc>
      ) : (
        <SubTitleDesc>{i18n.t("card.success.noMoreAddCard")}</SubTitleDesc>
      )}

      <ButtonContainer>
        {!(
          config.features.ChangesNotAllowed ||
          config.features.AddCard_NotAllowedEditDelete ||
          bankCardList.length >= config.features.AddCard_MaximumCardAllowed
        ) && (
          <Button
            name={i18n.t("card.success.bindBankCard")}
            width={255}
            handleClick={onhandleBindCardClick}
          ></Button>
        )}
        <Button
          name={
            isDeposit
              ? i18n.t("card.success.goDeposit")
              : i18n.t("card.success.goWithdrawal")
          }
          width={255}
          handleClick={
            isDeposit ? onhandleGoDepositClick : onhandleGoWithdrawClick
          }
        ></Button>
      </ButtonContainer>
    </Container>
  );
};

export default AddCardSuccess;
