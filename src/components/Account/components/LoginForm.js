import { useRef, useEffect, useContext } from "react";

import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";
import ValidUserContext from "../authCheck";
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const validUserContext = useContext(ValidUserContext);
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  console.log(validUserContext.isLoggedIn)

  useEffect(() => {
    validUserContext.localAuthCheck();

}, [validUserContext]);

if(validUserContext.isLoggedIn){
  navigate("/");
}


  const submitHandler = (event) => {
    event.preventDefault();

    validUserContext.apiAuthCheck(
      usernameInputRef.current.value,
      passwordInputRef.current.value
    );
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <img
          className={classes.icon}
          src={usernameIcon}
          alt="Username icon"
          htmlFor="user-name"
        ></img>
        <input
          className={classes.input}
          type="text"
          id="user-name"
          name="username"
          autoComplete="on"
          placeholder="Username or E-mail"
          ref={usernameInputRef}
          required={!validUserContext.isLoggedIn}
        ></input>
      </div>

      <div>
        <img
          className={classes.icon}
          src={passwordIcon}
          alt="Password icon"
          htmlFor="user-password"
        ></img>
        <input
          className={classes.input}
          type="password"
          id="user-password"
          name="password"
          autoComplete="off"
          placeholder="Password"
          ref={passwordInputRef}
          required={!validUserContext.isLoggedIn}
        ></input>
      </div>
      <button
        className={classes.loginBtn}
        disabled={validUserContext.isLoggedIn}
      >
        {validUserContext.isLoggedIn === true? "Already logged in" : "Login"}
      </button>
      <div >{validUserContext.error? "You've Entered the Wrong Information" : ""}</div>
    </form>
  );
}

export default LoginForm;
