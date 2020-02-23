const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
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




app.listen(port, () => console.log(`Example app listening on port ${port}!`))