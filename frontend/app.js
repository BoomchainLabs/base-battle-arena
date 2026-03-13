const arenaCoinAddress = "PASTE_ARENACOIN_ADDRESS_HERE";
const arenaBattleAddress = "PASTE_ARENABATTLE_ADDRESS_HERE";
const arenaPvPAddress = "PASTE_ARENAPVP_ADDRESS_HERE";
const arenaMarketplaceAddress = "PASTE_MARKETPLACE_ADDRESS_HERE";

const arenaCoinABI = ["function balanceOf(address) view returns (uint256)"];
const arenaBattleABI = ["function enterBattle() external", "event BattleResult(address indexed player, uint256 reward, uint256 nftId, uint256 attack, uint256 defense, uint8 rarity)"];
const arenaPvPABI = ["function battle(address,uint256,uint256) external", "event PvPBattle(address indexed player1, uint256 nft1, address indexed player2, uint256 nft2, address winner, uint256 reward)"];
const arenaMarketplaceABI = ["function listNFT(uint256,uint256) external", "function buyNFT(uint256) external"];

let provider, signer;

// Wallet
document.getElementById("connect").onclick = async () => {
    if(!window.ethereum) return alert("Install MetaMask!");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    alert("Wallet connected!");
};

// Check ARENA balance
document.getElementById("balance").onclick = async () => {
    const contract = new ethers.Contract(arenaCoinAddress, arenaCoinABI, signer);
    const balance = await contract.balanceOf(await signer.getAddress());
    alert(`ARENA Balance: ${ethers.formatUnits(balance, 18)}`);
};

// PvE Battle
document.getElementById("battle").onclick = async () => {
    const contract = new ethers.Contract(arenaBattleAddress, arenaBattleABI, signer);
    const tx = await contract.enterBattle();
    await tx.wait();
    alert("PvE battle complete! Check console for NFT stats.");
};

// PvP Battle
document.getElementById("pvpBattle").onclick = async () => {
    const myNFT = document.getElementById("myNFT").value;
    const opponentNFT = document.getElementById("opponentNFT").value;
    const opponentAddr = document.getElementById("opponentAddr").value;
    const contract = new ethers.Contract(arenaPvPAddress, arenaPvPABI, signer);
    const tx = await contract.battle(opponentAddr, myNFT, opponentNFT);
    await tx.wait();
    alert("PvP battle complete! Check console for winner.");
};

// Marketplace
document.getElementById("listBtn").onclick = async () => {
    const nftId = document.getElementById("listNFT").value;
    const price = ethers.parseUnits(document.getElementById("listPrice").value, 18);
    const contract = new ethers.Contract(arenaMarketplaceAddress, arenaMarketplaceABI, signer);
    await contract.listNFT(nftId, price);
    alert("NFT listed for sale!");
};

document.getElementById("buyBtn").onclick = async () => {
    const nftId = document.getElementById("buyNFTId").value;
    const contract = new ethers.Contract(arenaMarketplaceAddress, arenaMarketplaceABI, signer);
    await contract.buyNFT(nftId);
    alert("NFT purchased!");
};
