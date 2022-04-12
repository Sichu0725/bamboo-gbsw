const ranStr = (length: number, type: boolean) => {
	let result = ''
	const characters = type
		? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		: '0123456789'

	const charactersLength = characters.length
	for ( let i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}
  
export default ranStr