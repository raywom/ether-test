import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

describe("Unit tests", function () {
  it("Deploying", async function () {
    const Charity = await ethers.getContractFactory("Charity");
    const charity = await Charity.deploy();
    await charity.deployed();
    const [accountOne, accountTwo] = await ethers.getSigners();
  });

  it("Charity withdraw from address", async function () {
    const Charity = await ethers.getContractFactory("Charity");
    const charity = await Charity.deploy();
    await charity.deployed();
    const [accountOne, accountTwo, accountThree] = await ethers.getSigners();

    await accountOne.sendTransaction({
      to: charity.address,
      value: ethers.utils.parseEther("1"),
    });
    await accountTwo.sendTransaction({
      to: charity.address,
      value: ethers.utils.parseEther("4"),
    });
    await accountTwo.sendTransaction({
      to: charity.address,
      value: ethers.utils.parseEther("8"),
    });

    await charity.withdraw(await accountThree.getAddress());
  });

  it("Check contributors", async function () {
    const Charity = await ethers.getContractFactory("Charity");
    const charity = await Charity.deploy();
    await charity.deployed();
    const [accountOne, accountTwo, accountThree] = await ethers.getSigners();

    await accountOne.sendTransaction({
      to: charity.address,
      value: ethers.utils.parseEther("1"),
    });
    await accountTwo.sendTransaction({
      to: charity.address,
      value: ethers.utils.parseEther("4"),
    });
    await accountThree.sendTransaction({
      to: charity.address,
      value: ethers.utils.parseEther("12"),
    });

    expect(await charity.getContributors()).to.deep.equal([
      await accountOne.getAddress(),
      await accountTwo.getAddress(),
      await accountThree.getAddress(),
    ]);
  });
});