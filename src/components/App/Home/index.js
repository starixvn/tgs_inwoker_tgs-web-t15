import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../utils/Common";

import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import Marquee from "./Marquee";

import {
  SHOW_MODAL,
  SHOW_LOGIN,
} from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import BGJPG from "../../../assets/images/home/section/sections-bg.jpg";

import ScrollAnimation from "react-animate-on-scroll";
import { Grid } from "@material-ui/core";

import FourthSection from "./FourthSection";
import config from "../../../config/config";
import PopupAnnouncement from "./PopupAnnouncement";
const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  margin-top: 50px;
`;
const SectionContainer = styled.div`
  background: url(${BGJPG}) no-repeat;
  background-position: top;
  background-position-y: -600px;
  width: 100%;
`;
const FirstSection = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 460px;
  padding-top: 63px;
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const FirstSectionItem = styled(Grid)`
  background: url(${(props) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/pcHomePage/section1/${props.img}.png`
      );
    }})
    no-repeat;
  background-size: contain;
  background-position: center;
  width: 320px;
  height: 282px;
  color: #fff;
  font-size: 1.8em;
  padding-top: 200px;
  padding-left: 38px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const TitleSection = styled.div`
  display: flex;
  width: 1920px;
  justify-content: center;
`;

const TitleBar = styled.div`
  position: relative;
`;

const TheTitleContainer = styled.div`
  position: absolute;
  height: 65px;
  top: -8px;
  z-index: 2;
  color: red;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  background: -webkit-linear-gradient(#785834, #494138);
  -webkit-background-clip: text;
  font-weight: bold;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
`;
const AnotherTitle = styled.div`
display: ${({ hide }) => {
  return hide ? "none" : "block";
}}
  color: #949799;
  text-transform: uppercase;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();
    this.state = {
      marqueeText: [],

      wm: displayGame.wm,
      ky: displayGame.ky,
      openAnnouncement: false,
      showPromotion: false,
    };
  }

  componentDidUpdate(preProps) {
    var isInHomePage =
      this.props.ui.mains &&
      this.props.ui.mains !== preProps.ui.mains &&
      this.props.ui.mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        this.setState({
          openAnnouncement: true,
          showPromotion: false,
        });
      }
    }

    if (config.features.PopupPromotion) {
      if (
        isInHomePage &&
        this.props.general.promotionList.items !==
          preProps.general.promotionList.items &&
        this.props.general.promotionList.items.length > 0
      ) {
        if (!this.state.openAnnouncement) {
          this.setState({
            showPromotion: true,
          });
        }
      }
    }
    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      Common.closePreviousPopup();
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType == GameTypeEnum.SPORTS ||
          gameType == GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(`/sports/play/${gameCode}/${gameType}`);
          }
        } else {
          this.props.history.push(`/${path}/${gameCode}`);
        }
      } else {
        Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  gameMenu = [
    {
      img: "lottery",
      type: "lottery",
      name: i18n.t("web.home.Section1Lottery"),
      default: true,
      PB: false,
    },
    {
      img: "sports",
      type: "sports",
      name: i18n.t("web.home.Section1Sport"),
      default: false,
      PB: true,
    },
    {
      img: "fish",
      type: "fish",
      name: i18n.t("web.home.Section1Fishing"),
      default: true,
      PB: true,
    },
    {
      img: "slot",
      type: "slots",
      name: i18n.t("web.home.Section1Slot"),
      default: true,
      PB: false,
    },
    {
      img: "esports",
      type: "esports",
      name: i18n.t("web.home.Section1Esport"),
      default: false,
      PB: true,
    },
    {
      img: "chess",
      type: "chess",
      name: i18n.t("web.home.Section1Chess"),
      default: true,
      PB: true,
    },
  ];

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider></Slider>

          {
            //   <AnotherFloatPanel
            //     onhandleDepositClick={this.props.onhandleDepositClick}
            //     onhandleShowCSClick={this.props.onhandleShowCSClick}
            //     onDownloadClick={() =>
            //       this.handleNavigateClick("/download")
            //     }
            //   ></AnotherFloatPanel>
          }
        </SliderContainer>
        <SectionContainer>
          <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer>
          <FirstSection>
            {this.gameMenu
              .filter((data) => {
                if (config.features.CustomHomePage_PB) return data.PB;
                else return data.default;
              })
              .map((data, index) => {
                return (
                  <ScrollAnimation
                    animateIn="fadeInLeft"
                    duration={1}
                    animateOnce={true}
                    style={{ overflow: "visible" }}
                  >
                    <FirstSectionItem
                      item
                      spacing={0}
                      img={
                        data.img + Common.languageAssetsSwitcher(i18n.language)
                      }
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        this.props.history.push(`/${data.type}`);
                      }}
                    >
                      {
                        //   <SectionTitle>{data.name}</SectionTitle>
                      }
                    </FirstSectionItem>
                  </ScrollAnimation>
                );
              })}
          </FirstSection>
          <TitleSection>
            <TitleBar>
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/pcHomePage/title-bar.png`
                }
                alt="hotgamestitle"
              />
              <TheTitleContainer>
                <Title>{i18n.t("slot.hotGame")}</Title>
                <AnotherTitle hide={Common.hideOnLanguage(i18n.language)}>
                  {i18n.t("slot.hotGame", { lng: "en-US" })}
                </AnotherTitle>
              </TheTitleContainer>
            </TitleBar>
          </TitleSection>
          <SecondSection />
          <ThirdSection />
          <TitleSection>
            <TitleBar>
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/pcHomePage/title-bar.png`
                }
                alt="hotgamestitle"
              />
              <TheTitleContainer>
                <Title>{i18n.t("common.chess")}</Title>
                <AnotherTitle hide={Common.hideOnLanguage(i18n.language)}>
                  {i18n.t("common.chess", { lng: "en-US" })}
                </AnotherTitle>
              </TheTitleContainer>
            </TitleBar>
          </TitleSection>
          <FourthSection handleJoinGameClick={this.handleJoinGameClick} />
        </SectionContainer>{" "}
        {(() => {
          if (
            config.features.PopupAnnouncement &&
            this.props.ui.mains &&
            this.props.ui.mains.length > 0
          ) {
            var row = this.props.ui.mains[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  if (document.getElementById("audio") != null)
                    document.getElementById("audio").play();
                  this.setState({
                    ...this.state,
                    openAnnouncement: false,
                    showPromotion: true,
                  });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}{" "}
        {config.features.PopupPromotion &&
          this.props.general.promotionList.items.length > 0 && (
            <PopupAnnouncement
              open={this.state.showPromotion}
              type="promo"
              onClose={() => {
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").play();
                this.setState({ ...this.state, showPromotion: false });
              }}
              content={this.props.general.promotionList.items}
              header={i18n.t("promotion.title")}
            ></PopupAnnouncement>
          )}
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
    general: state.general,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
