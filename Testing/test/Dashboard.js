const Dashboard = require('Embark/contracts/Dashboard');


let accounts;


config({
    //deployment: {
    //  accounts: [
    //    // you can configure custom accounts with a custom balance
    //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
    //  ]
    //},
    contracts: {
        "Dashboard": {

            args: ['$Factory']
        },
        "Factory": {
            args: []
        }

    }
}, (_err, web3_accounts) => {
    accounts = web3_accounts
});
contract("Dashboard", function () {
    this.timeout(0)
    it("Dashboard was deployed", async function () {
        let address = await Dashboard.options.address

        assert.ok(address)
    });
    it("Check NewLottery", async function () {
        let txreceipt = await Dashboard.methods.NewLottery().send()
        assert.ok(txreceipt);
    })
    it("TotalLottery", async function () {
        //Dashboard.methods.NewLottery().send()
        let txreceipt = await Dashboard.methods.TotalLottery().send()
        assert.ok(txreceipt);
    })
    it("OpenLottery By ID", async function () {
        let txreceipt = await Dashboard.methods.OpenLotteryById(1).send()
        assert.ok(txreceipt);
    })
    it("Close Lottery By ID", async function () {
        let txreceipt = await Dashboard.methods.CloseLotteryById(1).send()
        assert.ok(txreceipt);
    })
    it("Enter Lotttery By ID", async function () {
        await Dashboard.methods.OpenLotteryById(1).send()
        let txreceipt = await Dashboard.methods.EnterLotteryById(1, "First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 })
        assert.ok(txreceipt)
    })
    it("PickWinner By Id", async function () {
        await Dashboard.methods.OpenLotteryById(1).send()
        await Dashboard.methods.EnterLotteryById(1, "First", 11, "ON").send({ from: accounts[1], value: 20000000000000000 })
        await Dashboard.methods.EnterLotteryById(1, "Second", 11, "ON").send({ from: accounts[2], value: 20000000000000000 })
        await Dashboard.methods.CloseLotteryById(1).send()
        let txreceipt = await Dashboard.methods.PickWinnerById(1).send()
        assert.ok(txreceipt)
    })
    it("ShowWinner Function", async function () {
        let txreceipt = await Dashboard.methods.Showwinner().send()
        assert.ok(txreceipt)
    })
})