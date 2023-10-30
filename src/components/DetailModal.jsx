/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import currencyFormat from "../constant/NumbeFormat";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentCustomer } from "../api/slice/customerSlice";

const DetailModal = ({ open, handleClose, items, orderDate }) => {
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

  const [orderItem, setOrderItem] = useState([]);
  const customer = useSelector(selectCurrentCustomer);
  const navigate = useNavigate();

  const closeModal = () => {
    handleClose();
    navigate("/");
  };

  useEffect(() => {
    if (items) {
      setOrderItem(items);
    }
  }, [items]);

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
          <CheckCircleRoundedIcon fontSize="large" sx={{ color: "green" }} />
          <Typography
            id="modal-modal-title"
            align="center"
            variant="h6"
            fontWeight={700}
          >
            Pesanan Selesai
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="subtitle1" fontWeight={600}>
                Tanggal Transaksi
              </Typography>
              <Typography variant="subtitle2">
                {moment(parseInt(orderDate, 10)).format("DD-MM-YYYY hh:mm:ss")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                align={isMatch ? "left" : "right"}
              >
                Nama Pelanggan
              </Typography>
              <Typography
                variant="subtitle2"
                align={isMatch ? "left" : "right"}
              >
                {customer.nama}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" fontWeight={600} align="center">
                Detail Pesanan
              </Typography>
              <List>
                {orderItem.map((item) => (
                  <ListItem key={item.qrcode + item.rfid}>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="subtitle2">{item.nama}</Typography>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" align="right">
                          {currencyFormat(item.harga)} x {item.jumlah}
                        </Typography>
                        <Typography variant="subtitle2" align="right">
                          {currencyFormat(item.harga * item.jumlah)}
                        </Typography>
                      </Stack>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={600}>
                  Total Bayar
                </Typography>
                <Typography variant="subtitle1" fontWeight={600} align="right">
                  {currencyFormat(
                    orderItem?.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.harga * currentValue.jumlah,
                      0
                    )
                  )}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={closeModal}
          >
            Tutup
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
