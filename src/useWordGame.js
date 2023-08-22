import React from 'react';

export default function useWordGame(startingTime = 10) {
    const [text, setText] = React.useState("")
    const [timeRemaining, setTimeRemaining] = React.useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = React.useState(false)
    const [wordCount, setWordCount] = React.useState(0)
    const textBoxRef = React.useRef(null)
    
    //updates the text state with the textbox target value
    function handleChange(e) {
        const { value } = e.target
        setText(value)
    }

    //calculates the wordcount of the text state (input text)
    function calculateWordCount(text) {
        //removes white space from both sides of string
        //and splits string wherever theres space(" ")into array of substrings
        const wordsArr = text.trim().split(" ")

        return wordsArr.filter(word => word !== "").length
    }
    
    //initializing the conditions when button is clicked, to start game
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }

    //ends game by stopping runner and calculating wordcount
    //endGame function wrapped in useCallback to optimize performance & efficiency
    //to prevent unnecessary renders triggered by the useEffect dependency array
    const endGame = React.useCallback(() => {
        setIsTimeRunning(false);
        setWordCount(calculateWordCount(text));
    }, [text]);


    React.useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
        const timeoutId = setTimeout(() => {
            //settimeout sows down the visual countdown
            setTimeRemaining(time => time - 1);
        }, 1000);
        //cleanup function
        return () => clearTimeout(timeoutId);
    } else if (timeRemaining === 0) {
        endGame();
    }
}, [timeRemaining, isTimeRunning, endGame]); //Adding endGame in the dependency array
    
    return {textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame,endGame, wordCount}
}