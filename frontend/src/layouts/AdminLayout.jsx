// src/layouts/AdminLayout.jsx
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box flex="1" ml={{ base: 0, md: 60 }}>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <Box p="6" bg="gray.50" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
