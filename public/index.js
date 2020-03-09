/////after the page loads/////
$(document).ready(function () {

    ///create map/////
    const mymap = L.map('mainMap').setView([44.47809657873547, -73.21348650653393], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
    }).addTo(mymap)
    /////"searching" function propogates map markers with placeMarker() and the list with makeList()
    $("#go").click(searched)
    function searched() {
        $("#display").empty()
        fetch('./api/restaurants/rest-list.json').then((data) => {
            return data.json()
        }).then(restList => {
            return restList.forEach(e => {
                ////render a marker and list item for each restaurant///
                mymap.setView([44.47809657873547, -73.21348650653393], 15)
                placeMarker(e)
                makeList(e)
            })
        })
        //renders display of restaurant names
        function makeList(obj) {
            //attaches restaurant name, with added event listener to display more information on click
            let newDiv = `<a href="#" alt="${obj.name}"><div class="list-item" id=${obj.id}>${obj.name}</div></a>`
            $("#display").append(newDiv)
            $(`#${obj.id}`).click(function () {
                $("#display").empty()
                $("#display").append(`<div id="restaurant-name">${obj.name}</div>`)
                $("#display").append(`<div id="category">${obj.category}</div>`)
                $("#display").append(`<div>${obj.price}</div>`)
                $("#display").append(`<a href="/restaurant/${obj.id}" id="bottom-of-display"><div>Learn More</div></a>`)
            })
        }
        //places a marker based on each object and its coordinates
        function placeMarker(obj) {
            fetch(`./api/restaurants/${obj.id}.json`)
                .then((data) => {
                    return data.json()
                })
                .then(restObj => {
                    //converts the json objects coordinates string to an array
                    let info = (JSON.parse(restObj.coords))
                    //assigns lat & long to variables for marker drop
                    let lat = info[0]
                    //added a small extra bit to compensate for leaflet inaccuracy 
                    let lon = info[1] + .0019
                    let marker = L.marker([lat, lon]).addTo(mymap)
                    marker.bindPopup(`${restObj.name}<br>${restObj.address}`)
                    //called within placeMarker to tie object and marker together on click event
                    renderDisplay(marker, obj)
                })
        }
        //given the element (or in this case, leaflet marker,) the provided object's values are assigned to the display
        function renderDisplay(element, object) {
            element.on('click', function () {
                $("#display").empty()
                $("#display").append(`<div id="restaurant-name">${object.name}</div>`)
                $("#display").append(`<div id="category">${object.category}</div>`)
                $("#display").append(`<a href="/restaurant/${object.id}" id="bottom-of-display"><div>Learn More</div></a>`)
            }, { passive: true })
        }
    }
})


