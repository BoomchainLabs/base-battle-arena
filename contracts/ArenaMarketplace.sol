// NFT Marketplace
pragma solidity ^0.8.20;
import "./ArenaCoin.sol";
import "./ArenaChampion.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ArenaMarketplace is ReentrancyGuard {
    ArenaCoin public arenaCoin;
    ArenaChampion public arenaChampion;
    uint256 public listingFee = 1 * 1e18;

    struct Listing { address seller; uint256 tokenId; uint256 price; bool active; }
    mapping(uint256 => Listing) public listings;

    event Listed(address seller, uint256 tokenId, uint256 price);
    event Sold(address buyer, uint256 tokenId, uint256 price);

    constructor(ArenaCoin _arenaCoin, ArenaChampion _arenaChampion) {
        arenaCoin = _arenaCoin;
        arenaChampion = _arenaChampion;
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(arenaChampion.ownerOf(tokenId) == msg.sender, "Not owner");
        listings[tokenId] = Listing(msg.sender, tokenId, price, true);
        emit Listed(msg.sender, tokenId, price);
    }

    function buyNFT(uint256 tokenId) external nonReentrant {
        Listing memory listing = listings[tokenId];
        require(listing.active, "Not for sale");

        arenaCoin.transferFrom(msg.sender, listing.seller, listing.price);
        arenaChampion.transferFrom(listing.seller, msg.sender, tokenId);
        listings[tokenId].active = false;

        emit Sold(msg.sender, tokenId, listing.price);
    }

    function setListingFee(uint256 fee) external { listingFee = fee; }
}
