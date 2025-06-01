import { Box } from "@chakra-ui/react";
import AuthorsTable from "../components/Tables/AuthorsTable";

export default function Order() {
  return (
    <Box p="5" bg="white" borderRadius="md" boxShadow="sm">
      <AuthorsTable />
    </Box>
  );
}
