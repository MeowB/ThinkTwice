export default function highlightToxicLines(results: { text: string; toxicity: number; is_toxic: boolean }[]) {
	results.forEach(({ text, is_toxic }) => {
		if (!is_toxic) return;

		const elements = [...document.querySelectorAll("p, li, blockquote")];

		elements.forEach((el: any) => {
			if (el.textContent?.includes(text)) {
				el.style.backgroundColor = "#ffcccc"; // Light red
				el.style.borderRadius = "4px";
				el.style.padding = "2px 4px";
				el.style.transition = "background 0.3s";
				el.title = "⚠️ Toxic content detected";
			}
		});
	});
}
