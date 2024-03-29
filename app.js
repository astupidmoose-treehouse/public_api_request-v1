// Find the gallery
const gallery = document.getElementById("gallery");

// create an empty array of users
let users = [];

// pull 12 results from the API of random users
fetch("https://randomuser.me/api/?results=12&nat=CA")
    // parse the response into json
    .then(response => response.json())
    .then(data => {
        // replace the users array with the array of user objects from the response. 
        users = data.results;
        // use the users array to call the generateGallery function with the users as the argument
        generateGallery(users);
    })
    .catch(err => console.log(err));

// Create the gallery, we require an array of user objects
function generateGallery(users) {
    // initialize the HTML, it will be a map of the array of user objects.
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
    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
    </div>
    `
    // add .join to remove the commas from json
    ).join("");

    // replace the innerHTML of the gallery element with the new HTML. 
    // If there are no users, show a message
    if (users.length === 0){
        gallery.innerHTML = "Sorry, No Users Found";
    // Show the html
    } else {
        gallery.innerHTML = galleryHTML;
    }

    // Create a new cards array, this array is created from the nodelist with all the nodes of the class "card"
    const cards = Array.from(document.getElementsByClassName('card'));

    // Now that we have an array, we can call foreach.
    cards.forEach(function (element, index) {
        // for reach element (card), we add an event listener for clicks. 
        element.addEventListener('click', () => {
            // when a card is clicked, it calls the GenerateModal function, with an argument equal to the index of the card that was clicked. We pass this index, to reference the index in the users array
            generateModal(users, index);
        })
    });
}

// Create the Modal view, ListOfUsers is an array of user objects, the user argument is a number (index of the user clicked)
function generateModal(listOfUsers, user) {
    // generate the HTML we will pass
    const users = listOfUsers;
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

    // The HTML is to be added to the end of the page. Select the last Element of the page (the Script tag)
    var lastElement = document.querySelector('body').lastElementChild;
    // insert the modalHTML before the beginning of the script tag
    lastElement.insertAdjacentHTML('beforebegin', modalHTML);

    // define elements of the modal container. These need to be defined in the function as they do not exist before the function creates them.
    // the container that holds all modal info
    const modalContainer = document.querySelector(".modal-container");
    // the previous result button
    const previousButton = document.getElementById("modal-prev");
    // the next result button
    const nextButton = document.getElementById("modal-next");
    // the close button in the top right hand corner
    const closeButton = document.getElementById("modal-close-btn");


    // add an event listener for the previous button
    previousButton.addEventListener('click', () => {
        // remove any modal that exists
        modalContainer.remove();
        // if this is the first user and previous is clicked, lets show the last user
        if(user === 0){
            generateModal(users, users.length - 1);
        // if not first user, show the previous user
        } else {
            generateModal(users, user - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        // remove any modal that exists
        modalContainer.remove();
        // if this is the last user, loop back to the first user
        if(user === users.length - 1){
            generateModal(users, 0);
        // if not last user, show the next user
        } else {
            generateModal(users, user + 1);
        }
    });

    // if the close button is clicked, remove the modal
    closeButton.addEventListener("click", () => { 
        modalContainer.remove();
    });
}

function searchUsers(){
    // create a new array to store results of search
    let searchResults = [];
    // get the value of the input
    const searchInput = document.getElementById('search-input').value;
    // loop through the users array to look for matches from the value of the input. If a match exists, add that object to the results array
    users.forEach(element => {
        if(searchInput !== 0 && (element.name.first.toLowerCase().includes(searchInput.toLowerCase()) || element.name.last.toLowerCase().includes(searchInput.toLowerCase()))){
            searchResults.push(element);
        }
    });

    // clear the existing gallery
    gallery.innerHTML = "";
    // create a new gallery using the search results. 
    generateGallery(searchResults);
}


// generate the searchbar
var searchHTML =
    `<form action="#" method="get" onsubmit="event.preventDefault(); searchUsers()">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
document.querySelector(".search-container").innerHTML = searchHTML;