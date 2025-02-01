#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod votingdapp {

    use super::*;

    pub fn initialize_poll(ctx: Context<InitializePoll>,
                            poll_id: u64,
                            description: String,
                            poll_start: u64, 
                            poll_end: u64,) -> Result<()> {

        let poll = &mut ctx.accounts.poll;
        poll.poll_id = poll_id;
        poll.description = description;
        poll.poll_start = poll_start;
        poll.poll_end = poll_end;
        poll.candidate_amount = 0;
        Ok(())
    }

    pub fn initialize_candidate(ctx: Context<InitializeCandidate>, candidate_name: String, _poll_id: u64) -> Result<()> {
        
        let candidate = &mut ctx.accounts.candidate;
        let poll = &mut ctx.accounts.poll;
        poll.candidate_amount += 1; 
        candidate.candidate_name = candidate_name;
        candidate.candidate_votes = 0;
        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, _candidate_name: String, _poll_id: u64) -> Result<()> {
        let candidate = &mut ctx.accounts.candidate;
        // Increment vote count
        candidate.candidate_votes += 1;
        Ok(())
        
    }

}

#[derive(Accounts)]
#[instruction(candidate_name: String, poll_id: u64)]
pub struct Vote<'info> {
    pub signer: Signer<'info>,

    #[account(
        // Since i dont need to create it i just specify seeds and bump
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump
    )]
    pub poll: Account<'info, Poll>,


    #[account(
        mut, // By default every account is immutable even if i borrow it as mutable so i need to specify that is mutable
        seeds = [poll_id.to_le_bytes().as_ref(), candidate_name.as_bytes()],
        bump,
    )]
    pub candidate: Account<'info, Candidate>,
}

#[derive(Accounts)]
#[instruction(poll_id: u64)] // I pull in parameters that i use
pub struct InitializePoll<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account( // I can Create the account right here with this macro
        init, // creates the account if it doesn't exists
        payer = signer, // `signer` pays for account rent & transaction fees
        space = 8 /*Anchor reserves 8 bytes */ + Poll::INIT_SPACE, // This comes from #[derive(InitSpace)] macro on Poll Struct
        seeds = [poll_id.to_le_bytes().as_ref()], // i use the pulled parameter here

        // The function .to_le_bytes() converts a u64 into 8 bytes ([u8; 8]), which is necessary to use it as a seed.
        // .as_ref() converts it into a slice (&[u8]), which is required because seeds must be slices, not fixed-size arrays.
        bump,
    )]
    pub poll: Account<'info, Poll>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(candidate_name: String, poll_id: u64)] // I import them in this Struct scope from instruction function
pub struct InitializeCandidate<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        // Since i dont need to create it i just specify seeds and bump
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump
    )]
    pub poll: Account<'info, Poll>,

    #[account(
        init,
        payer = signer,
        space = 8 + Candidate::INIT_SPACE,
        seeds = [poll_id.to_le_bytes().as_ref(), candidate_name.as_bytes()],
        bump,
    )]
    pub candidate: Account<'info, Candidate>,
    pub system_program: Program<'info, System>
}


#[account]
#[derive(InitSpace)] //  Make all calculations of how much space this takes
pub struct Poll {    
    pub poll_id: u64,

    #[max_len(280)] // Thats why i use the macro to give max_len to this String Characters
    pub description: String, // Since this is String i dont know how many bytes is going to be
    pub poll_start: u64,
    pub poll_end: u64,
    pub candidate_amount: u64,
}

#[account]
#[derive(InitSpace)] // I use it when i init this account
pub struct Candidate {
    #[max_len(100)]
    pub candidate_name: String,
    pub candidate_votes: u64,
}
