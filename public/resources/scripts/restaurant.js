//set variable at start for all generated content (id from url)
// reused much of the same HTML from index.html, so many ids and selectors are the same
let restaurant = window.location.href.split('/').pop()
$(document).ready(function () {
    //added a clear button to clear local storage, for testing comment persistence
    $("#clear-button").click(() => localStorage.clear())
    //fetches data from unique restaurant API
    fetch(`../resources/api/restaurants/${restaurant}.json`).then(data => {
        return data.json()
    }).then(restObj => {
        let latLongArray = JSON.parse(restObj.coords)
        let lat = latLongArray[0]
        let lon = latLongArray[1] + .00185
        //drops a zoomed in marker on map (based on fetched restaurant object)
        const restMap = L.map('restMap').setView([lat, lon], 17)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
        }).addTo(restMap)
        let marker = L.marker([lat, lon]).addTo(restMap)
        marker.bindPopup(`${restObj.name}<br>${restObj.address}`)
        //renders display based on provided object.  does NOT tie to marker, because only one marker is provided.  Unnecessary.
        renderDisplay(restObj)
    })
})
function renderDisplay(object) {
    //changes page title to restaurant's name and ads info to #info
    document.title = object.name
    // uses jQuery to append divs with class-assigned 
    $("#top").html(object.name)
    $("#info").append(`<div class="info"  id="address">${object.address}</div>`)
    $("#info").append(`<div class="info" >${object.category}</div>`)
    $("#info").append(`<div class="info">Price: ${object.price}</div>`)
    $("#info").append(`<div class="info" >Phone: ${object.phone}</div>`)
    $("#info").append(`<div class="info" >Hours: ${object.hours === undefined ? 'Not Listed' : object.hours}</div>`)
    $("#info").append(`<div class="info">  <a href="${object.website}" alt="${object.name}'s website link">${object.website}</div></a>`)
    //adds notes on individual lines, as opposed to one solid group
    for (let n of object.notes) {
        $("#notes").append(`<div class="comments">${n}</div>`)
    }
    //couldn't remove the null property from local storage while still adding a <br> and retrieving it (line 46), so I sliced it.  Starts at first comment entry
    $("#added-comments").append(`<div class="comments">${localStorage.getItem(restaurant) === null ? "Be the first to comment!" : localStorage.getItem(restaurant).slice(8)}</div>`)
    //add submitted 'comment' to local storage
    $("#submit-button").click(function () {
        let comment = $("#comment-box")[0].value
        //if the comment isn't empty, add it to local storage with a <br>
        if (!comment == '') {
            $("#added-comments").empty()
            let temp = localStorage.getItem(restaurant) + '<br>-' + comment
            //adds an additional slice (9, not 8 as on line 40) to compensate for the "-" added at the beginning of all subsequent comments.  
            $("#added-comments").append(`<div class="comments">-${temp.slice(9)}</div>`)
            localStorage.setItem(restaurant, temp)
            $("#comment-box")[0].value = ''
        }
    })
}

