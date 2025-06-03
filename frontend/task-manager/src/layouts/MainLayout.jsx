// src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}

export default MainLayout;
