import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { USER_NOT_FOUND } from "../constant/AlertMessage";
import AlertComp from "../components/AlertComp";
import { useQuery } from "@apollo/client";
import { CART_QUERY } from "../api/graphql/query";
import { useSelector } from "react-redux";
import { selectCurrentCustomer } from "../api/slice/customerSlice";

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [cartTotal, setCartTotal] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const customer = useSelector(selectCurrentCustomer);
  const { data } = useQuery(CART_QUERY, {
    variables: { qrcode: customer.qrcode },
  });

  useEffect(() => {
    if (customer.qrcode !== "" && data != null) {
      setCartTotal(data.getCart?.length);
    }
  }, [data, customer]);

  const handleCart = () => {
    if (customer.qrcode === "") {
      setError((value) => ({
        ...value,
        isError: true,
        message: USER_NOT_FOUND,
      }));
      return;
    }

    navigate("/cart");
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ background: "#ffffff" }}>
        <Toolbar sx={{ background: "#081E43" }}>
          <Box sx={{ flexGrow: 1 }}>
            {isMatch && (
              <IconButton
                sx={{ color: "#ffffff" }}
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          <IconButton onClick={handleCart}>
            <Badge badgeContent={cartTotal} color="error">
              <ShoppingCartIcon sx={{ color: "#ffffff" }} />
            </Badge>
          </IconButton>
        </Toolbar>
        <Divider />
      </AppBar>
      <AlertComp
        open={error.isError}
        message={error.message}
        type="error"
        handleClose={() => setError((value) => ({ ...value, isError: false }))}
      />
      <Sidebar open={openDrawer} handleClose={() => setOpenDrawer(false)} />
    </React.Fragment>
  );
};

export default Navbar;
