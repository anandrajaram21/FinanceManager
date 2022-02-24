import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Manage your finances
            <br />
            <Text as={"span"} color={"blue.400"}>
              easier than ever
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Keep track of your finances in the easiest manner possible, and make
            the most of your money. All in one place. No more paper, no more
            pen, no more worries.
          </Text>
        </Stack>
      </Container>
    </>
  );
}
