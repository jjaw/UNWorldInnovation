import * as React from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import useStacks from "../../hooks/useStacks";
import BookStack from "./BookStack";
import StackEditor from "./StackEditor";
import { useAccount } from "wagmi";
import { constants } from "ethers";
// import useEvents from "../hooks/useEvents";

interface StacksProps {
}

const Stacks: React.FunctionComponent<StacksProps> = ({}) => {
  const [accountQuery] = useAccount();
  const address=accountQuery.data?.address || constants.AddressZero
  const query = useStacks({ address });

  // console.log(address);
  // useEvents({ topic });

  return (
    <Box>
      {query.isLoading && (
        <Center p={8}>
          <Spinner />
        </Center>
      )}
      <Stack spacing={4}>
        {query.data?.map((stack) => (
          <BookStack key={stack.id} stack={stack}/>
        ))}
        {query.isFetched && <StackEditor />}
      </Stack>
    </Box>
  );
};

export default Stacks;