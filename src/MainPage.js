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
    const sendData = async (data) => {
        const response = await axios.post(
            'http://localhost:8080/createshorturl',
            { url: 'http://localhost:8080' },
            {
                    headers: {
                        authorization: 'Basic ' + window.btoa("admin:demo"),
                    },
            }
        )
        console.log(response.data)
    }

    return (
        <>
            <Box spacing={8} borderRadius="lg" bg="gray.600" h="22rem" w="80%" p="6" color="white">
                <Formik
                    initialValues={{url: "", code: ""}}
                    validationSchema={Yup.object().shape({
                        url: Yup.string().url('Invalid URL').required('Required'),
                        code: Yup.string().min(6, 'Must be at least 6 characters').max(6, 'Must be max 6 characters')
                    })}
                    onSubmit={async (values) => {
                        await sendData(values);
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {(props) => (
                        <Form>
                            <Box spacing={1}  h="15rem">
                                <Field name="url">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.url && form.touched.url}>
                                            <FormLabel htmlFor="url" fontSize="XL">
                                                Paste the URL to be shortened with or without a shortened url code
                                            </FormLabel>
                                            <Input {...field} bg="white" color="black" id="url" placeholder="Site url"/>
                                            <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="code">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.code && form.touched.code}>
                                            <Input {...field} bg="white" mt="4" color="black" id="code" placeholder="code"/>
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
            <Box spacing={8} borderRadius="lg" bg="gray.600" h="15rem" w="80%" mt="10" p="6" color="white">
                <Text>The shortened url will show up below</Text>
            </Box>
        </>
    );
}

export default MainPage;
