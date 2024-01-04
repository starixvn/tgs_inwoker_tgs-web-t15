//const config = require("./config." + process.env.REACT_APP_CUSTOM_NODE_ENV);
import { isMobileOnly } from "react-device-detect";
import featureList from "./features";

var wapTemplate = window?.env?.wapTemplate || 15; //2 for T2, 3 for T3 (based on .xd file)

const config = {
  baseUrl:
    window?.env?.apiUrl ||
    (window?.env ? "/api/" : "https://stg-t1.rpgp.cc/api/"),
  client:
    window?.env?.client ||
    "GWcE0mhlG0JeDmwadQAa5Gfuz7BGEfIWYCVwPPXmVQOQWu5ibE1fsX",
  currency: window?.env?.currency || "HKD",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "SKY8",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "SKY8",
  wapVersion: wapTemplate,
  theme: window?.env?.theme || (isMobileOnly ? `wapT${wapTemplate}` : "wapT5"),
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
  configUrl: window?.env?.configUrl || "https://app12.srvptt.com/",
  version: window?.env?.version,
};

export default config;
