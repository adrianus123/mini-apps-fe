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
import QRCode from "react-qr-code";
import currencyFormat from "../constant/NumbeFormat";
import { useGetCustomersQuery } from "../api/slice/customerApiSlice";

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

const Customer = () => {
  const { data: customers } = useGetCustomersQuery();

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
          Customer
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>QR Code</StyledTableCell>
                <StyledTableCell>Nama</StyledTableCell>
                <StyledTableCell align="right">Saldo&nbsp;(Rp)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map((row) => (
                <StyledTableRow key={row.qrcode}>
                  <StyledTableCell component="th" scope="row">
                    <QRCode
                      title={row.nama}
                      value={row.qrcode}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      size={50}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.nama}</StyledTableCell>
                  <StyledTableCell align="right">
                    {currencyFormat(row.wallet)}
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

export default Customer;
