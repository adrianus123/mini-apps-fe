/* eslint-disable react/prop-types */
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DetailModal from "./DetailModal";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../api/graphql/mutation";
import { CART_QUERY } from "../api/graphql/query";
import ErrorModal from "./ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCustomer, setCustomer } from "../api/slice/customerSlice";
import { useUpdateCustomerWalletMutation } from "../api/slice/customerApiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const ConfirmModal = ({ open, handleClose, items }) => {
  const [openModal, setOpenModal] = useState({
    success: false,
    error: false,
  });
  const [orderDate, setOrderDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION);

  const [updateCustomerWallet] = useUpdateCustomerWalletMutation();
  const customer = useSelector(selectCurrentCustomer);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      const payment = await updateCustomerWallet({
        qrcode: customer.qrcode,
        amount: items.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.harga * currentValue.jumlah,
          0
        ),
      });

      if (payment.error) {
        setErrorMessage(payment.error.data);
        setOpenModal((value) => ({ ...value, error: true }));
        handleClose();
        return;
      }

      dispatch(setCustomer(payment.data));

      const productInput = [];
      items.map((item) => {
        const data = {
          rfid: item.rfid,
          harga: item.harga,
          jumlah: item.jumlah,
        };

        productInput.push(data);
      });

      const response = await createTransactionMutation({
        variables: {
          qrcode: customer.qrcode,
          barang: productInput,
        },
        refetchQueries: [
          { query: CART_QUERY, variables: { qrcode: customer.qrcode } },
        ],
      });

      setOrderDate(response.data.createTransaction.createdAt);
      setOpenModal((value) => ({ ...value, success: true }));
      handleClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data);
      setOpenModal((value) => ({ ...value, error: true }));
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography
                id="modal-modal-title"
                align="center"
                variant="h6"
                component="h2"
              >
                Konfirmasi Checkout
              </Typography>
              <Typography
                id="modal-modal-description"
                align="center"
                sx={{ mt: 2 }}
              >
                Anda yakin ingin checkout produk ?
              </Typography>
            </Box>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
      <DetailModal
        open={openModal.success}
        handleClose={() =>
          setOpenModal((value) => ({ ...value, success: false }))
        }
        items={items}
        orderDate={orderDate}
      />
      <ErrorModal
        open={openModal.error}
        handleClose={() =>
          setOpenModal((value) => ({ ...value, error: false }))
        }
        message={errorMessage}
      />
    </React.Fragment>
  );
};

export default ConfirmModal;
