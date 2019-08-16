import React, { Component } from 'react'
import { ethers } from 'ethers';
import Loader from 'react-loader-spinner';
import firebase from 'firebase';

const abi = require('../abi');

export default class PickWinner extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            Name: "",
            Error: "",
            winner: "",
            loading: false,
            loading2: false
        }
        this.handlechange = this.handlechange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.handleButton2 = this.handleButton2.bind(this)
    }
    handlechange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handlesubmit = async (e) => {
        e.preventDefault();
        this.setState({
            // loading: true
        })
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        try {
            let txreceipt = await contract.CloseLotteryById(this.state.id);

            console.log(txreceipt);
            //let newwinner = await contract.Showwinner();
            this.setState(
                {

                    Error: "",
                    loading: false
                }

            )
        } catch (error) {
            console.log(error.message);
            this.setState({
                Error: "Only Owner Can pick winner."
            })
        };


    }
    handleButton2 = async (e) => {
        e.preventDefault();
        this.setState({
            loading2: true
        })
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        let txreceiptforpickwinner = await contract.PickWinnerById(this.state.id);
        this.setState(
            {
                id: "",
                loading2: false
            }

        )
    }
    handleButton = async (e) => {
        e.preventDefault();

        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();

        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        let newwinner = await contract.Showwinner();
        this.setState(
            {
                winner: newwinner,

            }

        )
        const db = firebase.firestore();
        db.collection("Winner").add({
            LotteryName: this.state.Name,
            Winner: this.state.winner
        })
        this.setState({
            Name: ""
        })
    }

    render() {
        const loading = this.state.loading
        const loading2 = this.state.loading2
        return (
            <div>
                <h3>Choose Winner</h3>
                <form onSubmit={this.handlesubmit}>
                    ID:
                <input type="text" name="id" onChange={this.handlechange} value={this.state.id} />
                    <br />
                    Name:
                    <input type="text" name="Name" onChange={this.handlechange} value={this.state.Name} />
                    <br />
                    <button type="submit" disabled={loading}>{this.state.loading === true ? <Loader
                        type="Puff"
                        color="white"
                        height="30"
                        width="30"
                    /> : ""}Close Lottery!!!!</button>
                </form>
                <button onClick={this.handleButton2} disabled={loading2}>{this.state.loading2 === true ? <Loader
                    type="Puff"
                    color="white"
                    height="30"
                    width="30"
                /> : ""} Pick Winner!!</button>
                <button onClick={this.handleButton}> Get Winner!!</button>
                {this.state.winner !== "" ? <p>Winner is:{this.state.winner}</p> : ""}
                {this.state.Error !== "" ? <p>{this.state.Error}</p> : ""}
            </div>
        )
    }
}
