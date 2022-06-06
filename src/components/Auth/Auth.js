import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import jwt_decode from "jwt-decode";
//import { useNavigate } from 'react-router-dom'
import { useNavigate } from "react-router";
import { signup, signin } from "../../actions/auth";
const initalialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  //const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initalialState);
  const dispatch = useDispatch();
  const hundleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const hundleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const hundleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleCallbackResponse = async (response) => {
    const result = jwt_decode(response?.credential);
    const token = response;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "547287536044-8dhablgn5foaaoqq6ljtifuioups93tl.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Signup" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={hundleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  hundleChange={hundleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  hundleChange={hundleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email address"
              hundleChange={hundleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              hundleChange={hundleChange}
              type={showPassword ? "text" : "password"}
              hundleShowPassword={hundleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                hundleChange={hundleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <div id="signInDiv" fullWidth></div>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
