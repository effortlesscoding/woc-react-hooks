import React, { useState } from 'react';
import './App.css';
import {DicePlayground} from './components/DicePlayground';
import {RulesOfTheGame} from './components/RulesOfTheGame';
import {DICE_RESULT_TO_PRIZE} from './utils/diceRules';

function App() {
  const [prize, setPrize] = useState();
  const handleDiceResultsChanged = (diceResults) => {
    const result = DICE_RESULT_TO_PRIZE[diceResults];
    setPrize(result ?? null);
  };

  return (
    <div className="container">
      <section className="container__column">
        <DicePlayground onDiceResultsChanged={handleDiceResultsChanged}/>
        {prize ? <p>You have won ${prize} dollars!</p> : null}
      </section>
      <section className="container__column">
        <RulesOfTheGame />
      </section>
    </div>
  );
}

export default App;
