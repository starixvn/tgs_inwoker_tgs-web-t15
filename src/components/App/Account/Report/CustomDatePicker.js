import React from "react";

import DateFnsUtils from "@date-io/date-fns"; // import
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";

const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

function CustomDatePicker(props) {
  const CustomPicker = withStyles({
    root: {
      width: "135px",
      height: "40px",
      float: "left",
      backgroundColor: "#fff",
      "& .MuiInputBase-root": {
        paddingRight: 5,
      },
      "& input": {
        fontFamily: "SimHei",
        fontSize: "14px",
      },
      "& .MuiInputAdornment-positionEnd": {
        width: "45px",
        height: "48px",
        marginRight: "5px",
        maxHeight: "40px",
        borderLeft: "solid 1px #b6b6b6",
        "& .MuiButtonBase-root": {
          padding: "5px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  })(KeyboardDatePicker);

  const CustomPickerT13 = withStyles({
    root: {
      width: "210px",
      height: "50px",
      float: "left",
      backgroundColor: "transparent",
      "& .MuiInputBase-root": {
        paddingRight: 5,
        color: "#fff",
      },
      "& input": {
        fontSize: "14px",
      },
      "& .MuiInputAdornment-positionEnd": {
        width: "45px",
        height: "48px",
        marginRight: "5px",
        maxHeight: "40px",
        "& .MuiButtonBase-root": {
          padding: "5px",
          color: "#fff",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        },
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
    },
  })(KeyboardDatePicker);

  const CustomPickerSwitcher = ({
    InputAdornmentProps,
    variant,
    maxDate,
    maxDateMessage,
    inputVariant,
    format,
    id,
    value,
    onChange,
    minDate,
    InputProps,
    KeyboardButtonProps,
  }) => {
    const commonprops = {
      InputAdornmentProps: InputAdornmentProps,
      variant: variant,
      maxDate: maxDate,
      maxDateMessage: maxDateMessage,
      inputVariant: inputVariant,
      format: format,
      id: id,
      value: value,
      onChange: onChange,
      minDate: minDate,
      InputProps: InputProps,
      KeyboardButtonProps: KeyboardButtonProps,
    };

    switch (config.accountTemplate) {
      default:
        return <CustomPicker {...commonprops} />;
      case 13:
      case "13":
        return <CustomPickerT13 {...commonprops} />;
    }
  };
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={localeMap[i18n.language.substring(0, 2)]}
    >
      <CustomPickerSwitcher
        InputAdornmentProps={{ position: "end" }}
        variant="inline"
        maxDate={props.maxDate ? props.maxDate : new Date()}
        maxDateMessage={false}
        inputVariant="outlined"
        format="yyyy/MM/dd"
        id="date-picker-inline"
        value={props.selectedDate ? props.selectedDate : new Date()}
        onChange={props.onhandleDateChange}
        minDate={props.minDate}
        InputProps={{
          readOnly: true,
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomDatePicker;
