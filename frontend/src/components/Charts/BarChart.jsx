// src/components/Charts/BarChart.jsx
import ReactApexChart from "react-apexcharts";
import { Box, Text } from "@chakra-ui/react";

export default function BarChart() {
  const chartData = {
    series: [
      {
        name: "Performance",
        data: [80, 95, 70, 85, 65, 90, 100],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      colors: ["#38a169"],
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
  };

  return (
    <Box p="5" bg="white" borderRadius="md" boxShadow="sm">
      <Text fontSize="lg" mb="4" fontWeight="bold">
        Performance
      </Text>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={250}
      />
    </Box>
  );
}
