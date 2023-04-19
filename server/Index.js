require(`dotenv`).config()

const express = require(`express`)
const cors = require(`cors`)
const{seed, getMovies, createMovie, createList, getLists, getMoviesDropDown} = require(`./controller`)
const app = express()
const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())

app.post(`/seed`, seed)

app.get(`/api/movies`, getMovies)
app.post(`/api/movies`, createMovie)
app.post(`/api/lists`, createList)
app.get(`/api/lists`, getLists)
app.get(`/api/movies-drop-down`, getMoviesDropDown)

app.listen(SERVER_PORT, () => console.log(`Port up on ${SERVER_PORT}`))