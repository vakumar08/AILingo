import React from "react";
import "./styles.css";


const ResultsDisplay = ({ original, improvement, explanation }: { original: string, improvement: string, explanation: string }) => {
    return (
        <div className="results-display">
            <p><span>Original: </span>{original}</p>
            <p><span>Improvement: </span>{improvement}</p>
            <p><span>Explanation: </span>{explanation}</p>
        </div>
    )
}

const AIFeedback = ({ results }: { results: Record<string, string>[] }) => {

    if (results && results.length > 0) {

        return (
            <div>
                {results.map((res, index) => (
                    <ResultsDisplay
                        key={index} // Provide a unique key for each element
                        original={res.original}
                        improvement={res.improvement}
                        explanation={res.explanation}
                    />
                ))}
            </div>
        );
    }

    return (
        <div><p>No results</p></div>
    )
}

export default AIFeedback;