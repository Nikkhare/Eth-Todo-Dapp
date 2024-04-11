# Todo List ETH-Solidity

## Technology Stack & Tools

- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io) (Blockchain Interaction)
- Solidity (Writing Smart Contracts)
- Javascript (React)
- [React.js](https://reactjs.org/) (Frontend Framework)
- [Ganache](https://archive.trufflesuite.com/ganache/) (A personal Ethereum blockchain)
- [Metamask](https://metamask.io/) (A Google CHrome extension, allow to manage personal account and crypto-wallet to pay for transaction.)

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/)

## Deployment 
```bash
# Clone 
$ https://github.com/Nikkhare/Eth-Todo-Dapp.git

# Install dependencies 
$ npm install
$ npm install -g hardhat

# Deploy smart  contract to the local network using Hardhat
$ npx hardhat run --network ganache scripts/deploy.js 

# Run the app
$ npm run start
```