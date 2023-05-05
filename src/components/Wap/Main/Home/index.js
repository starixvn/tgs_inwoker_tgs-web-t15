import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { GameTypeEnum } from "../../../../api-services/utils/Enum";

import Common from "../../../../utils/Common";

import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import TemplateSwitcher from "./scene-1";
import GamePicker from "./scene-2";
import Banner from "./scene-1/banner";
import LiveChat from "../../../Share/live-chat";
import PromotionRoulette from "./PromotionRoulette";
import { SortedMenuList } from "../../../../utils/HeaderSorting";
import CustomPopover from "../../../Share/custompopover";
import { Textfit } from "react-textfit";
import { walletAction } from "../../../../api-services/actions/walletAction";
import OnlineUserDisplayer from "../../../Share/online-user-displayer";
import { GameService } from "../../../../api-services/services/GameService";
const StyledAppBar = withStyles({
  root: {
    boxShadow: "none",
  },
})(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  background: none;
`;

const GameListContainer = styled.div`
  padding-bottom: 100px;
`;

const NewAppBar = styled.div`
  height: 125px;
  background: ${({ theme }) => theme.appbar};
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

const LogoHolder = styled.div`
  background: url("${({ img }) => img}") no-repeat left center;
  background-size: contain;
  width: 200px;
  height: 100px;
  margin-left: 30px;
  ${({ moveUp }) => {
    return moveUp ? `margin-bottom: 30px;` : "";
  }}
`;

const CustomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const CustomColoredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "transparent";
  }};
  border: ${({ primary, theme }) => {
    return primary
      ? `solid 1px ${theme.buttonBackground}`
      : `solid 1px ${theme.primaryText}`;
  }};
  color: ${({ primary, theme }) => {
    return primary
      ? theme.wapPrimary
        ? theme.wapPrimary
        : theme.buttonText2
      : theme.primaryText;
  }};
  padding: 10px 40px;
  font-size: 28px;
  margin: 0px 10px;
  border-radius: 15px;
`;
const UsernameContainer = styled.div`
  color: ${({ primary, theme }) => {
    return primary ? theme.buttonText2 : "";
  }};
  font-size: 30px;
  font-weight: bold;
  padding-right: 20px;
`;

const UsernameText = styled.div`
  color: ${({ theme }) => theme.primaryText};
`;

const Balance = styled.div`
  text-align: right;
  font-weight: normal;
  color: #ff9900;
  display: flex;
  align-self: flex-end;

  span {
    color: ${({ theme }) => theme.primaryText};
  }
`;

const SceneTwoAppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const SceneTwoAppBarTitle = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const BackButton = styled.div`
  width: 50px;
  height: 50px;
  mask: ${`url(${
    process.env.PUBLIC_URL + "/assets/images/wapp/btn-back-white.png"
  }) no-repeat center /
  contain;`};
  background: #fff;
  position: absolute;
  bottom: 10px;
  left: 15px;
`;
const TheContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhoneHolder = styled.div`
  font-size: 20px;
  width: 100%;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: #fff;
  margin-right: 10px;
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain;`;
  }};
`;

const MakeFloatCenter = styled.div`
  display: flex;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  padding-right: 215px;
`;

const DownloadContainer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 100px;
  display: flex;
  width: 150px;
  height: 150px;
`;

const DownloadButton = styled.div`
  margin-top: 20px;
  border: ${({ theme }) =>
    theme.downloadButtonBorder
      ? theme.downloadButtonBorder
      : `solid 3px ${theme.wapPrimary ? theme.wapPrimary : theme.primary}`}
  background: ${({ theme }) =>
    theme.downloadButtonBg ? theme.downloadButtonBg : `#fff`};
  border-radius:  ${({ theme }) =>
    theme.downloadButtonBorderRad ? theme.downloadButtonBorderRad : `50px`};
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
`;

const DownloadContent = styled.div`
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DownloadText = styled.div`
  color: ${({ theme }) =>
    theme.downloadButtonText
      ? theme.downloadButtonText
      : theme.wapPrimary
      ? theme.wapPrimary
      : theme.primary};
  font-weight: bold;
  font-size: 24px;
`;

const DownloadIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  background: ${({ theme }) =>
    theme.downloadButtonIcon
      ? theme.downloadButtonIcon
      : theme.wapPrimary
      ? theme.wapPrimary
      : theme.primary};
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain`;
  }};
`;

const CloseButton = styled.div`
  position: relative;
  left: 110px;
  font-size: 20px;
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  opacity: 0.65;
  font-size: 24px;
  color: ${({ theme }) => theme.popoverGameTypeText};
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  font-size: 24px;
  min-width: 400px;
  color: ${({ theme }) => theme.popoverSubWalletText};
`;

const Brand = styled.div`
  padding-left: 5px;
`;

const Balancex = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px ${({ theme }) => theme.popoverSubWalletText};
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
  font-size: 30px;
  display: flex;
  align-self: flex-end;
`;
// const bc = new BroadcastChannel('refreshBalance');

const AnotherColoredButton = styled(CustomColoredButton)`
  border: solid 1px
    ${({ theme }) => (theme.wapPrimary ? theme.wapPrimary : theme.primary)};
  background: #fff;
  color: ${({ theme }) =>
    theme.wapPrimary ? theme.wapPrimary : theme.primary};
