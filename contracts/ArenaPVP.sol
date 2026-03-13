// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IArenaCoin {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

interface IArenaChampion {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract ArenaPvP {
    IArenaChampion public champions;
    IArenaCoin public arenaToken;
    uint256 public challengeCounter;
    uint256 public wagerAmount = 10 * 10 ** 18;

    struct Challenge {
        address challenger;
        uint256 challengerChampionId;
        bool active;
    }

    mapping(uint256 => Challenge) public challenges;

    event BattleResolved(uint256 indexed challengeId, address indexed winner, address indexed loser, uint256 prize);

    constructor(address _champions, address _arenaToken) {
        champions = IArenaChampion(_champions);
        arenaToken = IArenaCoin(_arenaToken);
    }

    function createChallenge(uint256 championId) external {
        require(champions.ownerOf(championId) == msg.sender, "Not your champion");
        arenaToken.transferFrom(msg.sender, address(this), wagerAmount);

        challenges[challengeCounter] = Challenge(msg.sender, championId, true);
        challengeCounter++;
    }

    function acceptChallenge(uint256 challengeId, uint256 myChampionId) external {
        Challenge storage chal = challenges[challengeId];
        require(chal.active, "Challenge inactive");

        arenaToken.transferFrom(msg.sender, address(this), wagerAmount);

        address winner;
        address loser;
        if (block.timestamp % 2 == 0) {
            winner = chal.challenger;
            loser = msg.sender;
        } else {
            winner = msg.sender;
            loser = chal.challenger;
        }

        uint256 prize = wagerAmount * 2;
        arenaToken.transfer(winner, prize);

        chal.active = false;
        emit BattleResolved(challengeId, winner, loser, prize);
    }
}
