const express = require("express");
const router = express.Router();
const { getUsers, getUsersById, createUser, updateUser, deleteUser } = require("../controllers/userContoller");

router.get("/user", getUsersById);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

module.exports = router;
