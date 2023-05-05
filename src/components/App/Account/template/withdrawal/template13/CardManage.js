import React from "react";
import styled from "styled-components";
import Button from "../../../../../Share/Button";
import IconBankPNG from "../../../../../../assets/images/icon-bank.png";
import IconAddCardPNG from "../../../../../../assets/images/icon-addcard.png";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";

const RemoveButtonWrapper = styled.div`
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
    padding-top: 2px;
    &:hover {
      box-shadow: none;
    }
  }
`;

const BackButtonWrapper = styled(RemoveButtonWrapper)`
& #shared-custom-button {
    color: #fff;
    border-radius: 25px;
    ${(props) =>
      props.disabled
        ? ``
        : ``}
    border: none;
    cursor: pointer;
    padding-top: 4px;
    &:hover {
      box-shadow: none;
    }
  }
`;
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: justify;
  color: #fff;
`;

const CardContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const CardFrame = styled.div`
  width: 279px;
  height: 133px;
  background-color: #1B1D30;
  border-radius: 15px;
  float: left;
  margin: 8px;
`;
const AddCardFrame = styled(CardFrame)`
  background-image: url(${IconAddCardPNG});
  background-repeat: no-repeat;
  background-position: center 20px;
  &:hover {
    cursor: pointer;
  }
`;
const AddCardFrameLabel = styled.div`
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 88px;
`;
const ContainerHeader = styled.div`
  border-bottom: solid 1px #ffffff26;
  width: 100%;
  height: 41px;
`;
const CardBankIcon = styled.div`
  width: 18px;
  height: 18px;
  float: left;
  margin: 10px 0 0 8px;
  background: #fff;
  mask: url(${IconBankPNG}) no-repeat;
`;
const Label = styled.div`
  font-size: 14px;
  float: left;
  color: #fff;
  margin: 9px 0 0 6px;
`;

const CardTitle = styled(Label)``;
const CardNumber = styled(Label)`
  font-weight: bold;
  max-width: 120px;
  color: #fff;
  white-space: nowrap;
  float: right;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LeftLabel = styled(Label)`
  float: left;
  margin: 6px 0 0 5px;
`;

const RowContainer = styled.div`
  padding: 5px 10px;
`;
const CardManage = ({
  bankCardList,
  onhandleDeleteCardClick,
  onhandleAddCardClick,
  onhandleBackClick,
}) => {
  return (
    <Container>
      <SubTitle>{i18n.t("card.title")}</SubTitle>
      <CardContainer>
        {bankCardList.map((item, key) => {
          return (
            <CardFrame key={item.id}>
              <ContainerHeader>
                <CardBankIcon></CardBankIcon>
                <Label>{i18n.t("card.myCard")}</Label>
              </ContainerHeader>

              <RowContainer>
                <CardTitle>{i18n.t("card.tail")}</CardTitle>
                <CardNumber>
                  {(() => {
                    if (
                      item.banktype === "ThirdParty" ||
                      item.banktype === "FPS"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else if (
                      item.banktype === "Pulsa" ||
                      item.banktype === "EWallet"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else {
                      if (item.detail.bankAccount) {
                        return item.detail.bankAccount.substring(
                          item.detail.bankAccount.length - 4,
                          item.detail.bankAccount.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    }
                  })()}
                </CardNumber>
              </RowContainer>
              {!(
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete
              ) && (
                <RowContainer>
                  <LeftLabel>{i18n.t("card.removeCard")}</LeftLabel>
                  <RemoveButtonWrapper>
                    <Button
                      name={i18n.t("card.remove")}
                      width={89}
                      height={32}
                      grayMode={true}
                      small={true}
                      marginTop={1}
                      handleClick={() => onhandleDeleteCardClick(item.id)}
                      float={"right"}
                    ></Button>
                  </RemoveButtonWrapper>
                </RowContainer>
              )}
            </CardFrame>
          );
        })}

        {!(
          config.features.AddCard_NotAllowedEditDelete ||
          config.features.ChangesNotAllowed ||
          (bankCardList.length >= config.features.AddCard_MaximumCardAllowed &&
            config.features.AddCard_DisableCreateUpdateDelete)
        ) && (
          <AddCardFrame onClick={onhandleAddCardClick}>
            <AddCardFrameLabel>{i18n.t("card.msgAddCard")}</AddCardFrameLabel>
          </AddCardFrame>
        )}
      </CardContainer>
      <BackButtonWrapper>
        <Button
          grayMode={true}
          name={i18n.t("common.back")}
          width={255}
          height={46}
          marginLeft={300}
          marginTop={100}
          handleClick={onhandleBackClick}
        ></Button>
      </BackButtonWrapper>
    </Container>
  );
};

export default CardManage;
