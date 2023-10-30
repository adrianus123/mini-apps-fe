import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import currencyFormat from "../constant/NumbeFormat";
import ScannerModal from "../components/ScannerModal";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import QRCode from "react-qr-code";
import AlertComp from "../components/AlertComp";
import { USER_NOT_FOUND } from "../constant/AlertMessage";
import { useSelector } from "react-redux";
import { selectCurrentCustomer } from "../api/slice/customerSlice";
import { useGetProductsQuery } from "../api/slice/productApiSlice";

const Transaksi = () => {
  const [openScanner, setOpenScanner] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const { data: products } = useGetProductsQuery();
  const customer = useSelector(selectCurrentCustomer);

  useEffect(() => {
    if (products) {
      setItemList(products);
    }
  }, [products]);

  const handleOrder = () => {
    if (customer.qrcode === "") {
      setError((value) => ({
        ...value,
        isError: true,
        message: USER_NOT_FOUND,
      }));
      return;
    }

    setOpenScanner(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ p: { xs: 2, sm: 2, md: 3, lg: 4 } }}>
        <Box
          sx={{
            boxShadow: " 0px 0px 10px 1px rgba(0,0,0,0.2)",
            p: { xs: 2, sm: 2, md: 3, lg: 3 },
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.5rem",
                lg: "1.8rem",
              },
            }}
          >
            Transaksi
          </Typography>
          <Divider />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<QrCodeScannerIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleOrder}
            >
              Pesan
            </Button>
          </Stack>
          <Grid container spacing={4}>
            {itemList?.map((item) => (
              <Grid key={item.rfid} item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <QRCode
                    title={item.namaBarang}
                    value={item.rfid}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    style={{ width: "100%" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      align="center"
                      variant="h5"
                      component="div"
                    >
                      {item.namaBarang}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      color="text.secondary"
                    >
                      {currencyFormat(item.harga)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <ScannerModal
        open={openScanner}
        handleClose={() => setOpenScanner(false)}
      />
      <AlertComp
        open={error.isError}
        message={error.message}
        type="error"
        handleClose={() => setError((value) => ({ ...value, isError: false }))}
      />
    </React.Fragment>
  );
};

export default Transaksi;
