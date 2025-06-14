// src/components/Tables/AuthorsTable.jsx
import {
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
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const ordersData = [
  {
    orderNumber: 125436,
    status: "Completed",
    startDate: "1/18/2025",
    endDate: "1/22/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125437,
    status: "Fall Out",
    ErrorCode: "OSOE0244",
    startDate: "1/19/2025",
    endDate: "1/23/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125438,
    status: "Completed",
    startDate: "1/20/2025",
    endDate: "1/24/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125439,
    status: "Completed",
    startDate: "1/21/2025",
    endDate: "1/25/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125440,
    status: "Completed",
    startDate: "1/22/2025",
    endDate: "1/26/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125441,
    status: "Fall Out",
    ErrorCode: "TDO0205",
    startDate: "1/23/2025",
    endDate: "1/27/2025",
    stage: "Auto Design",
    ErrorDescription:
      "Exception occurred while retrieving equipment details for the locusid",
    Resolutions:
      "1) Please check if the logical and physical connections have been built in CND\n2) Once the connections have been fixed please do a retry from PORCH\n3) If issue still persists please contact CND support.",
    ResponsibleSystems: "CND",
    POC: "iii",
  },
  {
    orderNumber: 125442,
    status: "Completed",
    startDate: "1/24/2025",
    endDate: "1/28/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125443,
    status: "Completed",
    startDate: "1/25/2025",
    endDate: "1/29/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125444,
    status: "Completed",
    startDate: "1/26/2025",
    endDate: "1/30/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125445,
    status: "Completed",
    startDate: "1/27/2025",
    endDate: "1/31/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125446,
    status: "Fall Out",
    ErrorCode: "TDO0222",
    startDate: "1/28/2025",
    endDate: "2/1/2025",
    stage: "Network Links",
    ErrorDescription: "Trail Attribute value is Null or Empty for DPU_MGMT_IP",
    Resolutions:
      "1) Management IP is retrieved From FIM Response\n2) Please check if the IPs have been configured in CND\n3) If fixed, do a retry\n4) Else contact FIM support",
    ResponsibleSystems: "FIM",
    POC: "hhh",
  },
  {
    orderNumber: 125447,
    status: "Completed",
    startDate: "1/29/2025",
    endDate: "2/2/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125448,
    status: "Completed",
    startDate: "1/30/2025",
    endDate: "2/3/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125449,
    status: "Fall Out",
    ErrorCode: "ACMS001031",
    startDate: "1/31/2025",
    endDate: "2/4/2025",
    stage: "Parser Generation",
    ErrorDescription: "Request timed out from BNC",
    Resolutions:
      "Verify NTLS-BNC payload in network activaty or contact BNC support | 1) Awaiting response from BNC \n 2) Please Retry the fallout from PORCH \n 3) If issue still persists, please reach out to BNC support.",
    ResponsibleSystems: "NTLS, BNC",
    POC: "",
  },
  {
    orderNumber: 125450,
    status: "Fall Out",
    ErrorCode: "TSPCFSII",
    startDate: "2/1/2025",
    endDate: "2/5/2025",
    stage: "Line Test",
    ErrorDescription:
      "Line test failed, with validation error (invalid subscription)",
    Resolutions: "",
    ResponsibleSystems: "DELPHI",
    POC: "ccc",
  },
  {
    orderNumber: 125451,
    status: "Completed",
    startDate: "2/2/2025",
    endDate: "2/6/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125452,
    status: "Completed",
    startDate: "2/3/2025",
    endDate: "2/7/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125453,
    status: "Fall Out",
    ErrorCode: "VS_DPU_READYLINKS_ACTIVATE_FAILED",
    startDate: "2/4/2025",
    endDate: "2/8/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125454,
    status: "Completed",
    startDate: "2/5/2025",
    endDate: "2/9/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125455,
    status: "Completed",
    startDate: "2/6/2025",
    endDate: "2/10/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125456,
    status: "Fall Out",
    ErrorCode: "OSOE0241",
    startDate: "2/7/2025",
    endDate: "2/11/2025",
    stage: "Order Completion",
    ErrorDescription: "Milestone Failure Response from CJCM - Order not found",
    Resolutions: "Contact NTLS Support",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125457,
    status: "Completed",
    startDate: "2/8/2025",
    endDate: "2/12/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125458,
    status: "Completed",
    startDate: "2/9/2025",
    endDate: "2/13/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125459,
    status: "Fall Out",
    startDate: "2/10/2025",
    endDate: "2/14/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125460,
    status: "Completed",
    startDate: "2/11/2025",
    endDate: "2/15/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125461,
    status: "Completed",
    startDate: "2/12/2025",
    endDate: "2/16/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125462,
    status: "Fall Out",
    startDate: "2/13/2025",
    endDate: "2/17/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125463,
    status: "Completed",
    startDate: "2/14/2025",
    endDate: "2/18/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
  {
    orderNumber: 125464,
    status: "Completed",
    startDate: "2/15/2025",
    endDate: "2/19/2025",
    stage: "",
    ErrorDescription: "",
    Resolutions: "",
    ResponsibleSystems: "",
    POC: "",
  },
];

const ITEMS_PER_PAGE = 4;

export default function AuthorsTable() {
  const { setSelectedOrder } = useOrder();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sentSelectedOrder, setSentSelectedOrder] = useState(null);

  
  // Utility to convert dd/mm/yy → Date object
  const parseDate = (ddmmyy) => {
    if (ddmmyy !== undefined) {
      const [day, month, year] = ddmmyy.split("/");
      return new Date(`20${year}-${month}-${day}`);
    }
  };
  function parseDateString(dateStr) {
    if (!dateStr) return null;

    // Handle YYYY-MM-DD (from date picker)
    if (dateStr.includes("-")) {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    // Handle MM/DD/YYYY (from Excel or API)
    if (dateStr.includes("/")) {
      const [month, day, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    }

    return null; // fallback
  }
  // Filter logic
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toString().includes(searchTerm) ||
      order.ErrorDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.Resolutions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.ResponsibleSystems.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      order.ErrorCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.POC.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    // Use startDate for date filter
    const orderStart = parseDateString(order.startDate);
    const orderEnd = parseDateString(order.endDate);
    const from = fromDate ? parseDateString(fromDate) : null;
    const to = toDate ? parseDateString(toDate) : null;

    const matchesDate =
      (!from || (orderStart && orderStart >= from)) &&
      (!to || (orderEnd && orderEnd <= to));

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Box overflowX="auto">
      {/* Search + Filter + Date Range */}
      <Flex mb="4" gap="4" wrap="wrap" align="center">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          maxW="250px"
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
          <option value="Fall Out">Fall Out</option>
        </Select>

        <Input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
            setCurrentPage(1);
          }}
          maxW="180px"
        />

        <Input
          type="date"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
            setCurrentPage(1);
          }}
          maxW="180px"
        />
        <Tooltip content="Clear all filters">
          <Button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("All");
              setFromDate("");
              setToDate("");
              setCurrentPage(1);
            }}
            colorScheme="blue"
            variant="outline"
          >
            Clear Filters
          </Button>
        </Tooltip>
      </Flex>

      {/* Table */}
      <Table variant="simple" minW={"1000px"}>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Status</Th>
            <Th>ErrorCode</Th>
            <Th>Description</Th>
            <Th>Resolution</Th>
            <Th>Responsible Systems</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <Tr key={order.orderNumber}>
                <Td>{order.orderNumber}</Td>
                <Td>{order.startDate}</Td>
                <Td>{order.endDate}</Td>
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
                <Td
                  maxW="200px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <Tooltip label={order.ErrorCode} hasArrow>
                    <Text noOfLines={1}>{order.ErrorCode}</Text>
                  </Tooltip>
                </Td>
                <Td
                  maxW="200px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <Tooltip label={order.ErrorDescription} hasArrow>
                    <Text noOfLines={1}>{order.ErrorDescription}</Text>
                  </Tooltip>
                </Td>
                <Td
                  maxW="200px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <Tooltip
                    hasArrow
                    label={
                      <Box>
                        {order.Resolutions?.split(/\n|\|/).map((line, idx) => (
                          <Text key={idx}>{line.trim()}</Text>
                        ))}
                      </Box>
                    }
                  >
                    <Text noOfLines={1}>{order.Resolutions}</Text>
                  </Tooltip>
                </Td>
                <Td
                  maxW="200px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <Tooltip label={order.ResponsibleSystems} hasArrow>
                    <Text noOfLines={1}>{order.ResponsibleSystems}</Text>
                  </Tooltip>
                </Td>
                <Td>
                  <Flex gap="2">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => {
                        setSentSelectedOrder(order);
                        // Trigger your Slack API call here
                      }}
                    >
                      Send to Slack
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        navigate("/analysis");
                      }}
                    >
                      Analyse
                    </Button>
                  </Flex>
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
