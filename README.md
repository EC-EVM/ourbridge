# OurBridge

# Deploy token to Sepolia
npx ts-node --files ./scripts/DeployBridgeableToken.ts TestToken TT eth
# BridgeableToken contract deployed to: 0xd19e8d3a9720df22f6689eb9b54c691414efe8c

# Deploy token to Base Sepolia
npx ts-node --files ./scripts/DeployBridgeableToken.ts TestToken TT base
# BridgeableToken contract deployed to: 0xd19e8d3a9720df22f6689eb9b54c691414efe8c2

# Mint tokens on Sepolia 
npx ts-node --files ./scripts/MintTokens.ts 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 0x61DD404C7AFDEEc54AC246c1e1d92B23D1b9f594 1000 eth

# Check token status on Sepolia
npx ts-node --files ./scripts/TokenStatus.ts 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 0x61DD404C7AFDEEc54AC246c1e1d92B23D1b9f594 eth

# Mint tokens on Base Sepolia
npx ts-node --files ./scripts/MintTokens.ts 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 0x61DD404C7AFDEEc54AC246c1e1d92B23D1b9f594 1000 base

# Check token status on Base Sepolia
npx ts-node --files ./scripts/TokenStatus.ts 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 0x61DD404C7AFDEEc54AC246c1e1d92B23D1b9f594 base

# Watch for bridges on Sepolia
npx ts-node --files ./scripts/WatchForBridges.ts eth 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 base 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2

# Watch for bridges on Base Sepolia
npx ts-node --files ./scripts/WatchForBridges.ts base 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 eth 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2

# Bridge tokens from Sepolia
npx ts-node --files ./scripts/BridgeTokens.ts 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 1 eth

# Bridge tokens on Base Sepolia
npx ts-node --files ./scripts/BridgeTokens.ts 0xD19e8d3a9720df22F6689EB9B54C691414efE8C2 1 base
https://sepolia.etherscan.io/address/0xd19e8d3a9720df22f6689eb9b54c691414efe8c2
https://base-sepolia.blockscout.com/address/0xD19e8d3a9720df22F6689EB9B54C691414efE8C2
