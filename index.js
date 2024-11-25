//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
let select_dropdown = document.getElementById('selectMovie');
moviesList.forEach((obj) => {
    let new_node = document.createElement("option");
    select_dropdown.appendChild(new_node);
    new_node.innerText = obj.movieName + " $" + obj.price;
    new_node.setAttribute('value', obj.movieName);
});


let movie_name = "flash";
let movie_price = 7;
let seatSelected = 0;
let takenSeats = [];
function movieDetails(obj) {
    movie_name = obj.movieName;
    movie_price = obj.price;
    document.getElementById("movieName").innerText = movie_name;
    document.getElementById("moviePrice").innerText = '$' + movie_price;
}

let dropdowncontainer = document.getElementById("selectMovie");
dropdowncontainer.addEventListener('change', function (event) {
    let movie_entered = event.target.value;
    for (let obj of moviesList) {
        if (obj.movieName == movie_entered) {
            movieDetails(obj);
            break;
        }
    }
});

//Add eventLister to each unoccupied seat
let all_seats = document.querySelectorAll('#seatCont .seat');
// console.log(all_seats);
for (let [index, seat] of all_seats.entries()) {
    seat.addEventListener('click', function () {
        let value = seat.getAttribute("class");
        // console.log(value);
        if (value == "seat") {
            seat.setAttribute("class", "seat selected");
            seatSelected += 1;
            document.getElementById("numberOfSeat").innerText = seatSelected;
            document.getElementById("totalPrice").innerText = '$' + seatSelected * movie_price;
            
        }
        if (value == "seat selected") {
            seat.setAttribute("class", "seat");
            seatSelected -= 1;
            document.getElementById("numberOfSeat").innerText = seatSelected;
            document.getElementById("totalPrice").innerText = '$' + seatSelected * movie_price;
        }
    }, { once: true })
}
//Add eventLsiter to continue Button
document.getElementById("proceedBtn").addEventListener('click', function () {
    for (let seat of all_seats) {
        if (seat.getAttribute("class") == "seat selected") {
            seat.setAttribute("class", "seat occupied");
        }
    }
    alert("Yayy! Your Seats have been booked");
    seatSelected = 0;
    document.getElementById("numberOfSeat").innerText = seatSelected;
    document.getElementById("totalPrice").innerText = '$' + seatSelected * movie_price;
});
//Add eventListerner to Cancel Button
document.getElementById("cancelBtn").addEventListener('click', function () {
    for (let seat of all_seats) {
        if (seat.getAttribute("class") == "seat selected") {
            seat.setAttribute("class", "seat");
        }
    }
    seatSelected = 0;
    document.getElementById("numberOfSeat").innerText = seatSelected;
    document.getElementById("totalPrice").innerText = '$' + seatSelected * movie_price;
});