import { useEffect, useEffectEvent, useState } from "react";
import Oracle from "./Oracle.ts";

type Guess = {
    typedLetter: string;
    predictedLetter: string;
}

const OracleView = () => {
    const [oracle, setOracle] = useState<Oracle>(new Oracle());
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [correctPredictions, setCorrectPredictions] = useState<number>(0);

    const onLetterPress = (letter: string) => {
        const prediction = oracle.predictLetter();
        setGuesses([...guesses, { typedLetter: letter, predictedLetter: prediction }]);
        if (letter === prediction) {
            setCorrectPredictions(correctPredictions + 1);
        }
        oracle.recordLetter(letter);
        setOracle(oracle);
    }; 

    const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
        const lowerKey = event.key?.toLowerCase(); 
        if (lowerKey === 'd' || lowerKey === 'f') {
            onLetterPress(lowerKey);
        }
    });
    
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            Hit Rate: { (guesses?.length > 0 ? (correctPredictions / guesses.length * 100) : 0).toFixed(0)}%
            <span>
                <button onClick={() => onLetterPress('d')}>d</button>
                <button onClick={() => onLetterPress('f')}>f</button>
            </span>
            {guesses.map((guess, i) => (
                <div key={i}>
                    Entered: {guess.typedLetter}, Predicted: {guess.predictedLetter}
                </div>
            ))}
        </div>
    );
};

export default OracleView;