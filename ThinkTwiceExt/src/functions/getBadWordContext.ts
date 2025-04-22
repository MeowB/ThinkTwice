type BadWordContext = {
	word: string;
	contextHTML: string;
	contextText: string;
	tagName: string;
  };
  
  // Escape special characters in the bad words to ensure they're correctly handled in the regex
  function escapeRegExp(word: string): string {
	return word.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
  }
  
  export default function getBadWordContexts(badWords: string[]): BadWordContext[] {
	// Escape bad words and join them with | to form the regex pattern
	const safeWords = badWords.map(escapeRegExp);
	const regex = new RegExp(`\\b(${safeWords.join('|')})\\b`, 'gi'); // Word boundary around the words
  
	const found: BadWordContext[] = [];
  
	const walk = (node: Node): void => {
	  // Only look at text nodes (ignore other types, including attributes)
	  if (node.nodeType === Node.TEXT_NODE) {
		const text = node.nodeValue;
		if (!text) return;
  
		let match;
		while ((match = regex.exec(text)) !== null) {
		  const word = match[0];
  
		  // Traverse up to find a parent block-level element
		  let parent: HTMLElement | null = node.parentElement;
		  while (
			parent &&
			!/^(DIV|P|ARTICLE|SECTION|LI|BLOCKQUOTE|TD|BODY)$/i.test(parent.tagName)
		  ) {
			parent = parent.parentElement;
		  }
  
		  if (parent) {
			found.push({
			  word,
			  contextHTML: parent.outerHTML,
			  contextText: parent.innerText,
			  tagName: parent.tagName
			});
		  }
		}
	  } else if (
		node.nodeType === Node.ELEMENT_NODE &&
		!(node instanceof HTMLScriptElement) &&
		!(node instanceof HTMLStyleElement)
	  ) {
		// Skip elements with attributes like <a>, <img>, etc.
		for (const child of Array.from(node.childNodes)) {
		  walk(child);
		}
	  }
	};
  
	walk(document.body);
	return found;
  }
  