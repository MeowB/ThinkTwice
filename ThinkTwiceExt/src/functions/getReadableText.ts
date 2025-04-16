export default function getReadableText() {
	const selectors = "article, section, main, p, h1, h2, h3, h4, h5, h6, li, blockquote span";
	const elements = document.querySelectorAll(selectors);
	const seenAttr = 'data-read-processed'

	let textContent: string[] = []

	// Loop through each element and check if it contains text
	elements.forEach(element => {
		// skip if already processed
		if (element.hasAttribute(seenAttr)) return;
		if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;

		// Skip non-readable elements like scripts, styles, etc.
		// Add the text content of each element to the textContent variable
		let content = <string>''
		if (element instanceof HTMLElement) {
			content += element.innerText || element.textContent;
		} else {
			content += element.textContent || ''
		}

		if (content.trim() !== '') {
			textContent.push(content.trim())
			element.setAttribute(seenAttr, 'true')
		}
	});

	return textContent
}

