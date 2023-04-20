let baseMoviesURL = `http://localhost:5000/api/movies`
let baseListsURL = 'http://localhost:5000/api/lists'

let moviesForm = document.getElementById('movies-form')
let movieName = document.getElementById('movie-name')
let movieURL = document.getElementById('movie-url')
let moviesDisplay = document.getElementById('movies-display')

let listsForm = document.getElementById('lists-form')
let listName = document.getElementById('list-name')
let movieSelector = document.getElementById('movie-selector')
let loadingReel = document.getElementById('loading-reel')

let moviesCallBack = ({data: movies}) => displayMovies(movies)
let listsCallBack = ({data: lists}) => displayLists(lists)
let errCallBack = err => console.log(err)

let getMovies = () => axios.get(baseMoviesURL)
    .then(moviesCallBack)
    .catch(errCallBack)


let createMovie = body => axios.post(baseMoviesURL, body)
    .then(moviesCallBack)
    .catch(errCallBack)

let getList = () => axios.get(baseListsURL)
    .then(listsCallBack)
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
            loadingReelTimer()
            
            movieName.value = ''
            movieURL.value = ''
            
        })

    listsForm.addEventListener('submit', (event) => {
        event.preventDefault()

        if (
            listName.value ==='' ||
            moviesDisplay.value === ''
        ) {
            alert('Please assign a name to your list.')
            return
        }

        loadingReelTimer()
        moviesDisplay.innerHTML = ''

        let bodyObj = {
            name: listName.value,
            entry: movieSelector.value
        }

        axios.post(baseListsURL, bodyObj)
       
        listName.value =''

    })

function getMoviesDropDown() {

    axios.get(baseMoviesURL)
        .then((result) => {
            populateOptions(result.data)
        }).catch((err) => {
            console.log(err)
        })
}

function populateOptions(data) {
    movieSelector.innerHTML = ''

    let defaultOption = document.createElement('option')
    defaultOption.innerHTML = 'Select a movie'
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true

    movieSelector.appendChild(defaultOption)

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = data[i].name
        option.value = data[i].id

        movieSelector.appendChild(option)
    }
}


function createMovieCard(movie) {
 
    console.log(movie)
    let movieWrapper = document.createElement('div') //add id
    movieWrapper.classList.add('movie-card')
    movieWrapper.setAttribute('id', movie.id)

    movieWrapper.innerHTML = `<img alt='movie-poster' src=${movie.url} class='movie-poster'/>
    <p class='movie-title'>${movie.name}</p>
    `
    moviesDisplay.appendChild(movieWrapper)
}

function displayMovies(movies) {
    moviesDisplay.innerHTML = ``
    for (let i = 0; i < movies.length; i++) {
        createMovieCard(movies[i])
    }
}

function createListCard(list) {

    let movieWrapper = document.getElementById(list.movie_id)
    let listText = document.createElement('p')
    listText.classList.add('movie-category')
    listText.textContent = list.list
    
    console.log(list)
    movieWrapper.appendChild(listText)
}

function displayLists(lists) {
    for (let i = 0; i < lists.length; i++) {
        createListCard(lists[i])
    }
}

function loadingReelTimer() {

    loadingReel.classList.remove('hidden')
    setTimeout(() => {
        loadingReel.classList.add('hidden'), 
        getMovies()},3000)
        
    }

getMovies()

getMoviesDropDown()

getList()