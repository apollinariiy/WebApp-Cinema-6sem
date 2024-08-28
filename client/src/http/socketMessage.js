import { colors } from "@mui/material";
import { enqueueSnackbar } from "notistack";

export default (message) =>{
  enqueueSnackbar(message, { variant: "info",autoHideDuration: 7000 })}