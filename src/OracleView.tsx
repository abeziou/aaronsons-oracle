import { useEffect, useEffectEvent, useState } from "react";
import Oracle from "./Oracle.ts";

type Guess = {
    typedLetter: string;
    predictedLetter: string;
}

type CrystalBallProps = {
    predictedLetter?: string;
    correct?: boolean;
};

const CrystalBall = (props: CrystalBallProps) => {
    let className = `crystal-ball`;
    if (props?.correct) {
        className += " correct-guess";
    } else {
        className += " incorrect-guess";
    }

    return (
        <div className={className}>
            {props?.predictedLetter}
        </div>
    );
};

const OracleView = () => {
    const [oracle, setOracle] = useState<Oracle>(new Oracle());
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [correctPredictions, setCorrectPredictions] = useState<number>(0);
    const [lastPrediction, setLastPrediction] = useState<string | undefined>();
    const [correctPrediction, setCorrectPrediction] = useState<boolean | undefined>();

    const onLetterPress = (letter: string) => {
        const prediction = oracle.predictLetter();
        setLastPrediction(prediction);
        setGuesses([...guesses, { typedLetter: letter, predictedLetter: prediction }]);
        const isCorrect = letter === prediction;
        setCorrectPrediction(isCorrect);
        if (isCorrect) {
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CrystalBall predictedLetter={lastPrediction} correct={correctPrediction} />
            </div>
            
            Hit Rate: { (guesses?.length > 0 ? (correctPredictions / guesses.length * 100) : 0).toFixed(0)}%
            <span className="button-group">
                <button className="kbd-button" onClick={() => onLetterPress('d')}>d</button>
                <button className="kbd-button" onClick={() => onLetterPress('f')}>f</button>
            </span>
        </div>
    );
};

export default OracleView;