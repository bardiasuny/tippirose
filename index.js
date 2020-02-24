const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
var path = require('path')

const app = express()
const port = process.env.PORT || 7000
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors());


const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRouthes')
const vipRoutes = require('./routes/vipRoutes')


app.use('/admin', adminRoutes.routes)
app.use('/user', userRoutes.routes)
app.use('/vip', vipRoutes.routes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('tippirose-app/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'tippirose-app', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))