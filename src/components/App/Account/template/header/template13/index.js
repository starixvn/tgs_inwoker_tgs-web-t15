import React from "react";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import IconRefreshPNG from "../../../../../../assets/images/icon-refresh.png";

import i18n from "../../../../../../utils/i18n";
import Common from "../../../../../../utils/Common";

export const rotateKeyFrame = keyframes`
  0% {
    transform:scaleX(-1) rotate(-45deg);
  }
  100% {
    transform:scaleX(-1) rotate(-400deg);
  }
`;
const Container = styled.div`
  width: 1280px;
  height: 100px;
  margin: 20px 0 40px 0;
  display: flex;
`;
const PlayerInfoContainer = styled.div`
  width: 500px;
  margin-right: auto;
`;
const PlayerName = styled.div`
  font-size: 34px;
  color: #fff;
`;
const MainWalletContainer = styled.div`
  float: left;
`;
const MainAccountLabel = styled.div`
  font-size: 17px;
  color: #fff;
  text-align: right;
  padding-right: 68px;
`;
const AmountContainer = styled.div`
  width: 180px;
  float: left;
  font-size: 34px;
  text-align: right;
  color: #fff;
  margin-top: 15px;
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  background: url(${IconRefreshPNG}) no-repeat center;
  transform: scaleX(-1) rotate(-45deg);
  transform-origin: 13px 14px;
`;
const RefreshButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 45px;
  float: left;
  margin: 15px 25px 0 15px;
  background: ${({ theme }) => theme.primary};
  padding: 7px;

  &:hover {
    cursor: pointer;
    ${RefreshButtonIcon} {
        animation: ${rotateKeyFrame} 1s linear 0s infinite;
    }
  }
`;

const VIPLabel = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
  margin-top: 10px;
`;

const Template13 = ({ game, info, wallet, onhandleRefreshClick }) => {
  var ingame = 0;

  game.providerList.map((item) => {
    if (item.transferwallet === true) ingame += parseFloat(item.balance);
  });
  return (
    <Container>
      <PlayerInfoContainer>
        <PlayerName>{info.member_username}</PlayerName>
        <VIPLabel>
          VIP
          {info.member_level_id}
        </VIPLabel>
      </PlayerInfoContainer>

      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.mainWallet")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont
            content={
              wallet.mainSymbol +
              Common.formatNumberWithThousand(wallet.mainBalance)
            }
          />
        </AmountContainer>
        <RefreshButton onClick={onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
      {game.containTransferWallet && (
        <>
          <MainWalletContainer>
            <MainAccountLabel>
              {i18n.t("web.account.header.allGameWallet")}:
            </MainAccountLabel>
            <AmountContainer>
              <DynamicFont content={wallet.mainSymbol + ingame.toFixed(2)} />
            </AmountContainer>
            <RefreshButton onClick={onhandleRefreshClick}>
              <RefreshButtonIcon></RefreshButtonIcon>
            </RefreshButton>
          </MainWalletContainer>
        </>
      )}

      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.total")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont
            content={
              wallet.mainSymbol +
              Common.formatNumberWithThousand(wallet.mainBalance + ingame)
            }
          />
        </AmountContainer>
        <RefreshButton onClick={onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
    </Container>
  );
};

export default Template13;