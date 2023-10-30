/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

const SharedStateProvider = ({ children }) => {
  const [user, setUser] = useState({
    qrcode: "QR-Customer-1",
    nama: "John Doelz",
    wallet: 100000,
  });

  return (
    <SharedStateContext.Provider value={{ user, setUser }}>
      {children}
    </SharedStateContext.Provider>
  );
};

const useSharedState = () => {
  const context = useContext(SharedStateContext);

  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }

  return context;
};

export { SharedStateProvider, useSharedState };
