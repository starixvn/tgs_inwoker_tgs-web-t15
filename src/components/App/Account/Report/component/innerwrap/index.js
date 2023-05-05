import React from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";
const InnerWrapContainer = styled.div`
  width: 888px;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
`;
const InnerWrapContainerT13 = styled(InnerWrapContainer)`
  background-color: transparent;
`;

const InnerWrap = ({ children }) => {
  switch (config.accountTemplate) {
    default:
      return <InnerWrapContainer>{children}</InnerWrapContainer>;
    case 13:
    case "13":
      return <InnerWrapContainerT13>{children}</InnerWrapContainerT13>;

  }
};

export default InnerWrap;
