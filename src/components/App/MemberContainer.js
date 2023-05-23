import React from "react";

import styled, { keyframes } from "styled-components";

import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import TransferIcon from "../../assets/images/new/1.png";
import DepositIcon from "../../assets/images/new/2.png";
import WithdrawalIcon from "../../assets/images/new/3.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import { Popover } from "@material-ui/core";
import Common from "../../utils/Common";
import config from "../../config/config";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  float: right;
  color: #000;
  height: 100%;
  width: 100%;
  margin-top: 10px;
`;
const BtnStyle1 = styled.div`
  width: 68px;
  height: 35px;
  border-radius: 4px;

  float: right;
  margin-right: 10px;
  text-align: center;
  line-height: 220%;
  border: solid 1px #ffffff;
  color: #fff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    border: solid 1px #fde73f;
    color: #fde73f;
    cursor: pointer;
  }
`;

const BalanceContainer = styled.div`
  color: #ffffff;
  text-align: right;
  padding: 10px 0 0 0;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const RowContainer = styled.div`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: 33% 33% 33%;
`;

const IconButtonContainer = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: 100%;
`;

const ContainerInContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  width: fit-content;
`;

const ContainerText = styled(ContainerInContainer)`
  align-items: flex-start;
  flex-direction: row;
  padding: 2.5px;
  gap: 2px;
  justify-content: space-between;
`;

const SpecialHandling = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 4px 8px;

  position: relative;
`;

const CustomPopover = styled(Popover)``;

const PopoverButton = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  cursor: pointer;
  user-select: none;
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const MemberContainer = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container>
      <SpecialHandling>
        <ContainerText onClick={handlePopoverOpen}>
          <div>
            {props.account.info.member_username}
            {config.features.HomePage_DisplayVIP &&
              `(VIP${props.account.info.member_level_id}) `}
          </div>
          {!config.features.NewTransferUI && (
            <div>
              {Common.formatNumberWithThousand(
                props.wallet.mainBalance +
                  props.game.providerList
                    .filter(
                      (item) =>
                        item.status === 0 && item.transferwallet === true
                    )
                    .reduce((a, v) => (a = a + v.balance), 0)
              )}
            </div>
          )}
        </ContainerText>
        <CustomPopover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <PopoverButton onClick={props.handleProfileClick}>
            {i18n.t("web.account.profile")}
          </PopoverButton>
          <PopoverButton onClick={props.onhandleLogout}>
            {i18n.t("web.header.logout")}
          </PopoverButton>
        </CustomPopover>
      </SpecialHandling>
      <RowContainer>
        <ContainerInContainer onClick={props.onhandleDeposit}>
          <IconButtonContainer src={TransferIcon}></IconButtonContainer>
          <div>{i18n.language !== "vi-VN" && i18n.t("web.header.deposit")}</div>
        </ContainerInContainer>
        {props.game.containTransferWallet && !config.features.NewTransferUI && (
          <ContainerInContainer onClick={props.onhandleTransfer}>
            <IconButtonContainer src={DepositIcon}></IconButtonContainer>
            <div>
              {i18n.language !== "vi-VN" && i18n.t("web.header.transfer")}
            </div>
          </ContainerInContainer>
        )}

        <ContainerInContainer onClick={props.onhandleWithdraw}>
          <IconButtonContainer src={WithdrawalIcon}></IconButtonContainer>
          <div>
            {i18n.language !== "vi-VN" && i18n.t("web.account.withdrawal")}
          </div>
        </ContainerInContainer>
      </RowContainer>
    </Container>
  );
};

export default MemberContainer;
