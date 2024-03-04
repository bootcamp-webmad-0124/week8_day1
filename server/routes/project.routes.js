const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Project = require("../models/Project.model")
const Task = require("../models/Task.model")



router.post("/", (req, res, next) => {

  const { title, description } = req.body

  Project.create({ title, description, tasks: [] })
    .then((response) => res.json(response))
    .catch((err) => next(err))
})



router.get("/", (req, res, next) => {

  Project
    .find()
    .populate("tasks")
    .then((allProjects) => res.json(allProjects))
    .catch((err) => next(err))
})



router.get("/:projectId", (req, res, next) => {

  const { projectId } = req.params

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" })
    return
  }

  Project
    .findById(projectId)
    .populate("tasks")
    .then((project) => res.status(200).json(project))
    .catch((err) => next(err))
})



router.put("/:projectId", (req, res, next) => {

  const { projectId } = req.params

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" })
    return
  }

  Project
    .findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((err) => next(err))
})



router.delete("/:projectId", (req, res, next) => {

  const { projectId } = req.params

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" })
    return
  }

  Project.findByIdAndRemove(projectId)
    .then(() => {
      res.json({ message: `Project with ${projectId} is removed successfully.`, })
    })
    .catch((err) => next(err))
})

module.exports = router