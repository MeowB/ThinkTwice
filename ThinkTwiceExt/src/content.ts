import getReadableText from './functions/getReadableText'
// import highlightToxicLines from './functions/highlightToxicLines';
import mockAnalyze from './functions/mockAnalysis';
import sendTextToBackend from './functions/sendTextToBackend';
import debounce from 'lodash/debounce'


console.log('ThinkTwice Content Script Loaded');

let toxicityValuesArray = <number[]>[]
// wait for page loading on scroll
function waitForElement(selector: string, callback: Function) {
	const seen = new Set<HTMLElement>()

	const checkForNewElements = () => {
		const elements = document.querySelectorAll(selector)

		elements.forEach((el: any) => {
			if (!seen.has(el)) {
				seen.add(el);
				callback(el)
			}
		});
	}

	// initial check 
	checkForNewElements();

	const observer = new MutationObserver(() => {
		checkForNewElements()
	})

	observer.observe(document.body, { childList: true, subtree: true })
}

// highlight toxic content and query the backend for toxicity level
waitForElement("article, section, main, p, h1, h2, h3, h4, h5, h6, li, blockquote span",async () => {
	const readable = getReadableText();
	if (readable.length > 0) {
		let results = await sendTextToBackend(readable)
		// highlightToxicLines(results)
		toxicityValuesArray.push(results.toxicity_value)
		console.log(results)
		console.log("rounded value: ", (toxicityValuesArray.reduce((acc, curr) => acc + curr) / toxicityValuesArray.length))
	}
})

// active field real time monitoring
document.addEventListener('focusin', (e) => {
	const el = e.target as HTMLElement
	console.log('scanning input')

	if (el.tagName === 'TEXTAREA' || (el.isContentEditable && !el.getAttribute('data-monitored'))) {
		el.setAttribute('data-monitored', 'true');

		const inputHandler = debounce(async () => {
			const text = (el as HTMLTextAreaElement).value || el.innerText
			if (!text.trim()) return

			const { results } = await mockAnalyze([text])
			const isToxic = results[0].is_toxic

			if(isToxic) {
				console.log("text is toxic")
			}
		}, 700)

		el.addEventListener('input', inputHandler)
	}
})