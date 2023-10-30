import { Box, Fab, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import StopIcon from "@mui/icons-material/Stop";
import QrReader from "react-qr-scanner";
import currencyFormat from "../constant/NumbeFormat";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCustomer, setCustomer } from "../api/slice/customerSlice";
import { useGetDetailCustomerQuery } from "../api/slice/customerApiSlice";

const ScanQR = () => {
  const [btnScan, setBtnScan] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const customer = useSelector(selectCurrentCustomer);
  const { data } = useGetDetailCustomerQuery(qrcode, {
    skip: isFetching,
  });
  const dispatch = useDispatch();

  const previewStyle = {
    height: 400,
    width: 400,
  };

  useEffect(() => {
    if (data) {
      dispatch(setCustomer(data));
    }
  }, [data]);

  const handleScan = (data) => {
    if (data !== null) {
      setQrcode(data.text);
      setIsFetching(false);
      setBtnScan(false);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "Center",
          height: "100%",
        }}
      >
        {btnScan ? (
          <QrReader
            delay={100}
            style={previewStyle}
            onError={(error) => console.error(error)}
            onScan={handleScan}
          />
        ) : (
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "80%", lg: "50%" },
              p: 4,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <img
                      src="lucide_user-circle-2.svg"
                      alt="user-icon"
                      width="200px"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Typography variant="subtitle1">Nama</Typography>
                <Typography variant="h6">{customer.nama}</Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Typography variant="subtitle1">Saldo</Typography>
                <Typography variant="h6">
                  {currencyFormat(customer.wallet)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Fab
        color={!btnScan ? "primary" : "secondary"}
        onClick={() => setBtnScan(!btnScan)}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        {btnScan ? <StopIcon /> : <QrCodeScannerIcon />}
      </Fab>
    </React.Fragment>
  );
};

export default ScanQR;
