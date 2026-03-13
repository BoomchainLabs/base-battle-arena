// PvE Battle contract
pragma solidity ^0.8.20;
import "./ArenaCoin.sol";
import "./ArenaChampion.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArenaBattle is Ownable {
    ArenaCoin public arenaCoin;
    ArenaChampion public arenaChampion;
    uint256 public entryFee = 10 * 10 ** 18;

    event BattleResult(address indexed player, uint256 reward, uint256 nftId, uint256 attack, uint256 defense, uint8 rarity);

    constructor(ArenaCoin _arenaCoin, ArenaChampion _arenaChampion) {
        arenaCoin = _arenaCoin;
        arenaChampion = _arenaChampion;
    }

    function enterBattle() external {
        require(arenaCoin.balanceOf(msg.sender) >= entryFee, "Not enough ARENA");
        arenaCoin.transferFrom(msg.sender, address(this), entryFee);

        uint256 nftId = arenaChampion.mint(msg.sender);
        ArenaChampion.Champion memory champ = arenaChampion.getChampion(nftId);

        uint256 reward = (champ.attack + champ.defense) * champ.rarity * 1e16;
        arenaCoin.transfer(msg.sender, reward);

        emit BattleResult(msg.sender, reward, nftId, champ.attack, champ.defense, champ.rarity);
    }

    function withdrawArena(uint256 amount) external onlyOwner {
        arenaCoin.transfer(msg.sender, amount);
    }

    function setEntryFee(uint256 fee) external onlyOwner {
        entryFee = fee;
    }
}
