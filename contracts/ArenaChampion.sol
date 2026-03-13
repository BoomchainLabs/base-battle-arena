// ERC-721 NFT with unique stats and rarity
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArenaChampion is ERC721Enumerable, Ownable {
    struct Champion {
        uint256 attack;
        uint256 defense;
        uint8 rarity;
    }
    mapping(uint256 => Champion) public champions;
    uint256 public nextId = 1;

    constructor() ERC721("ArenaChampion", "ACHAMP") {}

    function mint(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = nextId;
        _mint(to, tokenId);

        uint256 attack = (uint256(keccak256(abi.encodePacked(block.timestamp, tokenId))) % 50) + 50;
        uint256 defense = (uint256(keccak256(abi.encodePacked(block.difficulty, tokenId))) % 50) + 50;

        uint8 rarity;
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId))) % 100;
        if(rand < 50) rarity = 1;
        else if(rand < 75) rarity = 2;
        else if(rand < 90) rarity = 3;
        else rarity = 4;

        champions[tokenId] = Champion(attack, defense, rarity);
        nextId += 1;
        return tokenId;
    }

    function getChampion(uint256 tokenId) external view returns (Champion memory) {
        return champions[tokenId];
    }
}
