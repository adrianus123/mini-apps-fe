import { Alert, Snackbar } from "@mui/material";

// eslint-disable-next-line react/prop-types
const AlertComp = ({ message, open, type, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};

export default AlertComp;
