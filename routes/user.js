const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/", userService.createUser);
router.get("/", userService.getAllUsers);
router.get("/:id", userService.getUser);
router.put("/:id", userService.updateUser);
router.delete("/:id", userService.deleteUser);

module.exports = router;
