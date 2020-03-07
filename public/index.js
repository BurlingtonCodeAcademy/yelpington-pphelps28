
$(document).ready(function () {
    const mymap = L.map('mainMap').setView([44.47809657873547, -73.21348650653393], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
    }).addTo(mymap)
    $("#go").click(searched)
    function searched() {
        /////////////////////////////////////Restaurant info
        fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants').then((data) => {
            return data.json()
        }).then(jsonObj => {
            //here's where you do things with the data
            console.log(jsonObj)
            jsonObj.forEach(e => {
                return placeMarker(e)
            })
        })

        function placeMarker(obj) {
            let addressId = (obj.address.split('.')[0].toLowerCase().split(' ').join('-'))
            fetch(`https://json-server.burlingtoncodeacademy.now.sh/address/${addressId}`)
                .then((data) => {
                    return data.json()
                })
                .then(jsonObj => {
                    let info = (jsonObj)
                    let lat = info.lat
                    let lon = info.lon
                    let marker = L.marker([lat, lon]).addTo(mymap)
                    marker.bindPopup(`${obj.name}<br>${obj.address}`)
                    renderDisplay(marker, obj)
                })
        }

        function renderDisplay(element, object) {
            element.on('click', function () {
                $("#display").empty()
                $("#display").append(`<div id="restaurant-name">${object.name}</div>`)
                $("#display").append(`<div>${object.address}</div>`)
                $("#display").append(`<a href="/restaurant/${object.id}" id="bottom-of-display"><div>Learn More</div></a>`)
            })
        }
    }
})


