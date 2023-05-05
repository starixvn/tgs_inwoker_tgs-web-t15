import React from "react";
import Common from "../../utils/Common";
import i18n from "../../utils/i18n";
import { Popover } from "@material-ui/core";
import { SortedMenuList } from "../../utils/HeaderSorting";
import styled from "styled-components";

import { Textfit } from "react-textfit";

const CustomPopoverContent = styled.div`
  min-width: 225px;
  padding: 10px;
  display: grid;
  max-height: 400px;
  overflow: auto;
  user-select: none;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.popoverGameTypeText};
  opacity: 0.65;
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
  color: ${({ theme }) => theme.popoverText};
`;
const Brand = styled.div`
  padding-left: 5px;
  font-size: 12px;
  opacity: 0.75;
`;

const Balance = styled.div`
  text-align: right;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const Balancex = styled.div`
  text-align: right;
  font-weight: bold;

  cursor: pointer;
`;

const TheBalanceContent = styled.div`
  display: flex;
  color: #000;
  font-weight: bold;
  padding-right: 20px;
  align-item: center;
`;
const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

const BalanceDisplayer = ({ wallet, game }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleTransfer = (e) => {
    handleClick(e);
  };

  return (
    <>
      <TheBalanceContent>
        <span style={{ marginRight: 5 }}>
          {i18n.t("web.header.mainAccount")}
        </span>
        <Balance
          onClick={(e) => {
            handleTransfer(e);
          }}
        >
          {Common.formatNumberWithThousand(
            wallet.mainBalance +
              game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .reduce((a, v) => (a = a + v.balance), 0)
          )}
        </Balance>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <CustomPopoverContent>
            <div>
              <BrandAndBalanceButBigger>
                <div style={{ paddingRight: 30 }}>
                  {i18n.t("web.header.mainAccount")}
                </div>
                <div
                  style={{
                    width: 150,
                    display: "flex",
                    alignSelf: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Textfit mode="single">
                    {Common.formatNumberWithThousand(
                      wallet.mainBalance +
                        game.providerList
                          .filter(
                            (item) =>
                              item.status === 0 && item.transferwallet === true
                          )
                          .reduce((a, v) => (a = a + v.balance), 0)
                    )}
                  </Textfit>
                </div>
              </BrandAndBalanceButBigger>
            </div>
            {SortedMenuList.map((item, key) => {
              return (
                <GameType>
                  <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                  {game.homePageGameList
                    .filter((game) => {
                      return item.gameType.indexOf(game.type) >= 0;
                    })
                    .map((brand, index) => {
                      return game.providerList
                        .filter((item) => {
                          return (
                            item.gpcode === brand.gpcode &&
                            item.transferwallet === true
                          );
                        })
                        .map((data, index) => {
                          return (
                            <BrandAndBalance>
                              <Brand>
                                {i18n.t(`${data.abbreviation}.${item.path}`)}
                              </Brand>
                              <Balancex>
                                {data.maintenance === 1
                                  ? i18n.t("transfer.maintenance")
                                  : Common.formatNumberWithCommas(data.balance)}
                              </Balancex>
                            </BrandAndBalance>
                          );
                        });
                    })}
                </GameType>
              );
            })}
          </CustomPopoverContent>
        </Popover>
      </TheBalanceContent>
    </>
  );
};

export default BalanceDisplayer;
