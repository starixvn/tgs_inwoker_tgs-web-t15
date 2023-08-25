import React, { useState, useEffect } from "react";
import config from "../../../config/config";
import Variant1 from "./variant1";
import Variant2 from "./variant2";

const Download = () => {
  const [download, setDownload] = useState([]);

  function getJsonData() {
    return fetch(config.configUrl + "version_" + config.brand + ".json")
      .then((response) => response.json())
      .then((responseJson) => {
        setDownload(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
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
