export default function getReadableText() {
	// Create a variable to store all readable text
	let textContent = '';

	// Get all elements in the body of the page
	const selectors = "article, section, main, p, h1, h2, h3, h4, h5, h6, li, blockquote";
	const elements = document.querySelectorAll(selectors);

	// Loop through each element and check if it contains text
	elements.forEach(element => {
		// Skip non-readable elements like scripts, styles, etc.
		if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
			// Add the text content of each element to the textContent variable
			if (element instanceof HTMLElement) {
				textContent += element.innerText || element.textContent;
			} else {
				textContent += element.textContent || ''
			}
		}
	});

	return textContent.trim().split('\n').filter((item: string) => item !== '').filter(line => !/^\s*$/.test(line)); // Return the accumulated text content
}