`;

const TransparentColoredButton = styled(CustomColoredButton)`
  border: solid 1px #fff;
  color: #fff;
`;

const VerticalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RouletteFloatingPanel = styled.div`
  position: fixed;
  z-index: 1300;

  ${({ position }) => {
    return position !== undefined
      ? Object.keys(position).map((key) => {
          return `${key}: ${position[key]}px;`;
        })
      : `  top: 0;
    left: 0;
    padding-top: 16%;
    padding-left: 2%;`;
  }}

  display: flex;
  flex-direction: ${({ orientation }) => {
    return orientation ? orientation : "column";
  }};
`;

var sortingHK28 = [
  GameTypeEnum.COCKFIGHT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.FISH,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.LOTTERYLOBBY,
];

var sortingSKY = [
  GameTypeEnum.COCKFIGHT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.LOTTERYLOBBY,
];

var sortingPB = [
  GameTypeEnum.COCKFIGHT,
  GameTypeEnum.SLOT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.QIPAILOBBY,
];

var sortingWLGHK = [
  GameTypeEnum.COCKFIGHT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
];

var sortingGMO = [
  GameTypeEnum.COCKFIGHT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.SPORTS,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.SLOT,
];
class Home extends Component {
  state = {
    value: 0,
    marqueeText: [],
    banner_list: [],
    gameTypeListSorting: [],
    selectedGameType: 0,
    downloadButton: true,
    anchorEl: false,
    tab1: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
      verifyList: [],
    },
    tab2: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
    },
    loading: true,
    scene: 1,
    selected: "",
    listOfGame: [],
  };

  componentWillUnmount() {
    if (config.wapVersion === 2) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  componentDidMount() {
    // bc.onmessage = (eventMessage) => {
    //   this.performBalanceRefresh();
    // }
    if (config.wapVersion === 2) {
      window.addEventListener("scroll", this.handleScroll);
    }
    if (this.props.game.homePageGameList.length > 0) {
      this.initializeGameTypeListSorting();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      this.initializeGameTypeListSorting();
    }
    if (
      (config.features.MenuItem_Sorting_HK28 &&
        JSON.stringify(this.state.gameTypeListSorting) !==
          JSON.stringify(this.filterSortingList(sortingHK28))) ||
      (config.features.MenuItem_Sorting_WLGHK &&
        JSON.stringify(this.state.gameTypeListSorting) !==
          JSON.stringify(this.filterSortingList(sortingWLGHK))) ||
      (config.features.MenuItem_Sorting_SKY &&
        JSON.stringify(this.state.gameTypeListSorting) !==
          JSON.stringify(this.filterSortingList(sortingSKY))) ||
      (config.features.MenuItem_Sorting_PB &&
        JSON.stringify(this.state.gameTypeListSorting) !==
          JSON.stringify(this.filterSortingList(sortingPB))) ||
      (config.features.MenuItem_Sorting_GMO &&
        JSON.stringify(this.state.gameTypeListSorting) !==
          JSON.stringify(this.filterSortingList(sortingGMO)))
    ) {
      this.initializeGameTypeListSorting();
    }
  }

  filterSortingList(list) {
    return list.filter((val) => this.state.gameTypeListSorting.includes(val));
  }

  cockfightBrandList = ["SM01", "AWC_COCKFIGHT"];

  formatSortedGameList() {
    var currentType = -1;
    var gameTypeListSorting = [];
    var displayGameType = Common.GetDisplayGameType();

    this.props.game.homePageGameList
      .filter((a) => {
        return displayGameType.indexOf(a.type) >= 0;
      })
      .filter((b) => {
        //filter out RNGSPORTS
        return b.type !== GameTypeEnum.RNGSPORTS;
      })
      .sort((a, b) => {
        return a.type - b.type;
      })

      .map((row, index) => {
        //if row.game_platform_name is matches any item in cockfightBrandList,
        // then change the row.type to GameTypeEnum.COCKFIGHT

        if (this.cockfightBrandList.includes(row.game_platform_name)) {
          row.type = GameTypeEnum.COCKFIGHT;
        }

        if (currentType !== row.type) {
          gameTypeListSorting.push(row.type);
        }
        currentType = row.type;
      });

    return gameTypeListSorting.sort((a, b) => {
      if (config.features.MenuItem_Sorting_WLGHK)
        return sortingWLGHK.indexOf(a) - sortingWLGHK.indexOf(b);
      else if (config.features.MenuItem_Sorting_HK28)
        return sortingHK28.indexOf(a) - sortingHK28.indexOf(b);
      else if (config.features.MenuItem_Sorting_SKY)
        return sortingSKY.indexOf(a) - sortingSKY.indexOf(b);
      else if (config.features.MenuItem_Sorting_PB)
        return sortingPB.indexOf(a) - sortingPB.indexOf(b);
      else if (config.features.MenuItem_Sorting_GMO)
        return sortingGMO.indexOf(a) - sortingGMO.indexOf(b);
      else return a - b;
    });
  }

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  handleScroll = (e) => {
    const doc = document.documentElement;

    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    top = top + 530;

    let reachedTheForthItem =
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) > 3 &&
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) < 6;
    let reachedTheSeventhItem =
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) >= 6;
    if (this.state.gameTypeListSorting.length > 5) {
      if (reachedTheForthItem) {
        this.scrollRef.current.scrollTo(0, 500);
      } else if (reachedTheSeventhItem) {
        this.scrollRef.current.scrollTo(0, 750);
      } else {
        this.scrollRef.current.scrollTo(0, 0);
      }
    } else {
      this.scrollRef.current.scrollTo(
        0,
        this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) *
          150
      );
    }

    var D = document;
    var docHeight = Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
    var gameTypeListSorting = this.state.gameTypeListSorting;
    let gameType = gameTypeListSorting[0];
    if (window.innerHeight + window.scrollY >= docHeight - 2) {
      gameType = gameTypeListSorting[gameTypeListSorting.length - 1];
    } else {
      for (var i = gameTypeListSorting.length - 1; i >= 0; i--) {
        if (
          top >
          document.getElementById("gameType" + gameTypeListSorting[i]).offsetTop
        ) {
          gameType = gameTypeListSorting[i];
          break;
        }
      }
    }

    this.setState({ ...this.state, selectedGameType: gameType });
  };
  handleGameTypeClick = (gameType) => {
    let pos = document.getElementById("gameType" + gameType).offsetTop;

    window.scrollTo({ top: pos - 520, behavior: "smooth" });
  };

  handleJoinLotteryGame = (game) => {
    if (this.props.account.token != null) {
      Common.closePreviousPopup();
      Common.PopupCenter(
        "/" + i18n.language + "/joinlottery/" + game,
        "gamewindow"
      );
      //  win = window
      //    .open("/" + i18n.language + "/joinlottery/" + game, "gamewindow")
      //    .focus();
    } else {
      this.props.appHistory.push("/" + i18n.language + "/login");
    }
  };

  handleJoinOtherGame = (type, params, game_platform_id) => {
    if (!this.props.account.token) {
      this.props.appHistory.push("/" + i18n.language + "/login");
      return;
    }
    if (type === GameTypeEnum.COCKFIGHT) {
      if (params === "SM01") {
        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      } else {
        Common.closePreviousPopup();
        // this.performBalanceRefresh();
        Common.PopupCenter(
          "/" +
            i18n.language +
            "/joinlobbygame/" +
            GameTypeEnum.SPORTS +
            "/" +
            params,
          "gamewindow"
        );
      }
    } else if (
      type === GameTypeEnum.SLOT ||
      type === GameTypeEnum.TIGERSLOT ||
      type === GameTypeEnum.TABLEGAME ||
      type === GameTypeEnum.FISH
    ) {
      this.props.navigate(`/slots/${params}/${type}`);
    } else {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
      Common.closePreviousPopup();
      // this.performBalanceRefresh();
      Common.PopupCenter(
        "/" + i18n.language + "/joinlobbygame/" + type + "/" + params,
        "gamewindow"
      );

      //  win = window
      //    .open(
      //      "/" + i18n.language + "/joinlobbygame/" + type + "/" + params,
      //      "gamewindow"
      //    )
      //    .focus();
      //   var timer = setInterval(function () {
      //     if (win.closed) {
      //       clearInterval(timer);
      //       if (document.getElementById("audio") != null)
      //         document.getElementById("audio").volume = 1.0;
      //     }
      //   }, 1000);
    }
  };

  handleGameClick = (type, params, game_platform_id) => {
    if (type === GameTypeEnum.RNGSPORTS) {
      // if (gameCode === "PPTF" ) {
      if (!this.props.account.token) {
        this.props.appHistory.push("/" + i18n.language + "/login");
        return;
      } else {
        this.props.appHistory.push("/" + i18n.language + "/sports/" + params);
      }

      // }
    } else {
      type === GameTypeEnum.LOTTERYLOBBY || type === GameTypeEnum.LOTTERY
        ? this.handleJoinLotteryGame(params)
        : this.handleJoinOtherGame(type, params, game_platform_id);
    }
  };
  handleSignupClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/login");
  };

  handleRegisterClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/login?do=register");
  };
  handleLogout = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/" + i18n.language + "/login");
      }
    });
  };

  convertGameTypeToText = (gameType) => {
    switch (gameType) {
      case GameTypeEnum.LIVE:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.COCKFIGHT:
        return i18n.t("common.cockfight");
      case GameTypeEnum.LIVELOBBY:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.QIPAI:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.QIPAILOBBY:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.SPORTS:
        return i18n.t("common.sport");
      case GameTypeEnum.ESPORTS:
        return i18n.t("common.esports");
      case GameTypeEnum.LOTTERYLOBBY:
        return i18n.t("wap.main.home.gameTab.lottery");
      case GameTypeEnum.SLOT:
        return i18n.t("wap.main.home.gameTab.slot");
      case GameTypeEnum.FISH:
        if (config.features.MenuItem_ShootFish) {
          return i18n.t("common.shootFish");
        } else {
          return i18n.t("wap.main.home.gameTab.fish");
        }

      case GameTypeEnum.TIGERSLOT:
      default:
        return i18n.t("wap.main.home.gameTab.electron");
    }
  };
  getImgPrefix(gameType) {
    switch (gameType) {
      case GameTypeEnum.FISH:
        return "fish";
      case GameTypeEnum.LIVE:
        return "live";
      case GameTypeEnum.LIVELOBBY:
        return "live";
      case GameTypeEnum.LOTTERY:
        return "lottery";
      case GameTypeEnum.LOTTERYLOBBY:
        return "lottery";
      case GameTypeEnum.QIPAI:
        return "chess";
      case GameTypeEnum.QIPAILOBBY:
        return "chess";
      case GameTypeEnum.SLOT:
        return "slot";
      case GameTypeEnum.RNGSPORTS:
      case GameTypeEnum.SPORTS:
        return "sports";
      case GameTypeEnum.ESPORTS:
        return "esports";
      case GameTypeEnum.COCKFIGHT:
        return "cockfight";
      case GameTypeEnum.TIGERSLOT:
        return "slot";
      case GameTypeEnum.TABLEGAME:
        return "table";
      default:
        return "";
    }
  }
  getBannerTemplate(defaultVal) {
    switch (config.theme.toLowerCase()) {
      case "pb":
        return "T5";
      default:
        return defaultVal;
    }
  }

  gameMenu = [
    {
      image: "1",
      title: i18n.t("common.sport"),
      big: true,
      type: [GameTypeEnum.SPORTS, GameTypeEnum.RNGSPORTS],
      sorting: 1,
      sortingGMO: 5,
      sortingHK28: 2,
      sortingPB: 3,
      sortingSKY: 3,
      sortingWLGHK: 3,
      sortingPISO: 1,
      sortingIDR: 4,
    },
    {
      image: "2",
      title: i18n.t("common.live"),
      big: true,
      type: [GameTypeEnum.LIVELOBBY],
      sorting: 2,
      sortingGMO: 1,
      sortingHK28: 1,
      sortingPB: 2,
      sortingSKY: 1,
      sortingWLGHK: 1,
      sortingPISO: 2,
      sortingIDR: 2,
    },
    {
      image: "8",
      title: i18n.t("common.esports"),
      big: false,
      type: [GameTypeEnum.ESPORTS],
      sorting: 3,
      sortingGMO: 7,
      sortingHK28: 2,
      sortingPB: 4,
      sortingSKY: 7,
      sortingWLGHK: 4,
      sortingPISO: 3,
      sortingIDR: 3,
    },
    {
      image: "3",
      title: i18n.t("common.slot"),
      big: false,
      type: [GameTypeEnum.SLOT],
      sorting: 4,
      sortingGMO: 8,
      sortingHK28: 4,
      sortingPB: 1,
      sortingSKY: 5,
      sortingWLGHK: 7,
      sortingPISO: 4,
      sortingIDR: 1,
    },
    {
      image: "4",
      title: config.features.MenuItem_ShootFish
        ? i18n.t("common.shootFish")
        : i18n.t("common.fish"),
      big: false,
      type: [GameTypeEnum.FISH],
      sorting: 5,
      sortingGMO: 4,
      sortingHK28: 5,
      sortingPB: 6,
      sortingSKY: 4,
      sortingWLGHK: 5,
      sortingPISO: 5,
      sortingIDR: 5,
    },
    {
      image: "5",
      title: i18n.t("common.lottery"),
      big: false,
      type: [GameTypeEnum.LOTTERY],
      sorting: 6,
      sortingGMO: 6,
      sortingHK28: 7,
      sortingPB: 7,
      sortingSKY: 8,
      sortingWLGHK: 6,
      sortingPISO: 6,
      sortingIDR: 6,
    },
    {
      image: "6",
      title: i18n.t("common.electron"),
      big: false,
      type: [GameTypeEnum.TABLEGAME],
      sorting: 7,
      sortingGMO: 3,
      sortingHK28: 6,
      sortingPB: 5,
      sortingSKY: 6,
      sortingWLGHK: 8,
      sortingPISO: 8,
      sortingIDR: 7,
    },
    {
      image: "7",
      title: i18n.t("common.chess"),
      big: false,
      type: [GameTypeEnum.QIPAILOBBY],
      sorting: 8,
      sortingGMO: 2,
      sortingHK28: 3,
      sortingPB: 8,
      sortingSKY: 2,
      sortingWLGHK: 2,
      sortingPISO: 7,
      sortingIDR: 8,
    },
    {
      image: `17`,
      title: "common.cockfight",
      type: [GameTypeEnum.COCKFIGHT],
      big: false,
      sorting: 9,
      sortingGMO: 9,
      sortingHK28: 9,
      sortingPB: 9,
      sortingSKY: 9,
      sortingWLGHK: 9,
      sortingBUNNY: 9,
    },
  ];

  gameMenu2 = [
    {
      image: "1",
      title: i18n.exists(`${config.brand}.sport`)
        ? i18n.t(`${config.brand}.sport`)
        : i18n.exists(`${config.brandName}.sport`)
        ? i18n.t(`${config.brandName}.sport`)
        : i18n.t(`common.sport`),
      big: true,
      type: [GameTypeEnum.SPORTS, GameTypeEnum.RNGSPORTS],
      sorting: 1,
      sortingGMO: 5,
      sortingHK28: 2,
      sortingPB: 3,
      sortingSKY: 3,
      sortingWLGHK: 3,
      sortingPISO: 1,
      sortingBUNNY: 3,
    },
    {
      image: "8",
      title: i18n.t("common.esports"),
      big: false,
      type: [GameTypeEnum.ESPORTS],
      sorting: 2,
      sortingGMO: 7,
      sortingHK28: 2,
      sortingPB: 4,
      sortingSKY: 7,
      sortingWLGHK: 4,
      sortingPISO: 3,
      sortingBUNNY: 4,
    },
    {
      image: "2",
      title: i18n.t("common.live"),
      big: true,
      type: [GameTypeEnum.LIVELOBBY],
      sorting: 3,
      sortingGMO: 1,
      sortingHK28: 1,
      sortingPB: 2,
      sortingSKY: 1,
      sortingWLGHK: 1,
      sortingPISO: 2,
      sortingBUNNY: 1,
    },
    {
      image: "7",
      title: i18n.exists(`${config.brand}.chess`)
        ? i18n.t(`${config.brand}.chess`)
        : i18n.exists(`${config.brandName}.chess`)
        ? i18n.t(`${config.brandName}.chess`)
        : i18n.t(`common.chess`),
      big: false,
      type: [GameTypeEnum.QIPAILOBBY],
      sorting: 4,
      sortingGMO: 2,
      sortingHK28: 3,
      sortingPB: 8,
      sortingSKY: 2,
      sortingWLGHK: 2,
      sortingPISO: 7,
      sortingBUNNY: 2,
    },
    {
      image: "4",
      title: i18n.exists(`${config.brand}.fish`)
        ? i18n.t(`${config.brand}.fish`)
        : i18n.exists(`${config.brandName}.fish`)
        ? i18n.t(`${config.brandName}.fish`)
        : config.features.MenuItem_ShootFish
        ? i18n.t("common.shootFish")
        : i18n.t("common.fish"),
      big: false,
      type: [GameTypeEnum.FISH],
      sorting: 5,
      sortingGMO: 4,
      sortingHK28: 5,
      sortingPB: 6,
      sortingSKY: 4,
      sortingWLGHK: 5,
      sortingPISO: 5,
      sortingBUNNY: 8,
    },
    {
      image: "5",
      title: i18n.exists(`${config.brand}.lottery`)
        ? i18n.t(`${config.brand}.lottery`)
        : i18n.exists(`${config.brandName}.lottery`)
        ? i18n.t(`${config.brandName}.lottery`)
        : i18n.t(`common.lottery`),
      big: false,
      type: [GameTypeEnum.LOTTERY],
      sorting: 6,
      sortingGMO: 6,
      sortingHK28: 7,
      sortingPB: 7,
      sortingSKY: 8,
      sortingWLGHK: 6,
      sortingPISO: 6,
      sortingBUNNY: 5,
    },
    {
      image: "3",
      title: i18n.t("common.slot"),
      big: false,
      type: [GameTypeEnum.SLOT],
      sorting: 7,
      sortingGMO: 8,
      sortingHK28: 4,
      sortingPB: 1,
      sortingSKY: 5,
      sortingWLGHK: 7,
      sortingPISO: 4,
      sortingBUNNY: 6,
    },

    {
      image: "6",
      title: i18n.t("common.electron"),
      big: false,
      type: [GameTypeEnum.TABLEGAME],
      sorting: 8,
      sortingGMO: 3,
      sortingHK28: 6,
      sortingPB: 5,
      sortingSKY: 6,
      sortingWLGHK: 8,
      sortingPISO: 8,
      sortingBUNNY: 7,
    },
    {
      image: "17",
      title: "common.cockfight",
      type: [GameTypeEnum.COCKFIGHT],
      big: false,
      sorting: 9,
      sortingGMO: 9,
      sortingHK28: 9,
      sortingPB: 9,
      sortingSKY: 9,
      sortingWLGHK: 9,
      sortingBUNNY: 9,
    },
  ];

  shiftScene = (scene, type) => {
    this.setState({
      ...this.state,
      scene: scene,
      selected: type,
    });
  };

  changeShowGame = (type) => {
    this.setState({
      selected: type,
      listOfGame: this.props.game.homePageGameList.filter(
        (game) => type.indexOf(game.type) >= 0
      ),
    });
  };
  initializeGameTypeListSorting = async () => {
    var gameTypeListSorting = this.formatSortedGameList();
    this.setState({
      ...this.state,
      gameTypeListSorting: gameTypeListSorting,
      selectedGameType: gameTypeListSorting[0],
    });
  };
  scenes = (scene) => {
    switch (scene) {
      case 1:
        return (
          <TemplateSwitcher
            template={config.wapVersion}
            gameTypeListSorting={this.state.gameTypeListSorting}
            homePageGameList={this.props.game.homePageGameList}
            getImgPrefix={this.getImgPrefix}
            selectedGameType={this.state.selectedGameType}
            convertGameTypeToText={this.convertGameTypeToText}
            handleGameTypeClick={this.handleGameTypeClick}
            handleGameClick={this.handleGameClick}
            gameMenu={this.gameMenu}
            gameMenu2={this.gameMenu2}
            shiftScene={this.shiftScene}
            changeShowGame={this.changeShowGame}
            scrollRef={this.scrollRef}
            handleSignupClick={this.handleSignupClick}
            listOfGame={this.state.listOfGame}
            getBannerTemplate={this.getBannerTemplate}
          />
        );
      case 2:
        return (
          <GamePicker
            template={config.wapVersion}
            listOfGame={this.state.listOfGame}
            gameTypeListSorting={this.state.gameTypeListSorting}
            homePageGameList={this.props.game.homePageGameList}
            getImgPrefix={this.getImgPrefix}
            selectedGameType={this.state.selectedGameType}
            convertGameTypeToText={this.convertGameTypeToText}
            handleGameTypeClick={this.handleGameTypeClick}
            handleGameClick={this.handleGameClick}
            gameMenu={this.gameMenu}
            shiftScene={this.shiftScene}
            changeShowGame={this.changeShowGame}
            selected={this.state.selected}
          />
        );
      default:
        return "";
    }
  };
  getVIPName = (id) => {
    switch (id) {
      case 1:
        return "VIP1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return "";
    }
  };
  updownSwitcher = (template) => {
    switch (template) {
      case 1:
      case "1":
        return "up";
      case 2:
      case "2":
        return "fixed";
      case 3:
      case "3":
        return "scroll";
      case 4:
      case "4":
        return "no-gap-down";
      case 5:
      case "5":
        return "scroll";
      case 6:
      case "6":
        return "no-gap-up";
      case 7:
      case "7":
        return "no-gap-up";
      case 8:
      case "8":
        return "no-gap-up";
      case 9:
      case "9":
        return "no-gap-up";
      case 10:
        return "no-gap-up";
      case 11:
        return config.features.HideMarquee ? "no-marquee" : "compact-marquee";
      default:
        return "up";
    }
  };

  handleClick = (e) => {
    this.setState({
      ...this.state,
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  performBalanceRefresh = () => {
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => this.props.getGameBalance(a.gpcode));
  };

  isRouletteAvailable = () => {
    return (
      this.props.general.promotionList.items &&
      this.props.general.promotionList.items.length > 0 &&
      this.props.general.promotionList.items.findIndex(
        (item) => item.promotionType.toUpperCase() === "ROULETTE"
      ) >= 0
    );
  };

  render() {
    const StandardThemedButton = () => {
      return (
        <CustomButtonContainer>
          {config.features.HaveVIPFeature &&
            config.features.HomePage_DisplayVIP && (
              <CustomColoredButton
                primary
                onClick={() => {
                  this.props.appHistory.push("/" + i18n.language + "/vip");
                }}
                style={{ padding: "10px 20px" }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/wapp/home-vip.png"
                  }
                  alt=""
                  style={{ height: 20, marginRight: 10 }}
                />
                VIP
              </CustomColoredButton>
            )}
          <CustomColoredButton onClick={this.handleSignupClick}>
            {i18n.t("common.login")}
          </CustomColoredButton>
          <CustomColoredButton primary onClick={this.handleRegisterClick}>
            {i18n.t("common.register")}
          </CustomColoredButton>
        </CustomButtonContainer>
      );
    };

    const CustomThemedButton = () => {
      return (
        <CustomButtonContainer>
          {config.features.HaveVIPFeature &&
            config.features.HomePage_DisplayVIP && (
              <TransparentColoredButton
                onClick={() => {
                  this.props.appHistory.push("/" + i18n.language + "/vip");
                }}
                style={{ padding: "10px 20px" }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/wapp/home-vip.png"
                  }
                  alt=""
                  style={{ height: 20, marginRight: 10 }}
                />
                VIP
              </TransparentColoredButton>
            )}
          <TransparentColoredButton onClick={this.handleSignupClick}>
            {i18n.exists(`${config.brand}.login`)
              ? i18n.t(`${config.brand}.login`)
              : i18n.exists(`${config.brandName}.login`)
              ? i18n.t(`${config.brandName}.login`)
              : i18n.t("common.login")}
          </TransparentColoredButton>
          <CustomColoredButton
            primary={config.brandName === "TIGER"}
            onClick={this.handleRegisterClick}
          >
            {i18n.t("common.register")}
          </CustomColoredButton>
        </CustomButtonContainer>
      );
    };

    const CustomThemedButton2 = () => {
      return (
        <VerticalLayoutContainer>
          <CustomButtonContainer>
            {config.features.HaveVIPFeature &&
              config.features.HomePage_DisplayVIP && (
                <AnotherColoredButton
                  onClick={() => {
                    this.props.appHistory.push("/" + i18n.language + "/vip");
                  }}
                  style={{
                    padding: "10px",
                    background: "#000",
                    borderColor: "#fff",
                    borderRadius: "50px",
                    margin: "auto 5px",
                    width: "62px",
                    height: "62px",
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/wapp/home-vip.png"
                    }
                    alt=""
                    style={{ height: 28 }}
                  />
                </AnotherColoredButton>
              )}
            <TransparentColoredButton onClick={this.handleSignupClick}>
              {i18n.t("common.login")}
            </TransparentColoredButton>
            <AnotherColoredButton onClick={this.handleRegisterClick}>
              {i18n.t("common.register")}
            </AnotherColoredButton>
          </CustomButtonContainer>
          {config.features.OnlineUser && (
            <OnlineUserDisplayer
              textAlign="right"
              size="20px"
              color="#fff"
              padding="10px 30px 0 0"
            />
          )}
        </VerticalLayoutContainer>
      );
    };

    return (
      <React.Fragment>
        <CustomAppBar position="fixed" color="default" scene={this.state.scene}>
          {this.state.scene === 1 ? (
            <NewAppBar>
              <div>
                <TheContainer>
                  <LogoHolder
                    moveUp={
                      config.features.DisplayPhone || config.features.CustomVIP
                    }
                    img={
                      this.props.general.brand &&
                      this.props.general.brand.mobileLogoUrl
                    }
                  />
                  {(() => {
                    if (!this.props.account.token) {
                      return (
                        <MakeFloatCenter>
                          {config.wapVersion === 10 ? (
                            <CustomThemedButton />
                          ) : config.wapVersion === 11 ? (
                            <CustomThemedButton2 />
                          ) : (
                            <StandardThemedButton />
                          )}
                        </MakeFloatCenter>
                      );
                    } else {
                      return (
                        <MakeFloatCenter>
                          <VerticalLayoutContainer>
                            <CustomButtonContainer>
                              {config.features.HaveVIPFeature &&
                                config.features.HomePage_DisplayVIP && (
                                  <AnotherColoredButton
                                    onClick={() => {
                                      this.props.appHistory.push(
                                        "/" + i18n.language + "/vip"
                                      );
                                    }}
                                    style={{
                                      padding: "10px",
                                      background: "#000",
                                      borderColor: "#fff",
                                      borderRadius: "50px",
                                      margin: "auto 5px",
                                      width: "62px",
                                      height: "62px",
                                    }}
                                  >
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/assets/images/wapp/home-vip.png"
                                      }
                                      alt=""
                                      style={{ height: 28 }}
                                    />
                                  </AnotherColoredButton>
                                )}
                              <UsernameContainer>
                                <UsernameText
                                  style={{
                                    fontSize:
                                      config.features.NewTransferUI && 15,
                                    textAlign:
                                      config.features.NewTransferUI && "right",
                                  }}
                                >
                                  {this.props.account.info.member_username}
                                </UsernameText>

                                {(config.features.HomePageDisplayBalance ||
                                  config.features.NewTransferUI) && (
                                  <div
                                    style={{
                                      display: "flex",
                                      width: 250,
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <Textfit mode="single" min={20}>
                                      <Balance
                                        onClick={(e) => {
                                          this.handleClick(e);
                                        }}
                                      >
                                        <span>
                                          {i18n.t("web.header.mainAccount")}:
                                        </span>
                                        {this.props.wallet.mainSymbol +
                                          Common.formatNumberWithThousand(
                                            this.props.wallet.mainBalance +
                                              this.props.game.providerList
                                                .filter(
                                                  (item) =>
                                                    item.status === 0 &&
                                                    item.transferwallet === true
                                                )
                                                .reduce(
                                                  (a, v) => (a = a + v.balance),
                                                  0
                                                )
                                          )}
                                      </Balance>
                                    </Textfit>
                                    <CustomPopover
                                      height="1000px"
                                      open={Boolean(this.state.anchorEl)}
                                      anchorEl={this.state.anchorEl}
                                      handleClose={this.handleClose}
                                    >
                                      <div>
                                        <BrandAndBalanceButBigger>
                                          <span style={{ paddingRight: 30 }}>
                                            {i18n.t("web.header.mainAccount")}
                                          </span>
                                          <div
                                            style={{
                                              width: 300,
                                              display: "flex",
                                              alignSelf: "flex-end",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <Textfit mode="single">
                                              {this.props.wallet.mainSymbol +
                                                Common.formatNumberWithThousand(
                                                  this.props.wallet
                                                    .mainBalance +
                                                    this.props.game.providerList
                                                      .filter(
                                                        (item) =>
                                                          item.status === 0 &&
                                                          item.transferwallet ===
                                                            true
                                                      )
                                                      .reduce(
                                                        (a, v) =>
                                                          (a = a + v.balance),
                                                        0
                                                      )
                                                )}
                                            </Textfit>
                                          </div>
                                        </BrandAndBalanceButBigger>
                                      </div>
                                      {SortedMenuList.map((item, key) => {
                                        return (
                                          <GameType>
                                            <GameTypeName>
                                              {i18n.t(item.title)}
                                            </GameTypeName>
                                            {this.props.game.homePageGameList
                                              .filter((game) => {
                                                return (
                                                  (item.gameType.indexOf(
                                                    game.type
                                                  ) >= 0 &&
                                                    game.gameType !==
                                                      GameTypeEnum.RNGSPORTS) ||
                                                  (game.gameType ===
                                                    GameTypeEnum.RNGSPORTS &&
                                                    game.abbreviation ===
                                                      "PPTF")
                                                );
                                              })
                                              .map((brand, index) => {
                                                return this.props.game.providerList
                                                  .filter((item) => {
                                                    return (
                                                      item.abbreviation ===
                                                        brand.abbreviation &&
                                                      item.transferwallet ===
                                                        true
                                                    );
                                                  })
                                                  .map((data, index) => {
                                                    return (
                                                      <BrandAndBalance>
                                                        <Brand>
                                                          {i18n.t(
                                                            `${data.abbreviation}.${item.path}`
                                                          )}
                                                        </Brand>
                                                        <Balancex>
                                                          {data.maintenance ===
                                                          1
                                                            ? i18n.t(
                                                                "transfer.maintenance"
                                                              )
                                                            : Common.formatNumberWithCommas(
                                                                data.balance
                                                              )}
                                                        </Balancex>
                                                      </BrandAndBalance>
                                                    );
                                                  });
                                              })}
                                          </GameType>
                                        );
                                      })}
                                    </CustomPopover>
                                  </div>
                                )}
                              </UsernameContainer>
                              <CustomColoredButton
                                primary
                                onClick={this.handleLogout}
                              >
                                {i18n.t("common.exit")}
                              </CustomColoredButton>
                            </CustomButtonContainer>
                            {config.wapVersion === 11 &&
                              config.features.OnlineUser && (
                                <OnlineUserDisplayer
                                  textAlign="right"
                                  size="20px"
                                  color="#fff"
                                  padding="10px 30px 0 0"
                                />
                              )}
                          </VerticalLayoutContainer>
                        </MakeFloatCenter>
                      );
                    }
                  })()}
                </TheContainer>
              </div>
              {config.features.DisplayPhone &&
                this.props.general.brandsSupport.length > 0 && (
                  <PhoneHolder>
                    <LeftContainer>
                      <Icon
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/phone.png`
                        }
                      ></Icon>
                      {this.props.general.brandsSupport &&
                        this.props.general.brandsSupport.length > 0 &&
                        this.props.general.brandsSupport[0].phone}

                      {this.props.account.token &&
                        config.features.CustomVIP && (
                          <React.Fragment>
                            <Icon
                              style={{ marginLeft: "10px" }}
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/images/wapp/vip.png`
                              }
                            ></Icon>
                            {this.getVIPName(
                              this.props.account.info.member_level_id
                            )}
                          </React.Fragment>
                        )}
                    </LeftContainer>
                    <RightContainer></RightContainer>
                  </PhoneHolder>
                )}
            </NewAppBar>
          ) : (
            <NewAppBar>
              <SceneTwoAppBar>
                <div
                  onClick={() => {
                    this.shiftScene(1, "");
                    this.changeShowGame("");
                  }}
                >
                  <BackButton />
                </div>
                <SceneTwoAppBarTitle>
                  {i18n.t(
                    this.gameMenu
                      .filter((a) => a.type === this.state.selected)
                      .map((data) => {
                        return data.title;
                      })
                  )}
                </SceneTwoAppBarTitle>
                <div></div>
              </SceneTwoAppBar>
            </NewAppBar>
          )}
        </CustomAppBar>
        {this.state.scene === 1 && (
          <Banner
            height={config.brand === "GMO" && "315px"}
            sameAsText={config.brand === "GMO"}
            updown={this.updownSwitcher(config.wapVersion)}
            banner={this.props.general.banner}
            appHistory={this.props.appHistory}
            token={this.props.account.token}
          />
        )}
        <GameListContainer scene={this.state.scene}>
          {this.scenes(this.state.scene)}
        </GameListContainer>
        {config.features.HaveDownloadFeature && this.state.downloadButton && (
          <DownloadContainer>
            <CloseButton
              onClick={() => {
                this.setState({
                  ...this.state,
                  downloadButton: false,
                });
              }}
            >
              ⓧ
            </CloseButton>
            <DownloadButton
              onClick={() => {
                this.props.appHistory.push(
                  "/" + i18n.language + "/main/download"
                );
              }}
            >
              <DownloadContent>
                <DownloadIcon
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-download.svg`
                  }
                />
                <DownloadText>APP</DownloadText>
              </DownloadContent>
            </DownloadButton>
          </DownloadContainer>
        )}
        {config.features.HomePage_PromoRoulette && (
          <RouletteFloatingPanel
            position={
              config.features.RouletteSetting &&
              config.features.RouletteSetting.wap &&
              config.features.RouletteSetting.wap.position
            }
            orientation={
              config.features.RouletteSetting &&
              config.features.RouletteSetting.wap &&
              config.features.RouletteSetting.wap.orientation
            }
          >
            {this.props.general.rouletteCount.length > 0 &&
              this.props.general.rouletteCount
                .filter(
                  (item) =>
                    item.promotiontype.toUpperCase() ===
                    "DEPOSITACCUMULATEROULETTE"
                )
                .map((roulette, index) => {
                  return roulette.roulettecount >= 0 && index === 0 ? (
                    <PromotionRoulette
                      rouletteType={roulette.promotiontype.toUpperCase()}
                      promotionDetail={{
                        id: roulette.promotionid,
                      }}
                    ></PromotionRoulette>
                  ) : (
                    <React.Fragment></React.Fragment>
                  );
                })}
            {!config.features.RouletteNewFlow && this.isRouletteAvailable() && (
              <PromotionRoulette
                rouletteType="ROULETTE"
                promotionDetail={
                  this.props.general.promotionList.items.filter(
                    (item) => item.promotionType.toUpperCase() === "ROULETTE"
                  )[0]
                }
              ></PromotionRoulette>
            )}
          </RouletteFloatingPanel>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
