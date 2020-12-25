import React from 'react';
import { DICE_RESULT_TO_PRIZE } from '../utils/diceRules';

export const RulesOfTheGame = () => {
	return (
		<div className="prizes">
			<p>Here are the prizes:</p>
			<ul>
				{[1, 2, 3, 4, 5, 6].map((roll => (
					<li key={`${roll}`}>if you roll {roll}, you win ${DICE_RESULT_TO_PRIZE[roll]}</li>
				)))}
			</ul>
		</div>
	);
};