import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import NewTask from "../Popup/newTask";
import NoTask from "../Popup/noTask";
import {
  getAllTasks,
  dashboardTask,
  deleteTask,
  editTask,
} from "../Action/taskAction";

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const task = useSelector((state) => state.tasks);
  const currentUser = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [searchTasks, setSearchTask] = useState("");
  const [edit, setEdit] = useState(null);
  const [totalTask, setTotalTask] = useState();
  const [data, setData] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getAllTasks());
    dispatch(dashboardTask());
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllTasks());
      dispatch(dashboardTask());
      setData(currentUser?.data?.latestTask);
      setTotalTask(currentUser?.data?.totalTask);
    }
  }, [currentUser]);

  useEffect(() => {
    if (task) {
      setData(task?.dashboardData?.latestTask);
      setAllUser(task?.tasks?.alltask);
      setTotalTask(task?.dashboardData?.totalTask);
      setEdit(null);
      setOpen(false);
    }
  }, [task]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteTask(id));
  };
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleEdit = (id) => {
    setEdit(id);
    setMessage(allUser.find((item) => item._id === id).task);
  };

  const handleSave = (id) => {
    dispatch(editTask({ id, message, status: false }));
  };

  const handleSearchChange = (e) => {
    setSearchTask(e.target.value);
  };

  const handleSearch = () => {
    const searchData = allUser?.filter((item) => {
      return item.task.toLowerCase().indexOf(searchTasks.toLowerCase()) !== -1;
    });

    if (searchData) setAllUser(searchData);
  };

  const handleOnChange = (id, task) => {
    dispatch(editTask({ id, task, status: true }));
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const completedTask = allUser?.filter(
    (task) => task.completed === true
  )?.length;

  const user = localStorage.getItem("user");

  return (
    <>
      <div className="navbar">
        <div className="navbarData">
          <div className="navbar1">
            <img
              src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049__340.png"
              alt="Avatar"
              className="avatar"
            ></img>
            <h4>{JSON.parse(user)?.name}</h4>
          </div>
          <div>
            <h4 className="logout" onClick={() => handleLogout()}>
              Logout
            </h4>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="cardItem">
          <p className="p">Task Completed</p>
          <div className="span1">
            <span className="span">{completedTask}</span>/{totalTask}
          </div>
        </div>
        <div className="cardItem">
          <p className="p">Latest created task</p>
          <ul className="ul">
            {data?.map((item, i) => {
              return (
                <li className="li" key={i}>
                  {item.task}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="cardItem xyz">
          {completedTask && totalTask && (
            <PieChart
              data={[
                {
                  title: "Completed",
                  value: parseInt(completedTask),
                  color: "#378ef0",
                },
                {
                  title: "Not Completed",
                  value: parseInt(totalTask),
                  color: "#eaeaea",
                },
              ]}
            />
          )}
        </div>
      </div>

      <div>
        <div className="tasks">
          <h3 className="h3 ">Tasks</h3>
          <div className="newTask">
            <input
              id="search"
              className="search"
              type="search"
              onChange={handleSearchChange}
              placeholder="Search By Tasks Name"
            ></input>
            <i className="fa fa-search" onClick={() => handleSearch()}></i>
            <button className="searchTask" onClick={() => handleClick()}>
              +NewTasks
            </button>
          </div>
        </div>
      </div>

      <div className="check">
        {allUser?.map((item, i) => {
          return (
            <React.Fragment key={item._id}>
              <div className="lableText">
                <div className="abcd">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleOnChange(item?._id, item?.task)}
                  />
                  {item._id === edit ? (
                    <input
                      className="inputField"
                      type="text"
                      id="message"
                      name="message"
                      onChange={(e) => handleChange(e)}
                      value={message}
                    />
                  ) : (
                    <label className={`${item.completed && "completed"}`}>
                      {" "}
                      {item?.task}
                    </label>
                  )}
                </div>
                <div className="fa_icon">
                  {!item.completed && item._id !== edit ? (
                    <i
                      className="fa fa-edit"
                      onClick={() => handleEdit(item._id)}
                    ></i>
                  ) : (
                    item._id === edit && (
                      <button
                        className="saveButton"
                        onClick={() => handleSave(item._id)}
                      >
                        save
                      </button>
                    )
                  )}
                  {item._id !== edit && (
                    <i
                      className="fa fa-trash"
                      onClick={(e) => handleDelete(e, item._id)}
                    ></i>
                  )}
                </div>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>

      {open && <NewTask open={open} setOpen={setOpen} />}
      {false && <NoTask setOpen={setOpen} />}
    </>
  );
};

export default Home;
