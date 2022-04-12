import { db } from './database'
import toLower from './toLower'
export async function Question(Q: string, str: string): Promise<boolean> {
	const [question] = await db.select('*').from('questions').where({ id: Q })
	if (!question) return false
	if (toLower(question.result) === toLower(str)) return true
	else return false
}

export async function checkQuestion(Q: string) {
	const [question] = await db.select('*').from('questions').where({ id: Q })
	if (!question) return false
	else return true
}

export async function getQuestion() {
	const questions = await db.select('*').from('questions')
	const ran = Math.floor(Math.random() * questions.length)
	const [question] = await db.select('*').from('questions').where({ id: ran })
	return question
}

export async function getAllQuestion() {
	const questions = await db.select('*').from('questions')
	return questions
}
