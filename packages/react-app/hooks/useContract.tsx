import { useState, useEffect, useCallback } from "react";
import { newKit, CeloContract } from "@celo/contractkit";
import { useCelo } from "@celo/react-celo";

export const useContract = (abi: any, contractAddress: string) => {
  const { address } = useCelo();
  const [contract, setContract] = useState<any>(null);

  const getContract = useCallback(async () => {
    const kit = newKit("https://alfajores-forno.celo-testnet.org/");
    if (address) {
      kit.defaultAccount = address;
      //kit.connection.addAccount
    }

    await kit.setFeeCurrency(CeloContract.StableToken);

    setContract(new kit.web3.eth.Contract(abi, contractAddress));
  }, [abi, contractAddress]);

  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return contract;
};
