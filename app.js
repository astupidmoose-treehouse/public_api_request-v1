
// Create a new variable for the request
var randomPeople = new XMLHttpRequest();

// create a callback function
randomPeople.onreadystatechange = function(){
    // check for a ready state of 4 and status returned of 200
    if(randomPeople.readyState === 4 && randomPeople.status === 200){
        // initialize a new variable for gallery's html content
        var galleryHTML = '';

        // parse the response of the call into a JSON format
        var employees = JSON.parse(randomPeople.responseText);
        // since the JSON returns an object, we are only interested in the results array of the object, lets reassign the variable to be the results array
        employees = employees.results;

        // loop through each of the results in the array
        for( i = 0; i<employees.length; i += 1){
            // add the HTML for each employee
            galleryHTML += '<div class="card">';
            galleryHTML += '<div class="card-img-container">';
            galleryHTML += '<img class="card-img" src="' + employees[i].picture.large + '" alt="profile picture">';
            galleryHTML += '</div>';
            galleryHTML += '<div class="card-info-container">';
            galleryHTML += '<h3 id="name" class="card-name cap">'+ employees[i].name.first + ' ' + employees[i].name.last + '</h3>';
            galleryHTML += '<p class="card-text">'+ employees[i].email +'</p>';
            galleryHTML += '<p class="card-text cap">' + employees[i].location.city + ', ' + employees[i].location.state + '</p>';
            galleryHTML += '</div>';
            galleryHTML += '</div>';
        }
    }
    // append the HTML to the gallery on the main page
    document.getElementById('gallery').innerHTML = galleryHTML;
}

// specify where to call
randomPeople.open('GET', 'https://randomuser.me/api/?results=12');

// send the request
randomPeople.send();