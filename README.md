# OurBridge

## Contracts

- `NativeTokenClone.sol` - `mint` and `burn` functions
- `NativeTokenVault.sol` - `transfer` function

## Deploy Clone

In the `DeployClone.ts` file, change the `contractName` and `contractSymbol` to the desired name and symbol for the clone token.

```shell
npx ts-node --files ./scripts/DeployClone.ts
```

## Deploy Vault

```shell
npx ts-node --files ./scripts/DeployVault.ts
```
