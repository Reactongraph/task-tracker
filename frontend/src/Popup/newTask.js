import React, { useState } from "react";
import "./style.css";
import { createTask, dashboardTask } from "../Action/taskAction";
import { useDispatch } from "react-redux";

const NewTask = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const user = localStorage.getItem("user");
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {  
    dispatch(createTask({id: JSON.parse(user)[0]?._id, task: data}));
  }

  return (
    <div className={`cardBox`}>
      <span className="spanNewTask">
      <p>
        <b>+ New Tasks</b>
      </p>
      <p className="close_x" onClick={handleClose}>
        x
      </p>
      </span> 
      <input
        className="taskName"
        type="text"
        placeholder="Task Name"
        name="uname"
        required
        value={data}
        onChange={(e)=> setData(e.target.value)}
      />
      <br />
      <br />
      <button onClick={(e)=>handleClick(e)} className="btn" type="submit" >
        +New Tasks
      </button>
    </div>
  );
};

export default NewTask;
