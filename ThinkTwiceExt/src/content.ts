import getReadableText from './functions/getReadableText'


console.log('ThinkTwice Content Script Loaded');


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

waitForElement("article, section, main, p, h1, h2, h3, h4, h5, h6, li, blockquote span", () => {
	const readable = getReadableText();
	if (readable.length > 0) {
		console.log('text: ', readable);
	}
})