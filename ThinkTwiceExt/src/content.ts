import getReadableText from './functions/getReadableText';
import sendTextToBackend from './functions/sendTextToBackend';
import debounce from 'lodash/debounce';

console.log('ThinkTwice Content Script Loaded');

let toxicityValuesArray: number[] = [];
function waitForElement(selector: string, callback: Function) {
	const seen = new Set<HTMLElement>();

	const checkForNewElements = () => {
		const elements = document.querySelectorAll(selector);
		elements.forEach((el: any) => {
			if (!seen.has(el)) {
				seen.add(el);
				callback(el);
			}
		});
	};

	checkForNewElements();

	const observer = new MutationObserver(() => {
		checkForNewElements();
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

// Observe readable content and send it for toxicity analysis
waitForElement("article, section, main, p, h1, h2, h3, h4, h5, h6, li, blockquote span", async () => {
	const readable = getReadableText();
	if (readable.length > 0) {
		try {
			const results = await sendTextToBackend(readable);
			toxicityValuesArray.push(results.toxicity_value);

			chrome.runtime.sendMessage({
				from: 'content',
				action: 'DATA_REQUEST',
				payload: { toxicity: results.toxicity_value },
			});
		} catch (err) {
			console.error('Error during toxicity check:', err);
		}
	}
});

function updateToxicityIndicator(el: HTMLElement, score: number) {
	const INDICATOR_CLASS = 'toxicity-indicator';
	const parent = el.parentElement;
	if (!parent) return;

	if (getComputedStyle(parent).position === 'static') {
		parent.style.position = 'relative';
	}

	let indicator = parent.querySelector(`.${INDICATOR_CLASS}`) as HTMLElement;

	if (!indicator) {
		indicator = document.createElement('span');
		indicator.className = INDICATOR_CLASS;

		indicator.style.cssText = `
			position: absolute;
			top: 6px;
			right: 6px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			z-index: 9999;
			box-shadow: 0 0 2px rgba(0,0,0,0.4);
		`;

		parent.appendChild(indicator);
	}

	indicator.style.backgroundColor = score >= 0.6 ? 'red' : score >= 0.4 ? 'orange' : 'green';
}

document.addEventListener('focusin', (e) => {
	const el = e.target as HTMLElement;
	let scanned = false;

	if ((el.tagName === 'TEXTAREA' || el.isContentEditable) && !el.getAttribute('data-monitored')) {
		console.log('Scanning input');
		el.setAttribute('data-monitored', 'true');

		let latestToxicityValue = 0;

		const inputHandler = debounce(async () => {
			const text = (el as HTMLTextAreaElement).value || el.innerText;
			if (!text.trim()) return;

			try {
				const result = await sendTextToBackend(text);
				latestToxicityValue = result.toxicity_value;
				updateToxicityIndicator(el, latestToxicityValue);

				if (latestToxicityValue > 0.6 && !scanned) {
					const confirmed = confirm("Le contenu de ce message est potentiellement toxique. Voulez-vous continuer ?");
					scanned = confirmed;
				}
			} catch (err) {
				console.error('Error fetching toxicity value:', err);
			}
		}, 500);

		el.addEventListener('input', inputHandler);
	}
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	if (message.from === 'popup' && message.action === 'GET_SCORE') {
		if (toxicityValuesArray.length === 0) {
			sendResponse({ average: null, highest: null });
		} else {
			const sum = toxicityValuesArray.reduce((acc, curr) => acc + curr, 0);
			const average = sum / toxicityValuesArray.length;
			const highest = Math.max(...toxicityValuesArray);
			sendResponse({ average, highest });
		}
	}
});