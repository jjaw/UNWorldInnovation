import * as React from "react";
import { HStack, Stack, Textarea } from "@chakra-ui/react";
import { constants } from "ethers";
import Avatar from "@davatar/react";
import AuthButton from "../AuthButton";
import { useAccount } from "wagmi";
import useAddStack from "../../hooks/useAddStack";

interface StackEditorProps {
}

const StackEditor: React.FunctionComponent<StackEditorProps> = ({}) => {
  const [image, setImage] = React.useState("");
  const [comment, setComment] = React.useState("");
  const mutation = useAddStack();
  const [accountQuery] = useAccount();

  return (
    <Stack spacing={3}>
      <HStack spacing={3} alignItems="start">
        <Avatar
          size={48}
          address={accountQuery.data?.address || constants.AddressZero}
        />
        <Textarea
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="ImageUrl.."
          p={3}
          flex={1}
          bg="whiteAlpha.100"
          rounded="2xl"
          fontSize="lg"
        />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment.."
          p={3}
          flex={1}
          bg="whiteAlpha.100"
          rounded="2xl"
          fontSize="lg"
        />
      </HStack>
      <AuthButton
        size="sm"
        colorScheme="pink"
        alignSelf="flex-end"
        onClick={() => {
          mutation
            .mutateAsync({
              image,
              comment,
            })
            .then(() => setComment(""))
            .then(() => setImage(""));
        }}
        isLoading={mutation.isLoading}
      >
        Submit
      </AuthButton>
    </Stack>
  );
};

export default StackEditor;