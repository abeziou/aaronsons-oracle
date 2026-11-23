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
    } else if (props?.correct === false) {
        className += " incorrect-guess";
    }

    return (
        <div className={className}>
            {props?.predictedLetter}
        </div>
    );
};

type TypingTextProps = {
    text: string
};

const TypingText = (props: TypingTextProps) => {
    return (
        <div className="typing-text" style={{ animation: `typing 2.5s steps(${props.text.length}, end)` }}>
            {props.text}
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
            <div className="fade-down-anim" style={{ display: "flex", justifyContent: "center" }}>
                <CrystalBall predictedLetter={lastPrediction} correct={correctPrediction} />
            </div>
            
            <div className="hint-text fade-up-anim">
                {
                    guesses?.length ? 
                        `Correctly Predicted: ${(correctPredictions / guesses.length * 100).toFixed(0)}%` : 
                        <TypingText text="Keep pressing 'd' or 'f' and the Oracle will predict your next guess..."/>       
                }
            </div>
            
            <span className="button-group fade-up-anim">
                <button className="kbd-button" onClick={() => onLetterPress('d')}>d</button>
                <button className="kbd-button" onClick={() => onLetterPress('f')}>f</button>
            </span>
        </div>
    );
};

export default OracleView;