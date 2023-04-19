let baseURL = `http://localhost:5000/api/movies`

let moviesForm = document.getElementById('movies-form')
let movieName = document.getElementById('movie-name')
let movieURL = document.getElementById('movie-url')
let moviesDisplay = document.getElementById('movies-display')

let moviesCallBack = ({data: movies}) => displayMovies(movies)
let errCallBack = err => console.log(err.response.data)

let getMovies = () => axios.get(baseURL)
    .then(moviesCallBack)
    .catch(errCallBack)

let createMovie = body => axios.post(baseURL, body)
    .then(moviesCallBack)
    .catch(errCallBack)

    moviesForm.addEventListener('submit', (event) => {
            event.preventDefault()
        
            if (
                movieName.value === '' ||
                movieURL.value === ''
            ) {
                alert ('Please fill out all inputs for your movie.')
                return
            }
            
            let bodyObj = {
                name: movieName.value,
                url: movieURL.value
            }

            createMovie(bodyObj)

            movieName.value = ''
            movieURL.value = ''

        })

function createMovieCard(movie) {
    console.log(movie)

    let movieWrapper = document.createElement('div')
    movieWrapper.classList.add('movie-card')

    movieWrapper.innerHTML = `<img alt='movie-poster' src=${movie.url} class='movie-poster'/>
    <p class='movie-title'>${movie.name}</p>
    `
    moviesDisplay.appendChild(movieWrapper)
}

function displayMovies(arr) {
    moviesDisplay.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMovieCard(arr[i])
    }
}

getMovies()