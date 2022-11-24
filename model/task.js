const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task:{
		type: String,
		require: true
	},
	user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
	completed: {
		type: Boolean,
		default: false
	}
},{
	timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
