const Task = require("../model/task.model.js");

async function handleTaskCreation(request, response) {
    try {
      const { title, description, dueDate, status, priority } = request.body; 
  
      if (!title || !description || !dueDate || !status || !priority) {
        return response.status(400).json({ message: "All fields are required" });
      }
  
      const isTaskExist = await Task.findOne({ title });
      if (isTaskExist) {
        return response.status(400).json({ message: "Task already exists" });
      }
  
      const newTask = new Task({ title, description, dueDate, status, priority }); // use dueDate
      await newTask.save();
  
      return response.status(200).json({ message: "Task created successfully", task: newTask });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ message: "Server error" });
    }
  }
  

async function handleTaskDeletion(req, res) {
  try {
    const { id } = req.params; // Accept task ID from URL
    if (!id) return res.status(400).json({ message: "Task ID is missing" });

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function handleTaskUpdation(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) return res.status(400).json({ message: "Task ID is missing" });

    const task = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}



async function handleGetAllTask(req, res) {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
  handleGetAllTask,
  handleTaskCreation,
  handleTaskDeletion,
  handleTaskUpdation,
};
