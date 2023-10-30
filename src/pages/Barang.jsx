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
import { useGetProductsQuery } from "../api/slice/productApiSlice";
import QRCode from "react-qr-code";

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

const Barang = () => {
  const { data: products } = useGetProductsQuery();

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
          overflowX: "auto",
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
          Barang
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>RFID</StyledTableCell>
                <StyledTableCell>Nama</StyledTableCell>
                <StyledTableCell align="right">Harga&nbsp;(Rp)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((row) => (
                <StyledTableRow key={row.rfid}>
                  <StyledTableCell component="th" scope="row">
                    <QRCode
                      title={row.namaBarang}
                      value={row.rfid}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      size={50}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.namaBarang}</StyledTableCell>
                  <StyledTableCell align="right">
                    {currencyFormat(row.harga)}
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

export default Barang;
