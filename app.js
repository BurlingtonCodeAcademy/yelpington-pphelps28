const express = require('express')
const app = express()
app.use(express.static('./public'))

const PORT = process.env.PORT || 5000
//redirects incoming restaurants to individual restaurant pages
app.get('/restaurant/:id', (req, res) => {
    res.sendFile(__dirname + '/public/restaurant.html')
})

app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`)
})