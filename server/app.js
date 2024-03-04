require("dotenv/config")
require("./db")

const express = require("express")
const app = express()

require("./config")(app)


const { isAuthenticated } = require("./middleware/jwt.middleware")

const projectRouter = require("./routes/project.routes")
app.use("/api/projects", isAuthenticated, projectRouter)

const taskRouter = require("./routes/task.routes")
app.use("/api/tasks", isAuthenticated, taskRouter)

const authRouter = require("./routes/auth.routes")
app.use("/api/auth", authRouter)

require("./error-handling")(app)

module.exports = app