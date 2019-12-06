const gallery = document.getElementById("gallery");
let users = [];

fetch("https://randomuser.me/api/?results=12")
    .then(response => response.json())
    .then(data => {
        users = data.results;
        generateGallery(users);
    })
    .catch(err => console.log(err));

function generateGallery(users) {
	const galleryHTML = users
		.map(
			employee => `
    <div class="card">
    <div class="card-img-container">
    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="card-text">${employee.email}</p>
    <p class="card-text cap">${employee.location.city}, ${employee.location.state}, ${employee.location.country}</p>
    </div>
    </div>
    `
    ).join("");

    document.getElementById("gallery").innerHTML = galleryHTML;

    const cards = Array.from(document.getElementsByClassName('card'));
    cards.forEach(function (element, index) {
        element.addEventListener('click', () => {
            generateModal(index);
        })
    });
}

function generateModal(user) {
    const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${users[user].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${users[user].name.first} ${users[user].name.last}</h3>
                <p class="modal-text">${users[user].email}</p>
                <p class="modal-text cap">${users[user].location.city}</p>
                <hr>
                <p class="modal-text">Cell Phone: ${users[user].cell}</p>
                <p class="modal-text">${users[user].location.street.number} ${users[user].location.street.name}, ${users[user].location.city}, ${users[user].location.state} ${users[user].location.postcode}</p>
                <p class="modal-text">Birthday: ${users[user].dob.date.split("T")[0]}</p>
            </div>
        </div>
        <!-- IMPORTANT: Below is only for exceeds tasks -->
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    var lastElement = document.querySelector('body').lastElementChild;
    lastElement.insertAdjacentHTML('beforebegin', modalHTML);

    const modalContainer = document.querySelector(".modal-container");
    const previousButton = document.getElementById("modal-prev");
    const nextButton = document.getElementById("modal-next");
    const closeButton = document.getElementById("modal-close-btn")

    previousButton.addEventListener('click', () => {
        modalContainer.remove();
        // if this is the first user and previous is clicked, lets show the last user
        if(user === 0){
            generateModal(users.length - 1);
        // if not first user, show the previous user
        } else {
            generateModal(user - 1);
        }
    });
    
    // if(user === users.length - 1) {
    //     nextButton.style.display="none";
    // }


    nextButton.addEventListener('click', () => {
        modalContainer.remove();
        if(user === users.length - 1){
            generateModal(0);
        // if not first user, show the previous user
        } else {
            generateModal(user + 1);
        }
    });

    closeButton.addEventListener("click", () => { 
        modalContainer.remove();
    });        

    // setTimeout(() => {
    //     document.querySelector(".modal-container").remove();
    // }, 1000);
	// document
	// 	.getElementById("modal-close-btn")
	// 	.addEventListener("click", () =>
	// 		document.querySelector(".modal-container").remove()
	// 	);
}

// setTimeout(() => {
// 	const cards = document.querySelectorAll(".card");
// 	console.log(cards);
// 	// cards.addEventListener('click', () => generateModal());

// 	for (var i = 0; i < cards.length; i++) {
// 		cards[i].addEventListener("click", function() {
// 			generateModal();
// 		});
// 	}
// 	//         if (!confirm("sure u want to delete " + this.title)) {
// 	//             event.preventDefault();
// 	//         }
// 	//     });
// 	// }
// }, 1000);

// // Create a new variable for the request
// var randomPeople = new XMLHttpRequest();

// // create a callback function
// randomPeople.onreadystatechange = function(){
//     // check for a ready state of 4 and status returned of 200
//     if(randomPeople.readyState === 4 && randomPeople.status === 200){
//         // initialize a new variable for gallery's html content
//         var galleryHTML = '';

//         // parse the response of the call into a JSON format
//         var employees = JSON.parse(randomPeople.responseText);
//         console.log(employees);

//         // since the JSON returns an object, we are only interested in the results array of the object, lets reassign the variable to be the results array
//         employees = employees.results;

//         // loop through each of the results in the array
//         console.log(employees);

//         for( i = 0; i<employees.length; i += 1){
//             // add the HTML for each employee

//             // in order to meet "exceeds" requirements for Structure, style and CSS, I've added some colors to the background on certain ages. Anyone under 18 is red, over 65 is yellow.
//             if (employees[i].dob.age < 18){
//                 galleryHTML += '<div class="card" style="background-color:red">'
//             } else if (employees[i].dob.age > 65){
//                 galleryHTML += '<div class="card" style="background-color:yellow">';
//             } else {
//                 galleryHTML += '<div class="card">'
//             }
//             galleryHTML += '<div class="card-img-container">';
//             galleryHTML += '<img class="card-img" src="' + employees[i].picture.large + '" alt="profile picture">';
//             galleryHTML += '</div>';
//             galleryHTML += '<div class="card-info-container">';
//             galleryHTML += '<h3 id="name" class="card-name cap">'+ employees[i].name.first + ' ' + employees[i].name.last + '</h3>';
//             galleryHTML += '<p class="card-text">'+ employees[i].email +'</p>';
//             galleryHTML += '<p class="card-text cap">' + employees[i].location.city + ', ' + employees[i].location.state + ', ' + employees[i].location.country + '</p>';
//             galleryHTML += '</div>';
//             galleryHTML += '</div>';
//         }
//     }
//     // append the HTML to the gallery on the main page
//     document.getElementById('gallery').innerHTML = galleryHTML;
// }

// // specify where to call
// randomPeople.open('GET', 'https://randomuser.me/api/?results=12');

// // send the request
// randomPeople.send();

/* 
TODO: Modal markup:

You can use the commented out markup below as a template
for your modal, but you must use JS to create and append 
it to `body`.

IMPORTANT: Altering the arrangement of the markup and the 
attributes used may break the styles or functionality.


======================== --
*/

// function openModal(){
//     let modalHTML = `
//     <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
//     </div>
//     `;
//     document.querySelector('body').append(modalHTML);
// };

/*
TODO Search markup: 

You can use the commented out markup below as a template
for your search feature, but you must use JS to create and 
append it to `search-container` div.

IMPORTANT: Altering the arrangement of the markup and the 
attributes used may break the styles or functionality.

<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
======================= --
*/

var searchHTML =
	'<form action="#" method="get"><input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"></form>';
document.querySelector(".search-container").innerHTML = searchHTML;

