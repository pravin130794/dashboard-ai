import {
  Box,
  IconButton,
  Input,
  VStack,
  Text,
  Button,
  HStack,
  useDisclosure,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

export default function FloatingChatbot() {
  const { isOpen, onToggle } = useDisclosure();
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! Ask me anything about Excel sheets 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.answer || data.error },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error fetching response" },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <Box position="fixed" bottom="6" right="6" zIndex="1000">
        {!isOpen ? (
          <IconButton
            icon={<FaCommentDots />}
            colorScheme="purple"
            borderRadius="full"
            boxSize="60px"
            onClick={onToggle}
            shadow="lg"
          />
        ) : (
          <Box
            w="350px"
            h="500px"
            bg="white"
            borderRadius="lg"
            boxShadow="2xl"
            p={3}
            display="flex"
            flexDirection="column"
          >
            <Flex justify="space-between" align="center" mb={2}>
              <HStack>
                <Avatar size="sm" name="Bot" bg="purple.500" />
                <Text fontWeight="bold">AI Assistant</Text>
              </HStack>
              <IconButton icon={<FaTimes />} size="sm" onClick={onToggle} />
            </Flex>

            <VStack
              spacing={3}
              flex="1"
              overflowY="auto"
              w="100%"
              bg="gray.50"
              p={2}
              borderRadius="md"
            >
              {messages.map((msg, i) => (
                <Box
                  key={i}
                  alignSelf={msg.from === "user" ? "flex-end" : "flex-start"}
                  bg={msg.from === "user" ? "blue.100" : "gray.200"}
                  px={3}
                  py={2}
                  borderRadius="md"
                  maxW="75%"
                  fontSize="sm"
                >
                  {msg.text}
                </Box>
              ))}
            </VStack>

            <HStack pt={2}>
              <Input
                placeholder="Ask your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                isDisabled={loading}
              />
              <IconButton
                icon={<FaPaperPlane />}
                colorScheme="purple"
                onClick={handleSend}
                isLoading={loading}
              />
            </HStack>
          </Box>
        )}
      </Box>
    </>
  );
}
