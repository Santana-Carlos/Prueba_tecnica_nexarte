import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Checkbox, OutlinedInput } from "@material-ui/core";

export const BlackButton = withStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    color: "#fff",
    fontSize: "1rem",
    textTransform: "none",
    margin: 0,
    fontWeight: 400,
    textAlign: "center",
    backgroundColor: "#000",
    borderRadius: "25px",
    "&:hover": {
      backgroundColor: "#222",
    },
  },
}))(Button);

export const GreenButton = withStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    color: "#fff",
    fontSize: "1rem",
    textTransform: "none",
    margin: 0,
    fontWeight: 400,
    textAlign: "center",
    backgroundColor: "#47b14c",
    borderRadius: "25px",
    "&:hover": {
      backgroundColor: "#36973a",
    },
  },
}))(Button);

export const StyledCheckbox = withStyles(() => ({
  colorPrimary: {
    padding: "0 0.5rem 0 0",
    "&.Mui-checked": {
      color: "#000",
    },
  },
}))(Checkbox);

export const StyledTextField = withStyles(() => ({
  root: {
    width: "auto",
    margin: "0.2rem 0 0.6rem",
    "& .MuiOutlinedInput-root": {
      borderWidth: "1px",
      borderRadius: "25px",
      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#000",
      },
    },
  },
}))(TextField);

export const StyledInput = withStyles(() => ({
  root: {
    width: "100%",
    borderRadius: "25px",
    margin: "0.2rem 0 0.6rem",
    overflow: "hidden",
    "& $notchedOutline": {
      borderWidth: "1px",
      borderRadius: "25px",
    },
    "&$focused $notchedOutline": {
      borderWidth: "2px",
      borderColor: "#000",
    },
  },
  focused: {},
  notchedOutline: {},
}))(OutlinedInput);
