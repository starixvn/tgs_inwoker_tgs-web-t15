import React from "react";
import styled from "styled-components";
import i18n from "../../../../../../utils/i18n";
import { shared } from "../shared";

const SpecialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameLister = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
`;

const GameListItem = styled.div`
  display: flex;
  margin: 20px 20px 0px 20px
  align-items: center;
  position: relative;
  justify-content: center;
`;

const GameListName = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: 32px;
  margin-top: -20px;
  text-align: center;
`;

const CustomSize = styled.img`
  height: 144px;
  zoom: 2;
`;

const Template4 = ({
  homePageGameList,
  gameMenu,
  shiftScene,
  changeShowGame,
  template,
}) => {
  return (
    <div>
      <GameLister>
        {shared
          .theSorter(gameMenu)
          .filter(
            //filter with available game from homepagegamelist
            (item) =>
              homePageGameList
                .map((item) => item.type)
                .filter((value, index, self) => self.indexOf(value) === index)
                .indexOf(item.type[0]) >= 0
          )

          .map((i, index) => {
            return (
              <SpecialContainer>
                <GameListItem
                  onClick={() => {
                    shiftScene(2, i.type);
                    changeShowGame(i.type);
                  }}
                >
                  <CustomSize
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapp/home/T${template}/${i.image}.png`
                    }
                  />
                </GameListItem>
                <GameListName>{i18n.t(i.title)}</GameListName>
              </SpecialContainer>
            );
          })}
      </GameLister>
    </div>
  );
};

export default Template4;
