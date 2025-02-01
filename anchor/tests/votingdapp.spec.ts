import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'


/// MY CUSTOM CODE BELLOW

// Remember that the test case get the code from tests/fixtures/votingdapp.so
// So i need to take from target/deploy/votingdapp.so file and move it to tests/fixtures

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

  let context;
  let provider;
  let VotingdappProgram: Program<Votingdapp>;

  beforeAll(async () => { // Runs and sets these. We have them before every integration test

    // Check that StartAnchor code, i have provided extraPrograms here with the AddedProgram[] interface that require {name, programId}
    context = await startAnchor("", [{name: "votingdapp", programId: votingdappAddress}], []); // Context

	  provider = new BankrunProvider(context); // Provider

    // I create the program object here
    VotingdappProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );
  })
  
  it('Initialize Poll', async () => { 

    // I moved it in beforeAll()
    // // Check that StartAnchor code, i have provided extraPrograms here with the AddedProgram[] interface that require {name, programId}
    // context = await startAnchor("", [{name: "votingdapp", programId: votingdappAddress}], []); // Context

	  // provider = new BankrunProvider(context); // Provider

    // // I create the program object here
    // const VotingdappProgram = new Program<Votingdapp>(
    //   IDL,
    //   provider,
    // );

    // Above i Have everything Set-up to get started

    await VotingdappProgram.methods.initializePoll (
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

    // I conver achnor.BN to Number 
    expect(poll.pollId.toNumber()).toEqual(1);
    expect(poll.description.toString()).toEqual("What is your favourite type of peanut butter?");
    expect(poll.pollStart.toNumber()).toEqual(0);
    expect(poll.pollEnd.toNumber()).toEqual(1838238752);
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber());
    
  });

  it('Initialize poll candidates', async () => {
    await VotingdappProgram.methods.initializeCandidate (
      "Crunchy",
      new anchor.BN(1),
    ).rpc();

    await VotingdappProgram.methods.initializeCandidate (
      "Smooth",
      new anchor.BN(1),
    ).rpc();

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8 ), Buffer.from("Crunchy")],
      votingdappAddress
    )

    const crunchyCandidate = await VotingdappProgram.account.candidate.fetch(crunchyAddress);
    console.log(crunchyCandidate);
    expect(crunchyCandidate.candidateVotes.toNumber()).toEqual(new anchor.BN(0).toNumber());

    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Smooth")],
      votingdappAddress
    )

    const smoothCandidate = await VotingdappProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothCandidate);
    expect(smoothCandidate.candidateVotes.toNumber()).toEqual(new anchor.BN(0).toNumber());

  })

  it('vote', async () => {
    await VotingdappProgram.methods.vote (
      "Smooth",
      new anchor.BN(1)
    ).rpc();

    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8 ), Buffer.from("Smooth")],
      votingdappAddress
    )
  
    const smoothCandidate = await VotingdappProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothCandidate);
    expect(smoothCandidate.candidateVotes.toNumber()).toEqual(1);
  })

});
