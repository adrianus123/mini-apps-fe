import {
  Box,
  Divider,
  Paper,
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
import currencyFormat from "../constant/NumbeFormat";
import moment from "moment/moment";
import { useGetTransactionsQuery } from "../api/slice/transactionApiSlice";

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

const History = () => {
  const { data: transactions } = useGetTransactionsQuery();

  return (
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
          History Transaksi
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell>Nama Barang</StyledTableCell>
                <StyledTableCell>Jumlah</StyledTableCell>
                <StyledTableCell align="right">Harga&nbsp;(Rp)</StyledTableCell>
                <StyledTableCell align="center">Tanggal</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.response?.map((row) => (
                <StyledTableRow key={row.transaksiId}>
                  <StyledTableCell>{row.customer}</StyledTableCell>
                  <StyledTableCell>{row.barang}</StyledTableCell>
                  <StyledTableCell>{row.jumlah}</StyledTableCell>
                  <StyledTableCell align="right">
                    {currencyFormat(row.harga)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.tanggal).format("DD-MM-YYYY hh:mm:ss")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default History;
