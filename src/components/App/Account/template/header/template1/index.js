import React from "react";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import IconRefreshPNG from "../../../../../../assets/images/icon-refresh.png";
import AvatarPNG from "../../../../../../assets/images/avatar.png";

import i18n from "../../../../../../utils/i18n";
import Common from "../../../../../../utils/Common";
import config from "../../../../../../config/config";

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  width: 1205px;
  height: 142px;
  margin: 19px 13px 10px 13px;
  border-radius: 10px;
  background-color: #ededed;
  box-shadow: 0px 3px 16px -3px rgba(0, 0, 0, 0.75);
`;
const AvatarContainer = styled.img`
  width: 88px;
  float: left;
  margin: 30px 15px 0 30px;
`;
const PlayerInfoContainer = styled.div`
  float: left;
  margin: 36px 0;
  width: 210px;
`;
const PlayerName = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
  height: 26px;
`;

const SpliterLine = styled.div`
  background-color: #b7c7cc;
  width: 1px;
  height: 85px;
  float: left;
  margin: 30px 0;
`;
const MainWalletContainer = styled.div`
  float: left;
  margin: 24px 17px;
`;
const MainAccountLabel = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
  height: 25px;
`;
const AmountContainer = styled.div`
  width: 180px;
  float: left;
  font-family: Arial;
  font-size: 40px;
  text-align: right;
  color: ${({ theme }) => theme.secondary};
  margin-top: 15px;
`;
const RefreshButton = styled.div`
  width: 28px;
  height: 29px;
  border-radius: 4.7px;

  float: left;
  margin: 25px 25px 0 15px;
  ${({ theme }) => {
    return config.features.UseAccentColor
      ? `background: ${theme.accent};`
      : ` background-image: linear-gradient(
      to top,
      ${theme.primaryGradient},
      ${theme.primary}
    )`;
  }};
  &:hover {
    cursor: pointer;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  background: url(${IconRefreshPNG}) no-repeat center;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const VIPLabel = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
`;

const Template1 = ({ game, info, wallet, onhandleRefreshClick }) => {
  var ingame = 0;

  game.providerList.map((item) => {
    if (item.transferwallet === true) ingame += parseFloat(item.balance);
  });
  return (
    <Container>
      <AvatarContainer src={AvatarPNG}></AvatarContainer>
      <PlayerInfoContainer>
        <PlayerName>{info.member_username}</PlayerName>
        <VIPLabel>
          VIP
          {info.member_level_id}
        </VIPLabel>
      </PlayerInfoContainer>

      <SpliterLine></SpliterLine>
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
      <SpliterLine></SpliterLine>
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
          <SpliterLine></SpliterLine>
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

export default Template1;