import {
  createPublicClient,
  http,
  createWalletClient,
  formatEther,
  getContract,
} from "viem";
import { randomBytes } from "crypto";
import BN from "bn.js";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia, baseSepolia } from "viem/chains";
import {
  abi,
  bytecode,
} from "../artifacts/contracts/NativeTokenClone.sol/NativeTokenClone.json";
import * as readline from "readline";
import * as dotenv from "dotenv";
dotenv.config();

// Will implement below commented out code for prompting - going with argv for now

//   const input = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const question = (question: string) => {
//     return new Promise((resolve, reject) => {
//       input.question(question, (answer: unknown) => {
//         resolve(answer);
//       });
//     });
//   };

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const privateKey = process.env.PRIVATE_KEY || "";
const CONTRACT_ADDRESS_MAINNET_SEPOLIA =
  "0xF5aCb886c4AE145F3912b4164549DA0878F71754";

// const VAULT_SEPOLIA_ADDRESS = "0x407B0CC7357D02f04D1b74F67CE1379fEB7c8655"

const CONTRACT_ADDRESS_BASE_SEPOLIA = "";

const args = process.argv.slice(2);

// Actions for Sepolia

const sepoliaWalletActions = createWalletClient({
  account: privateKeyToAccount(`0x${privateKey}`),
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
});

const sepoliaPublicActions = createPublicClient({
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
});

const sepoliaTokenContract = getContract({
  address: CONTRACT_ADDRESS_MAINNET_SEPOLIA,
  abi: abi,
  client: {
    public: sepoliaPublicActions,
    wallet: sepoliaWalletActions,
  },
});

// Actions for baseSepolia

const baseWalletClient = createWalletClient({
  account: privateKeyToAccount(`0x${privateKey}`),
  chain: sepolia,
  transport: http(`https://base-sepolia.g.alchemy.com/v2/${providerApiKey}`),
});

const basePublicClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://base-sepolia.g.alchemy.com/v2/${providerApiKey}`),
});

const baseTokenContract = getContract({
  address: CONTRACT_ADDRESS_BASE_SEPOLIA as `0x${string}`,
  abi: abi,
  client: {
    public: basePublicClient,
    wallet: baseWalletClient,
  },
});

async function main() {
  if (args.length !== 3) {
    return console.log("Provide the correct amount of arguments. (4)");
  }

  const sourceNet = args[0];
  const walletAddress = args[1];
  const amount = args[2];

  if (sourceNet === "sepolia") {
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return console.log("Invalid wallet address");
    }

    const burnSepoliaToken = await sepoliaTokenContract.write.burn([amount]);
    const readSepoliaNonce = await sepoliaTokenContract.read.nonce;
    const mintBaseSepoliaToken = await baseTokenContract.write.mint([
      walletAddress,
      amount,
      readSepoliaNonce,
    ]);
  } else if (sourceNet === "baseSepolia") {
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return console.log("Invalid wallet address");
    }

    const burnBaseSepoliaToken = await baseTokenContract.write.burn([amount]);
    const readBaseSepoliaNonce = await baseTokenContract.read.nonce;
    const mintSepoliaToken = await sepoliaTokenContract.write.mint([
      walletAddress,
      amount,
      readBaseSepoliaNonce,
    ]);
  } else {
    return console.log("Unsupported testnet provided.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
function elif() {
  throw new Error("Function not implemented.");
}
