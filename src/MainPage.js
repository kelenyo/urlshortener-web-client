import * as React from 'react'
import {Formik, Field, Form} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import {
    Box,
    Text,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react"

function MainPage() {
    const [responseData, setResponseData] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    React.useEffect(() => {
    }, []);


    const sendData = async (data) => {
        axios
            .post(
                'http://localhost:80/createshorturl',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "*/*",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": 'Basic YWRtaW46ZGVtbw==',
                    }
                })
            .then(response => setResponseData(response.data))
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                }
            });
    }

    return (
        <>
            <Box spacing={8} borderRadius="lg" border="1px" borderColor="gray.600" w="80%" mb="10" mt="10" p="6">
                <Text mb="5" color="gray.600" fontSize="xl">Welcome</Text>
                <Text mb="2" align="left" color="gray.600" fontSize="lg">As an user you would be able to enter a url and
                    received
                    from the service an shortened url of maximum 6 alphanumeric characters. The shortened url can be use
                    to reach your website.</Text>
                <Text mb="5" align="left" color="gray.600" fontSize="lg">
                    Example: https://www.seeburger.com/de/karriere/ => http://localhost/GUKA8w/
                </Text>
                <Text mb="2" align="left" color="gray.600" fontSize="lg">
                    If you want you can also enter your url with a code that will be use to form the new shortened url.
                    In this case please just enter a code of maximum 6 alphanumeric characters.
                </Text>
                <Text mb="5" align="left" color="gray.600" fontSize="lg">
                    For example if you want to have the following result:
                    https://www.seeburger.com/de/karriere/stellenangebote/ => http://localhost/jobs/. Please just enter
                    "jobs" as a code.
                </Text>
            </Box>
            <Box spacing={8} borderRadius="lg" border="1px" borderColor="gray.600" w="80%" p="6"
                 color="white">
                <Formik
                    initialValues={{url: "", code: ""}}
                    validationSchema={Yup.object().shape({
                        url: Yup.string().trim().url('Invalid URL').required('Required'),
                        code: Yup.string()
                            .trim()
                            .min(1, 'Must be at least 6 alphanumeric characters')
                            .max(6, 'Must be max 6 alphanumeric characters')
                            .matches(
                                /^[a-zA-Z0-9]+$/,
                                "May only contain alphanumeric characters."
                            )
                    })}
                    onSubmit={async (values) => {
                        await sendData(values);
                    }}
                >
                    {(props) => (
                        <Form>
                            <Box spacing={1} h="15rem">
                                <Field name="url">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.url && form.touched.url}>
                                            <FormLabel htmlFor="url" color="gray.600">
                                                Paste the URL to be shortened with or without a shortened url code
                                            </FormLabel>
                                            <Input {...field} bg="white" borderColor="gray.400" color="black" id="url" placeholder="Site url"/>
                                            <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="code">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.code && form.touched.code}>
                                            <Input {...field} bg="white" mt="4" color="black" borderColor="gray.400" id="code"
                                                   placeholder="code"/>
                                            <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Box>
                            <Button
                                mt={1}
                                colorScheme="blue"
                                size="lg"
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box spacing={8} borderRadius="lg" border="1px" borderColor="gray.600" w="80%" mb="10" mt="10" p="6">
                <Text color="gray.600" fontSize="xl">The result</Text>
                <Text color="gray.500" fontSize="lg">original url: {responseData.url || ''}</Text>
                <Text color="gray.500" fontSize="lg">shortened
                    url: {responseData.code && `http://localhost/${responseData.code}`}</Text>
                <Text color="red.600" fontSize="lg">{errorMessage}</Text>
            </Box>
        </>
    );
}

export default MainPage;
