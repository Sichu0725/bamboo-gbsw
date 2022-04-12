import router from './app'
import express from 'express'
import { createServer } from 'http'

export const port = process.env.PORT || 80
const app = express()
const server = createServer(app)

app.use(router)
app.use(express.json())
server.listen(port, () => {
  console.log(`Server is now ready, http://127.0.0.1:${port}`)
})
