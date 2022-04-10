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
  let deploymentFee = toWei((prices.length = 0.01));
  befroreEach(async () => {
    // get the contractFactory and signers here.
    const NFTMarketplaceFactory = await ethers.getContractFactory(
      "MusicNFTMarketplace"
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

  describe("Deployment", () => {
    it("should track name, symbol, URI", async () => {
      const nftName = "Sound";
      const nftSymbol = "SND";
      expect(await nftMarketplace.name()).to.equal(nftName);
      expect(await nftMarketplace.symbol()).to.equal(nftSymbol);
      expect(await nftMarketplace.baseURI()).to.equal(URI);
    });
  });
});
