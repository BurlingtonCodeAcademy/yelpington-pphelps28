let restaurant = window.location.href.split('/').pop() //mr-mike's
$(document).ready(function () {
    //added a clear button to clear local storage (you're welcome!)
    $("#clear-button").click(() => localStorage.clear())
    fetch(`../api/restaurants/${restaurant}.json`).then(data => {
        return data.json()
    }).then(jsonObj => {
        let latLongArray = JSON.parse(jsonObj.coords)
        let lat = latLongArray[0]
        let lon = latLongArray[1]
        const restMap = L.map('restMap').setView([lat, lon], 17)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
        }).addTo(restMap)
        let marker = L.marker([lat, lon]).addTo(restMap)
        marker.bindPopup(`${jsonObj.name}<br>${jsonObj.address}`)
        renderDisplay(jsonObj)
    })
})
function renderDisplay(object) {
    document.title = object.name
    $("#top").html(object.name)
    $("#info").append(`<div class="info"  id="address">${object.address}</div>`)
    $("#info").append(`<div class="info">Price: ${object.price}</div>`)
    $("#info").append(`<div class="info" >Phone: ${object.phone}</div>`)
    $("#info").append(`<div class="info" >Hours: ${object.hours === undefined ? 'Not Listed' : object.hours}</div>`)
    $("#info").append(`<div class="info">  <a href="${object.website}" alt="${object.name}'s website link">${object.website}</div></a>`)
    for (let n of object.notes) {
        $("#notes").append(`<div class="comments">${n}</div>`)
    }
    $("#notes").append(`<div id="comment-header">COMMENTS</div>`)
    //retrieve local strage

    //couldn't remove the null property from local storage while still adding a <br>, so I sliced it.  Starts at first comment entry
    $("#added-comments").append(`<div>${localStorage.getItem(restaurant) === null ? "Be the first to comment!" : localStorage.getItem(restaurant).slice(8)}</div>`)
    //add submitted 'comment' to local storage
    $("#submit-button").click(function () {
        let comment = $("#comment-box")[0].value
        if (!comment == '') {
            $("#added-comments").empty()
            $("#added-comments").append(`<div class="comments">-${comment}</div>`)
            let temp = localStorage.getItem(restaurant) + '<br>' + '-' + comment
            localStorage.setItem(restaurant, temp)
            $("#comment-box")[0].value = ''
        }
    })
}

