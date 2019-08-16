import React, { Component } from 'react'
import { ethers } from 'ethers';
import Loader from 'react-loader-spinner';

const abi = require('../abi');

export default class PickWinner extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            Error: "",
            winner: "",
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
        const loading = this.state.loading
        return (
            <div>
                <h3>Choose Winner</h3>
                <form onSubmit={this.handlesubmit}>
                    ID:
                <input type="text" name="id" onChange={this.handlechange} value={this.state.id} />
                    <br />
                    <button type="submit" disabled={loading}>{this.state.loading === true ? <Loader
                        type="Puff"
                        color="white"
                        height="30"
                        width="30"
                    /> : ""}Winner!!!!</button>
                </form>
                {this.state.winner !== "" ? <p>Winner is:{this.state.winner}</p> : ""}
                {this.state.Error !== "" ? <p>{this.state.Error}</p> : ""}
            </div>
        )
    }
}
