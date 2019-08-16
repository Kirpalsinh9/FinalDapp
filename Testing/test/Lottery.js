
const Lottery = require('Embark/contracts/Lottery');

let accounts;


config({

  contracts: {
    "Lottery": {
      args: []
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("Lottery", function () {
  this.timeout(0);
  it("Lottery was deployed", async function () {
    let address = Lottery.options.address
    assert.ok(address)
  });
  it("Try to bet when Open", async function () {

    let tx = await Lottery.methods.EnterLottery("First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 });

    assert.ok(tx);
  });

  it("Try to bet when Closed", async function () {
    await Lottery.methods.ToCloseLottery().send({ from: accounts[0] });
    try {
      await Lottery.methods.EnterLottery("First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 });
    } catch (error) {

      let a = error.message
      assert.ok(a.includes("State Should be Open"))
    }
  });
  it("Try to change state from another address", async function () {
    try {
      await Lottery.methods.ToOpenLottery().send({ from: accounts[1] });

    } catch (error) {
      let a = error.message
      assert.ok(a.includes("only the owner can call it"))
    }
    try {
      await Lottery.methods.ToCloseLottery().send({ from: accounts[2] });

    } catch (error) {

      let actuallerror = error.message;
      assert.ok(actuallerror.includes("only the owner can call it"))
    }
  });

  it("Try to run Pickwinner", async function () {
    await Lottery.methods.ToOpenLottery().send({ from: accounts[0] });
    await Lottery.methods.EnterLottery("First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 });
    await Lottery.methods.EnterLottery("Second", 11, "ON").send({ from: accounts[1], value: 40000000000000000 });
    await Lottery.methods.ToCloseLottery().send({ from: accounts[0] });
    let tx = await Lottery.methods.PickWinner().send({ from: accounts[0] });
    assert.ok(tx);
  })
  // it("Try to run Pickwinner when State is Open", async function () {
  //   await Lottery.methods.ToOpenLottery().send({ from: accounts[0] });
  //   await Lottery.methods.EnterLottery("First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 });
  //   await Lottery.methods.EnterLottery("Second", 11, "ON").send({ from: accounts[1], value: 40000000000000000 });
  //   try {
  //     Lottery.methods.PickWinner().send({ from: accounts[0] });
  //   } catch (error) {
  //     let actuallerror = error.message;
  //     assert.ok(actuallerror.includes("State should be closed"))
  //   }
  // })
  it("Try to run Pickwinner from another address", async function () {
    await Lottery.methods.ToOpenLottery().send({ from: accounts[0] });
    await Lottery.methods.EnterLottery("First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 });
    await Lottery.methods.EnterLottery("Second", 11, "ON").send({ from: accounts[1], value: 40000000000000000 });
    await Lottery.methods.ToCloseLottery().send({ from: accounts[0] });
    try {
      await Lottery.methods.PickWinner().send({ from: accounts[4] });
    } catch (error) {
      let actuallerror = error.message;
      assert.ok(actuallerror.includes("only the owner can call it"))
    }
  })
});



