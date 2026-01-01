const express = require("express");
const verifyJwt = require("../middleware/auth.middleware");
const router = express.Router();
const {handleTaskCreation,handleTaskDeletion,handleTaskUpdation,handleGetAllTask} = require("../controller/task.controller");


router.post("/create", verifyJwt, handleTaskCreation);
router.get("/all-tasks", verifyJwt, handleGetAllTask);
router.put("/update/:id", verifyJwt, handleTaskUpdation);
router.delete("/delete/:id", verifyJwt,handleTaskDeletion );

module.exports = router;
