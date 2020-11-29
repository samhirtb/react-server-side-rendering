import express from 'express'

import serverRenderer from './middleware/renderer'

const PORT = 3021
const path = require('path')

const app = express()
const router = express.Router()

router.use('^/$', serverRenderer)
router.use('^/posts', serverRenderer)
router.use(express.static(
    path.resolve(__dirname, '..', 'build')
));

app.use(router)

app.listen(PORT, (error) => {
    if (error) {
        return console.log('something bad happened', error);
    }

    console.log("listening on PORT " + PORT + "...");
});