// add middlewares here related to projects
const Project = require("./projects-model")

function validateProjectId(req, res, next) {
  try {
  const project = Project.get(req.params.id)
  if(!project) {
    res.status(404).json({
      message: "project does not exist"
    })
  } else {
    req.project = project
    next()
  }
} catch (err) {
  res.status(500).json({
    message: "cannot get user",
    err: err.message,
    stack: err.stack,
  })
}
}


function validateProject(req, res, next) {
  const {name, description} = req.body 
  if(!name || !description) {
    res.status(400).json({
      message: "missing required name and description fields"
    })
  } else {
    req.name = name.trim(),
    req.description = description.trim(),
    next()
  }
}

module.exports = {
  validateProject,
  validateProjectId

}