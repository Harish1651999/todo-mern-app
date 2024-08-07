const express = require("express");
const { createTask } = require("../controllers/TaskController");

const router = express.Router();

router.post("/", createTask);

module.exports = router;
