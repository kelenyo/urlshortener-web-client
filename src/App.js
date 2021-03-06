import * as React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Text } from "@chakra-ui/react"
import MainPage from "./MainPage";
import './App.css';

function App() {

    return (
        <ChakraProvider>
            <Box bg="tomato" w="100%" p={4} color="white">
                <Text fontSize="xl" fontWeight="semibold">Short URL Service Demo</Text>
            </Box>
            <div className="app">
                <div className="app-main">
                    <MainPage />
                </div>
            </div>
        </ChakraProvider>
    );
}

export default App;
