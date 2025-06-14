// src/components/Charts/LineChart.jsx
import ReactApexChart from "react-apexcharts";
import { Box, Text } from "@chakra-ui/react";

export default function LineChart() {
  const chartData = {
    series: [
      {
        name: "Sales",
        data: [10, 20, 15, 30, 25, 40, 35, 50, 45, 60],
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
