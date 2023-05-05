import React from "react";
import { withStyles, FormControl } from "@material-ui/core";
import config from "../../../../../../config/config";
const CustomFormControlx = withStyles((theme) => ({
  root: {
    width: "135px",
    height: "40px",
    marginTop: "10px",
    marginRight: "5px",
    float: "left",
    broder: "solid 2px #000",
    backgroundColor: "#fff",
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 2",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);

const CustomFormControlT13 = withStyles((theme) => ({
  root: {
    width: "135px",
    height: "40px",
    marginTop: "10px",
    marginRight: "5px",
    float: "left",
    background: "none",
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      paddingLeft: "12px",
      "& fieldset": {
        borderRadius: "25px",
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
    "& .MuiSelect-select": {
      fontSize: "14px",
      color: "#ffffff",
    },
    "& .MuiSelect-select > option": {
      fontSize: "14px",
      color: "#1b1d30",
    },
    "& .MuiSelect-icon": {
      color: "#ffffff",
    },
  },
}))(FormControl);

const CustomFormControl = ({ children }) => {
  switch (config.accountTemplate) {
    default:
      return (
        <CustomFormControlx style={{ width: "160px" }}>
          {children}
        </CustomFormControlx>
      );
    case 13:
    case "13":
      return (
        <CustomFormControlT13 style={{ width: "160px" }}>
          {children}
        </CustomFormControlT13>
      );
  }
};

export default CustomFormControl;
