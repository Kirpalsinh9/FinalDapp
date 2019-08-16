import React, { Component } from 'react';
import { ethers } from 'ethers';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';

const abi = require('../abi');

export default class Enterottery extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            Name: "",
            Age: "",
            Region: "",
            Amount: "",
            Error: "",
            getid: "",
            Message: "",
            loading: false

        }
        this.handlechange = this.handlechange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handlesubmit = async (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        let eth = window.ethereum;
        let playeraddress = await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();
        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        try {
            await contract.EnterLotteryById(this.state.id, this.state.Name, this.state.Age, this.state.Region, { value: ethers.utils.parseEther(this.state.Amount) });
            const db = firebase.firestore();
            db.collection("Players").add({
                id: this.state.id,
                Name: this.state.Name,
                address: playeraddress.toString(),
                Ethers: this.state.Amount
            })
            this.setState(
                {

                    id: "",
                    Name: "",
                    Age: "",
                    Region: "",
                    Amount: "",
                    Error: "",
                    Message: "You have successfully entered in lottery.",
                    loading: false
                }


            )
        } catch (error) {
            console.log(error.message);
            this.setState({
                Error: "Owner Can't bet or this lottery is closed."
            })
        }
        //console.log(txreceipt);
    }
    handleButton = async (e) => {
        e.preventDefault();

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        let newid = await contract.TotalLottery()
        this.setState({
            getid: newid.toString(),

        })
    }
    render() {
        const loading = this.state.loading
        return (
            <div >
                <h1> Bet in Existing Lottery</h1>
                <button onClick={this.handleButton} > Get LotteryId!!</button>
                {this.state.getid !== "" ? <p>Current Lottery is:{this.state.getid}</p> : ""}

                <form onSubmit={this.handlesubmit}  >
                    Enter LotteryID
                <input type="text" name="id" className="input" onChange={this.handlechange} value={this.state.id} />
                    <br />
                    Name
                <input type="text" name="Name" onChange={this.handlechange} value={this.state.Name} />
                    <br />
                    <br />
                    Age
                <input type="text" name="Age" onChange={this.handlechange} value={this.state.Age} />
                    <br />
                    <br />
                    Region
                <input type="text" name="Region" onChange={this.handlechange} value={this.state.Region} />
                    <br />
                    <br />
                    Amount In Ethers:
                <input type="text" name="Amount" className="input" onChange={this.handlechange} value={this.state.Amount} />
                    <br />
                    <br />
                    <button type="submit" disabled={loading}>
                        {this.state.loading === true ? <Loader
                            type="Puff"
                            color="white"
                            height="30"
                            width="30"
                        /> : ""}
                        BET!!!!</button>
                    <br />
                </form>
                {this.state.Message !== "" ? <p>{this.state.Message}</p> : ""}
                {this.state.Error !== "" ? <p>{this.state.Error}</p> : ""}
            </div>
        )
    }
}


