# LOTTERY
## Business use Case
This is a simple Dapp built to bet like normal lottery. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).Any one can deploy lottery with a name.Any one can bet in that lottery by adding some info and betting more than 0.01 ethers through the id of that lottery except owner. User can get lottery id through getlotteryid() function. After that owner can choose a winner randomly through pick winner function which uses Random() function - a private function.  But for that first he would have to close the lottery first by giving the his lottery id and then he can choose the winner. I have used enum open and close so that once a lottery has been played, winner has been choosen, the owner of that lottery can again open his lottery through his lottery id. Whoever wins the lottery, wil get the whole amount of that particular lottery.<br>

One more thing to mention here is that I have tried separating all code and putting it in the /src folder. The backend is in the `/abi` and `/contracts` folder. 
___

## Technologies used
I have used React and Solidity for front-end and backend. Also, using metamask, there was not much to do for making a dedicated backend so I have used firebase for other data.<br>
All the tests for smart contracts (backend):https://github.com/Kirpalsinh9/FinalDapp/tree/master/Testing <br>
To connect to the backend we have `firebase.js` file with all firebase configuration avoiding use of ENV file but to demonstrate the knowledge of `dotenv` I have made a `.env` file and included a `.env.example` for submission.<br>

For frontend all the components including app.js is in the `/components` directory and since there are just three components and only few states I avoid using redux but insted used a loading flag to check loading state.  It is working fine. instead of using thunk I have used async/await for componentWillMount and other functions.Other reason for not using redux is any state of myapp is not interacting with each other through one to another component. <br>
Everything is connected with Metamask and smart contract on ethereum kovan test network.

I have tried using Travis CI, just to demonstrate my learning of it. 

To go beyond the requirements, I have tried to use CSS for proper front-End designing.

It was a big project for me but I tried doing everything from the rubrik and cover as many features as I can.<br> 
Thank you.
___

## Instructions

In the project directory, you can run:
### `npm install`

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) in docs for more information.


## Deployed

Kovan Contract https://kovan.etherscan.io/address/0x53d31e46faa0f7203d3c5a237dd6305020e4e120 
Live app https://finalpro-2f0b3.firebaseapp.com
___
## Submitted By
Kirpalsinh Vaghela
101158480

