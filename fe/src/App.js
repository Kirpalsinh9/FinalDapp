import React from 'react';
import firebase from './Firestore'
import './index';
import Enterottery from './Component/Enterottery'
import DeployeLottery from './Component/DeployeLottery'


class App extends React.Component {
  // componentWillMount()
  // {
  //   const db = firebase.firestore();
  // }
  render() {

    return (
      <div className="main" id="root">


        <DeployeLottery />
        <br />
        <br />
        <Enterottery />
        <br />
        <br />

        <PickWinner />


      </div>
    );
  }
}

export default App;
