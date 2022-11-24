const User = require("../model/user");
const Task = require("../model/task");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

//login user
exports.loginUser = async (req, res, next) => {
  const { name, id } = req.body;
  if (!name || !id) {
    return res.status(400).json({
      success: false,
      message: "Please fill all details",
    });
  }

  const user = await User.find({name, id});
  
  if (user.length) {
    const token = jwt.sign({_id:user._id},"JWT_SECRET")
    res.status(200).json({
      success: true,
      user,
      token
    });
  }else{
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
};

//create task
exports.createTask = async (req, res, next) => {
  const { task, userId } = req.body;
  const user = await User.findById({ _id: userId });
  const newTask = await Task.create({
    task,
    user,
  });

  if (newTask) {
    res.status(200).json({
      success: true,
      task: newTask,
    });
  }
};

//all task
exports.allTasks = async (req, res, next) => {  
  const alltask = await Task.find({}).populate("user", "_id name id");

  if (alltask) {
    res.status(200).json({
      success: true,
      alltask,
    });
  }
};

// delete task
exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;

      Task.findOneAndDelete({_id: id}, function (err, docs) {
        if (err){
          return res.status(404).json({
            success: false,
            message: "Task not found",
          });
        }
        else{
          res.status(200).json({
            success: true,
            message: "Task deleted successfully",
          });
        }
      });
};

// update task
exports.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { status, task } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message:"Task Not found",
    });
  }

  let updateTask = await Task.find({_id: id});

  updateTask = await Task.findByIdAndUpdate(id, {task, completed: status}, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updateTask,
  });
};

//dasboard
exports.dashboard = async (req, res, next) => {
  const totalTask = await Task.countDocuments();
  const latestTask = await Task.find().sort({'_id':-1}).limit(3)

  res.status(200).json({
    success: true,
    totalTask,
    latestTask
  });
};
//https://git.heroku.com/testjob123.git
exports.search = async (req, res, next) => {
  const {key} = req.query;
  const tasks = await Task.find({task:{
    $regex: key,
    $options: 'i',
  },})
  if(tasks.length > 0){
    res.status(200).json({
      success: true,
      tasks
    });
  }else{
    return res.status(200).json({
      success: true,
      message: "no task Found"
    });
  }
};