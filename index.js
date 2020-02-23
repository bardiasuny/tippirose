const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
var path = require('path')

const app = express()
const port = process.env.PORT || 7000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());


const adminRoutes = require('./routes/adminRoutes')




app.use('/admin', adminRoutes.routes)

// app.use('/', (req, res, next) => {
//     res.sendFile("<h1>hello</h1>")
// })


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('tippirose-app/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'tippirose-app', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))