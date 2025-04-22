export default function highlightToxicWords(badWords: string[]) {
	const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');
  
	const walk = (node: Node): void => {
	  if (node.nodeType === Node.TEXT_NODE) {
		const text = node.nodeValue;
		if (!text) return;
  
		if (regex.test(text)) {
		  const replacedHTML = text.replace(regex, (match: string) => {
			return `<span class="toxic-word">${match}</span>`;
		  });
  
		  const tempDiv = document.createElement('div');
		  tempDiv.innerHTML = replacedHTML;
  
		  while (tempDiv.firstChild) {
			node.parentNode?.insertBefore(tempDiv.firstChild, node);
		  }
  
		  node.parentNode?.removeChild(node);
		}
	  } else if (
		node.nodeType === Node.ELEMENT_NODE &&
		!(node instanceof HTMLScriptElement) &&
		!(node instanceof HTMLStyleElement)
	  ) {
		const childNodes = Array.from(node.childNodes);
		for (const child of childNodes) {
		  walk(child);
		}
	  }
	};
  
	walk(document.body);
}