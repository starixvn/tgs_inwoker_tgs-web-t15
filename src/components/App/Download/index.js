import React, { useState, useEffect } from "react";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import QRCode from "react-qr-code";

import { useSnackbar } from "notistack";
import { utility } from "../../../utils/utility";
import Variant1 from "./variant1";
import Variant2 from "./variant2";

const Download = () => {
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

  function variantSwitcher(brand) {
    switch (brand) {
      case "SKY8":
      case "stg_SKY8":
        return <Variant2 />;
      default:
        return <Variant1 />;
    }
  }

  return variantSwitcher(config.brand);
};

export default Download;
