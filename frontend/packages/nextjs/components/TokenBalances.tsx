import { abi } from "../../../../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import { useAccount, useReadContracts } from "wagmi";

export const TokenBalances = () => {
  const { address: connectedAddress } = useAccount();
  const tokenAddress = "0xD19e8d3a9720df22F6689EB9B54C691414efE8C2"
  const result = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: abi,
        functionName: "balanceOf",
        args: [connectedAddress],
        chainId: 11155111
      },
      {
        address: tokenAddress,
        abi: abi,
        functionName: "balanceOf",
        args: [connectedAddress],
        chainId: 84532
      },
    ],
  });
  const balanceSepolia = result.data?.[0].result;
  const balanceBase = result.data?.[1].result;
  console.log(balanceSepolia);
  console.log(balanceBase);

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