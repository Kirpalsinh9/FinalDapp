const Factory = require('Embark/contracts/Factory');
let accounts;


config({

    contracts: {
        Factory: {
            args: []
        }
    }
}, (_err, web3_accounts) => {
    accounts = web3_accounts
});

contract("Factory", function () {
    this.timeout(0);
    it("Factory was deployed", async function () {
        let result = Factory.options.address
        //console.log("The adress  of factory is ",address)
        assert.ok(result)
    });
    it("Check deployLottery", async function () {
        let txreceipt = await Factory.methods.DeployLottery().send()
        assert.ok(txreceipt)

    });
    it("check LotteryByID", async function () {
        await Factory.methods.DeployLottery().send()
        let txreceipt = await Factory.methods.getlotteryById(1).call()
        assert.ok(txreceipt)
    });


})