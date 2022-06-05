import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
  } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import useStyles from "./styles";
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = user?.token;
    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')));

  }, []);
  const logOut = () => {
    dispatch({type : 'LOGOUT'});
    navigate('/auth');
    setUser(null);
  };
    return (
        <div>
                      {user?.result.email}
                      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={logOut}
          >
            Logout
          </Button>
        </div>
    );
};

export default Home;