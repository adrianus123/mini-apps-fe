/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import QrReader from "react-qr-scanner";
import OrderModal from "./OrderModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ScannerModal = ({ open, handleClose }) => {
  const [orderModal, setOrderModal] = useState(false);
  const [id, setId] = useState("");

  const handleScan = (data) => {
    if (data !== null) {
      setId(data.text);
      setOrderModal(true);
      handleClose();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    boxSizing: "border-box",
    p: 2,
  };

  const previewStyle = {
    height: 400,
    width: "100%",
  };

  const closeModal = () => {
    handleClose();
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={closeModal}>
        <Box sx={style}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={12} lg={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">Scan QR</Typography>
                <IconButton onClick={closeModal}>
                  <HighlightOffIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {open && (
                <QrReader
                  delay={100}
                  style={previewStyle}
                  onError={(error) => console.error(error)}
                  onScan={handleScan}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <OrderModal
        open={orderModal}
        handleClose={() => setOrderModal(false)}
        rfid={id}
      />
    </React.Fragment>
  );
};

export default ScannerModal;
