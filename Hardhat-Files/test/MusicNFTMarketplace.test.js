const { expect } = require("chai");
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num.toString());
describe("MusicNFTMarketplace", () => {
  let MusicNFTMarketplacelet;
  let deployer, artist, user1, user2, users;
  let royaltyFee = toWei(0.01);
  let URI =
    "https://bafybeihqu5wjtxhqfuj6tgvsrjbxrp6t25qrt7t3enqqu75uv4hhwqxo54.ipfs.nftstorage.link/";
  let prices = [toWei(1), toWei(2), toWei(3)];
  let deploymentFee = toWei(prices.length * 0.01);

  /*
  ___            _
 ( / \          //                          _/_
  /  /_   ,_   // __ __  , _ _ _   _  _ _   /  
(/\_/(/__/|_)_(/_(_)/ (_/_/ / / /_(/_/ / /_(__ 
         /|            /                       
        (/            '
*/

  beforeEach(async () => {
    // get the contractFactory and signers here.
    const NFTMarketplaceFactory = await ethers.getContractFactory(
      "MusicNFTContract"
    );
    [deployer, artist, user1, user2, ...users] = await ethers.getSigners();

    // Deployment of the contract
    nftMarketplace = await NFTMarketplaceFactory.deploy(
      royaltyFee,
      artist.address,
      prices,
      { value: deploymentFee }
    );
  });

  //  Test the state variables after deployment
  describe("Deployment", () => {
    it("should track name, symbol, URI", async () => {
      const nftName = "Sound";
      const nftSymbol = "SND";
      expect(await nftMarketplace.name()).to.equal(nftName);
      expect(await nftMarketplace.symbol()).to.equal(nftSymbol);
      expect(await nftMarketplace.baseURI()).to.equal(URI);
    });
  });

  it("should mint then list all the music nfts", async () => {
    // balanceOf is a function inside of an ERC725 contract that returns the amount of that ERC725
    // token the address passed in the  argument has
    expect(await nftMarketplace.balanceOf(nftMarketplace.address)).to.equal(3);
    await Promise.all(
      prices.map(async (i, index) => {
        const item = await nftMarketplace.marketItems(index);
        expect(item.tokenId).to.equal(index);
        expect(item.seller).to.equal(deployer.address);
        expect(item.price).to.equal(i);
      })
    );
  });
  it("Ether balance should be equal deployment fees", async () => {
    expect(await ethers.provider.getBalance(nftMarketplace.address)).to.equal(
      deploymentFee
    );
  });
});
