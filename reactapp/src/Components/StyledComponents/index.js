import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  TextField,
  Checkbox,
  Select,
  OutlinedInput,
} from "@material-ui/core";

export const BlackButton = withStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    color: "#FFFFFF",
    fontSize: "1.1rem",
    margin: 0,
    fontWeight: 400,
    textAlign: "center",
    backgroundColor: "#000",
    "&:hover": {
      backgroundColor: "#222",
    },
  },
}))(Button);

export const StyledCheckbox = withStyles((theme) => ({
  colorPrimary: {
    padding: "0 0 0 0.5rem",
    "&.Mui-checked": {
      color: "#ff5f58",
    },
  },
}))(Checkbox);

export const StyledTextField = withStyles((theme) => ({
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

export const StyledInput = withStyles((theme) => ({
  root: {
    width: "auto",
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

export const StyledSelect = withStyles((theme) => ({
  outlined: {
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
}))(Select);

export const StyledContainer = withStyles((theme) => ({
  maxWidthLg: {
    maxWidth: "90rem",
  },
}))(Container);
