// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

struct Champion {
    uint256 attack;
    uint256 defense;
    uint8 rarity;
}

contract ArenaChampion {
    string public name = "ArenaChampion";
    string public symbol = "CHAMP";
    uint256 public nextTokenId;

    mapping(uint256 => address) private _owners;
    mapping(uint256 => Champion) public champions;
    mapping(uint256 => address) private _tokenApprovals;

    function mintChampion(address to, uint256 attack, uint256 defense, uint8 rarity) external {
        uint256 tokenId = nextTokenId++;
        _owners[tokenId] = to;
        champions[tokenId] = Champion(attack, defense, rarity);
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }

    function getChampion(uint256 tokenId) external view returns (Champion memory) {
        return champions[tokenId];
    }

    function approve(address to, uint256 tokenId) external {
        require(msg.sender == _owners[tokenId], "Not owner");
        _tokenApprovals[tokenId] = to;
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        require(msg.sender == _owners[tokenId] || msg.sender == _tokenApprovals[tokenId], "Not authorized");
        _owners[tokenId] = to;
        _tokenApprovals[tokenId] = address(0);
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256) {
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (_owners[i] == owner) {
                if (index == 0) return i;
                else index--;
            }
        }
        revert("Owner index out of bounds");
    }
}
