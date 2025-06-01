// src/components/Tables/AuthorsTable.jsx
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const ordersData = [
  {
    id: 10001,
    brief: "order has been shipped",
    status: "Completed",
    date: "23/04/18",
  },
  {
    id: 10002,
    brief: "Order has been lost",
    status: "Failed",
    date: "23/04/20",
  },
  {
    id: 10003,
    brief: "Refund initiated",
    status: "Completed",
    date: "01/06/20",
  },
  {
    id: 10004,
    brief: "Awaiting dispatch",
    status: "Pending",
    date: "12/08/20",
  },
  { id: 10005, brief: "Delayed delivery", status: "Failed", date: "17/09/20" },
  {
    id: 10006,
    brief: "order has been shipped",
    status: "Completed",
    date: "22/10/20",
  },
];

const ITEMS_PER_PAGE = 4;

export default function AuthorsTable() {
  const { setSelectedOrder } = useOrder();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filter and search
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // 2. Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box overflowX="auto">
      {/* Search + Filter */}
      <Flex mb="4" gap="4" align="center">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          maxW="300px"
        />
        <Select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          maxW="200px"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </Select>
      </Flex>

      {/* Table */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Brief</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.date}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      order.status === "Completed"
                        ? "green"
                        : order.status === "Failed"
                        ? "red"
                        : "yellow"
                    }
                  >
                    {order.status}
                  </Badge>
                </Td>
                <Td>{order.brief}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(order); // save clicked order
                      navigate("/analysis"); // go to analysis page
                    }}
                  >
                    Analyse
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="5" textAlign="center">
                No orders found.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex justify="flex-end" align="center" gap="4" mt="4">
        <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}
