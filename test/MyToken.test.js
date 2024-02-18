const CustomToken = artifacts.require("CustomToken");

contract("CustomToken", (accounts) => {
  let customToken;

  beforeEach(async () => {
    customToken = await CustomToken.new("MyToken", "MTK", 1000, 10000, accounts[0]);
  });

  it("should have correct name, symbol, and total supply", async () => {
    const name = await customToken.name();
    const symbol = await customToken.symbol();
    const totalSupply = await customToken.totalSupply();

    assert.equal(name, "MyToken", "Incorrect name");
    assert.equal(symbol, "MTK", "Incorrect symbol");
    assert.equal(totalSupply.toString(), "1000", "Incorrect total supply");
  });

  it("should mint tokens to the owner", async () => {
    const ownerBalance = await customToken.balanceOf(accounts[0]);
    assert.equal(ownerBalance.toString(), "1000", "Owner balance incorrect");
  });

  it("should transfer tokens between accounts", async () => {
    await customToken.transfer(accounts[1], 100, { from: accounts[0] });
    const recipientBalance = await customToken.balanceOf(accounts[1]);
    assert.equal(recipientBalance.toString(), "100", "Recipient balance incorrect");

    const senderBalance = await customToken.balanceOf(accounts[0]);
    assert.equal(senderBalance.toString(), "900", "Sender balance incorrect");
  });
});
