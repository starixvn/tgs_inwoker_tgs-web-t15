import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import HomeFooterIcon1PNG from "../../assets/images/home-footer-icon1.png";
import HomeFooterIcon1ActivePNG from "../../assets/images/home-footer-icon1-active.png";
import Common from "../../utils/Common";
import config from "../../config/config";
import i18n from "../../utils/i18n";
import Slider from "react-slick";

const Container = styled.div`
  width: 100%;
  height: 250px;
  background: #414755;
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
`;

const AffAndCSContainer = styled.div`
  width: 238px;
  height: 62px;
  border-radius: 3px;
  border: solid 1px #f6f6f6;
  color: #f6f6f6;
`;

const AffCSRightContentLine1 = styled(Grid)`
  font-size: 14px;

  display: block;
`;
const AffCSRightContentLine2 = styled(Grid)`
  font-size: 14px;
  display: block;
`;

const MiddleContainer = styled.div`
  width: 100%;
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
  padding: 50px 0px;
`;

const BrandsImage = styled.div`
  opacity: 1;
  height: 80px;
  width: 150px;
  background: url(${(props) => props.img}) no-repeat center;
  background-size: contain;
  border: none;
`;
const BottomContainer = styled.div`
  height: 70px;
  width: 1280px;
  padding-top: 16px;
  margin: 0 auto;
  color: #f6f6f6;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

const FooterIconFrame = styled.div`
  width: 100%;
  height: 50px;
`;

const FooterIcon1 = styled(FooterIconFrame)`
  background: url(${HomeFooterIcon1PNG}) no-repeat center;
`;
const FooterColumn = styled.div`
  border-right: solid 1px #f6f6f6;
  padding-right: 30px;
  float: left;
  padding-top: 15px;
  width: 200px;
  &:hover ${FooterIcon1} {
    background: url(${HomeFooterIcon1ActivePNG}) no-repeat center;
  }
`;

const ThirdPartyLogoHolder = styled.div`
  display: flex !important;
  justify-content: center;
  width: 175px;
`;
const CustomSlider = styled(Slider)`
  ${({ maxGame }) => {
    return (
      maxGame <= 4 &&
      ` 
      .slick-track {
         display: flex;
         justify-content: center;
       }
  `
    );
  }}
`;
function Footer(props) {
  var maxGame = props.game.providerList.length;
  const settings = {
    className: "footer",
    dots: false,
    arrows: false,
    slidesToShow: maxGame <= 4 ? maxGame : 6,
    slidesToScroll: maxGame <= 4 ? maxGame : 6,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 222000,
    cssEase: "linear",

    infinite: true,
  };
  return (
    <Container hide={props.hide}>
      <MiddleContainer>
        <MiddleInnerWrap>
          <CustomSlider {...settings} maxGame={maxGame}>
            {(() => {
              return props.game.providerList
                .filter((gp) => {
                  if (gp.gpcode.includes("TCG")) {
                    return gp.gpcode === "TCG_SEA";
                  } else {
                    return gp;
                  }
                })
                .map((item, index) => {
                  return (
                    <ThirdPartyLogoHolder>
                      <BrandsImage
                        img={
                          process.env.PUBLIC_URL +
                          `/assets/images/provider/${item.gpcode.toLowerCase()}.png`
                        }
                      />
                    </ThirdPartyLogoHolder>
                  );
                });
            })()}
          </CustomSlider>
        </MiddleInnerWrap>
      </MiddleContainer>
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(/{brand}/g, config.brand)}
        </CopyRightLine2>
        <Version>Version {process.env.REACT_APP_VERSION}</Version>
      </BottomContainer>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
