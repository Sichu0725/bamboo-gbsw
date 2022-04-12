import { db } from "./database";

export async function filter(str) {
	let result = str
	const words = await db.select('*').from('filters')
	for(let word of words) {
		if (str.includes(word.word) === true) {
			result.replace(`/${word.word}/gi`, word.result)
		}
	}
	console.log(result)
	return result
}