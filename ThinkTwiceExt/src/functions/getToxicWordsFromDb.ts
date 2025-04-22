export default async function getToxicWordsFromDb(textString: string) {
	try {
		const response = await fetch("http://localhost:8000/checkWord", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({text: textString})
		})

		if (!response.ok) throw new Error("Backend request failed");

		const data = await response.json()
		console.log("toxic words: ", data)
		return data
		
		

	} catch (error) {
		console.error("error sending text to backend: ", error)
	}
}