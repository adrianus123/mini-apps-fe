/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../api/graphql/mutation";
import AlertComp from "./AlertComp";
import { ADD_TO_LIST } from "../constant/AlertMessage";
import { CART_QUERY } from "../api/graphql/query";
import { useSelector } from "react-redux";
import { selectCurrentCustomer } from "../api/slice/customerSlice";
import { useGetDetailProductQuery } from "../api/slice/productApiSlice";

const OrderModal = ({ open, handleClose, rfid }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    width: 400,
    boxSizing: "border-box",
    p: 2,
  };

  const [skipDetail, setSkipDetail] = useState(true);
  const customer = useSelector(selectCurrentCustomer);
  const { data: product } = useGetDetailProductQuery(rfid, {
    skip: skipDetail,
  });

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });

  const [orderItem, setOrderItem] = useState({
    rfid: "",
    nama: "",
    harga: "",
    jumlah: 1,
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    variables: {
      qrcode: customer.qrcode,
      rfid: orderItem.rfid,
      nama: orderItem.nama,
      harga: orderItem.harga,
      jumlah: parseInt(orderItem.jumlah),
    },
    refetchQueries: [
      { query: CART_QUERY, variables: { qrcode: customer.qrcode } },
    ],
  });

  useEffect(() => {
    if (rfid) {
      setSkipDetail(false);
      if (product) {
        setOrderItem((value) => ({
          ...value,
          rfid: product.rfid,
          nama: product.namaBarang,
          harga: product.harga,
        }));
      }
    }
  }, [rfid, product]);

  const handleOrder = async (e) => {
    e.preventDefault();
    await addToCart();

    setSuccess((value) => ({
      ...value,
      isSuccess: true,
      message: ADD_TO_LIST,
    }));

    handleClose();
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">Detail Pesanan</Typography>
                <IconButton onClick={handleClose}>
                  <HighlightOffIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box>
                <Typography variant="subtitle1">Nama Produk</Typography>
                <TextField
                  id="product"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={orderItem.nama}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1">Harga</Typography>
                <TextField
                  id="price"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={orderItem.harga}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1">Jumlah</Typography>
                <TextField
                  id="quantity"
                  variant="outlined"
                  size="small"
                  type="number"
                  inputProps={{ min: 1 }}
                  fullWidth
                  value={orderItem.jumlah}
                  onChange={(e) =>
                    setOrderItem((value) => ({
                      ...value,
                      jumlah: e.target.value,
                    }))
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Stack direction="row" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ textTransform: "none" }}
                  onClick={handleClose}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleOrder}
                >
                  Pesan
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <AlertComp
        open={error.isError}
        message={error.message}
        type="error"
        handleClose={() => setError((value) => ({ ...value, isError: false }))}
      />
      <AlertComp
        open={success.isSuccess}
        message={success.message}
        type="success"
        handleClose={() =>
          setSuccess((value) => ({ ...value, isSuccess: false }))
        }
      />
    </React.Fragment>
  );
};

export default OrderModal;
