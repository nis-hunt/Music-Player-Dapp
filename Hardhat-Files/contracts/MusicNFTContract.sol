// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicNFTContract is ERC721("Sound", "SND"), Ownable {
    string public baseURI="https://bafybeihqu5wjtxhqfuj6tgvsrjbxrp6t25qrt7t3enqqu75uv4hhwqxo54.ipfs.nftstorage.link/";
    string public baseExtension = ".json";
    address public artist;
    uint public royaltyFee;

    struct MarketItem{
        uint tokenId;
        address payable seller;
        uint price;
    }
    MarketItem[] public marketItems;
    constructor(
        uint _royaltyFee,
        address _artist,
        uint[] memory _prices
    )payable{
        require(
            _prices.length*_royaltyFee<= msg.value,
            "Sent ethers are less that the total royaltyFee"
        );
        royaltyFee = _royaltyFee;
        artist = _artist;
        for (uint8 i = 0; i<_prices.length; i++){
            require(_prices[i]>0, "Price must be greater than 0");
            _mint(address(this), i);
            marketItems.push(MarketItem(i, payable(msg.sender), _prices[i]));
        }
    }

    }
