const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./server/routes')
const errorHandler = require('./server/middlewares/errorHandler')
const PORT = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const passport = require('./server/lib/passport')
app.use(passport.initialize())

const addAuthenticated = require('./server/middlewares/addAuthenticated')
app.use(addAuthenticated)

app.use(errorHandler)

/**
 * @Routes /api
 * entrypoint for all API routes
 */
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
