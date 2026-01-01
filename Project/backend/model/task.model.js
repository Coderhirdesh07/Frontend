const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
   type: String,
   require:true
  },
  description: {
    type:String,
  },
  dueDate: {
    type:Date,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },
  priority: {
     type: String,
      enum: ["low", "medium", "high"]
  },
//   assignedTo: {
//      type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//   }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
