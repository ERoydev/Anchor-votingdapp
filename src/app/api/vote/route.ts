import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS } from "@solana/actions"
import { Connection, PublicKey } from "@solana/web3.js";

/*
This is my API Routes for my vote application using solana Action and Blinks
*/

import {Votingdapp} from '@../../../anchor/target/types/votingdapp';
import { BN, Program } from "@coral-xyz/anchor";
const IDL = require("../../../../anchor/target/idl/votingdapp.json");

export const OPTIONS = GET;


export async function GET(request: Request) {

  const actionMetadata: ActionGetResponse = {
    icon: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-02-homemade-peanut-butter%2Fhomemade-peanut-butter-363",
    title: "Vote for your favourite type of peanut butter",
    description: "Vote between crunchy and smooth peanut butter",
    label: "Vote",
    links: {
      actions: [
        {
          label: "Vote for Crunchy",
          href: "/api/vote?candidate=Crunchy",
          type: "transaction",
        },
        {
          label: "Vote for Smooth",
          href: "/api/vote?candidate=Smooth",
          type: "transaction"
        }
      ]
    }
  };
  // I allow CORS_HEADERS
  return Response.json(actionMetadata, {headers: ACTIONS_CORS_HEADERS});
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const candidate = url.searchParams.get("candidate");

  if (candidate != "Crunchy" && candidate != "Smooth") {
    return new Response("Invalid candidate", {status: 400, headers: ACTIONS_CORS_HEADERS});
  }

  // This is my solana-local-validator
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  const program: Program<Votingdapp> = new Program(IDL, {connection}); // I use same as in the testcases but here my provider can be connection

  const body: ActionPostRequest = await request.json();
  let voter;

  try{
    voter = new PublicKey(body.account);
  } catch(error) {
    return new Response("Invalid account", {status: 400, headers: ACTIONS_CORS_HEADERS});
  }

  const instruction = await program.methods
  .vote(candidate, new BN(1))
  .accounts({
    signer: voter,
  })
  .instruction();

  const blockhash = await connection.getLatestBlockHash();

}