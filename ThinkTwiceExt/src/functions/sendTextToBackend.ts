export default async function sendTextToBackend(textString: string) {
	try {
		const response = await fetch("http://localhost:8000/analyze", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({text: textString})
		})

		if (!response.ok) throw new Error("Backend request failed");

		const data = await response.json()
		console.log("toxicity analysis: ", data)
		return data
		
		

	} catch (error) {
		console.error("error sending text to backend: ", error)
	}
}