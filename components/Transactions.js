import React, { useState, useEffect } from "react";
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Container,
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
} from "@chakra-ui/react";

import { FaTrashAlt } from "react-icons/fa";

import { Formik } from "formik";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    fetch("/api/transaction/list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
        console.log(data);
        let totalAmount = 0;
        data.forEach((transaction) => {
          totalAmount += transaction.amount;
        });
        setTotal(totalAmount);
        console.log(totalAmount);
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
    fetchData();
  }, []);
  return (
    <>
      {transactions.length > 0 ? (
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
                  {/* <Button leftIcon={<FaTrashAlt />}></Button> */}
                  <Center>
                    <FaTrashAlt
                      cursor={"pointer"}
                      onClick={() => deleteTransaction(transaction.id)}
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
      <Container marginY={5}>
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
              fetchData();
            });
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
      </Container>
    </>
  );
}

export default Transactions;
