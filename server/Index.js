require(`dotenv`).config()

const express = require(`express`)
const cors = require(`cors`)
const{getMovies, createMovies, deleteMovies, updateMovies} = require(`./controller`)
const app = express()
const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())

app.post(`/seed`, seed)

app.get(`/api/movies`, getMovies)
// app.post(`/api/movies`, createMovies)
// app.delete(`/api/movies/:id`, deleteMovies)
// app.put(`/api/movies:id`, updateMovies)

app.listen(SERVER_PORT, () => console.log(`Port up on ${SERVER_PORT}`))