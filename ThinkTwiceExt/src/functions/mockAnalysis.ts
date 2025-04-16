export default async function mockAnalyze(textArray: string[]) {
	// simulate some texts being toxic
	
	return {
		results: textArray.map(text => ({
			text,
			toxicity: Math.random(), // fake score
			is_toxic: Math.random() > 0.7 // randomly toxic
		}))
	}
}
