export default async function () {
	try {
		const response = await fetch("http://localhost:8000/")
		const data = await response.json()
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}