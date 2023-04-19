let moviesForm = document.getElementById('movies-form')
let listForm = document.getElementById('list-form')
let movieName = document.getElementById('movie-name')
let movieURL = document.getElementById('movie-url')
let listName = document.getElementById('list-name')
let moviesDisplay = document.getElementById('movies-display')
let loadingReel = document.getElementById('loading-reel')

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
        poster: movieURL.value
    }

    axios.post('http://localhost:5000/movies', bodyObj)
        .then((result) => {getMoviesDropDown()}
        )

    movieName.value = ''
    movieURL.value = ''
})

listForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (
        listName.value ===''
    ) {
        alert('Please assign a name to your list.')
        return
    }

    moviesDisplay.innerHTML = ''
    loadingReel.classList.remove('hidden')

    let bodyObj = {
        name: listName.value
    }

    axios.post('http://localhost:5000/lists', bodyObj)
    .then((result) => {updateData()}
    ).catch(() => {
        loadingReel.classList.add('hidden')
        moviesDisplay.innerHTML = ''
        alert('Error within data.')
        return
    })

    listName.value = ''

})

