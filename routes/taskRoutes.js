const express = require("express");
const router = express.Router();
const {
  loginUser,
  createTask,
  allTasks,
  deleteTask,
  updateTask,
  dashboard,
  search,
} = require("../controller/taskController");

router.route("/login").post(loginUser);
router.route("/tasks").post(createTask);
router.route("/tasks").get(allTasks);
router.route("/tasks/:id").delete(deleteTask);
router.route("/tasks/:id").put(updateTask);
router.route("/dashboard").get(dashboard);
router.route("/search").get(search);

module.exports = router;
