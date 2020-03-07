$(document).ready(function () {

    let restaurant = window.location.href.split('/').pop() //mr-mike's


    fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/`).then((data) => {
        return data.json()
    }).then(jsonObj => {
        let foundRestObj = jsonObj.filter(e => e.id === restaurant)[0]
        let addressId = (foundRestObj.address.split('.')[0].toLowerCase().split(' ').join('-'))
        fetch(`https://json-server.burlingtoncodeacademy.now.sh/address/${addressId}`).then(data => {
            return data.json()
        }).then(latLonObj => {
            let lat = (latLonObj.lat)
            let lon = (latLonObj.lon)
            const restMap = L.map('restMap').setView([lat, lon], 17)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
            }).addTo(restMap)
            let marker = L.marker([lat, lon]).addTo(restMap)
            marker.bindPopup(`${foundRestObj.name}<br>${foundRestObj.address}`)
        })
        renderDisplay(foundRestObj)
    })
    function renderDisplay(object) {
        $("#top").html(object.name)
        $("#info").append(`<div class="info"  id="address">${object.address}</div>`)
        $("#info").append(`<div class="info" >Phone: ${object.phone}</div>`)
        $("#info").append(`<div class="info" >Hours: ${object.hours === undefined ? 'Not Listed' : object.hours}</div>`)
        $("#comments").append(`<div class="comments"  id="comment-header">COMMENTS</div>`)
        $("#comments").append(`<div class="comments" >${object.notes}</div>`)
        $("#comments").append(``)
    }

})

