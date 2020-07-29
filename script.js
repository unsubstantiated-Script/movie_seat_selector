const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length

    //Copy selected seats into an array using a spread operator and map through the array to create a new array with selected indexes
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//Get Data from Local Storage and Populate the UI 
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            //Checking for something in an array. If it is there, it will be greater than -1. As not there is represented by -1
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

//Movie Select Event
movieSelect.addEventListener('click', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

//Seat Click Event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }

})

//Initial Count and Total Set

updateSelectedCount()