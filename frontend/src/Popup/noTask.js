
import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const NoTask = ({setOpen}) => {
  return (
    <div className={`cardBoxNoTask`} >
      <label for="uname">
        <b>You have No Task</b>
      </label>
      <br></br>
      <button onClick={()=>setOpen(true)} className="btn" type="submit">
        +New Tasks
      </button>
    </div>
  );
};

export default NoTask;