let listForm = document.getElementById('list-form')
let listName = document.getElementById('list-name')
let listSelect = document.getElementById('list-select')
let listSelector = document.getElementById('list-selector')
let movieSelector = document.getElementById('movie-selector')
let listsDisplay = document.getElementById('lists-display')
let loadingReel = document.getElementById('loading-reel')

moviesForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (
         listName.value === '' 
    ) {
        alert ('Please add a name for your list.')
        return
    }
    
    let bodyObj = {
        name: listName.value
    }

    axios.post('http://localhost:5000/lists', bodyObj)
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

