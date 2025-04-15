import { useEffect, useState } from "react"
import './Popup.scss'

const Popup = () => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false)
	const [toxicityScore, setToxicityScore] = useState<number | null>(null)

	const handleToggle = () => {
		setIsEnabled(!isEnabled)

		if (typeof chrome !== 'undefined' && chrome.storage) {
			chrome.storage.sync.set({ isEnabled: !isEnabled })
		}
	}

	const fetchToxicityScore = () => {
		setToxicityScore(Math.random() * 100)
	}

	useEffect(() => {
		if (typeof chrome !== 'undefined' && chrome.storage) {
			chrome.storage.sync.get(['isEnable'], (result) => {
				if (result.isEnable !== undefined) {
					setIsEnabled(result.isEnable)
				}
			})
		}

		fetchToxicityScore()
	}, [])


	return (
		<div className="popup">
			<div className="top">
			<h1>ThinkTwice</h1>
			<p>Toxicity Score: {toxicityScore ? toxicityScore.toFixed(2) : 'Loading...'}</p>
			<button onClick={handleToggle}>
				{isEnabled ? 'Disable' : 'Enable'} App
			</button>
			</div>
			<div className="bottom">
				<button>Dashboard</button>
			</div>
		</div>
	)
}

export default Popup
