const hre = require("hardhat");
require("dotenv").config();

// --------------------
// Replace these with your deployed contract addresses
// --------------------
const CONTRACT_ADDRESSES = {
  ArenaCoin: "0xba384FAA696F8b39f43768422D35ff6dB1fdd704",
  ArenaChampion: "0x79287902E0A57f4Ea1b97CeCf56991Ee676A7Afa",
  ArenaBattle: "0x72b7AbF70d85Da44BBD1231813895f40672D872e",
  ArenaPvP: "0x75fc7a962de35aAD29084C1E2BB6571CD5F4a4FC",
  ArenaMarketplace: "0x47AeC6d95C194e53e71C786096EBDB77C53A7070",
};

// --------------------
// Constructor arguments if any
// --------------------
// ArenaBattle: constructor(address _arenaCoin, address _arenaChampion)
// ArenaPvP: constructor(address _arenaChampion, address _arenaCoin)
// ArenaMarketplace: constructor(address _arenaChampion, address _arenaCoin)
const CONSTRUCTOR_ARGS = {
  ArenaBattle: [CONTRACT_ADDRESSES.ArenaCoin, CONTRACT_ADDRESSES.ArenaChampion],
  ArenaPvP: [CONTRACT_ADDRESSES.ArenaChampion, CONTRACT_ADDRESSES.ArenaCoin],
  ArenaMarketplace: [CONTRACT_ADDRESSES.ArenaChampion, CONTRACT_ADDRESSES.ArenaCoin],
};

async function verifyContract(name, address, args = []) {
  try {
    console.log(`\n🔹 Verifying ${name} at ${address}...`);
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
    console.log(`✅ ${name} verified successfully!`);
  } catch (error) {
    console.error(`❌ Failed to verify ${name}:`, error.message);
  }
}

async function main() {
  // Simple contracts without constructor args
  await verifyContract("ArenaCoin", CONTRACT_ADDRESSES.ArenaCoin);
  await verifyContract("ArenaChampion", CONTRACT_ADDRESSES.ArenaChampion);

  // Contracts with constructor args
  await verifyContract("ArenaBattle", CONTRACT_ADDRESSES.ArenaBattle, CONSTRUCTOR_ARGS.ArenaBattle);
  await verifyContract("ArenaPvP", CONTRACT_ADDRESSES.ArenaPvP, CONSTRUCTOR_ARGS.ArenaPvP);
  await verifyContract("ArenaMarketplace", CONTRACT_ADDRESSES.ArenaMarketplace, CONSTRUCTOR_ARGS.ArenaMarketplace);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
