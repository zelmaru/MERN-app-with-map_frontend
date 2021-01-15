import React, { useState, useContext } from "react";

import "./Auth.css";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

function Auth(props) {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [formState, changeHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          // after switching to login mode drop those fields:
          username: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("username", formState.inputs.username.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="card--spaced authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Log In" : "Sign Up"}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <ImageUpload
                center
                round
                id="image"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={changeHandler}
              />
              <Input
                id="username"
                element="input"
                type="text"
                label="Username"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="The username is required."
                onInput={changeHandler}
              />
            </>
          )}
          <Input
            id="email"
            element="input"
            type="text"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="This is not a valid e-mail address."
            onInput={changeHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="The password must be at least 5 characters long."
            onInput={changeHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Log in" : "Sign up"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? "signup" : "login"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
