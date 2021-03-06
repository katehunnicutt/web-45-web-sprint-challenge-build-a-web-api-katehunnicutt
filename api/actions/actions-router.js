// Write your "actions" router here!
const express = require("express") 
const Actions = require("./actions-model")
const router = express.Router()

//get all actions
router.get("/", (req, res) => {
  Actions.get()
  .then(actions => {
    res.status(200).json(actions)
  })
  .catch((err) => {
    res.status(500).json({
      message: "could not get projects",
      err: err.message,
      stack: err.stack
    })
  })
})

//get action by :id
router.get("/:id", (req, res) => {
  Actions.get(req.params.id) 
    .then(actions => {
      if(!actions) {
        res.status(404).json({
          message: "The action with the specified id does not exist",
        })
      } else {
        res.status(200).json(actions)
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "could not get projects",
        err: err.message,
        stack: err.stack
      })
    })
})

//create new action 
router.post("/", (req, res) => {
  const {notes, description, project_id} = req.body 
  if(!notes || !description || !project_id) {
    res.status(400).json({
      message: "bad request, missing input"
    })
  } else {
    Actions.insert({notes, description, project_id})
      .then(({id}) => {
        return Actions.get(id)
      })
      .then((newAction) => {
        res.status(201).json(newAction)
      })
      .catch((err) => {
        res.status(500).json({
          message: "could not create new action",
          err: err.message,
          stack: err.stack
        })
      })

  }

})

//edit an action by id
router.put("/:id", (req, res) => {
  const {notes, description, project_id} = req.body 
  if(!notes || !description || !project_id) {
    res.status(400).json({
      message: "bad entry, please provide required fields"
    })
  } else {
    Actions.get(req.params.id)
      .then((updated) => {
        if (!updated) {
          res.status(404).json({
            message: "the action with the specified id does not exist",
          });
        } else {
          return Actions.update(req.params.id, req.body);
        }
      })
      .then((updated) => {
        if (updated) {
          return Actions.get(req.params.id);
        }
      })
      .then((action) => {
        if (action) {
          res.json(action);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message:
            "could not update action with the specified id, please debug",
          error: err.message,
        });
      });
  }

})

//delete an action
router.delete("/:id", (req, res) => {

  Actions.remove(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).json({
          message: "the action with the specified id could not be found",
        });
      } else {
        res.status(200).json({
          message: "the action has been deleted",
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "the action could not be deleted, please debug",
        error: err.message,
      })
    })
})


module.exports = router