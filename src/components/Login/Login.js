import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react"

import Card from "../UI/Card/Card"
import classes from "./Login.module.css"
import Button from "../UI/Button/Button"
import AuthContext from "../../store/auth-context"
import Input from "../UI/Input/Input"

const ACTIONS = {
  USER_INPUT: "user-input",
  INPUT_BLUR: "input-blur",
}

const emailReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.USER_INPUT:
      return { value: action.val, isValid: action.val.includes("@") }

    case ACTIONS.INPUT_BLUR:
      return { value: state.value, isValid: state.value.includes("@") }

    default:
      return { value: "", isValid: false }
  }
}

const passwordReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.USER_INPUT:
      return { value: action.val, isValid: action.val.trim().length > 6 }

    case ACTIONS.INPUT_BLUR:
      return { value: state.value, isValid: state.value.trim().length > 6 }

    default:
      return { value: "", isValid: false }
  }
}

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  })

  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [formIsValid, setFormIsValid] = useState(false)

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: ACTIONS.USER_INPUT, val: event.target.value })
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: ACTIONS.INPUT_BLUR })
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: ACTIONS.USER_INPUT, val: event.target.value })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: ACTIONS.INPUT_BLUR })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value)
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
