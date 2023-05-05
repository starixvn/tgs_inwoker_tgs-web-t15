import React from "react";
import styled from "styled-components";
import { shared } from "../../../shared";

const GameLister = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-radius: 20px;
  background: ${({ theme }) => theme.gamelisterBg};
  margin-bottom: 30px;
  border: ${({ theme }) => theme.gamelisterBorder};
  grid-gap: 15px;
`;

const CustomImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 40px;
  margin-right: 10px;
`;

const TheText = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.gamelisterOriginalText};
`;

const CustomImageResizer = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.gamelisterOriginalColor};
  background-position: center;
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/home/T8/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 10px 10px 10px;
  background: #fafafe;

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

const MenuVariantTwo = ({ selected, setGames, gameMenu }) => {
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

export default MenuVariantTwo;
