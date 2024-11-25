import { AssemblyAI } from 'assemblyai'
import dotenv from 'dotenv';

const assemblAIKey = dotenv.config().parsed?.ASSEMBLY_AI_KEY;
console.log(dotenv.config().parsed)

const client = new AssemblyAI({
    apiKey: assemblAIKey
})

const runAI = async (fileName: string, queryText: string) => {
    const audioFile = `./uploads/${fileName}`;
    const transcript = await client.transcripts.transcribe({ audio: audioFile });

    const message = `
    Explanation cannot be blank and must be present for every improvement suggested.
    Answer Format:
    Do not provide a preamble. Present results in JSON format with array of records with 3 fields each and no extra string characters or new lines. 
    [{
    "original": <original>,
    "improvement": <improvement>,
    "explanation: <explanation>
    }]
    Only help with language skills and nothing else.`;

    let prompt = `Help the speaker improve their language vocabulary and sentence crafting skills. 
    Pick the top 5 most important sentences from the transcript. Present a better way to put across the same information. 
    Explain why this way of crafting the sentence is better. ${message}`;

    if(queryText !== ''){
        prompt = `Help the speaker improve their language vocabulary and sentence crafting skills. 
        Present a better way to put across the same information this specific query ${queryText}.
        Provide explanation to why this improvement is better.
         ${message}`
    }

    const { response } = await client.lemur.task({
        transcript_ids: [transcript.id],
        prompt,
        final_model: 'anthropic/claude-3-5-sonnet'
    })

    return response;
}

export { runAI }