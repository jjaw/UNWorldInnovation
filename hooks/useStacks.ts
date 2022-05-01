import { useQuery } from "react-query";
import useStacksContract from "./useStacksContract";

interface UseStacksQuery {
  address: string;
}

const useStacks = ({ address }: UseStacksQuery) => {
  const contract = useStacksContract();
  return useQuery(["stacks", { address, chainId: contract.chainId }], () =>
    contract.getStacks()
  );
};

export default useStacks;