import { Box, Text } from "@chakra-ui/layout";

const UserListItem1 = ({ resUser,handleFunction }) => {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      {/* <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={resUser.pic}
      /> */}
      <Box>
        <Text>{resUser?.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {resUser?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem1;