const express = require('express')
const app = express()
app.use(express.static('./public'))

const PORT = process.env.PORT || 5000

app.get('./public/restaurant/:id', (req, res) => {
    res.sendFile('./public/restaurant.html')
})

app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`)
})