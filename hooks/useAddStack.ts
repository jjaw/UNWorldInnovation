import { useMutation } from "react-query";
import useStacksContract from "./useStacksContract";

interface UseAddStackPayload {
  image: string;
  comment: string;
}

const useAddStack = () => {
  const contract = useStacksContract();

  return useMutation(async ({ image, comment }: UseAddStackPayload) => {
    await contract.addStack(image, comment);
  });
};

export default useAddStack;