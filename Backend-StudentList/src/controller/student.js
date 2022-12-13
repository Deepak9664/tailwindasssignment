
const studentModel = require("../model/student");


  const createStudent= async (req, res) => {
    try {
      let { name, subject, marks } = req.body;
      let userId = req.payLoad.userId;
      let alreadyPresent = await studentModel.findOne({
        user: userId,
        name,
        subject,
        isDeleted: false,
      });
      if (alreadyPresent) {
        let updateRecord = await studentModel.findOneAndUpdate(
          { user: userId, name, subject, isDeleted: false },
          { $inc: { marks: marks } },
          { new: true }
        );
        return res.status(201).send({ status: true, msg: "Successful", data: updateRecord });
      }
      let addstudent = await studentModel.create({ ...req.body, user: userId });
      res.status(201).send({ status: true, msg: "Success", data: addstudent });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  };

   const viewStudent=async (req, res) => {
    try {
      let data = req.query;
      let userId = req.payLoad.userId;
      let findStudent = await studentModel.find({
        ...data,
        user: userId,
        isDeleted: false,
      });
      if (!findStudent.length)
        return res.status(204).send({ status: false, msg: "No data found" });
      res.status(200).send({ status: true, msg: "Success", data: findStudent });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  };

  const updateStudentDetails= async (req, res) => {
    try {
      let userId = req.payLoad.userId;
      let student = req.params.studentId;
      let { name, subject, marks } = req.body;
      if (name && subject) {
        let alreadyPresent = await studentModel.findOne({
          user: userId,
          _id: student,
          name,
          subject,
          isDeleted: false,
        });
        if (alreadyPresent) {
          if (marks) {
            let updatemarks = await studentModel.findByIdAndUpdate(
              student,
              { marks: marks },
              { new: true }
            );
            return res
              .status(200)
              .send({ status: true, msg: "Successful1", data: updatemarks });
          } else {
            return res
              .status(200)
              .send({ status: true, msg: "Successful2", data: alreadyPresent });
          }
        } else {
          let isDuplicate = await studentModel.findOne({ user: userId, name, subject })
          if (isDuplicate) {
            return res.status(400).send({ status: false, msg: "Student and Subject combination already Exists." })
          }
        }
      }
      let updateDetail = await studentModel.findOneAndUpdate(
        { _id: student, user: userId, isDeleted: false },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).send({ status: true, data: updateDetail });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  };
 
  // const editStudents = async (req, res) => {
  //   try {
  //     const data = req.body;
  //     let userId = req.payLoad.userId;
  //     if (Object.keys(data).length === 0)
  //       return res.status(400).send({
  //         status: false,
  //         message: "Please provide student data",
  //       });
  
  //    const editData = await studentModel.findOneAndUpdate(
  //       {
  //         user:userId,
  //         name: data.name,
  //         subject: data.subject,
  //         marks: data.marks,
  //       },
  //       req.body,
  //       { new: true }
  //     );
  
  //     return res.status(200).send({ status: true, data: editData });
  //   } catch (error) {
  //     res.status(500).send(error.message);
  //   }
  // };
  

 const deleteStudent= async (req, res) => {
    try {
      let student = req.params.studentId;
      await studentModel.findByIdAndUpdate(
        student,
        { $set: { isDeleted: true } },
        { new: true }
      );
      res.status(200).send({ status: true, msg: "Success" });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  };

  module.exports.createStudent=createStudent
  module.exports.deleteStudent=deleteStudent
  module.exports.updateStudentDetails=updateStudentDetails
  module.exports.viewStudent=viewStudent
  // module.exports.editStudents=editStudents