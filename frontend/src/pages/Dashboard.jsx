// src/pages/DashboardPage.jsx
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  Badge,
  Progress,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import {
  FaPhoneAlt,
  FaRedoAlt,
  FaChartBar,
  FaExclamationCircle,
} from "react-icons/fa";
import StatsCard from "../components/Cards/StatsCard";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import FloatingChatbot from "../components/Chatbot/FloatingChatbot";

const data = {
  totalCalls: 20245,
  totalCallsChange: "-7.87%",
  repeatCalls24h: 4549,
  repeatCalls24hChange: "27%",
  repeatCalls3d: 2148,
  callTopics: [
    { topic: "Credit dispute", count: 3, change: "-29%" },
    { topic: "Call dropping issue", count: 1 },
    { topic: "Payment history", count: 4, change: "71.43%" },
  ],
  topIntents: [
    { intent: "Billing_Bill Dispute", calls: 1149, percent: 5.86 },
    {
      intent: "Troubleshooting_Activate Esim/Sim Card",
      calls: 1110,
      percent: 5.62,
    },
    { intent: "Payment_Make Payment Arrangement", calls: 1070, percent: 3.38 },
    { intent: "Account_Transfer Service", calls: 821, percent: 4.9 },
    { intent: "Payment_Make A Payment", calls: 784, percent: 4.66 },
  ],
};

export default function DashboardPage() {
  return (
    <Box p={6}>
      {/* Top Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <StatsCard
          title="Total Calls"
          amount={data.totalCalls.toLocaleString()}
          growth={data.totalCallsChange}
          icon={FaPhoneAlt}
        />
        <StatsCard
          title="Repeat Calls (24 Hrs)"
          amount={data.repeatCalls24h.toLocaleString()}
          growth={data.repeatCalls24hChange}
          icon={FaRedoAlt}
        />
        <StatsCard
          title="Repeat in 3 Days"
          amount={data.repeatCalls3d.toLocaleString()}
          growth=""
          icon={FaChartBar}
        />
      </SimpleGrid>
      {/* Call Topics */}
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Call Topics
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {data.callTopics.map((topic) => (
            <StatsCard
              key={topic.topic}
              title={topic.topic}
              amount={topic.count.toString()}
              growth={topic.change || "0%"}
              icon={FaExclamationCircle}
            />
          ))}
        </SimpleGrid>
      </Box>
      {/* Line Chart Section */}
      <Box mb={8}>
        <LineChart />
      </Box>
      {/* Line Chart Section */}
      <Box mb={8}>
        <BarChart />
      </Box>
      {/* Top Intents Table */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Top Primary Intents
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Intent</Th>
              <Th>Calls</Th>
              <Th>% of Call Volume</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.topIntents.map((intent) => (
              <Tr key={intent.intent}>
                <Td>{intent.intent}</Td>
                <Td>{intent.calls}</Td>
                <Td>
                  <Flex align="center">
                    <Box w="80%">
                      <Progress
                        value={intent.percent}
                        size="sm"
                        colorScheme="green"
                        borderRadius="md"
                      />
                    </Box>
                    <Text ml={2} minW="50px">
                      {intent.percent}%
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <FloatingChatbot />;
    </Box>
  );
}
