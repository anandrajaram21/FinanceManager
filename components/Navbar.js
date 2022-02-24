import {
  Box,
  Button,
  Flex,
  Link,
  useColorModeValue,
  Stack,
  Heading,
  Center,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useSession, signIn, signOut } from "next-auth/react";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { data: session, status } = useSession();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} py={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading cursor={"pointer"}>
              Finance
              <Text as="span" color="blue.400">
                Manager
              </Text>
            </Heading>
          </Box>
          <Flex alignItems={"center"}>
            {status === "authenticated" ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  marginRight={2}
                >
                  <Avatar size={"md"} src={session.user.image} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <MenuItem
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                onClick={() => {
                  signIn("google");
                }}
                w={"full"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            )}
            <Stack direction={"row"} spacing={7}>
              <ColorModeSwitcher />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
