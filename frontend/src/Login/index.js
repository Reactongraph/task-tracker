import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userlogin } from "../Action/userAction";
import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const error = useSelector((state) => state.user.error);
  const currentUser = useSelector((state) => state.user);

  const [state, setState] = useState({
    id: "",
    name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userlogin(state));
  };

  useEffect(()=>{
    if(currentUser.user.length){
      history.push('/home')
    }
  }, [currentUser])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                className="placeHolder"
                type="text"
                placeholder="Id"
                name={"id"}
                value={state.id}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input
                className="placeHolder"
                type="text"
                placeholder="Name"
                name={"name"}
                value={state.name}
                onChange={handleChange}
              />
            </div>
              {error && <p className="error">{error.message}</p>}
            <div className="button-container">
              <button className="button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
