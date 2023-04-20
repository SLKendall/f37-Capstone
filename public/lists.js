// let listsForm = document.getElementById('lists-form')
// let listName = document.getElementById('list-name')
// let listSelect = document.getElementById('list-select')
// let listSelector = document.getElementById('list-selector')
// let movieSelector = document.getElementById('movie-selector')
// let listsDisplay = document.getElementById('lists-display')
// let loadingReel = document.getElementById('loading-reel')


// listsForm.addEventListener('submit', (event) => {
//     event.preventDefault()

//     if (
//         listName.value ===''
//     ) {
//         alert('Please assign a name to your list.')
//         return
//     }

//     listsDisplay.innerHTML = ''
//     loadingReel.classList.remove('hidden')

//     let bodyObj = {
//         name: listName.value
//     }

//     axios.post('http://localhost:5000/lists', bodyObj)
//     .then((result) => {updateData()}
//     ).catch(() => {
//         loadingReel.classList.add('hidden')
//         listsDisplay.innerHTML = ''
//         alert('Error within data.')
//         return
//     })

//     listName.value = ''

// })

// function getmovies() {
//     axios.get('http://localhost:5000/movies')
//     .then((result) => {
//         fillMovieDropDown(result.data)
//     }).catch((err) => {console.log(err)})
// }

// function fillMovieDropDown(data) {
//     movieSelector.innerHTML = ''

//     let defaultOption = document.createElement('option')
//     defaultOption.innerHTML = 'Select a movie'
//     defaultOption.value = ''
//     defaultOption.disabled = true
//     defaultOption.selected = true

//     movieSelector.appendChild(defaultOption)

//     for (let i = 0; i < data.length; i++) {
//         let option = document.createElement('option')
//         option.innerHTML = data[i].name
//         option.value = data[i].id

//         movieSelector.appendChild(option)
//     }
// }

// function updateData() {
//     listsDisplay.innerHTML = ''
//     loadingReel.classList.remove('hide')

//     axios.get('http://localhost:5000/lists')
//     .then((result) => {
//         setTimeout(() => {
//             loadingReel.classList.add('hidden')
//             displayListData(result.data)
//         },2000)
//     }).catch((err) => {
//         loadingReel.classList.add('hidden')
//         console.log(err)
//     })
// }

// // function displayListData(dbData) {
// //     listsDisplay.innerHTML = ''

// //     let listData = {}

// //    for (let i = 0; i < dbData.length; i++) {
// //     if (listData[dbData[i].])
// //    }