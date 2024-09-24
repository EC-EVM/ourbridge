import { useState } from "react";
import { abi } from "../../../../artifacts/contracts/BridgeableToken.sol/BridgeableToken.json";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

export const BridgeTokens = () => {
  const [amount, setAmount] = useState(1);
  const tokenAddress = "0xD19e8d3a9720df22F6689EB9B54C691414efE8C2"

  const { data, isError, error, isPending, isSuccess, writeContract } = useWriteContract();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Bridge Tokens</h2>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the amount to bridge:</span>
          </label>
          <input
            type="text"
            placeholder="2"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() => {
            writeContract({
              abi: abi,
              address: tokenAddress,
              functionName: "bridge",
              args: [BigInt(amount)],
            });
          }}
        >
          Bridge
        </button>
        {isSuccess && (
          <div>
            Transaction hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
              {data}
            </a>
          </div>
        )}
        {isError && <div>Error bridging: {error.message}</div>}
      </div>
    </div>
  );
};
