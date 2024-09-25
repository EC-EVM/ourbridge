import { useQueryClient } from "@tanstack/react-query";
import { abi } from "../../../../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";

export const TokenBalances = () => {
  const { address: connectedAddress } = useAccount();
  const tokenAddress1 = "0xd19e8d3a9720df22f6689eb9b54c691414efe8c2"
  const tokenAddress2 = "0xd19e8d3a9720df22f6689eb9b54c691414efe8c2"
  const result = useReadContracts({
    contracts: [
      {
        address: tokenAddress1,
        abi: abi,
        functionName: "balanceOf",
        args: [connectedAddress],
        chainId: 11155111
      },
      {
        address: tokenAddress2,
        abi: abi,
        functionName: "balanceOf",
        args: [connectedAddress],
        chainId: 84532
      },
    ],
  });
  const balanceSepolia = result.data?.[0].result;
  const balanceBase = result.data?.[1].result;
  const queryKey = result.queryKey;

  const watchContractEvents = (chainId: number) => {
    useWatchContractEvent({
      address: tokenAddress,
      abi,
      chainId,
      onLogs(logs) {
        try {
          console.log('New logs!', logs)
          queryClient.invalidateQueries({queryKey});
          console.log('Queries invalidated');
        } catch (error) {
          console.error('Error in onLogs function:', error);
        }
      },
    })
  }

  watchContractEvents(84532);
  watchContractEvents(11155111);

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Token Balances</h2>

        {balanceSepolia !== undefined && <div>Sepolia Balance: {balanceSepolia ? balanceSepolia.toString() : 0}</div>}
        {balanceBase !== undefined && <div>Base Balance: {balanceBase ? balanceBase.toString() : 0}</div>}
      </div>
    </div>
  );
};
