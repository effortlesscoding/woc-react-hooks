import React, { useState, useEffect } from 'react';
import DicesPNG from '../assets/icons/icons8-dice-cubes-100.png';
import DicesOnePNG from '../assets/icons/icons8-dice-one-100.png';
import DicesTwoPNG from '../assets/icons/icons8-dice-two-100.png';
import DicesThreePNG from '../assets/icons/icons8-dice-three-100.png';
import DicesFourPNG from '../assets/icons/icons8-dice-four-100.png';
import DicesFivePNG from '../assets/icons/icons8-dice-five-100.png';
import DicesSixPNG from '../assets/icons/icons8-dice-six-100.png';
import { getRandomInt } from '../utils/numbers';

const VIEW_STATE_TO_IMG_SRC = {
	'idle': DicesPNG,
	'rolling': DicesPNG,
	'rolled': null,
}

const ROLL_RESULTS_TO_IMG_SRC = {
	1: DicesOnePNG,
	2: DicesTwoPNG,
	3: DicesThreePNG,
	4: DicesFourPNG,
	5: DicesFivePNG,
	6: DicesSixPNG,
}

const DiceImage = ({ dicesViewState, rollResults }) => {
	const getImageSrc = () => {
		if (rollResults >= 1) {
			return ROLL_RESULTS_TO_IMG_SRC[rollResults];
		}
		return VIEW_STATE_TO_IMG_SRC[dicesViewState];
	}
	return (
		<div className="dice__current-state">
			<img src={getImageSrc()} className={dicesViewState === 'rolling' ? 'dice--rolling' : ''}  alt="dices" />
			{rollResults >= 1 ? <p>Congrats! You rolled {rollResults}!</p> : null}
		</div>
	);
};

const DiceActions = ({ dicesViewState, onRollDices, onResetView }) => {
	const renderButtons = () => {
		switch (dicesViewState) {
			case 'idle': {
				return (
					<button type="button" onClick={onRollDices} className="dices__action-button">Roll the dices</button>
				);
			}
			case 'rolling': {
				return (
					<p>Rolling dices...</p>
				);
			}
			default:
				return (
					<>
						<button type="button" onClick={onRollDices} className="dices__action-button">Roll again</button>
						<button type="button" onClick={onResetView} className="dices__action-button">Reset</button>
					</>
				);
		}
	}
	return (
		<div className="dice__actions">
			{renderButtons()}
		</div>
	)
}
export const DicePlayground = ({ onDiceResultsChanged }) => {
	/**
	 * View state can be:
	 * 	- idle
	 * 	- rolling
	 * 	- rolled
	 * Any other value - invalid state.
	 */
	const [dicesViewState, setDicesViewState] = useState('idle');
	/**
	 * Roll results can be 1, 2, 3, 4, 5, 6 and null
	 */
	const [rollResults, setRollResults] = useState(null);

	const handleRollDices = () => {
		if (dicesViewState === 'idle') {
			setDicesViewState('rolling');
			setRollResults(null);
			setTimeout(() => {
				setDicesViewState('rolled');
				setRollResults(getRandomInt(1, 6));
			}, 5000);
		} else {
			alert('You cannot roll dices right now');
		}
	};

	const handleResetDices = () => {
		setDicesViewState('idle');
		setRollResults(null);
	};


	useEffect(() => {
		if (onDiceResultsChanged) {
			onDiceResultsChanged(rollResults);
		}
	}, [onDiceResultsChanged, rollResults])

	return (
		<div>
			<DiceImage dicesViewState={dicesViewState} rollResults={rollResults} />
			<DiceActions dicesViewState={dicesViewState} onRollDices={handleRollDices} onResetView={handleResetDices} />
		</div>
	)
};
