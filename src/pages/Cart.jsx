import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import currencyFormat from "../constant/NumbeFormat";
import { useMutation, useQuery } from "@apollo/client";
import { CART_QUERY } from "../api/graphql/query";
import { useSelector } from "react-redux";
import { selectCurrentCustomer } from "../api/slice/customerSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_CART, DELETE_CART_ITEM } from "../api/graphql/mutation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#081E43",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Cart = () => {
  const customer = useSelector(selectCurrentCustomer);

  const { data } = useQuery(CART_QUERY, {
    variables: { qrcode: customer.qrcode },
  });

  const [deleteCartItemMutation] = useMutation(DELETE_CART_ITEM);
  const [deleteCartMutation] = useMutation(DELETE_CART);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      setCartItem(data.getCart);
      setTotalPrice(
        data.getCart?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.harga * currentValue.jumlah,
          0
        )
      );
    }
  }, [data]);

  const handleCartItemDelete = async (rfid) => {
    try {
      await deleteCartItemMutation({
        variables: {
          qrcode: customer.qrcode,
          rfid: rfid,
        },
        refetchQueries: [
          { query: CART_QUERY, variables: { qrcode: customer.qrcode } },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCartDelete = async () => {
    try {
      await deleteCartMutation({
        variables: {
          qrcode: customer.qrcode,
        },
        refetchQueries: [
          { query: CART_QUERY, variables: { qrcode: customer.qrcode } },
        ],
      });
    } catch (error) {
      console.error(error);
    }
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
            Keranjang
          </Typography>
          <Divider />
          {cartItem?.length !== 0 && cartItem !== null ? (
            <React.Fragment>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Nama</StyledTableCell>
                      <StyledTableCell>Jumlah</StyledTableCell>
                      <StyledTableCell align="right">
                        Harga&nbsp;(Rp)
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        SubTotal&nbsp;(Rp)
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItem?.map((row) => (
                      <StyledTableRow key={row.rfid}>
                        <StyledTableCell component="th" scope="row">
                          {row.nama}
                        </StyledTableCell>
                        <StyledTableCell>{row.jumlah}</StyledTableCell>
                        <StyledTableCell align="right">
                          {currencyFormat(row.harga)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {currencyFormat(row.harga * row.jumlah)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleCartItemDelete(row.rfid)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Total : {currencyFormat(totalPrice)}
                </Typography>
                <Stack direction="row" gap={1}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={handleCartDelete}
                  >
                    Hapus
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={() => setOpenConfirmModal(true)}
                  >
                    Checkout
                  </Button>
                </Stack>
              </Stack>
            </React.Fragment>
          ) : (
            <Stack direction="row" justifyContent="center">
              <Typography variant="subtitle1">Keranjang kosong</Typography>
            </Stack>
          )}
        </Box>
      </Box>
      <ConfirmModal
        open={openConfirmModal}
        handleClose={() => setOpenConfirmModal(false)}
        items={cartItem}
      />
    </React.Fragment>
  );
};

export default Cart;
