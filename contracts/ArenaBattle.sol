// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

struct Champion {
    uint256 attack;
    uint256 defense;
    uint8 rarity;
}

interface IArenaCoin {
    function balanceOf(address owner) external view returns (uint256);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

interface IArenaChampion {
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);
    function getChampion(uint256 tokenId) external view returns (Champion memory);
}

contract ArenaBattle {
    IArenaCoin public arenaToken;
    IArenaChampion public champions;
    uint256 public entryFee = 10 * 10 ** 18;

    event BattleResult(address indexed player, uint256 reward, uint256 nftId, uint256 attack, uint256 defense, uint8 rarity);

    constructor(address _arenaToken, address _champions) {
        arenaToken = IArenaCoin(_arenaToken);
        champions = IArenaChampion(_champions);
    }

    function enterBattle() external {
        require(arenaToken.balanceOf(msg.sender) >= entryFee, "Insufficient ARENA");
        arenaToken.transferFrom(msg.sender, address(this), entryFee);

        uint256 reward = entryFee * 2;
        uint256 nftId = champions.tokenOfOwnerByIndex(msg.sender, 0);
        (Champion memory champ) = champions.getChampion(nftId);

        arenaToken.transfer(msg.sender, reward);
        emit BattleResult(msg.sender, reward, nftId, champ.attack, champ.defense, champ.rarity);
    }
}
