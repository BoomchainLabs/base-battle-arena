import { ethers } from "ethers";

// --------------------
// Network
// --------------------
export const CHAIN_ID = 8453; // Base Mainnet

// --------------------
// Deployed Contracts
// --------------------
export const CONTRACTS = {
  ArenaCoin: "0xba384FAA696F8b39f43768422D35ff6dB1fdd704",
  ArenaChampion: "0x79287902E0A57f4Ea1b97CeCf56991Ee676A7Afa",
  ArenaBattle: "0x72b7AbF70d85Da44BBD1231813895f40672D872e",
  ArenaPvP: "0x75fc7a962de35aAD29084C1E2BB6571CD5F4a4FC",
  ArenaMarketplace: "0x47AeC6d95C194e53e71C786096EBDB77C53A7070",
};

// --------------------
// Minimal ABIs
// --------------------
export const ABIs = {
  ArenaCoin: [
    "function balanceOf(address) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
  ],
  ArenaChampion: [
    "function balanceOf(address) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function getChampion(uint256 tokenId) view returns (tuple(uint256 attack, uint256 defense, uint8 rarity))",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function approve(address to, uint256 tokenId)",
    "function getApproved(uint256 tokenId) view returns (address)",
  ],
  ArenaBattle: [
    "function enterBattle() external",
    "function entryFee() view returns (uint256)",
    "event BattleResult(address indexed player, uint256 reward, uint256 nftId, uint256 attack, uint256 defense, uint8 rarity)",
  ],
  ArenaPvP: [
    "function createChallenge(uint256 championId) external",
    "function acceptChallenge(uint256 challengeId, uint256 myChampionId) external",
    "function wagerAmount() view returns (uint256)",
    "function challenges(uint256) view returns (address challenger, uint256 challengerChampionId, bool active)",
    "event BattleResolved(uint256 indexed challengeId, address indexed winner, address indexed loser, uint256 prize)",
  ],
  ArenaMarketplace: [
    "function listNFT(uint256 tokenId, uint256 price) external",
    "function buyNFT(uint256 tokenId) external",
    "function listings(uint256) view returns (address seller, uint256 tokenId, uint256 price, bool active)",
  ],
};

// --------------------
// MetaMask Network Switch
// --------------------
export const switchNetwork = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ethers.toQuantity(CHAIN_ID) }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ethers.toQuantity(CHAIN_ID),
            chainName: "Base",
            rpcUrls: ["https://mainnet.base.org"],
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            blockExplorerUrls: ["https://basescan.org"],
          },
        ],
      });
    } else {
      throw error;
    }
  }
};
