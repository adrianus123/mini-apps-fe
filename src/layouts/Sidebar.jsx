/* eslint-disable react/prop-types */
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryIcon from "@mui/icons-material/History";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import React from "react";

const sidebarItem = [
  { text: "Scan QR", icon: <QrCodeScannerIcon />, route: "/" },
  { text: "Barang", icon: <Inventory2Icon />, route: "/product" },
  { text: "Customer", icon: <GroupsIcon />, route: "/customer" },
  { text: "Transaksi", icon: <ReceiptLongIcon />, route: "/transaction" },
  { text: "History Transaksi", icon: <HistoryIcon />, route: "/history" },
];

const Sidebar = ({ open = false, handleClose }) => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      {!isMatch ? (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              background: "#081E43",
              width: drawerWidth,
              boxSizing: "border-box",
              color: "#ffffff",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <LocalMallIcon />
            <Typography
              variant="h5"
              component="div"
              sx={{ ml: 2, flexGrow: 1 }}
            >
              X-mart
            </Typography>
          </Toolbar>
          <List>
            {sidebarItem.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(item.route)}>
                  <ListItemIcon sx={{ color: "#ffffff" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : (
        <React.Fragment>
          <Drawer
            anchor="left"
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiDrawer-paper": {
                background: "#081E43",
                color: "#ffffff",
              },
            }}
          >
            <Toolbar>
              <LocalMallIcon />
              <Typography
                variant="h5"
                component="div"
                sx={{ ml: 2, flexGrow: 1 }}
              >
                X-mart
              </Typography>
            </Toolbar>
            <List>
              {sidebarItem.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => navigate(item.route)}>
                    <ListItemIcon sx={{ color: "#ffffff" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Sidebar;
