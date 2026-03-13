import { ethers } from "ethers";
import { CONTRACTS, ABIs, switchNetwork } from "./config";

let signer: ethers.Signer;
let contracts: {
  arenaCoin: ethers.Contract;
  arenaChampion: ethers.Contract;
  arenaBattle: ethers.Contract;
  arenaPvP: ethers.Contract;
  arenaMarketplace: ethers.Contract;
};

// --------------------
// Wallet Connection
// --------------------
export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found!");
    return;
  }

  await switchNetwork();
  const provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  console.log("Wallet connected:", await signer.getAddress());

  // Initialize contracts
  contracts = {
    arenaCoin: new ethers.Contract(CONTRACTS.ArenaCoin, ABIs.ArenaCoin, signer),
    arenaChampion: new ethers.Contract(CONTRACTS.ArenaChampion, ABIs.ArenaChampion, signer),
    arenaBattle: new ethers.Contract(CONTRACTS.ArenaBattle, ABIs.ArenaBattle, signer),
    arenaPvP: new ethers.Contract(CONTRACTS.ArenaPvP, ABIs.ArenaPvP, signer),
    arenaMarketplace: new ethers.Contract(CONTRACTS.ArenaMarketplace, ABIs.ArenaMarketplace, signer),
  };

  listenToEvents();
}

// --------------------
// PvE Battle
// --------------------
export async function enterPvEBattle() {
  try {
    const entryFee: bigint = await contracts.arenaBattle.entryFee();
    const balance: bigint = await contracts.arenaCoin.balanceOf(await signer.getAddress());
    if (balance < entryFee) {
      alert("Not enough ARENA tokens for entry!");
      return;
    }

    const tx = await contracts.arenaBattle.enterBattle();
    await tx.wait();
    alert("PvE battle completed! Check console for results.");
  } catch (err) {
    console.error("PvE Battle error:", err);
  }
}

// --------------------
// PvP Battles
// --------------------
export async function createChallenge(myChampionId: number) {
  try {
    const tx = await contracts.arenaPvP.createChallenge(myChampionId);
    await tx.wait();
    alert(`Challenge created with NFT ID ${myChampionId}`);
  } catch (err) {
    console.error("Create Challenge error:", err);
  }
}

export async function acceptChallenge(challengeId: number, myChampionId: number) {
  try {
    const tx = await contracts.arenaPvP.acceptChallenge(challengeId, myChampionId);
    await tx.wait();
    alert(`Accepted challenge ${challengeId} with NFT ID ${myChampionId}`);
  } catch (err) {
    console.error("Accept Challenge error:", err);
  }
}

// --------------------
// Marketplace
// --------------------
export async function listNFT(tokenId: number, price: string) {
  try {
    const priceWei = ethers.parseEther(price);
    const tx = await contracts.arenaMarketplace.listNFT(tokenId, priceWei);
    await tx.wait();
    alert(`NFT ${tokenId} listed for ${price} ARENA`);
  } catch (err) {
    console.error("Marketplace list error:", err);
  }
}

export async function buyNFT(tokenId: number) {
  try {
    const tx = await contracts.arenaMarketplace.buyNFT(tokenId);
    await tx.wait();
    alert(`NFT ${tokenId} purchased successfully!`);
  } catch (err) {
    console.error("Marketplace buy error:", err);
  }
}

// --------------------
// Event Listeners
// --------------------
function listenToEvents() {
  contracts.arenaBattle.on(
    "BattleResult",
    (player, reward, nftId, attack, defense, rarity) => {
      console.log(`PvE Battle Result:
        Player: ${player}
        Reward: ${ethers.formatUnits(reward, 18)} ARENA
        NFT ID: ${nftId}
        Attack: ${attack}
        Defense: ${defense}
        Rarity: ${rarity}`);
    }
  );

  contracts.arenaPvP.on(
    "BattleResolved",
    (challengeId, winner, loser, prize) => {
      console.log(`PvP Battle Resolved:
        Challenge ID: ${challengeId}
        Winner: ${winner}
        Loser: ${loser}
        Prize: ${ethers.formatUnits(prize, 18)} ARENA`);
    }
  );
}

// --------------------
// Utility
// --------------------
export async function getArenaBalance() {
  const balance: bigint = await contracts.arenaCoin.balanceOf(await signer.getAddress());
  console.log(`Your ARENA Balance: ${ethers.formatUnits(balance, 18)}`);
  return balance;
}

export async function getOwnedNFTs() {
  const count: bigint = await contracts.arenaChampion.balanceOf(await signer.getAddress());
  const nfts = [];
  for (let i = 0; i < Number(count); i++) {
    const tokenId = await contracts.arenaChampion.tokenOfOwnerByIndex(await signer.getAddress(), i);
    const champ = await contracts.arenaChampion.getChampion(tokenId);
    nfts.push({ tokenId, ...champ });
  }
  console.log("Owned NFTs:", nfts);
  return nfts;
}
