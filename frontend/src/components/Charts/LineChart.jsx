// src/components/Charts/LineChart.jsx
import ReactApexChart from "react-apexcharts";
import { Box, Text } from "@chakra-ui/react";

export default function LineChart() {
  const chartData = {
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
      },
      colors: ["#3182ce"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
  };

  return (
    <Box p="5" bg="white" borderRadius="md" boxShadow="sm">
      <Text fontSize="lg" mb="4" fontWeight="bold">
        Sales Overview
      </Text>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={250}
      />
    </Box>
  );
}
