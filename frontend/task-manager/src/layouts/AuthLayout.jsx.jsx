// src/layouts/AuthLayout.jsx
import React from "react";
import { Box } from "@mui/material";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default AuthLayout;
