import { useEffect, useState } from "react";
import './Popup.scss';

const Popup = () => {
	const [isEnabled, setIsEnabled] = useState<boolean>(true);
	const [averageScore, setAverageScore] = useState<number | null>(null);
	const [highestScore, setHighestScore] = useState<number | null>(null);

	const handleToggle = () => {
		setIsEnabled(!isEnabled);

		if (typeof chrome !== 'undefined' && chrome.storage) {
			chrome.storage.sync.set({ isEnabled: !isEnabled });
		}
	}

	useEffect(() => {
		// Get toggle state
		if (chrome.storage) {
			chrome.storage.sync.get(['isEnable'], (result) => {
				if (result.isEnable !== undefined) {
					setIsEnabled(result.isEnable);
				}
			});

			// Get the highest score from local storage
			chrome.storage.local.get(['averageScore', 'highestScore'], (result) => {
				if (result.averageScore !== undefined) {
					setAverageScore(result.averageScore);
				}
				if (result.highestScore !== undefined) {
					setHighestScore(result.highestScore);
				}
			});
		}

		// Actively request current score
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]?.id) {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ from: 'popup', action: 'GET_SCORE' },
					(response) => {
						if (chrome.runtime.lastError) {
							console.warn('Popup: Message error', chrome.runtime.lastError.message);
							return;
						}
						if (response?.average !== undefined && response?.highest !== undefined) {
							// Update the scores directly
							setAverageScore(response.average);
							setHighestScore(response.highest);

							// Optionally store the highest score in chrome storage
							chrome.storage.local.set({
								averageScore: response.average,
								highestScore: response.highest
							});
						}
					}
				);
			}
		});

		const listener = (
			message: any,
			_sender: chrome.runtime.MessageSender,
			sendResponse: (response?: any) => void
		) => {
			if (message.from === 'content' && message.action === 'DATA_REQUEST') {
				const score = message.payload.toxicity;
				console.log('Popup received score:', score);

				// Handle state update and local storage update
				if (averageScore === null || score > averageScore) {
					setAverageScore(score);
					chrome.storage.local.set({ averageScore: score });
				}

				sendResponse({ status: 'Received in popup' });
			}
		};

		chrome.runtime.onMessage.addListener(listener);

		return () => {
			chrome.runtime.onMessage.removeListener(listener);
		};
	}, [averageScore]);

	// Get the color class based on the average score
	const getToxicityClass = () => {
		if (highestScore === null) return '';
		if (highestScore >= 0.6) return 'red';
		if (highestScore >= 0.4) return 'orange';
		if (highestScore >= 0.2) return 'yellow';
		return 'green';
	};

	return (
		<div className="popup">
			<div className="top">
				<div className="cadre">
					<div className="pastille"></div>
					<div className="pastille"></div>
				</div>
				<div className={`content ${getToxicityClass()}`}>
					<h1>ThinkTwice</h1>
					<h3>Average Toxicity: {averageScore !== null ? averageScore.toFixed(2) : 'Loading...'}</h3>
					<h4>Highest Score: {highestScore !== null ? highestScore.toFixed(2) : 'Loading...'}</h4>
				</div>
				<button onClick={handleToggle}>
					{isEnabled ? 'Disable' : 'Enable'} App
				</button>
			</div>
			<div className="bottom">
				<div className="pastille"></div>
				<a href="http://localhost:4200/home" target="_blank" rel="noopener noreferrer">Dashboard</a>
			</div>
		</div>
	)
}

export default Popup;
