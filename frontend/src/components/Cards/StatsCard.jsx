// src/components/Cards/StatsCard.jsx
import { Box, Flex, Icon, Text } from "@chakra-ui/react";

export default function StatsCard({ title, amount, growth, icon, onClick }) {
  return (
    <Box
      p="5"
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      cursor={onClick ? "pointer" : "default"}
      _hover={onClick ? { boxShadow: "md", transform: "scale(1.02)" } : {}}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Flex justify="space-between" align="center" mb="4">
        <Box>
          <Text fontSize="sm" color="gray.500">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {amount}
          </Text>
        </Box>
        <Icon as={icon} boxSize="8" color="blue.500" />
      </Flex>
      <Text
        fontSize="sm"
        color={growth.startsWith("-") ? "red.400" : "green.400"}
      >
        {growth} Since last month
      </Text>
    </Box>
  );
}
