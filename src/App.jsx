import { Box, ThemeProvider } from "@mui/material";
import Sidebar from "./layouts/Sidebar";
import Navbar from "./layouts/Navbar";
import Customer from "./pages/Customer";
import Barang from "./pages/Barang";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transaksi from "./pages/Transaksi";
import ScanQR from "./pages/ScanQR";
import History from "./pages/History";
import Cart from "./pages/Cart";
import Theme from "./theme";

const router = [
  {
    path: "/",
    exact: true,
    element: <ScanQR />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/product",
    element: <Barang />,
  },
  {
    path: "/transaction",
    element: <Transaksi />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              maxWidth: "100%",
            }}
          >
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                {router.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
