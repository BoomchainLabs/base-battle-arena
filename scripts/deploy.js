require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const ArenaCoin = await ethers.getContractFactory("ArenaCoin");
  const arenaCoin = await ArenaCoin.deploy();
  await arenaCoin.deployed();

  const ArenaChampion = await ethers.getContractFactory("ArenaChampion");
  const arenaChampion = await ArenaChampion.deploy();
  await arenaChampion.deployed();

  const ArenaBattle = await ethers.getContractFactory("ArenaBattle");
  const arenaBattle = await ArenaBattle.deploy(arenaCoin.address, arenaChampion.address);
  await arenaBattle.deployed();

  const ArenaPvP = await ethers.getContractFactory("ArenaPvP");
  const arenaPvP = await ArenaPvP.deploy(arenaCoin.address, arenaChampion.address);
  await arenaPvP.deployed();

  const ArenaMarketplace = await ethers.getContractFactory("ArenaMarketplace");
  const arenaMarketplace = await ArenaMarketplace.deploy(arenaCoin.address, arenaChampion.address);
  await arenaMarketplace.deployed();

  console.log("ArenaCoin:", arenaCoin.address);
  console.log("ArenaChampion:", arenaChampion.address);
  console.log("ArenaBattle:", arenaBattle.address);
  console.log("ArenaPvP:", arenaPvP.address);
  console.log("ArenaMarketplace:", arenaMarketplace.address);
}

main().catch(e => { console.error(e); process.exit(1); });
