import React from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";

const FilterContainerx = styled.div`
  width: 100%;
  margin-top: 16px;
  background-color: #f7f7f7;
  float: left;
  padding: 10px;
`;

const FilterContainerT13 = styled(FilterContainerx)`
  background-color: transparent;
`;

const FilterContainer = ({ children }) => {
  switch (config.accountTemplate) {
    default:
      return <FilterContainerx>{children}</FilterContainerx>;
    case 13:
    case "13":
      return <FilterContainerT13>{children}</FilterContainerT13>;
  }
};

export default FilterContainer;
