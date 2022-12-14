const express = require("express");
const {
  createStudent,
  viewStudent,
  updateStudentDetails,
  deleteStudent,
} = require("../controller/student");
const { createUser, login } = require("../controller/user");
const { authentication, authorization } = require("../middleware/auth");
const router = express.Router();

router.post("/user/register", createUser);
router.post("/user/login", login);

router.post("/student", authentication, createStudent);
router.get("/student", authentication, viewStudent);
router.put("/student/update/:studentId", authentication, authorization, updateStudentDetails);
// router.put("/student/update/", authentication, authorization, editStudents);
router.delete("/student/delete/:studentId", authentication, authorization, deleteStudent);

module.exports = router;