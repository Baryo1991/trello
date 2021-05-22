import React, { useEffect, useState } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { login } from "../../api/services/userService";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";
import styles from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (success) {
        history.push('/board');
        window.location.reload();
    }

  }, [success]);

  const onChangeHandler = ({ target }) => {
    const { name, value } = target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await login(credentials);

    if (error) setError(error);
    else if (data) setSuccess(true);
    else {
        setCredentials({
            email: "",
            password: "",
          })
        setLoading(false);
    }
  };

 

  return (
    <div className={styles.root}>
      <Logo />
      <AuthContainer>
          {loading && <Spinner animation="border" variant="light"/>}
          {error && <Alert variant = 'danger'>{error}</Alert>}
        <h2 className={styles.title}>Log in to continue</h2>
        <form onSubmit={submitHandler}>
          <Input
            value={credentials.email}
            onChange={onChangeHandler}
            placeholder="Enter email"
            name="email"
            type="email"
          />
          <Input
            value={credentials.password}
            onChange={onChangeHandler}
            placeholder="Enter password"
            type="password"
            name="password"
          />
          <Button disabled = {loading} type="submit" style={{ width: "200px" }} variant="success">
            Log in
          </Button>
        </form>
      </AuthContainer>
    </div>
  );
};

export default Login;
