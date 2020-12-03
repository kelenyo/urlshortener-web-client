import * as React from 'react'
import axios from 'axios'
import {
    Box,
    Button,
} from "@chakra-ui/react"

function CheckConnection() {
    const checkServer = async () => {
        const response = await axios.get(
            'http://localhost:8080/api',
            {
                    headers: {
                        'Content-Type': 'text/plain;charset=UTF-8',
                        "Accept": "application/json",},
                    auth: {
                        username: 'admin',
                        password: 'demo'
                    }
            }
        )
        console.log(response.data)
    }

    return (
        <Box spacing={8} borderRadius="lg" bg="white" h="7rem" w="100%" mt="2" p="6" color="white">
            <Button
                mt={1}
                colorScheme="blue"
                size="lg"
                onClick={() => checkServer}
                type="submit"
            >
                Check connection to Backend
            </Button>
        </Box>
    );
}

export default CheckConnection;
