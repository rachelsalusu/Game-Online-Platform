const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./server/routes')
const errorHandler = require('./server/middlewares/errorHandler')
// const userAgent = require('express-useragent')
// const cookieParser = require('cookie-parser')
// const swaggerJSON = require('./swagger.json');
// const swaggerUI = require('swagger-ui-express');
const PORT = process.env.PORT || 4000

// middlewares
// app.use(userAgent.express())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
// app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

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
