$(document).ready(function () {

    const mymap = L.map('restMap').setView([44.475883, -73.212074], 14)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
    }).addTo(mymap)

    /////////////////////////////////////////Restaurant info
    fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants').then((data) => {
        return data.json()
    }).then(jsonObj => {
        // here's where you do things with the data
        jsonObj.forEach(e => {
            return placeMarker(e)
        })
    })
    function placeMarker(obj) {
        fetch(`https://nominatim.openstreetmap.org/search/?q=${obj.address}& format=json`)
            .then((data) => {
                return data.json()
            })
            .then(jsonObj => {
                let info = (jsonObj[0])
                let lat = info.lat
                let lon = info.lon
                let marker = L.marker([lat, lon]).addTo(mymap)
                marker.bindPopup(`${obj.name} <br>${obj.address}`).openPopup()
                marker.on('click', function () {
                    $("#display").empty()
                    $("#display").append(`<divclass="restaurat-info">${obj.id}</div>`)
                })
            })
    }


    let objJ = [
        {
            "id": "ahli-babas-kabob",
            "name": "Ahli Baba's Kabob Shop",
            "address": "163 Main St. Burlington, VT 05401",
            "phone": "862-5752",
            "website": "http://places.singleplatform.com/ahli-babas-kabob-shop/menu",
            "hours": "9AM-3AM Everyday",
            "notes": [
                "Nice little shop that serves delicious street food."
            ]
        },
        {
            "id": "american-flatbread",
            "name": "American Flatbread",
            "address": "115 St Paul St Burlington, VT 05401",
            "phone": "861-2999",
            "website": "http://americanflatbread.com/restaurants/burlington-vt/",
            "hours": "Monday - Friday: 11:30 a.m. - 3:00 p.m. & 5:00 p.m. - 11:30 p.m. Saturday - Sunday: 11:30 a.m. - 11:30 p.m.",
            "notes": [
                "Great pizza doing good for the community!",
                "No reservations, first come first served seating.",
                "Lively choice for craft beer & inventive wood-fired pizzas loaded with organic, seasonal toppings."
            ]
        },
        {
            "id": "august-first",
            "name": "August First",
            "address": "149 S Champlain St. Burlington, VT 05401",
            "phone": "540-0060",
            "website": "http://augustfirstvt.com/",
            "notes": [
                "Homemade and from scratch breakfast and lunch made with natural ingredients!",
                "Fantastic baked goods!",
                "Catering, and Private Parties available!"
            ]
        },
        {
            "id": "city-market",
            "name": "City Market",
            "address": "82 S Winooski Ave. Burlington, VT 05401",
            "phone": "861-9700",
            "website": "http://www.citymarket.coop",
            "hours": "7AM-11PM Everyday",
            "notes": [
                "Delicious salad bar, prepared hot and cold foods, plus sandwiches."
            ]
        },
        {
            "id": "el-cortijo",
            "name": "El Cortijo Taqueria",
            "address": "189 Bank St. Burlington, VT 05401",
            "phone": "497-1668",
            "website": "http://www.cortijovt.com",
            "notes": [
                "A member of the Farmhouse group.",
                "Over 25 varieties of Tequila"
            ]
        },
        {
            "id": "farmhouse-grill",
            "name": "Farmhouse Tap and Grill",
            "address": "160 Bank St. Burlington, VT 05401",
            "phone": "859-0888",
            "website": "http://www.farmhousetg.com",
            "notes": [
                "A member of the Farmhouse group",
                "Localy sourced produce, and meat."
            ]
        },
        {
            "id": "gaku-ramen",
            "name": "Gaku Ramen",
            "address": "144 Church Street, Burlington Vermont 05401",
            "phone": "497-3050",
            "website": "http://gakuramen.com/",
            "hours": "Sunday – Thursday: 11a.m. – 10p.m.",
            "notes": [
                "Authentic Japanese cuisine in the Green Mountains.",
                "Huge bowls of ramen, come hungry!",
                "Decent potstickers, nothing special really."
            ]
        },
        {
            "id": "hen-of-the-wood",
            "name": "Hen of The Wood",
            "address": "55 Cherry St Burlington, VT 05401",
            "phone": "802-540-0534",
            "website": "http://www.henofthewood.com",
            "hours": "Sunday - Saturday: 4:00p.m. - 11:00p.m.",
            "notes": [
                "$1 oyster happy hour 4pm-5pm.",
                "$23 dollar brocolli to die for.",
                "boho vermont farm chic with a cozy ambiance.",
                "The flavors of the food and strength of the cocktails makes up for the snotty first impression and expensive prices.",
                "Intimate eatery featuring daily menus of local, seasonal fare, craft cocktails & understated decor."
            ]
        },
        {
            "id": "henrys-diner",
            "name": "Henry's Diner",
            "address": "155 Bank Street, Burlington Vermont 05401",
            "phone": "862-9010",
            "website": "http://www.henofthewood.com",
            "hours": "Sunday - Saturday: 6a.m. - 4p.m.",
            "notes": [
                "Voted the best diner in Vermont by American Express.",
                "A great place to enjoy a meal with family and friends!",
                "Breakfast all day!"
            ]
        },
        {
            "id": "honey-road",
            "name": "Honey Road",
            "address": "156 Church Street, Burlington Vermont 05401",
            "phone": "802-497-2145",
            "hours": "Sunday - Saturday: 4:00pm - 10:00pm",
            "notes": [
                "$13 dollar brocolli to die for.",
                "Recommended for the not so hungry who like to share food.",
                "Hummus is Yummus!",
                "Good cocktails, great desserts.",
                "Rad pink neon sign."
            ]
        },
        {
            "id": "kountry-kart-deli",
            "name": "Kountry Kart Deli",
            "address": "155 Main St. Burlington, VT 05401",
            "phone": "864-4408",
            "website": "http://www.kountrykartdeli.com",
            "notes": [
                "Home of the world famous Shiner!"
            ]
        },
        {
            "id": "leunigs-bistro",
            "name": "Leunig's Bistro",
            "address": "115 Church Street, Burlington Vermont 05401",
            "phone": "863-3759",
            "website": "https://www.leunigsbistro.com/",
            "hours": "Mon-Thurs 8a.m. - 6p.m., Fri and Sat 8a.m. - 10p.m.,  Sunday 8p.m. - 6p.m.",
            "notes": [
                "Leunig's Bistro is one of the oldest, continually operating restaurants in downtown Burlington.",
                "A French bistro & bar, serving lunch, brunch and dinner."
            ]
        },
        {
            "id": "mr-mikes",
            "name": "Mr. Mike's",
            "address": "206 Main St. Burlington, VT 05401",
            "phone": "864-0072",
            "hours": "Sunday - Wednesday: 11:00 a.m. - 1:00 a.m. Thursday - Saturday: 11:00 a.m. - 3 a.m.",
            "website": "https://www.facebook.com/Mr-Mikes-Pizza-93016597656/",
            "notes": [
                "The greatest pizza around! call 864-0072 or order online for free delivery!"
            ]
        },
        {
            "id": "pascolo-ristorante",
            "name": "Pascolo Ristorante",
            "address": "83 Church St. Burlington, VT 05401",
            "phone": "497-1613",
            "website": "http://www.pascolovt.com",
            "notes": [
                "Authentic Southern Italian cuisine",
                "A member of the Farmhouse Group"
            ]
        },
        {
            "id": "single-pebble",
            "name": "A Single Pebble",
            "address": "112 Lake Street, Burlington Vermont 05401",
            "phone": "865-5200",
            "website": "https://asinglepebble.com/",
            "hours": "Sunday - Saturday: 5p.m. - close",
            "notes": [
                "Great asian food, a bit on the pricey side, but worth it.",
                "Open for lunch on Fridays."
            ]
        },
        {
            "id": "thai-dishes",
            "name": "Thai Dishes",
            "address": "161 Church Street, Burlington Vermont 05401",
            "phone": "448-3215",
            "website": "http://thaidishesvt.com/",
            "hours": "Wednesday - Friday: 11:30a.m. - 2p.m., 5:00p.m. - 9:00p.m., Saturday - Sunday 12:00 - 3:00, 4:00 - 8:30",
            "notes": [
                "Thai cuisine in VT since 1999",
                "Now serving Dim-Sum Saturdays and Sundays 12-3"
            ]
        }
    ]
    let restaurant = window.location.href.split('/').pop()

    fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/`).then((data) => {
        return data.json()
    }).then(jsonObj => {
        let foundRestObj = jsonObj.filter(e => e.id === restaurant)[0]
        renderDisplay(foundRestObj)
    })
    function renderDisplay(object) {
        $("#top").html(`${object.name}`)
        $("#restDisplay").append(`<div>${object.address}</div>`)
        $("#restDisplay").append(`<div>${object.phone}</div>`)
        $("#restDisplay").append(`<div>${object.hours}</div>`)
        $("#restDisplay").append(`<div>${object.notes}</div>`)
    }


})

