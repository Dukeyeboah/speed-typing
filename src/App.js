
import './App.css';
import useWordGame from './useWordGame';
import React from 'react';

function App() {
  const [timeLimit, setTimeLimit] = React.useState(40)

  function handleLimitChange(e) {
    const {value} = e.target

    // setTimeLimit(value)
    // checks if the value is a valid number between 0 and 1000
    if (/^(?:[0-9]|[1-9][0-9]{1,2}|1000)$/.test(value)) {
  setTimeLimit(value);
}


  }

  const {
        textBoxRef, 
        handleChange, 
        text, 
        isTimeRunning, 
        timeRemaining, 
        startGame,  
        endGame,
        wordCount
        } = useWordGame(timeLimit)

  return (
    <div className="App">
      <header className="App-header">
        <h1>How fast do you type?</h1>
        <div className = "Limit-setter">
          <h3>Set Time:
            <span>
              <input
                className = "input-Time-Limit"
                type="number"
                value={timeLimit}
                onChange = {handleLimitChange}
              />
            </span>
        </h3>
        </div>
        
        <textarea
            ref={textBoxRef}
            onChange={handleChange}
            value={text}
            disabled={!isTimeRunning}
        />
        <h4>Time remaining: {timeRemaining} </h4>
        <button
            onClick={startGame}
            disabled={isTimeRunning}
        >
          Start
        </button>

        <button
          className = "end-game-btn"
          onClick={endGame}
          disabled={!isTimeRunning}
        >
          End Game
        </button>
        
        <h1 className="word-count">Word count: {wordCount} </h1>
      </header>
    </div>
  );
}

export default App;
