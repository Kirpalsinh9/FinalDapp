import React, { Component } from 'react'
import { ethers } from 'ethers';
const abi = require('../abi');

export default class PickWinner extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            Error: "",
            winner: ""
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
        let eth = window.ethereum;
        await eth.enable()
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();


        let address = '0x53d31e46faa0f7203d3c5a237dd6305020e4e120'
        let contract = new ethers.Contract(address, abi, signer);
        try {
            await contract.CloseLotteryById(this.state.id);
            await contract.PickWinnerById(this.state.id);
            let newwinner = await contract.Showwinner();
            this.setState(
                {
                    id: "",
                    Error: "",
                    winner: newwinner
                }

            )
        } catch (error) {
            console.log(error.message);
            this.setState({
                Error: "Only Owner Can pick winner."
            })
        };

    }

    render() {
        return (
            <div>
                <h3>Choose Winner</h3>
                <form onSubmit={this.handlesubmit}>
                    ID:
                <input type="text" name="id" onChange={this.handlechange} value={this.state.id} />
                    <br />
                    <button type="submit">Winner!!!!</button>
                </form>
                {this.state.winner !== "" ? <p>Winner is:{this.state.winner}</p> : ""}
                {this.state.Error !== "" ? <p>{this.state.Error}</p> : ""}
            </div>
        )
    }
}
