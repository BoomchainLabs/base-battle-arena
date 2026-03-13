// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IArenaCoin {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface IArenaChampion {
    function ownerOf(uint256 tokenId) external view returns (address);
    function approve(address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract ArenaMarketplace {
    IArenaChampion public champions;
    IArenaCoin public arenaToken;

    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    uint256 public listingCounter;
    mapping(uint256 => Listing) public listings;

    constructor(address _champions, address _arenaToken) {
        champions = IArenaChampion(_champions);
        arenaToken = IArenaCoin(_arenaToken);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(champions.ownerOf(tokenId) == msg.sender, "Not your NFT");
        champions.approve(address(this), tokenId);

        listings[listingCounter] = Listing(msg.sender, tokenId, price, true);
        listingCounter++;
    }

    function buyNFT(uint256 listingId) external {
        Listing storage lst = listings[listingId];
        require(lst.active, "Listing inactive");

        arenaToken.transferFrom(msg.sender, lst.seller, lst.price);
        champions.transferFrom(lst.seller, msg.sender, lst.tokenId);

        lst.active = false;
    }
}
