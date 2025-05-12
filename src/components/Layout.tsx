import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <Box className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-4 w-[80%]">
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
