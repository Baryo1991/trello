import styles from "./Signup.module.css";
import React, { useEffect, useState } from "react";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";
import { Alert, Button, Spinner } from "react-bootstrap";
import { signup } from "../../api/services/userService";
import { useHistory } from "react-router";

const initialState = {
  email: "",
  fullName: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(initialState);

  useEffect(() => {
    if (success) {
        history.push('/board');
        window.location.reload();
    }
  }, [success]);
  const onChangeHandler = ({ target }) => {
    const { name, value } = target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await signup(userDetails);
    if (error) setError(error);
    else if (data) setSuccess(true);
    else {
        setLoading(false);
        setUserDetails(initialState);
    }


  };
  return (
    <div className={styles.root}>
      <Logo />
      <AuthContainer>
        {loading && <Spinner animation="border" variant="light"  />}
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className={styles.title}>Sign up for your account</h2>
        <form onSubmit={submitHandler}>
          <Input
            value={userDetails.email}
            onChange={onChangeHandler}
            placeholder="Enter email"
            name="email"
          />
          <Input
            value={userDetails.fullName}
            onChange={onChangeHandler}
            placeholder="Enter full name"
            name="fullName"
          />
          <Input
            value={userDetails.password}
            onChange={onChangeHandler}
            placeholder="Enter password"
            type="password"
            name="password"
          />
          <Input
            value={userDetails.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
          />
          <Button disabled={loading} type="submit" style={{ width: "200px" }}>
            Sign up
          </Button>
        </form>
      </AuthContainer>
    </div>
  );
};

export default Signup;
