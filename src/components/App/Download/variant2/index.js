import React, { useState, useEffect } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import config from "../../../../config/config";
import QRCode from "react-qr-code";

import { useSnackbar } from "notistack";
import { utility } from "../../../../utils/utility";

const Container = styled.div`
  width: 100%;

  position: relative;
  background: url(${process.env.PUBLIC_URL + `/assets/images/download/bg.jpg`})
    no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  justify-content: center;
`;

const ContentPlacedHere = styled.div`
  width: 1280px;
  position: relative;
`;

const Text = styled.div``;

const Icons = styled.div`
  width: 30px;
  height: 30px;

  background: #000;
  mask: url(${({ icon }) => {
      return (
        process.env.PUBLIC_URL + `/assets/images/download/icons/${icon}.png`
      );
    }})
    no-repeat center / contain;
  background-size: 100%;
`;

const DownloadTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 50px;
`;

const DownloadIcon = styled(Icons)`
  height: 80px;
  width: 80px;
`;

const TitleText = styled(Text)`
  font-size: 40px;
  margin-left: 10px;
  font-weight: bold;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
  }

  .MuiDialog-paper {
    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogContent = styled.div`
  padding: 40px;
  font-size: 20px;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const DeviceGuide = styled.div`
  padding-bottom: 20px;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const DeviceText = styled.div`
  padding: 20px 0px;
  font-size: 20px;
`;

const QRCodeHolder = styled.div`
  height: 170px;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const PointlessShit = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
`;

const DeviceName = styled.div`
  width: 80px;
  font-weight: bold;
`;

const Links = styled.div`
  width: 325px;
  opacity: 0.75;
  cursor: pointer;
  font-size: 15px;
`;

const SectionOne = styled.div`
  display: grid;
  width: 1280px;
  grid-template-columns: repeat(3, 1fr);
`;

const NewContentPlacement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconAndTitle = styled.div`
  display: flex;
  text-transform: capitalize;
  align-items: center;
  gap: 10px;
`;

const NewCustomButton = styled.div`
  min-width: 200px;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  background: #303030;
  color: #fff;
  user-select: none;
  cursor: pointer;

  :hover {
    background: #b99c83;
  }
`;

const Variant2 = () => {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState([]);

  const [pointlessDialog, setPointlessDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function getJsonData() {
    return fetch(
      "https://app12.s3.ap-east-1.amazonaws.com/version_" +
        config.brand +
        ".json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDownload(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function copyStupidLink(link) {
    enqueueSnackbar(i18n.t("pointless.copy"), {
      variant: "success",
    });
    utility.copy(link);
  }

  useEffect(() => {
    if (download.length === 0) {
      getJsonData();
    } else {
    }
  }, []);

  function logoSwitcher(brand) {
    switch (brand) {
      case "Atinbet":
      case "PB2":
        return "Atinbet";
      case "SKY8":
      case "stg_SKY8":
        return "SKY8";
      default:
        return "PB";
    }
  }

  return (
    <Container>
      <SectionOne>
        <NewContentPlacement>
          <DownloadTitleSection>
            <DownloadIcon icon="download" />
            <TitleText>{i18n.t("download.downloadMethod")}</TitleText>
          </DownloadTitleSection>
          {config.features.Download_PointlessDialog && (
            <>
              <QRCodeContainer>
                <QRCodeHolder
                  style={{ marginBottom: 20, padding: 0, border: "none" }}
                >
                  <img
                    style={{ height: "100%" }}
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/download/brand/${logoSwitcher(
                        config.brand
                      )}_logo.png`
                    }
                    alt="download section"
                  />
                </QRCodeHolder>

                <NewCustomButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {i18n.t("download.openGuide")}
                </NewCustomButton>
              </QRCodeContainer>
              <CustomModal
                maxWidth="md"
                open={pointlessDialog}
                onClose={() => {
                  setPointlessDialog(false);
                }}
              >
                <DialogTitle2>
                  <div>{i18n.t("pointless.download")}</div>
                  <CloseButton
                    onClick={() => {
                      setPointlessDialog(false);
                    }}
                  >
                    ✖
                  </CloseButton>
                </DialogTitle2>
                <DialogContent>
                  {download.map((data, index) => {
                    return (
                      <PointlessShit key={index}>
                        <DeviceName>{data.platform}</DeviceName>
                        <Links
                          onClick={() => {
                            copyStupidLink(data.link);
                          }}
                        >
                          {data.link}
                        </Links>
                      </PointlessShit>
                    );
                  })}
                </DialogContent>
              </CustomModal>
            </>
          )}
        </NewContentPlacement>
        {download.map((data, index) => {
          return (
            <QRCodeContainer>
              <IconAndTitle>
                <Icons icon={data.platform && data.platform.toLowerCase()} />
                <DeviceText>{data.platform}</DeviceText>
              </IconAndTitle>
              <NewCustomButton
                onClick={() => {
                  window.open(data.link, "_blank");
                }}
              >
                {i18n.t("click_download")}
              </NewCustomButton>

              <NewCustomButton
                onClick={() => {
                  utility.copy(data.link);
                  enqueueSnackbar(i18n.t("affiliate.copied"), {
                    variant: "success",
                  });
                }}
              >
                {i18n.t("copy_link")}
              </NewCustomButton>
              <QRCodeHolder>
                <QRCode size={150} value={data.link}></QRCode>
              </QRCodeHolder>
            </QRCodeContainer>
          );
        })}
      </SectionOne>
      <ContentPlacedHere>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ height: 650 }}
            src={process.env.PUBLIC_URL + `/assets/images/download/girl.png`}
            alt="girl"
          />
        </div>
      </ContentPlacedHere>
      <CustomModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="md"
      >
        <DialogTitle2>
          <div>{i18n.t("download.openGuide")}</div>
          <CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            ✖
          </CloseButton>
        </DialogTitle2>
        <DialogContent>
          <DeviceGuide>
            {i18n.t("download.iphone.title")} <br />
            {i18n.t("download.iphone.point1")} <br />
            {i18n.t("download.iphone.point2")} <br />
          </DeviceGuide>
          <DeviceGuide>
            {i18n.t("download.android.title")} <br />
            {i18n.t("download.android.point1")} <br />
            {i18n.t("download.android.point2")} <br />
          </DeviceGuide>
        </DialogContent>
      </CustomModal>
    </Container>
  );
};

export default Variant2;
