import * as React from "react";
import { Text, Heading, HStack, Stack, Image } from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import Avatar from "@davatar/react";
import Username from "../Username";
import { Stack as BookStack } from "../../hooks/useStacksContract";

interface StackProps {
  stack: BookStack;
}

const BookStack: React.FunctionComponent<StackProps> = ({ stack }) => {
    return (
      <HStack spacing={3} alignItems="start">
        <Avatar size={48} address={stack.creator_address} />
        <Stack spacing={1} flex={1} bg="whiteAlpha.100" rounded="2xl" p={3}>
          <Heading color="whiteAlpha.900" fontSize="lg">
            <Username address={stack.creator_address} />
          </Heading>
          <Image src={stack.image} alt='stack' />
          <Text color="whiteAlpha.800" fontSize="lg">
            {stack.comment}
          </Text>
          <Text color="whiteAlpha.500" fontSize="md">
            <TimeAgo date={stack.created_at.toNumber() * 1000} />
          </Text>
        </Stack>
      </HStack>
    );
  };
  
export default BookStack;