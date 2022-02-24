import React, { useState, useEffect } from "react";
import {
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
  FormHelperText,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";

import { Formik } from "formik";

function Transactions() {
  return (
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
          console.log(values);
          fetch("/api/transaction/new", {
            method: "POST",
            body: JSON.stringify(values),
          }).then(setSubmitting(false));
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
            <FormControl isInvalid={errors.description && touched.description}>
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
      {/* <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table> */}
    </Container>
  );
}

export default Transactions;
