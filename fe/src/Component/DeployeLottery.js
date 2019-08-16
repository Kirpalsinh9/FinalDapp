import React, { Component } from 'react'
import { ethers } from 'ethers';
import '../index.css'
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
const abi = require('../abi');

export default class DeployeLottery extends Component {
    constructor() {
        super()
        this.state = {

            name: "",
            getid: "",
            Message: "",
            Error: "",
            openid: "",
            loading: false
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlestate = this.handlestate.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }
    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            //loading: true
        })
        let eth = window.ethereum;
        let add = await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();
        console.log(add.toString());
        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        await contract.NewLottery();



        const db = firebase.firestore();
        db.collection("lottery").add({
            owner: add.toString(),

            name: this.state.name
        })
        this.setState({
            name: "",
            loading: false
        })
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
            getid: newid.toString()
        })

    }
    handlestate = async (e) => {
        e.preventDefault();

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        try {
            await contract.OpenLotteryById(this.state.openid);
            this.setState({
                Message: "Lottery Is Opened.",
                Error: ""
            })
        } catch (error) {
            console.log(error.message);
            this.setState({
                Error: "Only Owner Can open it.",
                openid: ""
            })
        }
    }
    render() {
        const loading = this.state.loading
        return (
            <div>
                <h2>Deploye New Lottery</h2>
                <form>
                    <input type="text" name="name" onChange={this.handlechange} value={this.state.name} />
                    <br />
                    <button onClick={this.handleSubmit} disabled={loading}>{this.state.loading === true ? <Loader
                        type="Puff"
                        color="white"
                        height="30"
                        width="30"
                    /> : ""} Deploy!!!!! </button>

                </form>
                <br />
                <button onClick={this.handleButton}> Get Your New Deployed LotteryId!!</button>
                {this.state.getid !== "" ? <p>Current Lottery is:{this.state.getid}</p> : ""}

                <form onSubmit={this.handlestate}>
                    Enter Your Lottery ID:
                    <input type="text" name="openid" className="input" onChange={this.handlechange} value={this.state.openid} />
                    <br />
                    <button type="submit">Open Lottery!!!!!</button>
                </form>

                {this.state.Message !== "" ? <p>{this.state.Message}</p> : ""}
                {this.state.Error !== "" ? <p>{this.state.Error}</p> : ""}

            </div>
        )
    }
}
