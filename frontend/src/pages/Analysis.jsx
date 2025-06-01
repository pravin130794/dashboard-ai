import { Box, Text } from "@chakra-ui/react";
import { useOrder } from "../context/OrderContext";

export default function AIAnalysis() {
  const { selectedOrder } = useOrder();

  if (!selectedOrder) {
    return <Text>No order selected. Please go back and select an order.</Text>;
  }

  return (
    <Box p="6" bg="white" borderRadius="md" boxShadow="sm">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        AI Analysis for Order #{selectedOrder.id}
      </Text>
      <Text>
        <b>Date:</b> {selectedOrder.date}
      </Text>
      <Text>
        <b>Status:</b> {selectedOrder.status}
      </Text>
      <Text>
        <b>Brief:</b> {selectedOrder.brief}
      </Text>
    </Box>
  );
}
