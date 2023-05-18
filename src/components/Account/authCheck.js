import { createContext, useState } from "react";

const ValidUserContext = createContext({
  error:"",
  isLoggedIn: false,
  apiAuthCheck: (enteredEmail, enteredPassword) => { },
  localAuthCheck: () => { },
});

export const ValidUserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  async function apiAuthCheckHandler(username, password) {
    const url =
      "http://localhost:4000/account/login";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(!data.msg){
          localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
          setIsLoggedIn(true);
          setError("");
        }
        else{
          setError(data.msg)
        }
      })
      .catch((e) => {
        alert("Server error");
      });
  }

  const localAuthCheckHandler = () => {
    const localData = JSON.parse(localStorage.getItem("accessToken"));
    if (localData !== null) {
      setIsLoggedIn(true);
      setError("");
    }
  };

  const context = {
    error:error,
    isLoggedIn: isLoggedIn,
    apiAuthCheck: apiAuthCheckHandler,
    localAuthCheck: localAuthCheckHandler,
  };

  return (
    <ValidUserContext.Provider value={context}>
      {props.children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserContext;
