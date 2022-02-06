import React, { useState, useEffect } from "react"

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
}) // dummy function for IDE autocompletion.

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loginInfo = localStorage.getItem("userIsLoggedIn")
    if (loginInfo === "1") {
      setIsLoggedIn(true)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem("userIsLoggedIn")
    setIsLoggedIn(false)
  }

  const loginHandler = () => {
    localStorage.setItem("userIsLoggedIn", "1")
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

// Available globaly, AuthContext is an object which will contain a component.
// All components which are wrapped by it will have access to it's functions and objects.
// becaue it is not a component, you add .Provider to it.
// All of the component children, and children's children, will acquire the properties
// through useContext() hook.
//
// The second 'property' is on the top level and is mutable from there.
// The first property is the flag being sent to the children with that mutated value.

// *PROVIDING
//<AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
//       <OtherComponents />
// </AuthContext.Provider>

// *RECEIVING
// Create a function in the component named ctx. which will replace "props". then use the useContext hook.
// const ctx = useContext(AuthContext)
// ctx.isLoggedIn is available, and is updated from the top level.
