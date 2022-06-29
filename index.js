const express = require('express')
const app = express()
const path = require('path')
require('./helper/db')()
const {create} = require('express-handlebars')

const homeRouter = require('./routes/home')
const peopleRouter = require('./routes/people')

const hbs = create({
    defaultLayout: 'layout',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', homeRouter)
app.use('/people', peopleRouter)

try {
    const port = 3000
    app.listen(port, () => {
        console.log('Server working on', port);
    })
} catch (error) {
    console.log(error);
}