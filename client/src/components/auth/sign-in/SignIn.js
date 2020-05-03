import React, { useState } from "react";
import CustomInput from "../../custom-input/CustomInput";
import "./style.css";
import { withRouter } from "react-router-dom";
import { useMutation } from "react-apollo";
import CustomButton from "../../custom-button/CustomButton";
import { SIGNIN_USER } from "./../../../queries/index";
import CustomError from "../../custom-error/CustomError";

const init = {
  email: "",
  password: "",
};

const SignIn = ({ history, refetch }) => {
  const [user, setUser] = useState({ ...init });
  const { email, password } = user;
  const [signinUser] = useMutation(SIGNIN_USER);
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
    const isInvalid = !email || !password;
    return isInvalid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await signinUser({ variables: { ...user } });
      console.log(token, "signin");
      localStorage.setItem("token", token.data.signinUser.token);
      await refetch();
      clearState();
      history.push("/");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <CustomButton type="submit" disabled={validateForm()}>
        click
      </CustomButton>
      {error && <CustomError err={error} />}
    </form>
  );
};

export default withRouter(SignIn);
