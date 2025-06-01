// src/components/Sidebar.jsx
import { Box, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBarChart2,
  FiUser,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { IoMdAnalytics } from "react-icons/io";

export default function Sidebar() {
  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      w="60"
      h="100vh"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      p="5"
    >
      {/* Logo */}
      <Text fontSize="2xl" fontWeight="bold" mb="8">
        Order
      </Text>

      {/* Navigation Links */}
      <VStack align="stretch" spacing="4">
        <SidebarLink icon={FiHome} to="/">
          Dashboard
        </SidebarLink>
        <SidebarLink icon={FiBarChart2} to="/orders">
          Active Orders
        </SidebarLink>
        <SidebarLink icon={IoMdAnalytics} to="/analysis">
          AI Analysis
        </SidebarLink>
      </VStack>

      {/* Account Pages */}
      {/* <Box mt="10">
        <Text fontSize="sm" color="gray.500" mb="3" textTransform="uppercase">
          Account Pages
        </Text>

        <VStack align="stretch" spacing="4">
          <SidebarLink icon={FiUser} to="#">
            Profile
          </SidebarLink>
          <SidebarLink icon={FiLogIn} to="#">
            Sign In
          </SidebarLink>
          <SidebarLink icon={FiUserPlus} to="#">
            Sign Up
          </SidebarLink>
        </VStack>
      </Box> */}

      {/* Footer Help Box */}
      {/* <Box
        position="absolute"
        bottom="10"
        left="5"
        right="5"
        p="4"
        bg="blue.50"
        borderRadius="md"
        textAlign="center"
      >
        <Text fontSize="sm">Need help?</Text>
        <Text fontSize="xs" color="blue.500">
          Please check our docs.
        </Text>
      </Box> */}
    </Box>
  );
}

function SidebarLink({ icon, to, children }) {
  return (
    <Link
      as={NavLink}
      to={to}
      display="flex"
      alignItems="center"
      p="2"
      borderRadius="md"
      _hover={{ bg: "blue.100", textDecoration: "none" }}
      _activeLink={{ bg: "blue.500", color: "white" }}
      fontWeight="medium"
    >
      <Icon as={icon} mr="3" boxSize="5" />
      {children}
    </Link>
  );
}
