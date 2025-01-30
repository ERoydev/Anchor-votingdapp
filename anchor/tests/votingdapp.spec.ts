import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'


/// MY CUSTOM CODE BELLOW

// https://github.com/kevinheavey/anchor-bankrun -> the tool i use to test, You can check the example and copy the approach with imports and test code

// import methods from anchor-bankrum library

import { BankrunProvider, startAnchor } from 'anchor-bankrun';

/*
I have to get the program type
*/

import {Votingdapp} from '../target/types/votingdapp';


/*
 I have to pull IDL -> is like interface of how to build and generate language specific format for calling smart contracts
*/
const IDL = require('../target/idl/votingdapp.json'); // I Import this file from the target IDL


// Now i can create the Context and Provider that allows me to interact with my smart contract


// Thats my declare_id("") from the lib.rs
const votingdappAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF")


describe('votingdapp', () => {
  it('Initialize Poll', async () => { 

    // Check that StartAnchor code, i have provided extraPrograms here with the AddedProgram[] interface that require {name, programId}
    const context = await startAnchor("", [{name: "votingdapp", programId: votingdappAddress}], []); // Context

	  const provider = new BankrunProvider(context); // Provider

    // I create the program object here
    const VotingdappProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );

    // Above i Have everything Set-up to get started

    await VotingdappProgram.methods.initializePoll  (
      new anchor.BN(1), // BN stands for Big Number
      "What is your favourite type of peanut butter?",
      new anchor.BN(0),
      new anchor.BN(1838238752),
    ).rpc(); // The RPC after the methods call. Will call the RPC to execute the instruction within the program

    /*
    I run the test with:
      : anchor test --skip-local-validator --skip-deploy
      : --skip-local-validator -> Since i run solana-test-validator a local validator that run my smart contract on my local computer. I need to skip it for the test
      : --skip-deploy -> I use anchor-bankrun which allows me to skip bunch of steps and run directly on the bank validator instead of my own.
    */

    // I need to make sure that in Anchor.toml on [programs.localnet] my program has correct name with it's according programId in order to run tests

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      votingdappAddress,
    )

    // Fetch the poll account of this address
    const poll = await VotingdappProgram.account.poll.fetch(pollAddress);

    console.log(poll);

    
    
  });
    
});
