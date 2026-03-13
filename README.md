# Base Battle Arena

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Base Battle Arena** is a blockchain-based **play-to-earn strategy game** on the [Base](https://base.org/) network. Players can mint **ArenaChampion NFTs**, fight **PvE and PvP battles**, earn **ArenaCoin (ERC-20)** tokens, trade NFTs on a marketplace, and track leaderboards and tournament stats.

---

## 🏆 Features

- **ERC-20 In-Game Currency:** ArenaCoin with mint, burn, and pause functionality.  
- **ERC-721 NFT Champions:** ArenaChampion NFTs with unique stats: **attack, defense, rarity**.  
- **PvE Battles:** Fight AI-controlled battles to mint NFTs and earn rewards.  
- **PvP Battles:** Battle other players’ NFTs; winner takes rewards.  
- **Marketplace:** Buy and sell NFTs using ArenaCoin.  
- **Leaderboards & Tournaments:** Track wins, losses, and top players.

---

## 📂 Project Structure
base-battle-arena/
├─ contracts/            # Smart contracts
├─ scripts/              # Deployment scripts
├─ frontend/             # HTML + JS frontend
├─ hardhat.config.js     # Hardhat config
├─ package.json          # Node.js dependencies
└─ .env.example          # Environment variables template

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/BoomchainLabs/base-battle-arena.git
cd base-battle-arena

Install dependencies
npm install

Configure environment
	•	Rename .env.example to .env
	•	Add your wallet private key and Base RPC URL:
PRIVATE_KEY=your_wallet_private_key
BASE_RPC=https://base-goerli.publicnode.com

Compile contracts
npx hardhat compile

Deploy contracts
npx hardhat run scripts/deploy.js --network base

	•	Copy the deployed contract addresses and paste them into frontend/app.js.

6. Open frontend
	•	Open frontend/index.html in a browser with MetaMask connected to Base network.

⸻

🎮 How to Play
	1.	Connect Wallet: Click “Connect Wallet” in the frontend.
	2.	Check ARENA Balance: Click “Check ARENA Balance”.
	3.	PvE Battle: Click “Enter PvE Battle” to mint a new NFT and earn rewards.
	4.	PvP Battle: Enter your NFT ID, opponent NFT ID, and opponent address, then click “Start PvP Battle”.
	5.	Marketplace: List NFTs for sale or buy NFTs from other players using ArenaCoin.

⸻

🛠 Tech Stack
	•	Solidity 0.8.20 – Smart contracts
	•	OpenZeppelin Contracts – ERC-20/ERC-721 standards
	•	Hardhat – Development & deployment
	•	Ethers.js – Frontend blockchain interactions
	•	HTML + JS – Simple user interface

⸻

🔮 Future Improvements
	•	Tournament system with weekly rewards
	•	NFT leveling and upgrades
	•	PvP matchmaking and ranking
	•	Frontend upgrade using React or Next.js
	•	IPFS storage for NFT metadata

⸻

📜 License

This project is licensed under the MIT License – see the LICENSE￼ file for details.

⸻

🚀 Acknowledgements
	•	OpenZeppelin￼ – Smart contract libraries
	•	Base￼ – Blockchain platform
	•	Inspired by play-to-earn and NFT strategy games
