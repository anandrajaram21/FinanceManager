import React, { useState, useEffect } from "react";
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  TableCaption,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Center,
  Drawer,
  DrawerBody,
  Stack,
  Box,
  Text,
  Spinner,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { FaTrashAlt } from "react-icons/fa";

import { Formik } from "formik";

function Transactions() {
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const calculateTotal = (transactions) => {
    let totalAmount = 0;
    transactions.forEach((transaction) => {
      totalAmount += transaction.amount;
    });
    setTotal(totalAmount);
  };

  const fetchData = () => {
    fetch("/api/transaction/list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
        calculateTotal(data);
      });
  };

  const deleteTransaction = (id) => {
    fetch(`/api/transaction/delete`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading) {
    return (
      <>
        <Center py={6}>
          <Box
            bg={() => {
              if (total > 0) {
                return "blue.300";
              } else {
                return "red";
              }
            }}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Stack textAlign={"center"} p={6} color="white" align={"center"}>
              <Text fontSize={"3xl"} fontWeight={800}>
                Current Expenditure
              </Text>
              <Text fontSize={"4xl"} fontWeight={800}>
                ${total}
              </Text>
            </Stack>
          </Box>
        </Center>
        {transactions.length > 0 && !isLoading ? (
          <Table marginX={"auto"} maxW={"2xl"} variant="simple">
            <TableCaption>Your Transactions</TableCaption>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.description}</Td>
                  <Td>{new Date(transaction.date).toUTCString()}</Td>
                  <Td isNumeric>{transaction.amount}</Td>
                  <Td>
                    <Center>
                      <FaTrashAlt
                        cursor={"pointer"}
                        onClick={() => {
                          deleteTransaction(transaction.id);
                          setLoading(true);
                        }}
                      ></FaTrashAlt>
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Description</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount</Th>
                <Th>Delete</Th>
              </Tr>
            </Tfoot>
          </Table>
        ) : (
          <Center>
            <Heading marginY={4}>No Transactions</Heading>
          </Center>
        )}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create a Transaction</DrawerHeader>

            <DrawerBody>
              <Formik
                initialValues={{ description: "", amount: 0 }}
                validate={(values) => {
                  const errors = {};
                  if (!values.description) {
                    errors.description = "Required";
                  }

                  if (!values.amount) {
                    errors.amount = "Cannot be 0 or empty";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  fetch("/api/transaction/new", {
                    method: "POST",
                    body: JSON.stringify(values),
                  }).then(() => {
                    setSubmitting(false);
                    setLoading(true);
                    fetchData();
                  });
                  onClose();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isInvalid={errors.description && touched.description}
                    >
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Input
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      marginY={5}
                      isInvalid={errors.amount && touched.amount}
                    >
                      <FormLabel htmlFor="amount">Amount</FormLabel>
                      <Input
                        id="amount"
                        name="amount"
                        type={"number"}
                        placeholder="Enter an amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.amount}
                      />
                      <FormErrorMessage>{errors.amount}</FormErrorMessage>
                    </FormControl>
                    <Button marginY={3} type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </form>
                )}
              </Formik>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Center marginY={5}>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            Create new Transaction
          </Button>
        </Center>
      </>
    );
  } else {
    return (
      <Center>
        <Spinner size={"xl"} marginTop={5} />
        <Heading marginX={4}>Loading...</Heading>
      </Center>
    );
  }
}

export default Transactions;
