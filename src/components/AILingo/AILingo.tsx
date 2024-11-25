import React from "react";
import axios from "axios";
import "./styles.css";
import ClipLoader from "react-spinners/ClipLoader";
import AIFeedback from '../AIFeedback/AIFeedback';

const AILingo = () => {

    const [audioFile, setAudioFile] = React.useState<File | null>();
    const [queryText, setQueryText] = React.useState<string>('Help me improve the 5 most important sentences from the transcript');
    const [fileName, setFileName] = React.useState<string>('Choose an Audio File');
    const [aiFeedback, setAIFeedback] = React.useState<Record<string, string>[]>([])
    const [loading, setLoading] = React.useState<boolean>(false);

    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setAudioFile(files[0]);
            setFileName(files[0].name);
        } else {
            alert("Upload a valid audio file");
        }
    }

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("audio", audioFile as File);
        formData.append("text", queryText);
        try {
            setLoading(true);
            const res = await axios.post(
                'http://localhost:3001/ai',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Methods': 'POST, GET',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    }
                }
            )
            setAIFeedback(JSON.parse(res?.data))
            setLoading(false);
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Issue with file upload:', err.message);
            } else {
                console.log('Unknown error occurred:', err);
            }
        }
    }

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryText(e.target.value);
    }

    return (
        <div>
            <div className="header-container">
                <h1>AILingo</h1>
                <span>Enhance Your Language Skills with AI! </span>
                <span>Upload an audio file and get personalized tips and assistance.</span>
            </div>
            <div className="audio-input-container">
                <div className="audio-file-upload">
                    <input type="file" id="upload-file" hidden accept="audio/*" onChange={addFile} />
                    <label htmlFor="upload-file">{fileName}</label>
                </div>
                <div className="query-container">
                    <input className="input-query-text" type="text" onChange={handleText} value={queryText} placeholder="Help me improve the 5 most important sentences from the transcript..." />
                    <button className="upload-button" onClick={uploadFile}>Upload</button>
                </div>
            </div>
            <div className="results-container">
                {loading ? (<>
                    <ClipLoader
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader" />
                    <p>AI processing... may take a few seconds...</p>
                </>) : <AIFeedback results={aiFeedback} />}
            </div>
        </div>
    )
}

export default AILingo;