import React, { useState, useEffect, useReducer } from "react"

import Card from "../UI/Card/Card"
import classes from "./Login.module.css"
import Button from "../UI/Button/Button"

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
    props.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
