import { useRef, useEffect, useContext, useState } from "react";

import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";
import { useNavigate, useNavigation } from "react-router-dom";
import ValidUserContext from "../authCheck"
function RegisterForm() {
  let validUserContext = useContext(ValidUserContext)
  let [error,setError] = useState("");  
  let navigate = useNavigate();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const fNameinputref = useRef();
  const lNameinputref = useRef();

  useEffect(() => {
    validUserContext.localAuthCheck();

}, [validUserContext]);


  if(validUserContext.isLoggedIn){
    navigate("/");
    
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirm_password = passwordInputRef.current.value;
    const email = emailInputRef.current.value;
    const firstname = fNameinputref.current.value;
    const lastname = lNameinputref.current.value;

    await fetch("http://localhost:4000/account/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username,password,email,firstname,lastname,confirm_password})
    }).then((data)=>{
      return data.json();
    }).then((data)=>{
      if(!data.result){
      setError(data.error||data.msg);
      return;
      }
      navigate("/login");
    }).catch(err=>{
      console.log(err)
    })
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <img
          className={classes.icon}
          src={passwordIcon}
          alt="Password icon"
          htmlFor="user-password"
        ></img>
        <input
          className={classes.input}
          type="text"
          id="user-fname"
          name="fname"
          autoComplete="off"
          placeholder="First Name"
          ref={fNameinputref}
          required
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
          type="text"
          id="user-password"
          name="lName"
          autoComplete="off"
          placeholder="Last Name"
          ref={lNameinputref}
          required
        ></input>
      </div>
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
          required
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
          type="email"
          id="user-email"
          name="email"
          autoComplete="off"
          placeholder="email"
          ref={emailInputRef}
          required
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
          name="text"
          autoComplete="off"
          placeholder="Password"
          ref={passwordInputRef}
          required
        ></input>
      </div>

      
      <button
        className={classes.loginBtn}
      >
        Register
      </button>
      {error?error:""}
    </form>
  );
}

export default RegisterForm;
