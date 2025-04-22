// import getReadableText from './functions/getReadableText'
import sendTextToBackend from './functions/sendTextToBackend';
import debounce from 'lodash/debounce'
// import getToxicWordsFromDb from './functions/getToxicWordsFromDb';
// import getBadWordContexts from './functions/getBadWordContext';

console.log('ThinkTwice Content Script Loaded');

// let toxicityValuesArray = <number[]>[]
// // wait for page loading on scroll
// function waitForElement(selector: string, callback: Function) {
// 	const seen = new Set<HTMLElement>()

// 	const checkForNewElements = () => {
// 		const elements = document.querySelectorAll(selector)

// 		elements.forEach((el: any) => {
// 			if (!seen.has(el)) {
// 				seen.add(el);
// 				callback(el)
// 			}
// 		});
// 	}

// 	// initial check 
// 	checkForNewElements();

// 	const observer = new MutationObserver(() => {
// 		checkForNewElements()
// 	})

// 	observer.observe(document.body, { childList: true, subtree: true })
// }

// // highlight toxic content and query the backend for toxicity level
// waitForElement("article, section, main, p, h1, h2, h3, h4, h5, h6, li, blockquote span", async () => {
// 	const readable = getReadableText();
// 	if (readable.length > 0) {
// 		let results = await sendTextToBackend(readable)
// 		let toxicWordsData = await getToxicWordsFromDb(readable)
// 		let toxicWords: string[] = []

// 		if (toxicWordsData.toxic_words.length > 0) {
// 			toxicWordsData.toxic_words.forEach((word: any) => toxicWords.push(word))
// 		}

// 		let badWordsContext = getBadWordContexts(toxicWords)
// 		badWordsContext = badWordsContext.filter((context) => context.contextText != '')
// 		console.log("context: ", badWordsContext)


// 		toxicityValuesArray.push(results.toxicity_value)
// 		console.log(toxicWords)
// 		// highlightToxicWords(toxicWords)
// 		console.log("toxicity analysis: ", results)
// 		console.log("rounded value: ", (toxicityValuesArray.reduce((acc, curr) => acc + curr) / toxicityValuesArray.length))
// 	}
// })

function updateToxicityIndicator(el: HTMLElement, score: number) {
	const INDICATOR_CLASS = 'toxicity-indicator';

	// Ensure the parent is positioned relatively to anchor the absolute element
	const parent = el.parentElement;
	if (!parent) return;

	if (getComputedStyle(parent).position === 'static') {
		parent.style.position = 'relative';
	}

	// Look for existing indicator
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

	// Color logic
	if (score >= 0.6) {
		indicator.style.backgroundColor = 'red';
	} else if (score >= 0.4) {
		indicator.style.backgroundColor = 'orange';
	} else {
		indicator.style.backgroundColor = 'green';
	}
}

document.addEventListener('focusin', (e) => {
	const el = e.target as HTMLElement;
	let scanned = false

	if ((el.tagName === 'TEXTAREA' || el.isContentEditable) && !el.getAttribute('data-monitored')) {
		console.log('scanning input');
		el.setAttribute('data-monitored', 'true');


		let latestToxicityValue = 0;

		// Debounced toxicity check on input
		const inputHandler = debounce(async () => {
			const text = (el as HTMLTextAreaElement).value || el.innerText;
			if (!text.trim()) return;

			try {
				const result = await sendTextToBackend(text);
				latestToxicityValue = result.toxicity_value;
				console.log('Toxicity:', latestToxicityValue);
				updateToxicityIndicator(el, latestToxicityValue);

				if (latestToxicityValue > 0.6 && !scanned) {

					const confirmed = confirm("Le contenu de ce message est potentiellement toxique. Voulez-vous continuer ?");
					if (confirmed) {
						console.log("User confirmed toxic message — send it manually.");
						scanned = true
						return
					} else {
						console.log("User canceled message.");

						return
					}
				}
				// Attach a keydown listener to the input element to prevent sending
			} catch (err) {
				console.error('Error fetching toxicity value:', err);
			}
		}, 500);

		el.addEventListener('input', inputHandler);

	}
});