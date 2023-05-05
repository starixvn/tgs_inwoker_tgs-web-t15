import React from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";
const Containerx = styled.div`
  width: 100%;
  min-height: 611px;
  color: #7b7b7b;
  font-size: 14px;
`;
const ContainerT13 = styled(Containerx)`
  color: #fff;
`;

const Container = ({ children }) => {
  switch (config.accountTemplate) {
    default:
      return <Containerx>{children}</Containerx>;
    case "13":
    case 13:
      return <ContainerT13>{children}</ContainerT13>;
  }
};

export default Container;
