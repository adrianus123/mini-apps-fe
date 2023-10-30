/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const ErrorModal = ({ open, handleClose, message }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    boxSizing: "border-box",
    width: isMatch ? "90vw" : 400,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <HighlightOffRoundedIcon fontSize="large" sx={{ color: "red" }} />
          <Typography
            id="modal-modal-title"
            align="center"
            variant="h6"
            fontWeight={700}
          >
            Pesanan Gagal
          </Typography>
          <Typography variant="subtitle1" align="center">
            {message}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={handleClose}
          >
            Tutup
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
