import React from "react";
import styled from "styled-components";
import { shared } from "../../../shared";

const GameLister = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  border-radius: 20px;
  background: ${({ theme }) => theme.gamelisterBg};
  margin-bottom: 15px;
  border: ${({ theme }) => theme.gamelisterBorder};
`;

const CustomImageWrapper = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TheText = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.gamelisterOriginalText};
`;

const CustomImageResizer = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.gamelisterOriginalColor};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/home/T8/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const GameListItem = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px;
  justify-content: center;
  ${({ selected, theme }) => {
    return selected
      ? `
      background:${theme.gamelisterSelectedButton};
      border: ${theme.gamelisterBorder};

      ${CustomImageResizer}{
        background:${theme.gamelisterSelectedIcon};
      }

    ${TheText}{
      color: ${theme.gamelisterSelectedText};
    }
    `
      : "";
  }};
  border-radius: 20px;
`;

const MenuVariantOne = ({ selected, setGames, gameMenu }) => {
  return (
    <GameLister>
      {shared.theSorter(gameMenu).map((data, index) => {
        return (
          <GameListItem
            selected={selected === data.type}
            onClick={() => {
              setGames(data.type);
            }}
          >
            <CustomImageWrapper>
              <CustomImageResizer icon={data.image} />
            </CustomImageWrapper>
            <TheText>{data.title}</TheText>
          </GameListItem>
        );
      })}
    </GameLister>
  );
};

export default MenuVariantOne;
