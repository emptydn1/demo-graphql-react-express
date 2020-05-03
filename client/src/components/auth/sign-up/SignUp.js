import React, { useState } from "react";
import CustomInput from "../../custom-input/CustomInput";
import "./style.css";
import { withRouter } from "react-router-dom";
import { useMutation } from "react-apollo";
import CustomButton from "../../custom-button/CustomButton";
import { SIGNUP_USER } from "./../../../queries/index";
import CustomError from "../../custom-error/CustomError";

const init = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = ({ history, refetch }) => {
  const [user, setUser] = useState({ ...init });
  const { userName, email, password, confirmPassword } = user;
  const [signupUser] = useMutation(SIGNUP_USER);
  const [error, setError] = useState("");

  const clearState = () => {
    setUser({ ...init });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateForm = () => {
    const isInvalid =
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword;
    return isInvalid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await signupUser({ variables: { ...user } });
      await refetch();
      localStorage.setItem("token", token.data.signupUser.token);
      clearState();
      history.push("/signin");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <CustomInput
        name="userName"
        type="userName"
        handleChange={handleChange}
        value={userName}
        label="userName"
        required
      />
      <CustomInput
        name="email"
        type="email"
        handleChange={handleChange}
        value={email}
        label="email"
        required
      />
      <CustomInput
        name="password"
        type="password"
        handleChange={handleChange}
        value={password}
        label="password"
        required
      />
      <CustomInput
        type="password"
        name="confirmPassword"
        handleChange={handleChange}
        value={confirmPassword}
        label="confirmPassword"
        required
      />
      <CustomButton type="submit" disabled={validateForm()}>
        click
      </CustomButton>
      {error && <CustomError err={error} />}
    </form>
  );
};

export default withRouter(SignUp);
