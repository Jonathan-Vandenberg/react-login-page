import React from "react"

// Available globaly, AuthContext is an object which will contain a component.
// All components which are wrapped by it will have access to it.
// becaue it is not a component, you add .Provider to it.
// All of the component children, and children's children, will acquire the properties.
//
// The second 'property' is on the top level and is mutable from there.
// The second property is the flag being sent to the children with that mutated value.

// *PROVIDING
//<AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
//       <OtherComponents />
// </AuthContext.Provider>

// *RECEIVING
// Create a function in the component named ctx. which will replace "props". then use the useContext hook.
// const ctx = useContext(AuthContext)
// ctx.isLoggedIn is available, and is updated from the top level.

const AuthContext = React.createContext({ isLoggedIn: false })

export default AuthContext
