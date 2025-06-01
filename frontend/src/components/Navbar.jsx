// src/components/Navbar.jsx
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Simple logic to show page title based on path
  const getPageTitle = () => {
    if (location.pathname === "/orders") return "Active Orders";
    if (location.pathname === "/analysis") return "AI Analysis";
    if (location.pathname === "/") return "Dashboard";
    return "Dashboard";
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      p="4"
      bg="white"
      borderBottom="1px"
      borderBottomColor="gray.200"
      position="sticky"
      top="0"
      zIndex="10"
    >
      {/* Left: Breadcrumb and Title */}
      <Box>
        <Text fontSize="sm" color="gray.500">
          Pages / {getPageTitle()}
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {getPageTitle()}
        </Text>
      </Box>

      {/* Center: Search box */}
      {/* <InputGroup maxW="400px" mx="8">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input type="text" placeholder="Type here..." borderRadius="md" />
      </InputGroup> */}

      {/* Right: Sign In and Bell Icon */}
      <Flex align="center" gap="4">
        {/* <Text
          fontSize="sm"
          fontWeight="medium"
          color="blue.500"
          cursor="pointer"
        >
          Sign In
        </Text>
        <IconButton
          icon={<BellIcon />}
          variant="ghost"
          aria-label="Notifications"
        /> */}
        <Avatar size="sm" name="User" src="" />
      </Flex>
    </Flex>
  );
}
