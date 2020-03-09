const express = require('express')
const app = express()
//serving from the static folder
app.use(express.static('./public'))

const PORT = process.env.PORT || 5000
//redirects incoming restaurants to individual restaurant pages
app.get('/restaurant/:id', (req, res) => {
    res.sendFile(__dirname + '/public/restaurant.html')
})
app.get('/*', (req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html')
})

app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`)
})