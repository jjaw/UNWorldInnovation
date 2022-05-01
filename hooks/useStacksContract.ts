import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import our contract ABI (a json representation of our contract's public interface).
// The hardhat compiler writes this file to artifacts during compilation.
import StacksContract from "../artifacts/contracts/Stacks.sol/Stacks.json";

export interface Stack {
  id: string;
  image: string;
  comment: string;
  creator_address: string;
  created_at: BigNumber;
}

export enum EventType {
  StackAdded = "StackAdded",
}

const useStacksContract = () => {
  // An ethers.Signer instance associated with the signed-in wallet.
  // https://docs.ethers.io/v5/api/signer/
  const [signer] = useSigner();
  // An ethers.Provider instance. This will be the same provider that is  
  // passed as a prop to the WagmiProvider.
  const provider = useProvider();

  // This returns a new ethers.Contract ready to interact with our comments API.
  // We need to pass in the address of our deployed contract as well as its abi.
  // We also pass in the signer if there is a signed in wallet, or if there's
  // no signed in wallet then we'll pass in the connected provider.
  const contract = wagmi.useContract({
    addressOrName: "0xCd0C4f6F01bd82C8a4FC68e035f436A334B2f84a",
    contractInterface: StacksContract.abi,
    signerOrProvider: signer.data || provider,
  });

  // Wrapper to add types to our getComments function.
  const getStacks = async (): Promise<Stack[]> => {
    return contract.getStacks().then((stacks) => {
      // Each comment is represented as array by default so we convert to object
      return stacks.map((s) => ({ ...s }));
    });
  };

  // Wrapper to add types to our addComment function.
  const addStack = async (image: string, message: string): Promise<void> => {
    // Create a new transaction
    const tx = await contract.addStack(image, message);
    // Wait for transaction to be mined
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getStacks,
    addStack,
  };
};

export default useStacksContract;